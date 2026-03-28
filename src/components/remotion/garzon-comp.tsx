"use client";

import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence, Easing } from "remotion";
import { Clock, Users, MoreHorizontal, Bell, CreditCard, CheckCircle2, ShoppingBag } from "lucide-react";

interface GarzonProps {
  theme?: "light" | "dark";
}

const MESAS = [
  { id: 1, name: "Mesa 1", time: "1h 05m", people: "2/4", total: "$12.400", status: "ocupada" },
  { id: 2, name: "Mesa 2", time: "0h 42m", people: "4/4", total: "$34.900", status: "ocupada" },
  { id: 3, name: "Mesa 3", time: "2h 10m", people: "3/6", total: "$45.200", status: "ocupada" },
  { id: 4, name: "Mesa 4", time: "0h 15m", people: "1/2", total: "$8.500", status: "ocupada" },
  { id: 5, name: "Mesa 5", time: "1h 45m", people: "5/8", total: "$67.300", status: "ocupada" },
  { id: 6, name: "Mesa 6", time: "---", people: "0/4", total: "$0", status: "disponible" },
];

export const GarzonComposition: React.FC<GarzonProps> = ({ theme = "light" }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const colors = {
    yellow: "#EAB308",
    blue: "#3B82F6",
    green: "#22C55E",
    purple: "#7B5EA7",
    charcoal: "#1A1A1A",
    offWhite: "#FAFAFA",
    gray: "#94A3B8",
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? colors.charcoal : colors.offWhite;
  const textColor = isDark ? colors.offWhite : colors.charcoal;
  const cardBg = isDark ? "#2A2A2A" : "white";
  const borderColor = isDark ? "#3A3A3A" : "#EEEEEE";

  // Animation Timings
  const headerAppear = spring({ frame, fps });
  
  // Logic for state changes
  const mesa3ChangeFrame = 120;
  const mesa5ChangeFrame = 200;
  
  const isMesa3Changed = frame > mesa3ChangeFrame;
  const isMesa5Changed = frame > mesa5ChangeFrame;

  const mesa3Pulse = Math.sin(frame / 5) * 0.1 + 1; // Pulse effect for bell

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, color: textColor, fontFamily: "sans-serif", padding: 40 }}>
      {/* Page Header */}
      <div 
        className="mb-10 flex items-center justify-between"
        style={{ opacity: headerAppear, transform: `translateY(${interpolate(headerAppear, [0, 1], [-20, 0])}px)` }}
      >
        <h1 className="text-4xl font-black">Administración de Mesas</h1>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-purple/10 text-purple font-bold">Mesero Principal</div>
        </div>
      </div>

      {/* Grid Mesas */}
      <div className="grid grid-cols-3 gap-6">
        {MESAS.map((mesa, i) => {
          const appear = spring({ frame: frame - (20 + i * 5), fps });
          
          let currentStatus = mesa.status;
          if (mesa.id === 3 && isMesa3Changed) currentStatus = "asistencia";
          if (mesa.id === 5 && isMesa5Changed) currentStatus = "pago";

          const statusColors = {
            asistencia: colors.yellow,
            pago: colors.blue,
            ocupada: colors.purple,
            disponible: colors.gray,
          };

          const statusIcon = {
            asistencia: <Bell size={18} />,
            pago: <CreditCard size={18} />,
            ocupada: <CheckCircle2 size={18} />,
            disponible: <ShoppingBag size={18} />,
          };

          const statusText = {
            asistencia: "Solicita Asistencia",
            pago: "Pago con Tarjeta",
            ocupada: "Ocupada",
            disponible: "Disponible",
          };

          return (
            <div 
              key={mesa.id}
              className="p-6 rounded-[2rem] shadow-xl border relative"
              style={{ 
                backgroundColor: cardBg, 
                borderColor: borderColor,
                opacity: appear,
                transform: `scale(${interpolate(appear, [0, 1], [0.8, 1])})`,
                boxShadow: currentStatus === "asistencia" ? `0 0 30px ${colors.yellow}40` : "none"
              }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-black text-2xl">{mesa.name}</span>
                <MoreHorizontal size={24} className="opacity-30" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 opacity-60">
                  <Clock size={16} />
                  <span className="font-bold text-sm">{mesa.time}</span>
                </div>
                <div className="flex items-center gap-2 opacity-60">
                  <Users size={16} />
                  <span className="font-bold text-sm">{mesa.people}</span>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-black uppercase opacity-30 leading-none">Total Consumo</p>
                  <p className="text-3xl font-black text-purple">{mesa.total}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div 
                className="flex items-center gap-2 p-3 rounded-2xl mb-6 font-bold text-sm"
                style={{ 
                  backgroundColor: statusColors[currentStatus as keyof typeof statusColors] + '15',
                  color: statusColors[currentStatus as keyof typeof statusColors],
                  border: `1px solid ${statusColors[currentStatus as keyof typeof statusColors]}30`,
                  transform: currentStatus === "asistencia" ? `scale(${mesa3Pulse})` : "scale(1)"
                }}
              >
                {statusIcon[currentStatus as keyof typeof statusIcon]}
                {statusText[currentStatus as keyof typeof statusText]}
              </div>

              {/* Button */}
              <div 
                className="w-full py-3 rounded-xl font-black text-center text-sm shadow-lg transition-all"
                style={{ 
                  backgroundColor: currentStatus === "asistencia" ? colors.blue : (currentStatus === "disponible" ? colors.green : colors.purple),
                  color: "white"
                }}
              >
                {currentStatus === "asistencia" ? "Atender Asistencia" : (currentStatus === "disponible" ? "Iniciar Pedido" : "Gestionar Mesa")}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
