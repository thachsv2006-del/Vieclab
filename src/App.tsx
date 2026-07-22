/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Palette, Layers, HelpCircle, ArrowRight, ExternalLink, RefreshCw, Star, AppWindow, Coffee, Heart } from 'lucide-react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Chip } from './components/Chip';
import { Badge } from './components/Badge';
import { Card } from './components/Card';
import { BottomSheet } from './components/BottomSheet';
import { CodeGenerator } from './components/CodeGenerator';
import { MobileSimulator } from './components/MobileSimulator';
import { VIECLAB_TOKENS } from './types';

export default function App() {
  const [globalDark, setGlobalDark] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [webSheetOpen, setWebSheetOpen] = useState<boolean>(false);
  const [demoInput, setDemoInput] = useState<string>('Starbucks District 1');
  const [demoInputErr, setDemoInputErr] = useState<string>('');

  // Admin SaaS Dashboard active view & dynamic counters
  const [activeMainView, setActiveMainView] = useState<'design' | 'admin'>('admin'); // Default to admin so they see the brand new premium dashboard first
  const [systemGmv, setSystemGmv] = useState<number>(4859245100);
  const [activeChartTab, setActiveChartTab] = useState<'gmv' | 'shifts' | 'fill'>('gmv');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>('q1');
  const [desktopRadarActive, setDesktopRadarActive] = useState<boolean>(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSystemGmv(prev => prev + Math.floor(Math.random() * 115000) + 45000);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Chip playground state
  const [roles, setRoles] = useState<string[]>(['☕ Barista', '🥩 Head Chef', '🍷 Dining Server']);
  const [selectedWebChip, setSelectedWebChip] = useState<string>('☕ Barista');

  // Interactive buttons feedback state
  const [toastMessage, setToastMessage] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addCustomRole = () => {
    const defaultAddons = ['🥖 Pastry Cook', '🍕 Pizzaiolo', '🍹 Mixologist', '🧹 Steward'];
    const nextRole = defaultAddons[Math.floor(Math.random() * defaultAddons.length)];
    if (!roles.includes(nextRole)) {
      setRoles([...roles, nextRole]);
      triggerToast(`Added role chip: ${nextRole}`);
    } else {
      triggerToast('Chip already exists in playground!');
    }
  };

  const deleteRole = (roleToDelete: string) => {
    setRoles(roles.filter(r => r !== roleToDelete));
    triggerToast(`Removed role chip: ${roleToDelete}`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${globalDark ? 'bg-[#0A0E17] text-slate-100' : 'bg-[#F5F7FA] text-slate-800'}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-success animate-ping" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Grid Hero Header */}
      <header className={`border-b ${globalDark ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-200 bg-white/80'} backdrop-blur-md sticky top-0 z-40 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[16px] bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="font-black text-white text-base tracking-tighter">VL</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg tracking-tight">VIECLAB DESIGN REGISTRY</h1>
                <Badge status="primary">V1.0.0-PRO</Badge>
              </div>
              <p className={`text-xs ${globalDark ? 'text-slate-400' : 'text-slate-500'}`}>Mobile UI-Kit & Recruitment Simulator</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Master Light/Dark Mode Switcher */}
            <button
              onClick={() => setGlobalDark(!globalDark)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-xs font-semibold transition-all duration-300 border ${
                globalDark 
                  ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-white' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              {globalDark ? (
                <>
                  <span className="text-amber-500">☀️</span>
                  <span>Light Mode Workspace</span>
                </>
              ) : (
                <>
                  <span className="text-indigo-500">🌙</span>
                  <span>Dark Mode Workspace</span>
                </>
              )}
            </button>

            <a
              href="https://ai.studio/build"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold bg-primary hover:bg-primary-hover text-white rounded-[12px] shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span>Production Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Design intro banner */}
      <section className={`max-w-7xl mx-auto px-6 pt-8 pb-4`}>
        <div className={`rounded-[30px] p-8 relative overflow-hidden border ${
          globalDark 
            ? 'bg-gradient-to-br from-slate-950 to-slate-900 border-slate-800' 
            : 'bg-gradient-to-br from-white to-slate-50 border-slate-200/60 shadow-xs'
        }`}>
          <div className="absolute top-[-30px] right-[-30px] w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-[-30px] left-[-30px] w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <Palette className="w-4 h-4" />
              <span>STRICT SPECIFICATION COMPLIANCE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              A Premium, Minimalist, Tech-SaaS Mobile Foundation
            </h2>
            <p className={`text-sm leading-relaxed ${globalDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Designed specifically for VIECLAB, a micro-hiring platform matching F&B stores with gig workers in real-time. This playground compiles atomic UI elements ready for code export, coupled with a full-flow mobile-framed simulation.
            </p>

            {/* Token Badge strip */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 ${globalDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="font-semibold">Primary: {VIECLAB_TOKENS.primary}</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 ${globalDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF] border border-slate-300" />
                <span className="font-semibold">Secondary: #FFFFFF</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 ${globalDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="font-semibold">Accent: {VIECLAB_TOKENS.accent}</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 ${globalDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                <span className="font-semibold">Card Radius: 20px</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 ${globalDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                <span className="font-semibold">Button Radius: 16px</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segmented View Toggles */}
      <section className="max-w-7xl mx-auto px-6 pt-4 pb-2">
        <div className={`p-1.5 rounded-2xl flex gap-2 w-full md:w-fit border ${
          globalDark ? 'bg-slate-950/60 border-slate-850/80' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            id="view-toggle-design"
            onClick={() => {
              setActiveMainView('design');
              triggerToast('Chuyển sang Bộ Sưu Tập Thành Phần Atomic (UI Kit)');
            }}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeMainView === 'design'
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🎨 Atomic Component Playground</span>
          </button>
          
          <button
            id="view-toggle-admin"
            onClick={() => {
              setActiveMainView('admin');
              triggerToast('Chuyển sang Bảng Quản Trị Hệ Thống VIECLAB Admin SaaS');
            }}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeMainView === 'admin'
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📊 Admin SaaS Dashboard</span>
            <span className="px-1.5 py-0.5 text-[8px] rounded bg-amber-500/10 text-amber-500 font-extrabold animate-pulse">PRO</span>
          </button>
        </div>
      </section>

      {/* Main layout grid */}
      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">
        
        {/* LEFT COLUMN: DESIGN SYSTEM MANUAL & ATOMIC SHOWCASE or ADMIN SAAS DASHBOARD (7 COLS) */}
        <section className="lg:col-span-7 space-y-8">
          
          {activeMainView === 'admin' ? (
            /* ==========================================================
               PORTFOLIO COMPONENT: VIECLAB ADMIN SAAS DASHBOARD
               ========================================================== */
            <div className="space-y-6 animate-fade-in">
              {/* Dashboard Header */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    <h2 className="text-xl font-black tracking-tight text-slate-850 dark:text-white">VIECLAB Admin SaaS</h2>
                  </div>
                  <p className={`text-xs mt-1 ${globalDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Dữ liệu thời gian thực, telemetry khớp ca trực, & bản đồ nhiệt nhu cầu F&B toàn quốc.
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[9px] font-black text-emerald-500 tracking-wider uppercase shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Hệ thống trực tuyến</span>
                </div>
              </div>

              {/* KPI Data Grid (4 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. GMV Card */}
                <Card darkMode={globalDark} variant="floating" className="p-4 space-y-2.5 relative overflow-hidden group hover:border-primary/40 transition-colors">
                  <div className="absolute right-3 top-3 text-2xl opacity-15">💰</div>
                  <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase block">TỔNG LƯỢNG GMV HỆ THỐNG (LIVE)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg md:text-xl font-black text-slate-850 dark:text-white tracking-tight">
                      {systemGmv.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-xs font-black text-slate-400">₫</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                    <span>▲ +24.8%</span>
                    <span className="text-slate-400 font-medium">so với tuần trước</span>
                  </div>
                </Card>

                {/* 2. MAU/DAU Card */}
                <Card darkMode={globalDark} variant="floating" className="p-4 space-y-2.5 relative overflow-hidden group hover:border-primary/40 transition-colors">
                  <div className="absolute right-3 top-3 text-2xl opacity-15">👥</div>
                  <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase block">TELEMETRY HOẠT ĐỘNG (MAU / DAU)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg md:text-xl font-black text-slate-850 dark:text-white tracking-tight">384.150</span>
                    <span className="text-[10px] text-slate-400 font-bold">/ 42.910</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                    <span>⚡ +18.4%</span>
                    <span className="text-slate-400 font-medium">3.142 lao động đang trong ca</span>
                  </div>
                </Card>

                {/* 3. Registered Merchants */}
                <Card darkMode={globalDark} variant="floating" className="p-4 space-y-2.5 relative overflow-hidden group hover:border-primary/40 transition-colors">
                  <div className="absolute right-3 top-3 text-2xl opacity-15">🏪</div>
                  <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase block">DOANH NGHIỆP LIÊN KẾT (MERCHANTS)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg md:text-xl font-black text-slate-850 dark:text-white tracking-tight">1.429</span>
                    <span className="text-xs font-bold text-slate-400">chuỗi F&B</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                    <span>▲ +12.4%</span>
                    <span className="text-slate-400 font-medium">TCH, Highlands, Starbucks, Pizza4P...</span>
                  </div>
                </Card>

                {/* 4. Average Matching Fill Rate */}
                <Card darkMode={globalDark} variant="floating" className="p-4 space-y-2.5 relative overflow-hidden group hover:border-primary/40 transition-colors">
                  <div className="absolute right-3 top-3 text-2xl opacity-15">⚡</div>
                  <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase block">TỶ LỆ LẤP ĐẦY TRUNG BÌNH</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg md:text-xl font-black text-emerald-500 tracking-tight">96.4%</span>
                    <span className="text-[10px] text-slate-400 font-bold">khớp thành công</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                    <span>⏱ 5.2 phút</span>
                    <span className="text-slate-400 font-medium">thời gian khớp trung bình ca</span>
                  </div>
                </Card>
              </div>

              {/* Revenue tracking line/area chart (Interactive) */}
              <Card darkMode={globalDark} variant="floating" className="p-5 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-850 dark:text-white">Biểu Đồ Theo Dõi Vận Hành Hệ Thống</h3>
                    <p className={`text-[11px] mt-0.5 ${globalDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Chọn các chỉ số cốt lõi để theo dõi tốc độ tăng trưởng của VIECLAB.
                    </p>
                  </div>

                  {/* Chart Tabs (Segmented Controller) */}
                  <div className={`p-1 rounded-xl flex gap-1 border border-slate-200/50 dark:border-slate-800 ${
                    globalDark ? 'bg-slate-900/40' : 'bg-slate-50'
                  }`}>
                    {[
                      { id: 'gmv', label: 'GMV (Lương)' },
                      { id: 'shifts', label: 'Số ca khớp' },
                      { id: 'fill', label: 'Tỉ lệ lấp đầy' }
                    ].map((tab) => {
                      const isActive = activeChartTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveChartTab(tab.id as 'gmv' | 'shifts' | 'fill')}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-tight transition-all duration-200 select-none cursor-pointer ${
                            isActive
                              ? 'bg-primary text-white shadow-xs'
                              : 'text-slate-450 hover:text-slate-300'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SVG Live Rendered Line/Area Chart */}
                <div className="relative w-full h-56 pt-2 select-none">
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] font-mono font-bold text-slate-450 pr-2">
                    {activeChartTab === 'gmv' && (
                      <>
                        <span>120M đ</span>
                        <span>90M đ</span>
                        <span>60M đ</span>
                        <span>30M đ</span>
                        <span>0M đ</span>
                      </>
                    )}
                    {activeChartTab === 'shifts' && (
                      <>
                        <span>2,500 ca</span>
                        <span>1,800 ca</span>
                        <span>1,200 ca</span>
                        <span>600 ca</span>
                        <span>0 ca</span>
                      </>
                    )}
                    {activeChartTab === 'fill' && (
                      <>
                        <span>100 %</span>
                        <span>95 %</span>
                        <span>90 %</span>
                        <span>85 %</span>
                        <span>80 %</span>
                      </>
                    )}
                  </div>

                  {/* Chart Main Canvas SVG */}
                  <div className="ml-10 h-full relative">
                    <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1565C0" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#1565C0" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="chartSecondary" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid helper lines */}
                      <line x1="0" y1="10%" x2="100%" y2="10%" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3,3" />
                      <line x1="0" y1="32.5%" x2="100%" y2="32.5%" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3,3" />
                      <line x1="0" y1="55%" x2="100%" y2="55%" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3,3" />
                      <line x1="0" y1="77.5%" x2="100%" y2="77.5%" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3,3" />
                      <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(148, 163, 184, 0.15)" />

                      {/* Line paths depending on active tab */}
                      {activeChartTab === 'gmv' && (
                        <>
                          {/* Shaded Area Under Line */}
                          <path
                            d="M 0 160 Q 90 140 180 150 T 360 90 T 540 50 L 540 220 L 0 220 Z"
                            fill="url(#chartGlow)"
                            className="transition-all duration-700"
                          />
                          {/* Glowing Main Curve */}
                          <path
                            d="M 0 160 Q 90 140 180 150 T 360 90 T 540 50"
                            fill="none"
                            stroke="#1565C0"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            className="transition-all duration-700"
                          />
                          {/* Interaction Data Points */}
                          <circle cx="180" cy="150" r="5" fill="#1565C0" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer hover:scale-125 transition-transform" />
                          <circle cx="360" cy="90" r="5" fill="#1565C0" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer hover:scale-125 transition-transform" />
                          <circle cx="540" cy="50" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer hover:scale-125 transition-transform" />
                        </>
                      )}

                      {activeChartTab === 'shifts' && (
                        <>
                          <path
                            d="M 0 180 Q 90 150 180 120 T 360 110 T 540 65 L 540 220 L 0 220 Z"
                            fill="url(#chartSecondary)"
                            className="transition-all duration-700"
                          />
                          <path
                            d="M 0 180 Q 90 150 180 120 T 360 110 T 540 65"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            className="transition-all duration-700"
                          />
                          <circle cx="180" cy="120" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="360" cy="110" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="540" cy="65" r="5" fill="#1565C0" stroke="#FFFFFF" strokeWidth="2" />
                        </>
                      )}

                      {activeChartTab === 'fill' && (
                        <>
                          <path
                            d="M 0 90 Q 90 85 180 75 T 360 65 T 540 35 L 540 220 L 0 220 Z"
                            fill="url(#chartGlow)"
                            className="transition-all duration-700"
                          />
                          <path
                            d="M 0 90 Q 90 85 180 75 T 360 65 T 540 35"
                            fill="none"
                            stroke="#42A5F5"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            className="transition-all duration-700"
                          />
                          <circle cx="180" cy="75" r="5" fill="#42A5F5" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="360" cy="65" r="5" fill="#42A5F5" stroke="#FFFFFF" strokeWidth="2" />
                          <circle cx="540" cy="35" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                        </>
                      )}
                    </svg>

                    {/* Chart Tooltip Overlay Card */}
                    <div className="absolute right-4 top-2 bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 backdrop-blur-md shadow-lg text-[9px] font-mono leading-relaxed select-none pointer-events-none z-10">
                      <span className="text-emerald-400 font-black block">🎯 CHU TRÌNH PHÁT TRIỂN (HÔM NAY):</span>
                      {activeChartTab === 'gmv' && (
                        <>
                          <div className="text-slate-300 font-bold mt-1">Doanh thu đạt: 118,520,000₫</div>
                          <div className="text-slate-400 text-[8px]">Tăng 35% so với đầu tuần</div>
                        </>
                      )}
                      {activeChartTab === 'shifts' && (
                        <>
                          <div className="text-slate-300 font-bold mt-1">Số ca khớp lệnh: 2,410 ca</div>
                          <div className="text-slate-400 text-[8px]">Không hủy ca: 98.2%</div>
                        </>
                      )}
                      {activeChartTab === 'fill' && (
                        <>
                          <div className="text-slate-300 font-bold mt-1">Lấp đầy ca: 96.4%</div>
                          <div className="text-slate-400 text-[8px]">Hòa mạng: 3,142 barista/waiter</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* X Axis Weeks labels */}
                <div className="flex justify-between text-[9px] font-bold text-slate-400 ml-10 pl-2">
                  <span>Thứ 2 (06/07)</span>
                  <span>Thứ 4</span>
                  <span>Thứ 6</span>
                  <span>Hôm nay (Chủ Nhật)</span>
                </div>
              </Card>

              {/* Localized Map-based Demand Heatmap with responsive hotspots / Desktop Radar */}
              <Card darkMode={globalDark} variant="floating" className="p-5 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 dark:border-slate-800/80 pb-3 gap-2">
                  <div>
                    <h3 className="text-sm font-black text-slate-850 dark:text-white">
                      {desktopRadarActive ? "Rada Quét Ứng Viên Sẵn Sàng (Grab-like Radar)" : "Bản Đồ Nhiệt Nhu Cầu Tuyển Dụng (HCMC Hotspots)"}
                    </h3>
                    <p className={`text-[11px] mt-0.5 ${globalDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {desktopRadarActive 
                        ? "Hệ thống tự động tìm và kết nối các ứng viên F&B sẵn sàng làm việc ngay trong bán kính 2km - 5km." 
                        : "Click chọn các Quận để xem chi tiết thương hiệu F&B đang khát nhân sự và khung lương trung bình ca trực."}
                    </p>
                  </div>

                  <div className={`p-1 rounded-xl flex gap-1 border border-slate-200/50 dark:border-slate-800 ${
                    globalDark ? 'bg-slate-900/40' : 'bg-slate-50'
                  }`}>
                    <button
                      onClick={() => setDesktopRadarActive(false)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black tracking-tight transition-all duration-200 select-none cursor-pointer ${
                        !desktopRadarActive
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-slate-450 hover:text-slate-300'
                      }`}
                    >
                      Bản đồ nhiệt 🔥
                    </button>
                    <button
                      onClick={() => {
                        setDesktopRadarActive(true);
                        triggerToast('Khởi chạy Rada Tìm Ứng Viên Gần Đây trên Web Console!');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black tracking-tight transition-all duration-200 select-none cursor-pointer flex items-center gap-1 ${
                        desktopRadarActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-450 hover:text-slate-300'
                      }`}
                    >
                      <span>Rada quét 📡</span>
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                    </button>
                  </div>
                </div>

                {desktopRadarActive ? (
                  /* DESKTOP INTEGRATED CANDIDATE RADAR MODULE */
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 animate-fade-in">
                    {/* The Radar Map (Large) */}
                    <div className="md:col-span-7 relative h-72 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 bg-[#050912] p-4 flex flex-col justify-between">
                      {/* Grid abstract overlay */}
                      <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />
                      
                      {/* Moving Radar Line or concentric waves */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <span className="absolute w-44 h-44 border border-blue-500/25 rounded-full animate-radar-wave-1 opacity-20" />
                        <span className="absolute w-44 h-44 border border-blue-500/25 rounded-full animate-radar-wave-2 opacity-20" />
                      </div>

                      {/* Map street lines representation */}
                      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                        <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                        <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
                        <line x1="85%" y1="0%" x2="85%" y2="100%" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                        <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                        <line x1="0%" y1="60%" x2="100%" y2="60%" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
                        <path d="M 0 220 Q 150 180 300 240 T 600 200" fill="none" stroke="#1e3a8a" strokeWidth="20" strokeLinecap="round" className="opacity-40" />
                      </svg>

                      {/* Central pulse icon for the Merchant's restaurant location marked with Royal Blue */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="absolute w-12 h-12 rounded-full bg-[#1565C0]/40 animate-ping" />
                        <div className="w-8 h-8 rounded-full bg-[#1565C0] border-2 border-white flex items-center justify-center shadow-2xl relative z-10">
                          <Coffee className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute top-8 whitespace-nowrap bg-blue-600 text-[7px] font-bold text-white py-0.5 px-1.5 rounded">
                          TCH Pasteur 🏢
                        </div>
                      </div>

                      {/* Nearby Candidate Pins on Desktop */}
                      {[
                        { name: 'Lê Tuấn Kiệt', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', top: '25%', left: '30%', readyNow: true },
                        { name: 'Nguyễn Minh Thư', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', top: '18%', left: '72%', readyNow: true },
                        { name: 'Trần Hoàng Nam', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', top: '75%', left: '22%', readyNow: false },
                        { name: 'Phạm Thảo Vy', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80', top: '65%', left: '80%', readyNow: true },
                      ].map((cand, i) => (
                        <div 
                          key={i} 
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none"
                          style={{ top: cand.top, left: cand.left }}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cand.readyNow ? 'ring-2 ring-[#00C853] animate-pulse bg-emerald-500/25' : 'bg-slate-500/20'}`}>
                            <img src={cand.avatar} alt={cand.name} className="w-7 h-7 rounded-full object-cover border border-white" />
                          </div>
                          <span className="text-[7px] font-bold bg-slate-900/90 text-slate-200 py-0.5 px-1 rounded shadow mt-0.5 whitespace-nowrap">
                            {cand.name.split(' ').slice(-1)[0]} {cand.readyNow ? '⚡' : ''}
                          </span>
                        </div>
                      ))}

                      {/* Radar status overlay */}
                      <div className="bg-slate-900/95 border border-slate-800 p-2 rounded-xl text-[8px] font-mono leading-relaxed text-slate-300 w-fit mt-auto z-10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          <span>Rada phạm vi: 2km</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-2 h-2 rounded-full bg-[#00C853] animate-ping" />
                          <span>Sẵn sàng đi làm ngay</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop radar control / Candidate Cards panel */}
                    <div className="md:col-span-5 flex flex-col justify-between h-72">
                      <div className="space-y-3 flex-1 overflow-y-auto pr-1 scrollbar-none">
                        <div className="bg-blue-950/20 border border-blue-900/25 p-3 rounded-xl">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                              Tìm kiếm tự động
                            </span>
                            <span className="text-[9px] font-bold text-emerald-400">4 online</span>
                          </div>
                          <p className="text-[9px] text-slate-400 mt-1 leading-normal">
                            Đang tự động ping các lao động rảnh ca đạt trên 90% điểm Match trong Quận 1...
                          </p>
                        </div>

                        {/* Candidates items */}
                        <div className="space-y-2">
                          {[
                            { name: 'Lê Tuấn Kiệt', role: 'Pha chế / Barista', match: '98%', dist: '450m', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', phone: '0912 345 678' },
                            { name: 'Nguyễn Minh Thư', role: 'Phục vụ / Waitress', match: '95%', dist: '1.2km', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', phone: '0987 654 321' },
                          ].map((cand, i) => (
                            <div key={i} className={`p-2.5 rounded-xl border flex justify-between items-center gap-2 ${globalDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                              <div className="flex gap-2 items-center min-w-0">
                                <img src={cand.avatar} alt={cand.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                                <div className="min-w-0">
                                  <h4 className="text-[11px] font-black truncate text-slate-800 dark:text-white leading-none">{cand.name}</h4>
                                  <p className="text-[9px] text-slate-400 truncate mt-1 font-bold">{cand.role} • {cand.dist}</p>
                                </div>
                              </div>
                              <button 
                                onClick={() => triggerToast(`Đã gửi lời mời nhận ca tới ${cand.name}!`)}
                                className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-750 text-white font-black text-[8px] uppercase tracking-wider shrink-0 transition-colors shadow-sm"
                              >
                                Gửi lời mời ca
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => triggerToast('Đang quét và đồng bộ lại danh sách rada toàn chuỗi...')}
                        className="w-full mt-3 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Làm mới bộ lọc quét rada</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Heatmap Area Container (Map replica) */}
                  <div className="md:col-span-7 relative h-64 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 bg-slate-900/5 dark:bg-[#050911]/90 p-4 flex flex-col justify-between">
                    {/* Grid abstract overlay */}
                    <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent pointer-events-none" />
                    <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-slate-200/40 dark:bg-slate-800/30 border-dashed" />
                    <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-slate-200/40 dark:bg-slate-800/30 border-dashed" />
                    <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-slate-200/40 dark:bg-slate-800/30 border-dashed" />
                    <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-slate-200/40 dark:bg-slate-800/30 border-dashed" />
                    <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-slate-200/40 dark:bg-slate-800/30 border-dashed" />
                    <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-slate-200/40 dark:bg-slate-800/30 border-dashed" />

                    {/* Vector representation labels representing rivers and areas */}
                    <span className="absolute bottom-4 left-6 text-[10px] font-mono tracking-widest text-slate-300 dark:text-slate-600 uppercase font-black shrink-0">
                      Sông Sài Gòn ~
                    </span>

                    {/* Glowing hot points circles */}
                    {/* Hotspot 1: District 1 */}
                    <button
                      onClick={() => setSelectedHotspot('q1')}
                      className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer group"
                    >
                      <span className="absolute inline-flex h-12 w-12 rounded-full bg-rose-500/25 animate-ping" />
                      <span className="absolute inline-flex h-7 w-7 rounded-full bg-rose-500/40" />
                      <span className={`relative w-4.5 h-4.5 rounded-full bg-rose-500 border border-white flex items-center justify-center font-mono text-[9px] font-black text-white ${
                        selectedHotspot === 'q1' ? 'ring-4 ring-rose-500/30 scale-110' : ''
                      }`}>
                        Q1
                      </span>
                    </button>

                    {/* Hotspot 2: District 3 */}
                    <button
                      onClick={() => setSelectedHotspot('q3')}
                      className="absolute top-2/5 left-1/5 -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer group"
                    >
                      <span className="absolute inline-flex h-8 w-8 rounded-full bg-amber-500/20" />
                      <span className={`relative w-4.5 h-4.5 rounded-full bg-amber-500 border border-white flex items-center justify-center font-mono text-[9px] font-black text-white ${
                        selectedHotspot === 'q3' ? 'ring-4 ring-amber-500/30 scale-110' : ''
                      }`}>
                        Q3
                      </span>
                    </button>

                    {/* Hotspot 3: District 7 */}
                    <button
                      onClick={() => setSelectedHotspot('q7')}
                      className="absolute bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer group"
                    >
                      <span className="absolute inline-flex h-10 w-10 rounded-full bg-blue-500/20 animate-pulse" />
                      <span className={`relative w-4.5 h-4.5 rounded-full bg-blue-500 border border-white flex items-center justify-center font-mono text-[9px] font-black text-white ${
                        selectedHotspot === 'q7' ? 'ring-4 ring-blue-500/30 scale-110' : ''
                      }`}>
                        Q7
                      </span>
                    </button>

                    {/* Hotspot 4: Binh Thanh */}
                    <button
                      onClick={() => setSelectedHotspot('qbt')}
                      className="absolute top-1/5 right-1/4 -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer group"
                    >
                      <span className="absolute inline-flex h-8 w-8 rounded-full bg-yellow-500/20" />
                      <span className={`relative w-4.5 h-4.5 rounded-full bg-yellow-500 border border-white flex items-center justify-center font-mono text-[9px] font-black text-white ${
                        selectedHotspot === 'qbt' ? 'ring-4 ring-yellow-500/30 scale-110' : ''
                      }`}>
                        BT
                      </span>
                    </button>

                    {/* Mini map metadata overlay */}
                    <div className="flex justify-between items-end w-full z-10 pointer-events-none mt-auto">
                      <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl text-[8px] font-mono leading-relaxed text-slate-300">
                        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /><span>Rất cao (&gt; 150 ca)</span></div>
                        <div className="flex items-center gap-1 mt-0.5"><span className="w-2 h-2 rounded-full bg-amber-500" /><span>Cao (80-150 ca)</span></div>
                        <div className="flex items-center gap-1 mt-0.5"><span className="w-2 h-2 rounded-full bg-blue-500" /><span>Bình thường</span></div>
                      </div>

                      <span className="text-[10px] text-slate-450 font-black tracking-tight">HỒ CHÍ MINH, VN 🇻🇳</span>
                    </div>
                  </div>

                  {/* Hotspot details panel */}
                  <div className="md:col-span-5 flex flex-col justify-between">
                    {selectedHotspot === 'q1' && (
                      <div className="space-y-3 p-3.5 rounded-[20px] bg-rose-500/5 border border-rose-500/20 h-full flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-black text-rose-550 uppercase">📍 QUẬN 1 (TRUNG TÂM)</span>
                            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-rose-500/10 text-rose-500">QUÁ TẢI</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal font-medium">
                            Nhu cầu cao điểm ca gãy cho pha chế & phục vụ tại các tuyến phố đi bộ Nguyễn Huệ, Pasteur, Bùi Viện.
                          </p>
                          <div className="space-y-1.5 pt-1.5 text-[10px]">
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Số ca đang trực tuyến:</span><span className="font-extrabold text-slate-800 dark:text-white">182 ca</span></div>
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Mức lương TB ca trực:</span><span className="font-extrabold text-emerald-500">45.000₫ - 55.000₫/h</span></div>
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Thương hiệu khát tuyển:</span><span className="font-extrabold text-primary truncate max-w-[120px]">TCH, Highland, Starbucks</span></div>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          id="btn-hotspot-q1"
                          onClick={() => triggerToast('Đã lọc danh sách việc làm gần bạn theo khu vực Quận 1!')}
                          className="w-full text-[10px] font-black h-9.5 mt-4"
                        >
                          Lọc tin đăng Quận 1 🗺️
                        </Button>
                      </div>
                    )}

                    {selectedHotspot === 'q3' && (
                      <div className="space-y-3 p-3.5 rounded-[20px] bg-amber-500/5 border border-amber-500/20 h-full flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-black text-amber-550 uppercase">📍 QUẬN 3 (XÁC THỰC)</span>
                            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-amber-500/10 text-amber-500">KHÁ CAO</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal font-medium">
                            Tập trung nhiều văn phòng hành chính và các quán cà phê specialty. Cần tuyển gấp thu ngân & pha chế barista.
                          </p>
                          <div className="space-y-1.5 pt-1.5 text-[10px]">
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Số ca đang trực tuyến:</span><span className="font-extrabold text-slate-800 dark:text-white">94 ca</span></div>
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Mức lương TB ca trực:</span><span className="font-extrabold text-emerald-500">40.000₫ - 48.000₫/h</span></div>
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Thương hiệu khát tuyển:</span><span className="font-extrabold text-primary truncate max-w-[120px]">Phúc Long, Kat Cafe</span></div>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          id="btn-hotspot-q3"
                          onClick={() => triggerToast('Đã lọc danh sách việc làm gần bạn theo khu vực Quận 3!')}
                          className="w-full text-[10px] font-black h-9.5 mt-4"
                        >
                          Lọc tin đăng Quận 3 🗺️
                        </Button>
                      </div>
                    )}

                    {selectedHotspot === 'q7' && (
                      <div className="space-y-3 p-3.5 rounded-[20px] bg-blue-500/5 border border-blue-500/20 h-full flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-black text-blue-550 uppercase">📍 QUẬN 7 (PHÚ MỸ HƯNG)</span>
                            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-blue-500/10 text-blue-500">ỔN ĐỊNH</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal font-medium">
                            Khu đô thị văn minh, tập trung nhiều trung tâm thương mại lớn và nhà hàng buffet, lẩu nướng BBQ Hàn - Nhật.
                          </p>
                          <div className="space-y-1.5 pt-1.5 text-[10px]">
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Số ca đang trực tuyến:</span><span className="font-extrabold text-slate-800 dark:text-white">112 ca</span></div>
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Mức lương TB ca trực:</span><span className="font-extrabold text-emerald-500">38.000₫ - 45.000₫/h</span></div>
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Thương hiệu khát tuyển:</span><span className="font-extrabold text-primary truncate max-w-[120px]">Gogi, K-Pub, Pizza 4P\'s</span></div>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          id="btn-hotspot-q7"
                          onClick={() => triggerToast('Đã lọc danh sách việc làm gần bạn theo khu vực Quận 7!')}
                          className="w-full text-[10px] font-black h-9.5 mt-4"
                        >
                          Lọc tin đăng Quận 7 🗺️
                        </Button>
                      </div>
                    )}

                    {selectedHotspot === 'qbt' && (
                      <div className="space-y-3 p-3.5 rounded-[20px] bg-yellow-500/5 border border-yellow-500/20 h-full flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-black text-yellow-550 uppercase">📍 BÌNH THẠNH (HÀNG XANH)</span>
                            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-yellow-500/10 text-yellow-500">ĐANG TĂNG</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal font-medium">
                            Khu vực đông đảo sinh viên các trường HUTECH, Ngoại Thương, Giao Thông Vận Tải. Thích hợp ca tối và ca đêm.
                          </p>
                          <div className="space-y-1.5 pt-1.5 text-[10px]">
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Số ca đang trực tuyến:</span><span className="font-extrabold text-slate-800 dark:text-white">68 ca</span></div>
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Mức lương TB ca trực:</span><span className="font-extrabold text-emerald-500">35.000₫ - 42.000₫/h</span></div>
                            <div className="flex justify-between"><span className="text-slate-405 font-bold">Thương hiệu khát tuyển:</span><span className="font-extrabold text-primary truncate max-w-[120px]">Katinat, Highlands, Star Cafe</span></div>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          id="btn-hotspot-qbt"
                          onClick={() => triggerToast('Đã lọc danh sách việc làm gần bạn theo khu vực Bình Thạnh!')}
                          className="w-full text-[10px] font-black h-9.5 mt-4"
                        >
                          Lọc tin Bình Thạnh 🗺️
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              </Card>
            </div>
          ) : (
            /* ==========================================================
               ORIGINAL DESIGN SYSTEM MANUAL & ATOMIC SHOWCASE
               ========================================================== */
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-extrabold tracking-tight">Atomic Component Playground</h2>
              </div>
              <p className={`text-xs ${globalDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Click and interact with atomic UI widgets designed matching VIECLAB constraints. Active focus glows and click ripples are rendered live.
              </p>

              <div className="space-y-6">
                
                {/* 1. Buttons Playground with Ripples */}
                <Card darkMode={globalDark} variant="floating" className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-sm font-bold">1. Buttons (16px Border Radius + Click Ripples)</h3>
                      <p className={`text-[11px] ${globalDark ? 'text-slate-500' : 'text-slate-400'}`}>Click buttons below to trigger native-feeling expand ripples</p>
                    </div>
                    <button 
                      onClick={() => {
                        setBtnLoading(true);
                        setTimeout(() => setBtnLoading(false), 2000);
                      }}
                      className="flex items-center gap-1 text-[11px] font-bold text-primary hover:underline cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${btnLoading ? 'animate-spin' : ''}`} />
                      <span>Trigger Loader State</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" isLoading={btnLoading} onClick={() => triggerToast('Primary Button clicked (Ripple fired)')}>
                      Primary Action
                    </Button>
                    <Button variant="accent" isLoading={btnLoading} onClick={() => triggerToast('Accent Button clicked (Ripple fired)')}>
                      Accent Sky
                    </Button>
                    <Button variant="outline" isLoading={btnLoading} onClick={() => triggerToast('Outline Button clicked')}>
                      Outline Border
                    </Button>
                    <Button variant="success" isLoading={btnLoading} onClick={() => triggerToast('Success Action clicked')}>
                      Match Approved
                    </Button>
                    <Button variant="danger" isLoading={btnLoading} onClick={() => triggerToast('Danger Action clicked')}>
                      Cancel Shift
                    </Button>
                    <Button variant="secondary" isLoading={btnLoading} onClick={() => triggerToast('Secondary Action clicked')}>
                      Flat Custom
                    </Button>
                  </div>
                </Card>

                {/* 2. Inputs Playground with active Focus glow 2px */}
                <Card darkMode={globalDark} variant="floating" className="space-y-4">
                  <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <h3 className="text-sm font-bold">2. Inputs (12px Border Radius + Active Glow Ring)</h3>
                    <p className={`text-[11px] ${globalDark ? 'text-slate-500' : 'text-slate-400'}`}>Click inside text fields. Active focus renders a smooth 2px ring glow</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Outlet Address (Success/Default Glow)"
                      placeholder="Enter restaurant location"
                      value={demoInput}
                      onChange={(e) => {
                        setDemoInput(e.target.value);
                        if (e.target.value) setDemoInputErr('');
                      }}
                      darkMode={globalDark}
                      id="playground-input-normal"
                      helperText="Conforms to 12px border radius"
                    />

                    <Input
                      label="Minimum Hourly Wage (Simulated Error state)"
                      placeholder="e.g. 10"
                      type="number"
                      error={demoInputErr || 'Hourly wage must be at least $15/hr for elite shifts'}
                      darkMode={globalDark}
                      id="playground-input-error"
                    />
                  </div>
                </Card>

                {/* 3. Chips & Badges Playground */}
                <Card darkMode={globalDark} variant="floating" className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-sm font-bold">3. Chips (12px Shape) & Badges (Semantic Colors)</h3>
                      <p className={`text-[11px] ${globalDark ? 'text-slate-500' : 'text-slate-400'}`}>Chips act as selectors. Badges signify recruitment lifecycle stages</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={addCustomRole}>
                      Add Random Chip
                    </Button>
                  </div>

                  <div className="space-y-4.5">
                    {/* Chips section */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Interactive Chips:</span>
                      <div className="flex flex-wrap gap-2">
                        {roles.map(role => (
                          <Chip
                            key={role}
                            label={role}
                            selected={selectedWebChip === role}
                            onClick={() => {
                              setSelectedWebChip(role);
                              triggerToast(`Selected chip: ${role}`);
                            }}
                            onDelete={roles.length > 1 ? () => deleteRole(role) : undefined}
                            darkMode={globalDark}
                            id={`chip-web-${role}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Semantic badges section */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Semantic Status Badges:</span>
                      <div className="flex flex-wrap gap-2.5">
                        <Badge status="primary">Available Shift</Badge>
                        <Badge status="warning">Applied (Pending)</Badge>
                        <Badge status="success">Match Confirmed (#00C853)</Badge>
                        <Badge status="error">Shift Cancelled (#E53935)</Badge>
                        <Badge status="neutral">Draft Posting</Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 4. Bottom Sheets Showcase */}
                <Card darkMode={globalDark} variant="floating" className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-sm font-bold">4. Bottom Sheets (Slide-up drawer animation)</h3>
                      <p className={`text-[11px] ${globalDark ? 'text-slate-500' : 'text-slate-400'}`}>Slides gracefully from the bottom viewport utilizing spring animations</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="primary" onClick={() => setWebSheetOpen(true)}>
                      <AppWindow className="w-4 h-4" />
                      Open Web Bottom Sheet Demo
                    </Button>
                    <p className={`text-xs ${globalDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Animates with physics spring. Press Esc or backdrop to dismiss.
                    </p>
                  </div>
                </Card>

              </div>
              
              {/* Radius & Elevation Standards info block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Card darkMode={globalDark} variant="outline" className="p-4.5 space-y-3">
                  <span className="text-xs font-black text-primary uppercase tracking-widest">60-30-10 Layout Rules</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">Secondary/Dominant (60%):</span>
                      <span className="font-semibold">White/Slate (Light) / #0A0E17 (Dark)</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">Primary Core (30%):</span>
                      <span className="font-semibold text-primary">Royal Blue #1565C0</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">Accent Sky (10%):</span>
                      <span className="font-semibold text-accent">Sky Blue #42A5F5</span>
                    </div>
                  </div>
                </Card>

                <Card darkMode={globalDark} variant="outline" className="p-4.5 space-y-3">
                  <span className="text-xs font-black text-accent uppercase tracking-widest">Radius & Elevation Standards</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">Card Radii:</span>
                      <span className="font-semibold">20px (rounded-[20px])</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">Button Radii:</span>
                      <span className="font-semibold">16px (rounded-[16px])</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">Input/Chip Radii:</span>
                      <span className="font-semibold">12px (rounded-[12px])</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

        </section>

        {/* RIGHT COLUMN: RECRUITMENT SIMULATOR & CODE EXPORT (5 COLS) */}
        <section className="lg:col-span-5 space-y-8">
          
          {/* Mobile Simulator Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-extrabold tracking-tight">Recruitment Simulator</h2>
              </div>
            </div>
            
            <p className={`text-xs ${globalDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Interactive smartphone replica showing how atomic elements are composed. Add a shift in Owner mode, then apply for it in Worker mode!
            </p>

            <MobileSimulator />
          </div>

          {/* Multiplatform Code Generator */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold tracking-tight">Code Export Studio</h2>
            <p className={`text-xs ${globalDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Copy the compliant design tokens or complete code for atomic buttons, inputs, and bottom sheets for your web or native projects.
            </p>
            <CodeGenerator />
          </div>

        </section>

      </main>

      {/* Footer credits and information */}
      <footer className={`border-t py-12 ${globalDark ? 'border-slate-900 bg-slate-950/60' : 'border-slate-100 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs">V</div>
            <span className="text-sm font-bold tracking-tight text-primary">VIECLAB MOBILE RECRUITMENT FOUNDATION</span>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1">
            Built with
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            using React, Tailwind CSS, & Motion. Validated for Applet Compilation.
          </p>
        </div>
      </footer>

      {/* Web Layout Bottom Sheet Demo wrapper */}
      <BottomSheet
        isOpen={webSheetOpen}
        onClose={() => setWebSheetOpen(false)}
        title="Web Atomic Bottom Sheet Showcase"
        darkMode={globalDark}
      >
        <div className="space-y-4">
          <div className="flex gap-2.5 items-center">
            <div className="p-3.5 bg-primary/10 text-primary rounded-2xl text-2xl">☕</div>
            <div>
              <h4 className="font-extrabold text-base">District 1 Cafe Barista Openings</h4>
              <p className="text-xs text-slate-500">Starbucks Vietnam - Saigon Center</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            This is a full desktop-sized showcase of our atomic Bottom Sheet. It implements standard spring physics transitions and disables background scrolling immediately upon mounting.
          </p>

          <div className="bg-primary-light/10 p-4 rounded-2xl border border-primary/10 space-y-2 text-xs">
            <div className="flex justify-between font-bold">
              <span>Hourly wage:</span>
              <span className="text-primary">$28/hr</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Shift:</span>
              <span>18:00 - 22:00 (4 hours)</span>
            </div>
            <div className="flex justify-between font-bold text-success">
              <span>Total earnings:</span>
              <span>$112 (Paid instantly)</span>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            <Button variant="outline" className="flex-1" onClick={() => setWebSheetOpen(false)}>
              Close Demo
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => {
              setWebSheetOpen(false);
              triggerToast('Successfully applied to Web Cafe shift!');
            }}>
              Quick Match Apply
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

