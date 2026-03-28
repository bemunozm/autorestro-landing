"use client";

import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { Smartphone, QrCode, CheckCircle2, ShoppingCart } from "lucide-react";

interface PedidosProps {
  theme?: "light" | "dark";
}

export const PedidosComposition: React.FC<PedidosProps> = ({ theme = "light" }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const colors = {
    purple: "#7B5EA7",
    golden: "#D4A017",
    charcoal: "#1A1A1A",
    offWhite: "#FAFAFA",
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? colors.charcoal : colors.offWhite;
  const textColor = isDark ? colors.offWhite : colors.charcoal;

  // Scene 1: Phone & QR (0-60)
  const phoneScale = spring({
    frame,
    fps,
    config: { damping: 12 },
    durationInFrames: 30,
  });

  const qrOpacity = spring({
    frame: frame - 15,
    fps,
    durationInFrames: 20,
  });

  // Scene 2: Menu Items (60-120)
  const menuProgress = spring({
    frame: frame - 60,
    fps,
    durationInFrames: 30,
  });

  // Scene 3: Cart (120-180)
  const cartJump = spring({
    frame: frame - 130,
    fps,
    config: { mass: 0.5, damping: 5 },
  });

  // Scene 4: Confirmation (180-240)
  const confirmY = spring({
    frame: frame - 180,
    fps,
    durationInFrames: 30,
  });

  return (
    <AbsoluteFill className="flex items-center justify-center" style={{ backgroundColor: bgColor }}>
      <div 
        className="relative w-[320px] h-[640px] rounded-[3rem] border-[10px] border-black shadow-2xl overflow-hidden flex flex-col"
        style={{ 
          transform: `scale(${phoneScale})`,
          backgroundColor: isDark ? "#222" : "white"
        }}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
          <div className="w-12 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="text-[10px] font-bold text-gray-400">MESA 4</div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 relative">
          <Sequence from={0} durationInFrames={60}>
            <div className="h-full flex flex-col items-center justify-center space-y-4" style={{ opacity: qrOpacity }}>
              <div className="p-4 bg-purple/10 rounded-2xl">
                <QrCode size={80} color={colors.purple} />
              </div>
              <p className="text-center font-bold" style={{ color: textColor }}>Escanea para pedir</p>
            </div>
          </Sequence>

          <Sequence from={60}>
            <div className="space-y-4" style={{ opacity: menuProgress }}>
              {["Pizza", "Hamburguesa", "Ensalada"].map((item, i) => {
                const itemAppear = spring({
                  frame: frame - (60 + i * 5),
                  fps,
                });
                return (
                  <div 
                    key={item}
                    className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3"
                    style={{ transform: `translateX(${interpolate(itemAppear, [0, 1], [50, 0])}px)`, opacity: itemAppear }}
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xl">
                      {item === "Pizza" ? "🍕" : item === "Hamburguesa" ? "🍔" : "🥗"}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: textColor }}>{item}</p>
                      <p className="text-[10px] text-gray-400">$8.990</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Sequence>

          {/* Cart Icon */}
          <div 
            className="absolute bottom-6 right-6 p-4 rounded-full shadow-lg z-20"
            style={{ 
              backgroundColor: colors.purple,
              transform: `translateY(${interpolate(cartJump, [0, 1], [0, -20])}px) scale(${interpolate(cartJump, [0, 0.5, 1], [1, 1.2, 1])})`,
              opacity: menuProgress
            }}
          >
            <ShoppingCart color="white" size={24} />
          </div>
        </div>

        {/* Scene 4: Confirmation Overlay */}
        <div 
          className="absolute inset-x-4 bottom-8 p-4 rounded-2xl border-2 border-white/20 shadow-2xl flex items-center gap-3 z-30"
          style={{ 
            backgroundColor: colors.golden,
            transform: `translateY(${interpolate(confirmY, [0, 1], [200, 0])}px)`,
          }}
        >
          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
            <CheckCircle2 color="white" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-black/60 leading-none">¡Éxito!</p>
            <p className="text-sm font-bold text-black">Pedido enviado</p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
