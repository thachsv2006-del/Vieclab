import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, Play, Navigation, Clock, MapPin, Coffee, AlertTriangle, 
  ChevronRight, Phone, Volume2, VolumeX, ShieldCheck, X, RefreshCw,
  TrendingUp, Award, Zap, Compass, CheckCircle2, Star, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';

// Web Audio API Sound Synthesizer for high-energy sound effects
const playSound = (type: 'tick' | 'alarm' | 'success' | 'haptic' | 'online') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'alarm') {
      // Grab ringtone style: dual high pitch tones
      [0, 0.18].forEach(delay => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now + delay); // A5
        gain.gain.setValueAtTime(0.08, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.15);
      });
    } else if (type === 'success') {
      // Uplifting melodic chime (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.08, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } else if (type === 'haptic') {
      // Bass drop simulation for heavy tactile buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'online') {
      // Swish upward synthesizer sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    console.warn('Audio Context is not allowed or supported', e);
  }
};

// Types & Interfaces
interface InstantShiftClaimingProps {
  isOnline: boolean;
  setIsOnline: (val: boolean) => void;
  triggerSimToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  simDarkMode: boolean;
}

// Region details interface
interface RegionData {
  id: 'hcm' | 'danang';
  name: string;
  emoji: string;
  restaurant: string;
  address: string;
  distanceText: string;
  routeInstructions: string[];
}

const REGION_DATASETS: Record<'hcm' | 'danang', RegionData> = {
  hcm: {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    emoji: '🏙️',
    restaurant: 'Highlands Coffee Trần Hưng Đạo',
    address: '120 Trần Hưng Đạo, P. Phạm Ngũ Lão, Quận 1, TP. HCM',
    distanceText: 'Cách bạn 650m - Highlands Coffee Trần Hưng Đạo',
    routeInstructions: [
      'Bắt đầu di chuyển về hướng Đông Nam trên đường Trần Hưng Đạo',
      'Đi thẳng 150m, sau đó rẽ trái tại ngã tư Trần Hưng Đạo - Nguyễn Thái Học',
      'Đi thẳng tiếp 200m hướng về phía nhà hàng Highlands Coffee',
      'Chuẩn bị rẽ vào cổng Highlands Coffee Trần Hưng Đạo (Cách bạn 120m)',
      'Bạn đã đến nơi! Vui lòng ấn nút CHECK-IN bên dưới để bắt đầu ca làm.'
    ]
  },
  danang: {
    id: 'danang',
    name: 'Đà Nẵng',
    emoji: '🌊',
    restaurant: 'Highlands Coffee Bạch Đằng',
    address: '186 Bạch Đằng, P. Phước Ninh, Q. Hải Châu, Đà Nẵng (View Sông Hàn 🌉)',
    distanceText: 'Cách bạn 650m - Highlands Coffee Bạch Đằng, Hải Châu',
    routeInstructions: [
      'Bắt đầu di chuyển về hướng Bắc dọc theo đường Bạch Đằng lộng gió bờ sông Hàn',
      'Đi thẳng 150m hướng về phía Cầu Rồng rực rỡ kỳ vĩ',
      'Rẽ trái tại ngã ba Bạch Đằng - Thái Phiên rẽ sát lề đường Nguyễn Văn Linh',
      'Chuẩn bị rẽ vào Highlands Coffee Bạch Đằng đối diện bến du thuyền (Cách bạn 120m)',
      'Bạn đã đến nơi! Vui lòng ấn nút CHECK-IN bên dưới để bắt đầu ca làm.'
    ]
  }
};

// 1. Core Slider Gesture acceptance component
interface SlideToAcceptProps {
  onAccept: () => void;
  isProcessing: boolean;
  simDarkMode: boolean;
}

