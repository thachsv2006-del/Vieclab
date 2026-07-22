import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Navigation, MapPin, Check, Send, Sparkles, RefreshCw, Phone, Star, Award, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RadarCandidate {
  id: string;
  name: string;
  avatar: string;
  distance: string;
  matchScore: string;
  role: string;
  readyNow: boolean;
  coords: { x: number; y: number }; // relative position to center (0,0) in pixels
  phone: string;
  rating: string;
  experience: string;
}

const RADAR_CANDIDATES: RadarCandidate[] = [
  {
    id: 'rc-1',
    name: 'Lê Tuấn Kiệt',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    distance: 'Cách 450m',
    matchScore: '98%',
    role: 'Pha chế / Barista',
    readyNow: true,
    coords: { x: -60, y: -70 },
    phone: '0912 345 678',
    rating: '4.9',
    experience: '2 năm • Highlands Coffee'
  },
  {
    id: 'rc-2',
    name: 'Nguyễn Minh Thư',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    distance: 'Cách 1.2km',
    matchScore: '95%',
    role: 'Phục vụ / Waitress',
    readyNow: true,
    coords: { x: 100, y: -50 },
    phone: '0987 654 321',
    rating: '4.8',
    experience: '1 năm • Pizza 4Ps'
  },
  {
    id: 'rc-3',
    name: 'Trần Hoàng Nam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    distance: 'Cách 2.5km',
    matchScore: '92%',
    role: 'Thu ngân / Cashier',
    readyNow: false,
    coords: { x: -110, y: 80 },
    phone: '0901 234 567',
    rating: '4.7',
    experience: '1.5 năm • Katinat'
  },
  {
    id: 'rc-4',
    name: 'Phạm Thảo Vy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    distance: 'Cách 3.8km',
    matchScore: '89%',
    role: 'Pha chế / Barista',
    readyNow: true,
    coords: { x: 120, y: 90 },
    phone: '0934 567 890',
    rating: '4.6',
    experience: '6 tháng • Phúc Long'
  },
  {
    id: 'rc-5',
    name: 'Vũ Đức Huy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    distance: 'Cách 4.8km',
    matchScore: '94%',
    role: 'Phụ bếp / Commis Chef',
    readyNow: false,
    coords: { x: 20, y: 130 },
    phone: '0976 543 210',
    rating: '4.8',
    experience: '1.5 năm • The Coffee House'
  }
];

