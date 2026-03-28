"use client";

import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { UserCheck, Users, UtensilsCrossed, Bell, AlertTriangle } from "lucide-react";

interface GarzonProps {
  theme?: "light" | "dark";
}

export const GarzonComposition: React.FC<GarzonProps> = ({ theme = "light" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isDark = theme === "dark";

  const tables = [
    { id: "1", people: 4, label: "Servido", color: "text-green-500", bg: "bg-green-500/10" },
    { id: "3", people: 2, label: "En proceso", color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: "5", people: 6, label: "Pedido Listo", color: "text-red-500", bg: "bg-red-500/10" },
    { id: "8", people: 3, label: "Servido", color: "text-green-500", bg: "bg-green-500/10" }
  ];

  // Notification (0-30 entrance, 240-270 exit)
  const notificationY = spring({
    frame,
    fps,
    config: { damping: 15 },
  }) - spring({
    frame: frame - 240,
    fps,
  });

  // Table 3 change (100-150)
  const table3Change = spring({
    frame: frame - 100,
    fps,
  });

  return (
    <AbsoluteFill className={isDark ? "bg-zinc-900" : "bg-slate-50"}>
      <div className="flex flex-col h-full p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <UserCheck className="text-[#7B5EA7]" size={40} />
            <h1 className={`text-4xl font-bold font-heading uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Panel Garzón
            </h1>
          </div>
          <div className="text-xs font-black bg-gray-200 dark:bg-zinc-800 px-4 py-2 rounded-full text-gray-500 tracking-widest">
            MESERO: JUAN P.
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 flex flex-col gap-6 relative">
          
          {/* Active Notification Overlay */}
          <div 
            className="absolute top-0 left-0 right-0 z-50 p-6 rounded-3xl border-2 border-amber-200 dark:border-amber-900/50 flex items-center justify-between shadow-2xl"
            style={{ 
              backgroundColor: isDark ? "rgba(251, 191, 36, 0.1)" : "#FFFBEB",
              transform: `translateY(${interpolate(notificationY, [0, 1], [-200, 0])}px)`,
              opacity: notificationY
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                <Bell className="text-amber-600 animate-bounce" size={24} />
              </div>
              <div>
                <p className="text-lg font-bold text-amber-900 dark:text-amber-100">Mesa 7 solicita atención</p>
                <p className="text-sm text-amber-700 dark:text-amber-300 font-medium tracking-tight uppercase font-black">Prioridad Alta</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <span className="text-amber-700 font-bold font-mono">2m ago</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-24">
            {tables.map((table, i) => {
              const appear = spring({
                frame: frame - (i * 10),
                fps,
              });

              // Special logic for table 3 status change
              const isTable3 = table.id === "3";
              const currentStatus = isTable3 && table3Change > 0.5 ? "Pedido Listo" : table.label;
              const currentColor = isTable3 && table3Change > 0.5 ? "text-red-500" : table.color;
              const currentBg = isTable3 && table3Change > 0.5 ? "bg-red-500/10" : table.bg;

              return (
                <div 
                  key={table.id}
                  className={`p-6 rounded-3xl border ${isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"} flex items-center justify-between shadow-sm`}
                  style={{
                    opacity: appear,
                    transform: `translateX(${interpolate(appear, [0, 1], [-20, 0])}px)`
                  }}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-zinc-700 flex items-center justify-center font-black text-3xl text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-600">
                      {table.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="text-gray-400" size={16} />
                        <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{table.people} personas</span>
                      </div>
                      <div className={`inline-flex items-center px-4 py-1 rounded-full ${currentBg} ${currentColor} text-[10px] font-black uppercase tracking-wider`}>
                        {currentStatus}
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${isDark ? "bg-zinc-700 border-zinc-600" : "bg-gray-50 border-gray-100"}`}>
                    <UtensilsCrossed className={isDark ? "text-white" : "text-gray-900"} size={20} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