export const SlideToAccept: React.FC<SlideToAcceptProps> = ({ onAccept, isProcessing, simDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const maxDragWidth = 200; // Drag limit constraint

  // Calculate percentage of drag completion to fill track dynamically
  const fillWidth = useTransform(x, [0, maxDragWidth], ['0%', '100%']);
  const textOpacity = useTransform(x, [0, maxDragWidth / 2], [1, 0.15]);

  useEffect(() => {
    // Listen to changes in x to detect 100% completion
    const unsubscribe = x.on('change', (latest) => {
      if (latest >= maxDragWidth - 5 && !hasTriggered && !isProcessing) {
        setHasTriggered(true);
        playSound('haptic');
        onAccept();
      }
    });
    return () => unsubscribe();
  }, [x, hasTriggered, onAccept, isProcessing]);

  // Reset slider if props change or processing ends
  useEffect(() => {
    if (!isProcessing) {
      x.set(0);
      setHasTriggered(false);
    }
  }, [isProcessing, x]);

  return (
    <div className="w-full">
      <div 
        id="slide-to-accept-track"
        ref={containerRef}
        className="w-full h-14 rounded-full bg-slate-900/80 border border-slate-800 relative overflow-hidden flex items-center select-none shadow-inner"
      >
        {/* Fill green background behind the knob */}
        <motion.div 
          style={{ width: fillWidth }}
          className="absolute left-0 top-0 bottom-0 bg-[#00C853] rounded-l-full"
        />

        {/* Shimmer glowing track label */}
        <motion.span 
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex items-center justify-center text-[10.5px] font-black uppercase tracking-[0.12em] text-white pointer-events-none text-center select-none z-10"
        >
          <span className="animate-pulse bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-clip-text text-transparent">
            {isProcessing ? 'ĐANG KẾT NỐI CA...' : 'VUỐT ĐỂ NHẬN CA NGAY »'}
          </span>
        </motion.span>

        {/* Slidable Knob button */}
        {!isProcessing && (
          <motion.div
            id="slide-to-accept-knob"
            drag="x"
            dragConstraints={{ left: 0, right: maxDragWidth }}
            dragElastic={0.05}
            dragMomentum={false}
            style={{ x }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-11 h-11 rounded-full bg-[#1565C0] border border-blue-400 flex items-center justify-center cursor-grab active:cursor-grabbing text-white shadow-lg absolute left-1.5 z-20"
          >
            <div className="flex items-center gap-[-2px] animate-pulse">
              <ChevronRight className="w-4 h-4 shrink-0 stroke-[3]" />
              <ChevronRight className="w-4 h-4 shrink-0 -ml-2 stroke-[3] opacity-70" />
            </div>
          </motion.div>
        )}

        {isProcessing && (
          <div className="w-11 h-11 rounded-full bg-[#00C853] border border-emerald-400 flex items-center justify-center text-white absolute right-1.5 z-20">
            <RefreshCw className="w-4 h-4 animate-spin stroke-[3]" />
          </div>
        )}
      </div>
    </div>
  );
};


// 2. MAIN COMPONENT HANDLING ENTIRE CLAIMING AND ROUTING FLOW
export const InstantShiftClaiming: React.FC<InstantShiftClaimingProps> = ({ 
  isOnline, 
  setIsOnline, 
  triggerSimToast,
  simDarkMode 
}) => {
  // States
  const [selectedRegion, setSelectedRegion] = useState<'danang' | 'hcm'>('danang');
  const activeRegion = REGION_DATASETS[selectedRegion];
  
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchProgress, setSearchProgress] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  
  // Flash Screen Overlay State
  const [showFlashScreen, setShowFlashScreen] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Acceptance Success / Routing states
  const [isAccepted, setIsAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNavigationScreen, setShowNavigationScreen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Navigation tracking simulation
  const [navStep, setNavStep] = useState(0);
  const [navDistance, setNavDistance] = useState(650);
  const [navTime, setNavTime] = useState(120); // 120 seconds (2 mins)
  const [navInstructions, setNavInstructions] = useState('Bắt đầu di chuyển dọc theo đường Bạch Đằng lộng gió bờ sông Hàn');
  const [navStatus, setNavStatus] = useState<'moving' | 'arrived'>('moving');

  // Multi-step mock coordinates for route movement animation
  const routePoints = [
    { x: 30, y: 70 },
    { x: 45, y: 55 },
    { x: 60, y: 40 },
    { x: 72, y: 28 },
    { x: 80, y: 20 },
  ];
  const [userCoord, setUserCoord] = useState({ x: 30, y: 70 });

  // Handle Toggle action
  const handleToggleOnline = (checked: boolean) => {
    setIsOnline(checked);
    if (checked) {
      playSound('online');
      playSound('haptic');
      triggerSimToast('Bạn đang ONLINE! Hệ thống đang quét ca nhận tức thì...', 'success');
      
      // Start searching routine simulation
      setIsSearching(true);
      setSearchProgress(0);
      
      // Clear old timers if any
      if (searchTimer) clearInterval(searchTimer);
      
      // Dynamic search progress simulation
      const progressInterval = setInterval(() => {
        setSearchProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            // Trigger Incoming Shift Flash Screen!
            setTimeout(() => {
              triggerIncomingShift();
            }, 600);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
      
      setSearchTimer(progressInterval);
    } else {
      playSound('haptic');
      triggerSimToast('Đã dừng nhận ca tức thì.', 'info');
      setIsSearching(false);
      setSearchProgress(0);
      if (searchTimer) {
        clearInterval(searchTimer);
        setSearchTimer(null);
      }
      setShowFlashScreen(false);
    }
  };

  // Trigger Flash Screen Request
  const triggerIncomingShift = () => {
    setIsSearching(false);
    setShowFlashScreen(true);
    setCountdown(15);
    setIsAccepted(false);
    setIsProcessing(false);
  };

  // Alarm sound loop when ringing
  useEffect(() => {
    let alarmTimer: NodeJS.Timeout;
    if (showFlashScreen && !isAccepted && !isProcessing && soundEnabled) {
      // Ring immediately
      playSound('alarm');
      // Ring every 1.5s
      alarmTimer = setInterval(() => {
        playSound('alarm');
      }, 1500);
    }
    return () => {
      if (alarmTimer) clearInterval(alarmTimer);
    };
  }, [showFlashScreen, isAccepted, isProcessing, soundEnabled]);

  // Countdown clock loop
  useEffect(() => {
    let clockTimer: NodeJS.Timeout;
    if (showFlashScreen && countdown > 0 && !isAccepted && !isProcessing) {
      clockTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(clockTimer);
            // Dismiss automatically on timeout
            handleDismissRequest('timeout');
            return 0;
          }
          playSound('tick');
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (clockTimer) clearInterval(clockTimer);
    };
  }, [showFlashScreen, countdown, isAccepted, isProcessing]);

  // Handle Dismiss Shift
  const handleDismissRequest = (reason: 'manual' | 'timeout') => {
    setShowFlashScreen(false);
    if (reason === 'timeout') {
      triggerSimToast('Hết thời gian nhận ca! Ca làm đã chuyển cho người khác.', 'error');
    } else {
      triggerSimToast('Đã bỏ qua ca làm này.', 'info');
    }
    
    // Automatically resume searching after 4 seconds to keep it high-energy!
    setTimeout(() => {
      if (isOnline) {
        setIsSearching(true);
        setSearchProgress(0);
        handleToggleOnline(true);
      }
    }, 4000);
  };

  // Handle Claim Shift Success
  const handleAcceptShift = () => {
    setIsProcessing(true);
    // Simulating API registration latency
    setTimeout(() => {
      setIsProcessing(false);
      setIsAccepted(true);
      setShowFlashScreen(false);
      setShowSuccessModal(true);
      playSound('success');
      
      // Auto transition from success dialog to the active Live Map navigation in 2.5s
      setTimeout(() => {
        setShowSuccessModal(false);
        setShowNavigationScreen(true);
        startNavigationSimulation();
      }, 2500);
    }, 1500);
  };

  // Navigation route tracker simulator
  const startNavigationSimulation = () => {
    const currentRegion = REGION_DATASETS[selectedRegion];
    setNavStep(0);
    setNavDistance(650);
    setNavTime(120);
    setUserCoord(routePoints[0]);
    setNavStatus('moving');
    setNavInstructions(currentRegion.routeInstructions[0]);

    const steps = [
      { dist: 480, time: 90, inst: currentRegion.routeInstructions[1], coord: routePoints[1] },
      { dist: 310, time: 60, inst: currentRegion.routeInstructions[2], coord: routePoints[2] },
      { dist: 120, time: 25, inst: currentRegion.routeInstructions[3], coord: routePoints[3] },
      { dist: 0, time: 0, inst: currentRegion.routeInstructions[4], coord: routePoints[4] },
    ];

    let currentStepIdx = 0;
    const navInterval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const nextStep = steps[currentStepIdx];
        setNavDistance(nextStep.dist);
        setNavTime(nextStep.time);
        setNavInstructions(nextStep.inst);
        setUserCoord(nextStep.coord);
        
        if (nextStep.dist === 0) {
          setNavStatus('arrived');
          clearInterval(navInterval);
          playSound('success');
          triggerSimToast(`Bạn đã đến cửa hàng ${currentRegion.restaurant}!`, 'success');
        }
        currentStepIdx++;
      } else {
        clearInterval(navInterval);
      }
    }, 4500); // Progress step every 4.5 seconds for snappy preview demo
  };

  return (
    <div className="w-full space-y-4">
      {/* 1. SẴN SÀNG NHẬN CA NGAY PREMIMUM TOGGLE BOX */}
      <div 
        id="instant-radar-toggle-box"
        className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
          isOnline 
            ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border-emerald-500/30 shadow-md shadow-emerald-950/10' 
            : simDarkMode 
            ? 'bg-slate-900/60 border-slate-800' 
            : 'bg-white border-slate-200'
        }`}
      >
        {isOnline && (
          <span className="absolute inset-0 bg-emerald-500/[0.02] animate-pulse pointer-events-none" />
        )}
        
        {/* Dynamic region segment control */}
        <div className="flex items-center justify-between mb-3 border-b pb-2 border-slate-200 dark:border-slate-800 z-10 relative">
          <span className={`text-[8px] font-black uppercase tracking-widest ${simDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            📍 Khu vực demo
          </span>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-950 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800">
            {(['danang', 'hcm'] as const).map(regId => {
              const r = REGION_DATASETS[regId];
              const isSel = selectedRegion === regId;
              return (
                <button
                  key={regId}
                  onClick={() => {
                    if (isOnline) {
                      triggerSimToast('Vui lòng tắt nhận ca trước khi chuyển khu vực!', 'info');
                      return;
                    }
                    setSelectedRegion(regId);
                    playSound('tick');
                    triggerSimToast(`Đã đổi địa điểm giả lập về ${r.name}`, 'info');
                  }}
                  className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tight transition-all duration-200 ${
                    isSel 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-200 hover:dark:text-slate-300'
                  }`}
                >
                  {r.emoji} {r.id === 'danang' ? 'Đà Nẵng' : 'Sài Gòn'}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            {/* Pulsing radar or status indicator */}
            <div className="relative shrink-0 select-none">
              {isOnline ? (
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center relative">
                  <span className="absolute inset-0 w-full h-full rounded-full bg-emerald-500/40 animate-ping opacity-60" />
                  <span className="absolute -inset-1.5 rounded-full border border-emerald-500/20 animate-pulse" />
                  <Zap className="w-4 h-4 text-emerald-400 animate-bounce" />
                </div>
              ) : (
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                  simDarkMode ? 'bg-slate-850 border-slate-750 text-slate-500' : 'bg-slate-50 border-slate-150 text-slate-400'
                }`}>
                  <Compass className="w-4 h-4" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[9px] font-black uppercase tracking-widest ${isOnline ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {isOnline ? 'HỆ THỐNG RADA: ON' : 'NHẬN CA TỨC THÌ'}
                </span>
                {isOnline && (
                  <span className="px-1 py-[1px] rounded bg-emerald-550/20 text-emerald-400 text-[7px] font-black tracking-tight animate-pulse">
                    LIVE MAP
                  </span>
                )}
              </div>
              <h4 className={`text-xs font-black tracking-tight mt-0.5 ${simDarkMode ? 'text-white' : 'text-slate-800'}`}>
                SẴN SÀNG NHẬN CA NGAY
              </h4>
              <p className={`text-[9px] leading-tight max-w-[210px] mt-0.5 ${simDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isOnline 
                  ? 'Đang phát định vị GPS tìm các ca làm khẩn cấp xung quanh trong vòng 2-5km...' 
                  : 'Bật để tự động kết nối và nhận các ca gãy khẩn cấp lân cận với lương thưởng cao.'}
              </p>
            </div>
          </div>

          {/* Elegant Custom Success Green Toggle Switch Button */}
          <button
            id="btn-ready-shifts-toggle"
            onClick={() => handleToggleOnline(!isOnline)}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative focus:outline-none cursor-pointer shrink-0 ${
              isOnline ? 'bg-[#00C853]' : 'bg-slate-750 dark:bg-slate-800'
            }`}
          >
            <motion.div 
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-[7px] font-black"
              style={{ x: isOnline ? '20px' : '0px' }}
            >
              {isOnline ? '✓' : ''}
            </motion.div>
          </button>
        </div>

        {/* Searching scanbar banner shown when active searching */}
        <AnimatePresence>
          {isSearching && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden border-t border-slate-850 pt-2.5 space-y-2.5 z-10 relative"
            >
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  Đang quét Highlands, Phúc Long, Starbuck...
                </span>
                <span className="font-bold text-emerald-400">{searchProgress}%</span>
              </div>
              <div className="w-full bg-slate-850 h-1 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${searchProgress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* 2. FULL SCREEN INCANDESCENT "INCOMING SHIFT REQUEST" FLASH SCREEN (THE GRAB RINGING OVERLAY) */}
      <AnimatePresence>
        {showFlashScreen && (
          <motion.div
            id="grab-ringing-flash-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050912] z-50 flex flex-col justify-between overflow-hidden p-6 text-white font-sans"
          >
            {/* Ambient Background Glow Grid and radar lines */}
            <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

            {/* Top Toolbar */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-[8px] font-black text-red-400 tracking-wider animate-pulse flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full animate-ping" />
                  YÊU CẦU KHẨN CẤP
                </span>
                <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  Rada: 650m
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                {/* Audio speaker toggle button */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                </button>
                {/* Manual Skip button */}
                <button
                  id="btn-dismiss-ringing-close"
                  onClick={() => handleDismissRequest('manual')}
                  className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Middle: Pulse Radar & Countdown Circular Ring */}
            <div className="flex flex-col items-center justify-center my-auto py-4 z-10">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Multiple Glowing Radar Pulsing Waves */}
                <span className="absolute w-44 h-44 border border-blue-500/10 rounded-full animate-radar-wave-1 opacity-20 pointer-events-none" />
                <span className="absolute w-36 h-36 border border-blue-500/20 rounded-full animate-radar-wave-2 opacity-35 pointer-events-none" />
                <span className="absolute w-28 h-28 border border-blue-550/30 rounded-full animate-radar-wave-3 opacity-60 pointer-events-none" />
                
                {/* Countdown Timer with warning circular ring */}
                <svg className="absolute w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  {/* Gray background track */}
                  <path
                    className="text-slate-800"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Glowing Orange progress ring */}
                  <motion.path
                    className="text-[#FF9800]"
                    strokeDasharray={`${(countdown / 15) * 100}, 100`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    transition={{ duration: 1 }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                {/* Restaurant Brand Logo or Emoji inside the countdown ring */}
                <div className="relative w-18 h-18 rounded-full bg-slate-900 border border-slate-800 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                  <span className="text-3xl animate-bounce">☕</span>
                  <span className="text-[7.5px] font-black text-slate-400 mt-1 uppercase tracking-widest leading-none">HIGHLANDS</span>
                </div>

                {/* Visual ticking countdown text display bubble */}
                <div className="absolute -bottom-2 bg-gradient-to-r from-amber-500 to-orange-600 text-[10px] font-black text-white px-3 py-1 rounded-full shadow-lg border border-orange-400 select-none tracking-tight">
                  {countdown} giây còn lại
                </div>
              </div>

              {/* Scarcity message label */}
              <p className="text-[9.5px] text-amber-500 font-extrabold tracking-tight mt-6 animate-pulse uppercase">
                ⏰ Ca làm sẽ chuyển cho người khác sau...
              </p>
            </div>

            {/* Bottom Key Job Information & Slide Accept Box */}
            <div className="space-y-4 z-10">
              {/* Job Info Details Card with glowing card borders */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-3.5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 flex gap-1 bg-gradient-to-bl from-emerald-550/10 to-transparent rounded-tr-2xl">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[8.5px] font-black text-emerald-400 uppercase tracking-wider leading-none mt-1">+20% Bonus</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[9.5px] font-extrabold text-blue-400 uppercase tracking-widest">Tuyển gấp làm ngay</span>
                  </div>
                  <h3 className="text-sm font-black text-white tracking-tight">☕ PHA CHẾ / BARISTA CA CHIỀU TỐI</h3>
                  <p className="text-[10px] text-slate-400 font-bold leading-none">{activeRegion.restaurant}</p>
                </div>

                {/* Income details and time indicators */}
                <div className="grid grid-cols-2 gap-3.5 pt-2 border-t border-slate-900">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider block">THU NHẬP CA LÀM</span>
                    <span className="text-base font-black text-[#00C853] tracking-tight block drop-shadow-[0_2px_10px_rgba(0,200,83,0.15)]">
                      250.000đ <span className="text-[10px] text-slate-400 font-semibold font-mono">/ 5 giờ</span>
                    </span>
                    <span className="text-[8px] text-emerald-400 font-bold block">(Lương cứng 50.000đ/giờ)</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider block">KHUNG GIỜ CA TRỰC</span>
                    <span className="text-xs font-black text-slate-100 block">
                      18:00 - 23:00
                    </span>
                    <span className="text-[8.5px] text-amber-500 font-bold block">Hôm nay, ngày 14/07</span>
                  </div>
                </div>

                {/* Location indicator metadata */}
                <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-400 space-y-1.5 font-sans">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>
                      <strong>Vị trí:</strong> {activeRegion.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00C853] shrink-0" />
                    <span className="text-slate-300 font-semibold text-[9.5px]">
                      Đảm bảo nhận tiền ngay sau ca trực qua ví điện tử
                    </span>
                  </div>
                </div>
              </div>

              {/* SLIDE TO ACCEPT GESTURE BUTTON CHASSIS */}
              <div className="pt-2">
                <SlideToAccept 
                  onAccept={handleAcceptShift} 
                  isProcessing={isProcessing}
                  simDarkMode={simDarkMode}
                />
                
                {/* Secondary reject shortcut */}
                <button
                  id="btn-skip-shift-bottom"
                  onClick={() => handleDismissRequest('manual')}
                  className="w-full text-center mt-3 text-[10px] font-black tracking-widest text-slate-500 hover:text-slate-300 uppercase py-1.5 transition-colors focus:outline-none"
                >
                  Bỏ qua cơ hội này ×
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 3. CLAIMED SUCCESS OVERLAY DIALOG */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            id="ringing-success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
              className="space-y-6 max-w-sm flex flex-col items-center"
            >
              {/* Giant checkmark animation */}
              <div className="relative w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                <Check className="w-10 h-10 text-emerald-400 stroke-[4]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black text-white">ĐÃ NHẬN CA THÀNH CÔNG! 🎉</h3>
                <p className="text-xs text-slate-300 leading-normal px-2">
                  Hồ sơ của bạn đã được đối soát tự động & gửi tới {activeRegion.restaurant}. Hãy chuẩn bị hành trang và bắt đầu di chuyển!
                </p>
              </div>

              {/* Highlands logo & target spec brief */}
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 w-full space-y-1 text-left">
                <p className="text-[8px] font-black text-emerald-400 tracking-wider uppercase">THÔNG TIN CA LÀM ĐÃ NHẬN</p>
                <h4 className="text-xs font-black text-white">Barista Ca Chiều Tối</h4>
                <p className="text-[10px] text-slate-400 font-bold"> {activeRegion.restaurant.split(' ')[0] || 'Highlands Coffee'} • 18:00 - 23:00</p>
                <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-800 text-[10px] font-mono text-slate-300">
                  <span>Khoảng cách: 650m</span>
                  <span className="text-emerald-400 font-bold">+250.000đ</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Đang kết nối hệ thống chỉ đường GPS...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 4. HIGH-FIDELITY ACTIVE GPS ROUTE NAVIGATION MAP SCREEN */}
      <AnimatePresence>
        {showNavigationScreen && (
          <motion.div
            id="gps-navigation-screen"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="absolute inset-0 bg-[#0A0E17] z-50 flex flex-col overflow-hidden text-white font-sans"
          >
            {/* Top Navigation status Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Navigation className="w-4 h-4 animate-pulse rotate-45" />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-tight text-white uppercase">BẢN ĐỒ CHỈ ĐƯỜNG GPS</h3>
                  <p className="text-[9px] text-slate-400 font-medium leading-none mt-0.5">Đi đến: {activeRegion.restaurant}</p>
                </div>
              </div>

              {/* Back to dashboard directly */}
              <button
                id="btn-close-navigation"
                onClick={() => {
                  setShowNavigationScreen(false);
                  setIsOnline(false); // Turn off search
                  triggerSimToast('Đã dừng chỉ dẫn. Ca làm đang hoạt động đã lưu vào Lịch.', 'info');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-[9px] font-black tracking-tight border border-slate-750"
              >
                Đóng bản đồ
              </button>
            </div>

            {/* Simulated Navigation Route Guidance Banner */}
            <div className="bg-blue-600 p-3.5 flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-black shrink-0 animate-bounce">
                ↱
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[8px] font-black text-blue-200 uppercase tracking-widest block">CHỈ DẪN HIỆN TẠI</span>
                <p className="text-xs font-bold leading-snug tracking-tight text-white">{navInstructions}</p>
              </div>
            </div>

            {/* Large Interactive Mock Map Canvas */}
            <div className="flex-1 relative bg-[#090D1A] overflow-hidden">
              {/* Street background matrix */}
              <svg className="absolute inset-0 w-full h-full opacity-25">
                <line x1="5%" y1="0" x2="5%" y2="100%" stroke="white" strokeWidth="4" />
                <line x1="25%" y1="0" x2="25%" y2="100%" stroke="white" strokeWidth="2" />
                <line x1="60%" y1="0" x2="60%" y2="100%" stroke="white" strokeWidth="6" />
                <line x1="85%" y1="0" x2="85%" y2="100%" stroke="white" strokeWidth="3" />
                <line x1="0" y1="15%" x2="100%" y2="15%" stroke="white" strokeWidth="3" />
                <line x1="0" y1="45%" x2="100%" y2="45%" stroke="white" strokeWidth="5" />
                <line x1="0" y1="75%" x2="100%" y2="75%" stroke="white" strokeWidth="3" />
              </svg>

              {/* The Blue highlighted route line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <polyline
                  points="90,195 135,155 180,110 216,78 240,55"
                  fill="none"
                  stroke="#1565C0"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-40"
                />
                <polyline
                  points="90,195 135,155 180,110 216,78 240,55"
                  fill="none"
                  stroke="#2196F3"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
              </svg>

              {/* Start marker: User (Blue pulsating dot) */}
              <motion.div 
                className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ 
                  left: `${userCoord.x}%`, 
                  top: `${userCoord.y}%` 
                }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <span className="absolute w-full h-full rounded-full bg-blue-500/40 animate-ping" />
                  <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md relative z-10" />
                </div>
                <span className="text-[7.5px] font-black bg-blue-600 text-white py-0.5 px-1.5 rounded-md shadow mt-0.5 uppercase whitespace-nowrap">
                  CỦA BẠN (GPS)
                </span>
              </motion.div>

              {/* Target Destination Marker: Cafe Shop (Red Pulsating Cup) */}
              <div 
                className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: '80%', top: '20%' }}
              >
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <span className="absolute w-full h-full rounded-full bg-rose-500/30 animate-ping" />
                  <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-lg relative z-10">
                    <Coffee className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="bg-red-650 text-white text-[7.5px] font-black py-0.5 px-1.5 rounded shadow mt-0.5 whitespace-nowrap uppercase tracking-tighter">
                  {activeRegion.restaurant.split(' ')[0]} ☕
                </div>
              </div>

              {/* HUD Overlay with Live distance metrics */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 border border-slate-800 p-3.5 rounded-2xl flex justify-between items-center shadow-2xl">
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-slate-500 uppercase block tracking-wider">KHOẢNG CÁCH CÒN LẠI</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-white font-mono">{navDistance}m</span>
                    <span className="text-[9px] text-slate-400 font-semibold">• {navTime} giây di chuyển</span>
                  </div>
                  <span className="text-[8px] text-emerald-400 font-bold block">
                    {selectedRegion === 'danang' 
                      ? '★ Đi nhanh dọc Bạch Đằng ven sông Hàn mát mẻ' 
                      : '★ Tránh tắc đường bằng ngõ hẻm Trần Hưng Đạo'}
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-[8px] font-black text-slate-500 uppercase block tracking-wider">THỜI GIAN NHẬN CA</span>
                  <span className="text-xs font-black text-amber-500 block leading-none mt-1">18:00 (Trong 30 phút)</span>
                  <span className="text-[8px] text-slate-400 block font-semibold">Cần có mặt sớm 10 phút</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="p-4 bg-slate-950 border-t border-slate-900 space-y-3">
              <div className="flex gap-2.5">
                <button
                  id="btn-nav-call-manager"
                  onClick={() => triggerSimToast('Đang gọi Quản lý cửa hàng (0912-345-XXX)...', 'info')}
                  className="flex-1 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#00C853]" />
                  <span>Gọi quản lý</span>
                </button>
                <button
                  id="btn-nav-message"
                  onClick={() => triggerSimToast('Đang mở hội thoại chat với Highlands Coffee...', 'info')}
                  className="px-3.5 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                </button>
              </div>

              {/* Action trigger: Simulate arriving early or manual check in */}
              <button
                id="btn-nav-checkin"
                disabled={navStatus === 'moving'}
                onClick={() => {
                  setShowNavigationScreen(false);
                  setIsOnline(false);
                  triggerSimToast('Check-in thành công! Chúc bạn có ca làm việc an toàn, vui vẻ!', 'success');
                }}
                className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md ${
                  navStatus === 'arrived' 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10' 
                    : 'bg-slate-800 text-slate-500 border border-slate-750 cursor-not-allowed'
                }`}
              >
                {navStatus === 'arrived' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 animate-bounce" />
                    <span>CHECK-IN BẮT ĐẦU CA TRỰC</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                    <span>ĐANG DI CHUYỂN ĐẾN CỬA HÀNG...</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
