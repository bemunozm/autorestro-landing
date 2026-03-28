"use client";

import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { TrendingUp, DollarSign, ShoppingBag, Clock, Bell } from "lucide-react";

interface AnalyticsProps {
  theme?: "light" | "dark";
}

export const AnalyticsComposition: React.FC<AnalyticsProps> = ({ theme = "light" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isDark = theme === "dark";

  const stats = [
    { label: "Ventas Hoy", target: 450200, prefix: "$", icon: DollarSign, color: "text-green-600" },
    { label: "Pedidos", target: 86, prefix: "", icon: ShoppingBag, color: "text-blue-600" },
    { label: "Tiempo Prom.", target: 14, prefix: "", suffix: " min", icon: Clock, color: "text-purple-600" },
    { label: "Nuevas Alertas", target: 3, prefix: "", icon: Bell, color: "text-amber-600" }
  ];

  const barHeights = [40, 70, 45, 90, 65, 80, 55];

  return (
    <AbsoluteFill className={isDark ? "bg-zinc-950" : "bg-slate-50"}>
      <div className="flex flex-col h-full p-10">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-3xl bg-[#7B5EA7]/10 flex items-center justify-center">
            <TrendingUp className="text-[#7B5EA7]" size={40} />
          </div>
          <div>
            <h1 className={`text-4xl font-bold dark:text-white ${isDark ? "text-white" : "text-gray-900"}`}>Panel de Control</h1>
            <p className="text-xl text-gray-500">Métricas en tiempo real</p>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => {
            const progress = spring({
              frame: frame - (i * 10),
              fps,
              durationInFrames: 60,
            });
            const value = Math.floor(interpolate(progress, [0, 1], [0, stat.target]));
            
            return (
              <div key={i} className={`p-6 rounded-3xl border ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} shadow-sm`}>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase font-black text-gray-400 tracking-wider">{stat.label}</span>
                  <stat.icon className={`${stat.color}`} size={24} />
                </div>
                <div className={`text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                  {stat.prefix}{value.toLocaleString()}{stat.suffix}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Area */}
        <div className={`flex-1 rounded-3xl p-10 border ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"} shadow-sm flex flex-col`}>
          <div className="flex justify-between items-center mb-10">
            <div className={`h-6 w-64 rounded-full ${isDark ? "bg-zinc-800" : "bg-gray-100"}`} />
            <div className={`h-10 w-32 rounded-xl ${isDark ? "bg-zinc-800" : "bg-gray-50"}`} />
          </div>
          
          <div className="flex-1 flex flex-col justify-end gap-6 relative">
            {/* Bars */}
            <div className="flex items-end gap-6 h-full px-4">
              {barHeights.map((h, i) => {
                const barProgress = spring({
                  frame: frame - (i * 10 + 60),
                  fps,
                  durationInFrames: 30,
                });
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4">
                    <div 
                      className="w-full bg-[#7B5EA7]/20 rounded-t-xl relative overflow-hidden"
                      style={{ height: `${h * barProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-[#7B5EA7]" style={{ opacity: 0.8 }} />
                    </div>
                    <span className="text-sm font-black text-gray-400">
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Simulated Trend Line (Drawn progressively) */}
            <svg 
              className="absolute inset-0 pointer-events-none" 
              viewBox="0 0 1000 400" 
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <path
                d="M 50 300 Q 200 100 350 250 T 650 150 T 950 50"
                fill="none"
                stroke="#D4A017"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="2000"
                strokeDashoffset={interpolate(frame, [100, 200], [2000, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}
              />
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
