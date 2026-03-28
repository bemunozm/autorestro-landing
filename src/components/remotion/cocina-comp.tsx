"use client";

import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence, Easing } from "remotion";
import { Clock, MessageCircle, AlertTriangle } from "lucide-react";

interface CocinaProps {
  theme?: "light" | "dark";
}

const ITEMS = [
  { id: 1, mesa: "Mesa 4", product: "Pizza Pepperoni", qty: 2, timer: "04:12", comment: "Sin cebolla", status: "pendiente" },
  { id: 2, mesa: "Mesa 7", product: "Hamburguesa Doble", qty: 1, timer: "12:45", comment: null, status: "pendiente" },
  { id: 3, mesa: "Delivery #12", product: "Ensalada César", qty: 3, timer: "08:20", comment: "Sin crotones", status: "pendiente" },
  { id: 4, mesa: "Mesa 2", product: "Pasta Alfredo", qty: 1, timer: "15:30", comment: null, status: "pendiente" },
];

export const CocinaComposition: React.FC<CocinaProps> = ({ theme = "light" }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const colors = {
    yellow: "#EAB308",
    blue: "#3B82F6",
    green: "#22C55E",
    red: "#EF4444",
    purple: "#7B5EA7",
    charcoal: "#1A1A1A",
    offWhite: "#FAFAFA",
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? colors.charcoal : colors.offWhite;
  const textColor = isDark ? colors.offWhite : colors.charcoal;
  const cardBg = isDark ? "#2A2A2A" : "white";
  const borderColor = isDark ? "#3A3A3A" : "#EEEEEE";

  // Animation Timings
  const headerAppear = spring({ frame, fps });
  
  // Logic for item movement (Item 1 moves from Pending -> Prep -> Ready)
  const item1ToPrepFrame = 90;
  const item1ToReadyFrame = 190;
  const item2ToPrepFrame = 140;

  const item1Progress = spring({
    frame: frame - item1ToPrepFrame,
    fps,
    durationInFrames: 30,
  });

  const item1ReadyProgress = spring({
    frame: frame - item1ToReadyFrame,
    fps,
    durationInFrames: 30,
  });

  const item2Progress = spring({
    frame: frame - item2ToPrepFrame,
    fps,
    durationInFrames: 30,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, color: textColor, fontFamily: "sans-serif", padding: 40 }}>
      {/* Page Header */}
      <div 
        className="mb-10 flex items-center justify-between"
        style={{ opacity: headerAppear, transform: `translateY(${interpolate(headerAppear, [0, 1], [-20, 0])}px)` }}
      >
        <h1 className="text-4xl font-black">Pedidos de Cocina</h1>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-purple/10 text-purple font-bold">Chef Admin</div>
          <div className="text-2xl font-bold opacity-50">14:30</div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-3 gap-8 overflow-hidden">
        {/* Column: Pendiente */}
        <div className="flex flex-col space-y-6">
          <div className="h-2 rounded-full" style={{ backgroundColor: colors.yellow }} />
          <h2 className="text-xl font-bold flex items-center gap-2">
            Pendiente <span className="opacity-40 text-sm">3</span>
          </h2>
          <div className="flex-1 space-y-4 relative">
            {ITEMS.map((item, i) => {
              const appear = spring({ frame: frame - (30 + i * 5), fps });
              
              // Only render if not moved or if it's the moving card and it hasn't finished movement
              if (item.id === 1 && frame >= item1ToPrepFrame) return null;
              if (item.id === 2 && frame >= item2ToPrepFrame) return null;

              return (
                <div 
                  key={item.id}
                  className="p-6 rounded-2xl shadow-lg border relative overflow-hidden"
                  style={{ 
                    backgroundColor: cardBg, 
                    borderColor: borderColor,
                    opacity: appear,
                    transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`
                  }}
                >
                  <CardContent item={item} colors={colors} isDark={isDark} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Column: En Preparación */}
        <div className="flex flex-col space-y-6">
          <div className="h-2 rounded-full" style={{ backgroundColor: colors.blue }} />
          <h2 className="text-xl font-bold flex items-center gap-2">
            En Preparación <span className="opacity-40 text-sm">1</span>
          </h2>
          <div className="flex-1 space-y-4 relative">
            {/* Item 1 moving here */}
            {frame >= item1ToPrepFrame && frame < item1ToReadyFrame && (
              <div 
                className="p-6 rounded-2xl shadow-lg border border-blue-200"
                style={{ 
                  backgroundColor: cardBg,
                  transform: `translateX(${interpolate(item1Progress, [0, 1], [-width / 3, 0])}px) scale(${interpolate(item1Progress, [0, 0.2, 1], [0.9, 1.1, 1])})`,
                }}
              >
                <CardContent item={{...ITEMS[0], status: 'prep'}} colors={colors} isDark={isDark} />
              </div>
            )}
            {/* Item 2 moving here */}
            {frame >= item2ToPrepFrame && (
              <div 
                className="p-6 rounded-2xl shadow-lg border border-blue-200"
                style={{ 
                  backgroundColor: cardBg,
                  transform: `translateX(${interpolate(item2Progress, [0, 1], [-width / 3, 0])}px)`,
                }}
              >
                <CardContent item={{...ITEMS[1], status: 'prep'}} colors={colors} isDark={isDark} />
              </div>
            )}
          </div>
        </div>

        {/* Column: Listo */}
        <div className="flex flex-col space-y-6">
          <div className="h-2 rounded-full" style={{ backgroundColor: colors.green }} />
          <h2 className="text-xl font-bold flex items-center gap-2">
            Listo <span className="opacity-40 text-sm">0</span>
          </h2>
          <div className="flex-1 space-y-4 relative">
             {/* Item 1 moving here */}
             {frame >= item1ToReadyFrame && (
              <div 
                className="p-6 rounded-2xl shadow-lg border border-green-500 bg-green-50/10"
                style={{ 
                  backgroundColor: cardBg,
                  transform: `translateX(${interpolate(item1ReadyProgress, [0, 1], [-width / 3, 0])}px)`,
                }}
              >
                <CardContent item={{...ITEMS[0], status: 'ready'}} colors={colors} isDark={isDark} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CardContent = ({ item, colors, isDark }: { item: any, colors: any, isDark: boolean }) => {
  const isUrgent = parseInt(item.timer.split(':')[0]) < 5;
  
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="font-black text-lg opacity-60 uppercase">{item.mesa}</span>
        <div className={`flex items-center gap-1 font-bold ${isUrgent ? 'text-red-500 animate-pulse' : 'opacity-40'}`}>
          <Clock size={16} />
          {item.timer}
        </div>
      </div>
      <div className="space-y-1 mb-4">
        <p className="font-bold text-2xl">{item.product}</p>
        <p className="font-bold opacity-60">Cantidad: {item.qty}</p>
      </div>
      {item.comment && (
        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center gap-2 mb-4 border border-red-200 dark:border-red-900/50">
          <MessageCircle size={16} className="text-red-500" />
          <span className="text-red-600 dark:text-red-400 font-bold text-sm">{item.comment}</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div 
          className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
          style={{ 
            backgroundColor: item.status === 'pendiente' ? colors.yellow + '20' : item.status === 'prep' ? colors.blue + '20' : colors.green + '20',
            color: item.status === 'pendiente' ? colors.yellow : item.status === 'prep' ? colors.blue : colors.green,
            border: `1px solid ${item.status === 'pendiente' ? colors.yellow : item.status === 'prep' ? colors.blue : colors.green}`
          }}
        >
          {item.status === 'pendiente' ? 'Pendiente' : item.status === 'prep' ? 'Cocinando' : 'Listo'}
        </div>
        {isUrgent && <AlertTriangle size={20} className="text-red-500" />}
      </div>
    </>
  );
};