interface InstantNearbyCandidateRadarProps {
  simDarkMode: boolean;
  onBack: () => void;
  triggerSimToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const InstantNearbyCandidateRadar: React.FC<InstantNearbyCandidateRadarProps> = ({
  simDarkMode,
  onBack,
  triggerSimToast
}) => {
  // Map control state
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  
  // Searching & Phase Management
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  
  // Interactions & selection
  const [selectedCandidate, setSelectedCandidate] = useState<RadarCandidate | null>(null);
  const [invitedStates, setInvitedStates] = useState<{[key: string]: 'idle' | 'sending' | 'sent'}>({});
  
  // Map dimensions
  const containerRef = useRef<HTMLDivElement>(null);
  const mapCenter = { x: 175, y: 220 }; // Adjusted to center visually in phone frame

  // Auto scanning countdown simulation
  useEffect(() => {
    if (isScanning) {
      setScanProgress(0);
      setFoundCount(0);
      setSelectedCandidate(null);
      
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            // Auto focus on first candidate
            setSelectedCandidate(RADAR_CANDIDATES[0]);
            panToCoords(RADAR_CANDIDATES[0].coords);
            return 100;
          }
          const next = prev + 4;
          
          // Ticking count of found candidates based on progress
          if (next >= 15 && next < 40) setFoundCount(1);
          else if (next >= 40 && next < 65) setFoundCount(2);
          else if (next >= 65 && next < 80) setFoundCount(3);
          else if (next >= 80 && next < 95) setFoundCount(4);
          else if (next >= 95) setFoundCount(5);
          
          return next;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const panToCoords = (coords: { x: number; y: number }) => {
    // Center the map on specified offset coords relative to the restaurant center
    setMapOffset({
      x: -coords.x,
      y: -coords.y
    });
  };

  // Drag handlers for the map panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMapOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.touches[0].clientX - mapOffset.x, y: e.touches[0].clientY - mapOffset.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length === 1) {
      setMapOffset({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y
      });
    }
  };

  // Trigger shifting invitation state
  const handleSendInvitation = (candidate: RadarCandidate, e: React.MouseEvent) => {
    e.stopPropagation();
    const id = candidate.id;
    if (invitedStates[id] === 'sending' || invitedStates[id] === 'sent') return;
    
    setInvitedStates(prev => ({ ...prev, [id]: 'sending' }));
    
    setTimeout(() => {
      setInvitedStates(prev => ({ ...prev, [id]: 'sent' }));
      triggerSimToast(`Gửi lời mời nhận ca thành công tới ${candidate.name}!`, 'success');
    }, 1500);
  };

  const handleRecenter = () => {
    setMapOffset({ x: 0, y: 0 });
    setSelectedCandidate(null);
    triggerSimToast('Đã định vị lại về Nhà hàng của bạn', 'info');
  };

  const activeCandidates = isScanning 
    ? RADAR_CANDIDATES.slice(0, foundCount) 
    : RADAR_CANDIDATES;

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden select-none" id="radar-module-container">
      {/* Dynamic Keyframe Animations */}
      <style>{`
        @keyframes radar-expanding-wave {
          0% {
            transform: scale(0.1);
            opacity: 0.9;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(4.0);
            opacity: 0;
          }
        }
        @keyframes green-glow-ring {
          0%, 100% {
            box-shadow: 0 0 4px #00C853, 0 0 0 2px rgba(0, 200, 83, 0.2);
          }
          50% {
            box-shadow: 0 0 12px #00C853, 0 0 0 6px rgba(0, 200, 83, 0.4);
          }
        }
        @keyframes anchor-pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(21, 101, 192, 0.5);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 12px rgba(21, 101, 192, 0);
          }
        }
        .animate-radar-wave-1 {
          animation: radar-expanding-wave 3s infinite linear;
        }
        .animate-radar-wave-2 {
          animation: radar-expanding-wave 3s infinite linear;
          animation-delay: 1.5s;
        }
        .glowing-green-ring {
          animation: green-glow-ring 2s infinite ease-in-out;
        }
        .merchant-pulse-anchor {
          animation: anchor-pulse-glow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Header Panel */}
      <div className={`sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b transition-colors duration-300 ${
        simDarkMode ? 'border-slate-900 bg-[#0A0E17]/95 text-white' : 'border-slate-150 bg-white/95 text-slate-800'
      } backdrop-blur-md`}>
        <button
          onClick={onBack}
          className={`p-1.5 rounded-xl border transition-all active:scale-95 flex items-center justify-center ${
            simDarkMode ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
          id="radar-back-button"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </button>

        <div className="text-center">
          <span className="text-[8px] font-black tracking-widest text-blue-500 uppercase block">Rada định vị</span>
          <h2 className="text-xs font-black tracking-tight leading-none mt-0.5">Tìm Ứng Viên Tức Thì</h2>
        </div>

        <button
          onClick={() => setIsScanning(true)}
          disabled={isScanning}
          className={`p-1.5 rounded-xl border transition-all active:scale-95 flex items-center justify-center ${
            isScanning ? 'opacity-40' : ''
          } ${
            simDarkMode ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
          title="Quét lại"
          id="radar-refresh-button"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Interactive Map Canvas Wrapper */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className={`flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden select-none transition-colors duration-500 ${
          simDarkMode ? 'bg-[#060913]' : 'bg-[#EBF1F6]'
        }`}
        id="radar-map-canvas"
      >
        {/* Dynamic Styled Vector Map Graphics */}
        <div 
          className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mapOffset.x}px, ${mapOffset.y}px)`,
            transformOrigin: 'center center'
          }}
        >
          {/* Base Vector Streets and River SVG Overlay */}
          <svg className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70">
            {/* Soft Grid Lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={simDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#grid)" />

            {/* Custom Scenic Elements (Saigon River Representation) */}
            <path 
              d="M -300 250 Q -100 200 100 350 T 500 280 T 800 400" 
              fill="none" 
              stroke={simDarkMode ? '#1e293b' : '#cbd5e1'} 
              strokeWidth="50" 
              strokeLinecap="round" 
              className="opacity-40"
            />
            <path 
              d="M -300 250 Q -100 200 100 350 T 500 280 T 800 400" 
              fill="none" 
              stroke={simDarkMode ? '#0369a1' : '#93c5fd'} 
              strokeWidth="38" 
              strokeLinecap="round" 
              className="opacity-60"
            />

            {/* Parks / Green Spaces */}
            <rect x="-180" y="-120" width="120" height="80" rx="16" fill={simDarkMode ? '#064e3b' : '#bbf7d0'} className="opacity-30" />
            <rect x="180" y="50" width="100" height="120" rx="16" fill={simDarkMode ? '#064e3b' : '#bbf7d0'} className="opacity-30" />
            <rect x="-220" y="140" width="140" height="100" rx="16" fill={simDarkMode ? '#064e3b' : '#bbf7d0'} className="opacity-25" />

            {/* Custom Street Grid Paths */}
            {/* Vertical major roads */}
            <line x1="-200" y1="-400" x2="-200" y2="400" stroke={simDarkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="16" strokeLinecap="round" />
            <line x1="0" y1="-400" x2="0" y2="400" stroke={simDarkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="22" strokeLinecap="round" />
            <line x1="200" y1="-400" x2="200" y2="400" stroke={simDarkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="16" strokeLinecap="round" />

            {/* Horizontal major roads */}
            <line x1="-400" y1="-200" x2="400" y2="-200" stroke={simDarkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="16" strokeLinecap="round" />
            <line x1="-400" y1="0" x2="400" y2="0" stroke={simDarkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="22" strokeLinecap="round" />
            <line x1="-400" y1="200" x2="400" y2="200" stroke={simDarkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="16" strokeLinecap="round" />

            {/* Minor streets / lanes details */}
            <line x1="-100" y1="-300" x2="300" y2="-300" stroke={simDarkMode ? '#0f172a' : '#f1f5f9'} strokeWidth="6" strokeLinecap="round" />
            <line x1="-300" y1="100" x2="100" y2="100" stroke={simDarkMode ? '#0f172a' : '#f1f5f9'} strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="-100" x2="100" y2="300" stroke={simDarkMode ? '#0f172a' : '#f1f5f9'} strokeWidth="6" strokeLinecap="round" />
            <line x1="-100" y1="-100" x2="-100" y2="300" stroke={simDarkMode ? '#0f172a' : '#f1f5f9'} strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        {/* Dynamic Panning Components Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mapOffset.x}px, ${mapOffset.y}px)`,
            width: '100%',
            height: '100%'
          }}
        >
          {/* BACKGROUND RADAR EFFECT circular waves expanding from center */}
          <div 
            className="absolute"
            style={{ 
              left: `${mapCenter.x}px`, 
              top: `${mapCenter.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Multiple expanding wave concentric rings */}
            <div className="absolute w-64 h-64 border-2 border-[#42A5F5]/30 rounded-full animate-radar-wave-1 pointer-events-none" style={{ backgroundColor: 'rgba(66, 165, 245, 0.05)' }} />
            <div className="absolute w-64 h-64 border-2 border-[#42A5F5]/30 rounded-full animate-radar-wave-2 pointer-events-none" style={{ backgroundColor: 'rgba(66, 165, 245, 0.05)' }} />
          </div>

          {/* MERCHANT RESTAURANT CENTER ANCHOR */}
          <div 
            className="absolute pointer-events-auto"
            style={{ 
              left: `${mapCenter.x}px`, 
              top: `${mapCenter.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Royal Blue Pulsing Center Icon */}
            <div className="relative flex items-center justify-center w-12 h-12">
              <span className="absolute w-10 h-10 rounded-full bg-[#1565C0]/30 merchant-pulse-anchor" />
              <div className="w-6 h-6 rounded-full bg-[#1565C0] border-2 border-white flex items-center justify-center shadow-lg relative z-10">
                <MapPin className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <div className="absolute top-10 whitespace-nowrap bg-slate-900/90 text-[7px] font-black text-white py-0.5 px-1.5 rounded border border-slate-800">
                📍 CỬA HÀNG CỦA BẠN
              </div>
            </div>
          </div>

          {/* DYNAMIC CANDIDATE PINS */}
          {activeCandidates.map((cand) => {
            const isSelected = selectedCandidate?.id === cand.id;
            return (
              <div
                key={cand.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCandidate(cand);
                  panToCoords(cand.coords);
                  triggerSimToast(`Đã định vị đến hồ sơ: ${cand.name}`, 'info');
                }}
                className="absolute pointer-events-auto cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 active:scale-90"
                style={{ 
                  left: `${mapCenter.x + cand.coords.x}px`, 
                  top: `${mapCenter.y + cand.coords.y}px`,
                  zIndex: isSelected ? 20 : 10
                }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Glowing Green Outer ring if candidate is "Sẵn sàng đi làm ngay" */}
                  <div className={`
                    w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
                    ${cand.readyNow ? 'glowing-green-ring bg-emerald-500/20' : 'bg-slate-500/20'}
                    ${isSelected ? 'ring-4 ring-blue-500 bg-blue-500/30 scale-115' : 'scale-100'}
                  `}>
                    <img 
                      src={cand.avatar} 
                      referrerPolicy="no-referrer"
                      alt={cand.name} 
                      className={`w-8 h-8 rounded-full object-cover border-2 ${
                        cand.readyNow ? 'border-[#00C853]' : 'border-slate-300'
                      }`}
                    />
                  </div>

                  {/* Tiny Name badge beneath */}
                  <div className={`mt-1 px-1.5 py-0.5 text-[7px] font-bold rounded shadow-md whitespace-nowrap ${
                    isSelected 
                      ? 'bg-blue-600 text-white border border-blue-400' 
                      : 'bg-slate-900/80 text-slate-200 border border-slate-800'
                  }`}>
                    {cand.name.split(' ').slice(-1)[0]}
                  </div>

                  {/* Green dot active indicator */}
                  {cand.readyNow && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00C853] border border-white rounded-full" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Map UI overlays: Recenter button */}
        <button
          onClick={handleRecenter}
          className={`absolute bottom-6 right-4 z-20 p-2.5 rounded-full shadow-lg border transition-all active:scale-90 ${
            simDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200 text-slate-850'
          }`}
          title="Định vị về cửa hàng"
          id="radar-recenter-btn"
        >
          <Navigation className="w-4.5 h-4.5 text-blue-500 fill-blue-500" />
        </button>

        {/* Zoom controls / static scale */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
          <div className="bg-slate-900/85 backdrop-blur-md border border-slate-800 text-[8px] text-slate-300 font-mono py-1 px-2 rounded-lg flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Phạm vi: 2km - 5km</span>
          </div>
          {selectedCandidate && (
            <button 
              onClick={() => setSelectedCandidate(null)}
              className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-[8px] text-rose-400 font-bold py-1 px-2 rounded-lg text-left"
            >
              × Hủy chọn ứng viên
            </button>
          )}
        </div>
      </div>

      {/* Floating Radar Bottom Sheet Panel with Top Corner Radius: 24px */}
      <div 
        className={`w-full rounded-t-[24px] border-t px-4 pb-4 pt-4 shadow-2xl relative z-40 transition-colors duration-300 ${
          simDarkMode ? 'bg-[#0E1321] border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-800'
        }`}
        style={{ minHeight: '230px' }}
        id="radar-bottom-sheet-panel"
      >
        {/* Drag handle line mimic */}
        <div className="w-12 h-1 bg-slate-500/30 rounded-full mx-auto mb-3" />

        {/* Dynamic header / Scanner Loading text with shimmer */}
        {isScanning ? (
          <div className="space-y-3.5 px-1 pb-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                Đang quét ứng viên sẵn sàng...
              </span>
              <span className="text-[10px] font-mono font-black text-slate-400">
                {scanProgress}%
              </span>
            </div>

            {/* Shimmer loading progress bar */}
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 rounded-full transition-all duration-100"
                style={{ 
                  width: `${scanProgress}%`,
                  backgroundImage: 'linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(56,189,248,1) 50%, rgba(37,99,235,1) 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite linear'
                }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold pt-0.5">
              <span>Bán kính hiện tại: 2.0km</span>
              <span className="text-emerald-500 animate-pulse">Tìm thấy: {foundCount} ứng viên</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Static Success header once scanner completes */}
            <div className="flex justify-between items-center px-1">
              <div>
                <h3 className="text-xs font-black tracking-tight flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                  <span>Kết quả Quét Radar (2km - 5km)</span>
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5 font-bold">
                  Tìm thấy <strong className="text-emerald-500">{RADAR_CANDIDATES.filter(c => c.readyNow).length} ứng viên</strong> sẵn sàng nhận ca lập tức
                </p>
              </div>
              
              <span className="px-2 py-0.5 text-[8.5px] font-black rounded-md bg-blue-500/10 text-blue-400 shrink-0 uppercase tracking-wider animate-pulse">
                🔴 Trực Tuyến
              </span>
            </div>

            {/* Candidate Quick-View Cards (Horizontal Carousel) */}
            <div className="flex gap-3 overflow-x-auto pb-1 px-0.5 scrollbar-none snap-x" id="radar-candidate-carousel">
              {RADAR_CANDIDATES.map((cand) => {
                const isFocused = selectedCandidate?.id === cand.id;
                const invState = invitedStates[cand.id] || 'idle';
                
                return (
                  <div
                    key={cand.id}
                    onClick={() => {
                      setSelectedCandidate(cand);
                      panToCoords(cand.coords);
                    }}
                    className={`
                      flex-shrink-0 w-[240px] rounded-2xl border p-3 flex flex-col justify-between gap-2.5 snap-center transition-all duration-300 cursor-pointer
                      ${isFocused 
                        ? 'border-blue-500 bg-blue-500/5 ring-2 ring-blue-500/20 shadow-lg scale-[1.02] -translate-y-0.5' 
                        : simDarkMode ? 'bg-slate-900/60 border-slate-850 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}
                    `}
                  >
                    {/* Header: Profile image & basic info */}
                    <div className="flex gap-2.5 items-start">
                      <div className="relative shrink-0">
                        <img 
                          src={cand.avatar} 
                          referrerPolicy="no-referrer"
                          alt={cand.name} 
                          className={`w-9 h-9 rounded-full object-cover border-2 ${
                            cand.readyNow ? 'border-emerald-500 glowing-green-ring' : 'border-slate-300'
                          }`}
                        />
                        {cand.readyNow && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full" />
                        )}
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center gap-1">
                          <h4 className="text-xs font-black truncate leading-none text-slate-850 dark:text-white">{cand.name}</h4>
                          <span className="text-[8px] font-black text-blue-400 shrink-0 bg-blue-500/10 px-1.5 py-0.5 rounded">
                            {cand.matchScore} Match
                          </span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 truncate font-bold leading-none">{cand.role}</p>
                        <p className="text-[8px] text-slate-500 mt-1 flex items-center gap-1 font-semibold">
                          <span>{cand.distance}</span>
                          <span>•</span>
                          <span className="text-amber-500 flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-amber-500 stroke-none" /> {cand.rating}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Brief candidate stats */}
                    <div className="bg-slate-900/40 dark:bg-slate-950/40 rounded-xl p-2 flex justify-between text-[8px] font-mono">
                      <span className="text-slate-400 font-bold">{cand.experience}</span>
                      {cand.readyNow ? (
                        <span className="text-emerald-500 font-extrabold uppercase tracking-widest">Sẵn sàng ngay ⚡</span>
                      ) : (
                        <span className="text-slate-500 font-semibold uppercase">Đang rảnh</span>
                      )}
                    </div>

                    {/* Urgent primary action button: "Gửi Lời Mời Nhận Ca" */}
                    <button
                      onClick={(e) => handleSendInvitation(cand, e)}
                      disabled={invState === 'sending' || invState === 'sent'}
                      className={`
                        w-full h-8 rounded-xl text-[9.5px] font-black tracking-tight transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 relative overflow-hidden
                        ${invState === 'sent' 
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/10' 
                          : invState === 'sending'
                          ? 'bg-blue-600/30 text-blue-400 border border-blue-500/25'
                          : 'bg-blue-600 hover:bg-blue-750 text-white shadow-md shadow-blue-600/10'}
                      `}
                    >
                      {invState === 'sending' && (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Đang gửi lời mời...</span>
                        </>
                      )}
                      {invState === 'sent' && (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3px]" />
                          <span>Đã gửi lời mời ca ✓</span>
                        </>
                      )}
                      {invState === 'idle' && (
                        <>
                          <Send className="w-3 h-3 text-white/90" />
                          <span>Gửi Lời Mời Nhận Ca</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
