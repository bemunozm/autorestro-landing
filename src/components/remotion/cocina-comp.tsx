"use client";

import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { ChefHat, Clock, CheckCircle2 } from "lucide-react";

interface CocinaProps {
  theme?: "light" | "dark";
}

export const CocinaComposition: React.FC<CocinaProps> = ({ theme = "light" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isDark = theme === "dark";

  const orders = [
    { id: "102", time: "05:12", items: ["2x Pizza Pepperoni", "1x Coca-Cola"] },
    { id: "103", time: "02:45", items: ["1x Hamburguesa XL", "1x Papas Fritas"] },
    { id: "104", time: "00:30", items: ["1x Ensalada Cesar"] }
  ];

  return (
    <AbsoluteFill className={isDark ? "bg-zinc-900" : "bg-slate-50"}>
      <div className="flex flex-col h-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <ChefHat className="text-[#D4A017]" size={40} />
            <h1 className={`text-4xl font-bold font-heading uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Kitchen Display System
            </h1>
          </div>
          <div className="text-xs font-black bg-gray-200 dark:bg-zinc-800 px-4 py-2 rounded-full text-gray-500 tracking-widest">
            SISTEMA ACTIVO
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-3 gap-8 flex-1">
          {/* Nuevo */}
          <Column title="Nuevo" isDark={isDark}>
            {orders.map((order, i) => {
              const appear = spring({
                frame: frame - (i * 15),
                fps,
                config: { damping: 12 },
              });

              return (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  isDark={isDark} 
                  style={{ 
                    opacity: appear,
                    transform: `scale(${appear}) translateX(${interpolate(appear, [0, 1], [-20, 0])}px)`
                  }} 
                />
              );
            })}
          </Column>

          {/* En Preparación */}
          <Column title="En Preparación" isDark={isDark}>
             <Sequence from={60}>
               <OrderCard 
                 order={{ id: "98", time: "12:15", items: ["4x Sushi Rolls"] }}
                 isDark={isDark}
                 style={{ borderLeft: "4px solid #D4A017" }}
               />
             </Sequence>
          </Column>

          {/* Listo */}
          <Column title="Listo" isDark={isDark}>
            <Sequence from={150}>
              <ReadyCard isDark={isDark} />
            </Sequence>
          </Column>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ReadyCard = ({ isDark }: { isDark: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const readyAnim = spring({
    frame,
    fps,
  });

  return (
    <OrderCard
      order={{ id: "95", time: "00:00", items: ["1x Brownie"] }}
      isDark={isDark}
      isReady
      style={{
        opacity: readyAnim,
        transform: `translateY(${interpolate(readyAnim, [0, 1], [50, 0])}px)`,
        borderLeft: "4px solid #22c55e",
      }}
    />
  );
};

const Column = ({ title, children, isDark }: { title: string, children: React.ReactNode, isDark: boolean }) => (
  <div className="flex flex-col gap-6">
    <h2 className={`text-xs font-black uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>
      {title}
    </h2>
    <div className="flex flex-col gap-4">
      {children}
    </div>
  </div>
);

const OrderCard = ({ order, isDark, isReady, style }: { order: any, isDark: boolean, isReady?: boolean, style?: any }) => {
  const frame = useCurrentFrame();
  // Simulate timer increment
  const seconds = Math.floor(frame / 30);
  const minutes = Math.floor(seconds / 60);
  const displaySec = (seconds % 60).toString().padStart(2, '0');
  const displayMin = minutes.toString().padStart(2, '0');

  return (
    <div 
      className={`p-6 rounded-2xl border ${isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"} shadow-sm flex flex-col gap-4`}
      style={style}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-gray-500">ORDEN #{order.id}</span>
        <div className="flex items-center gap-1 text-gray-400">
          <Clock size={12} />
          <span className="text-xs font-mono font-bold">{isReady ? "LISTO" : `${displayMin}:${displaySec}`}</span>
        </div>
      </div>
      <div className="flex-1 space-y-3">
        {order.items.map((item: string, j: number) => (
          <div key={j} className={`text-lg font-bold border-b pb-1 ${isDark ? "text-white border-zinc-700" : "text-gray-900 border-gray-100"}`}>
            {item}
          </div>
        ))}
      </div>
      {isReady && (
        <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
          <CheckCircle2 size={16} />
          RETIRAR EN MESÓN
        </div>
      )}
    </div>
  );
};
