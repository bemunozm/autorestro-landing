"use client";

import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence, Easing } from "remotion";
import { ShoppingCart, Plus, CheckCircle2 } from "lucide-react";

interface PedidosProps {
  theme?: "light" | "dark";
}

const PRODUCTS = [
  { id: 1, name: "Pizza Pepperoni", price: "$8.990", icon: "🍕", category: "Pizzas" },
  { id: 2, name: "Burger Doble", price: "$7.450", icon: "🍔", category: "Hamburguesas" },
  { id: 3, name: "Ensalada César", price: "$6.200", icon: "🥗", category: "Ensaladas" },
];

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
  const cardBg = isDark ? "#2A2A2A" : "white";
  const borderColor = isDark ? "#3A3A3A" : "#EEEEEE";

  // Animations
  const headerAppear = spring({ frame, fps, durationInFrames: 20 });
  const tabsAppear = spring({ frame: frame - 10, fps, durationInFrames: 20 });
  
  // Logic for adding items
  const item1AddedFrame = 70;
  const item2AddedFrame = 120;
  
  const isItem1Added = frame > item1AddedFrame;
  const isItem2Added = frame > item2AddedFrame;
  
  const cartPop = spring({
    frame: frame - item1AddedFrame,
    fps,
    config: { damping: 12 },
  });

  const cartUpdate = spring({
    frame: frame - item2AddedFrame,
    fps,
    config: { damping: 12 },
  });

  const bannerAppear = spring({
    frame: frame - 190,
    fps,
    config: { damping: 15 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, color: textColor, fontFamily: "sans-serif" }}>
      {/* Header */}
      <div 
        className="p-6 flex items-center justify-between border-b" 
        style={{ 
          opacity: headerAppear, 
          transform: `translateY(${interpolate(headerAppear, [0, 1], [-20, 0])}px)`,
          borderColor: borderColor
        }}
      >
        <div>
          <span className="font-black text-xl tracking-tighter" style={{ color: colors.purple }}>AUTO</span>
          <span className="font-black text-xl tracking-tighter" style={{ color: colors.charcoal === textColor ? colors.charcoal : colors.offWhite }}>RESTRO</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple/10 text-purple font-bold text-xs">
          Mesa 4
        </div>
      </div>

      {/* Tabs */}
      <div 
        className="px-6 py-4 flex gap-4 overflow-hidden"
        style={{ 
          opacity: tabsAppear,
          transform: `translateY(${interpolate(tabsAppear, [0, 1], [10, 0])}px)`
        }}
      >
        {["Pizzas", "Hamburguesas", "Ensaladas"].map((cat, i) => (
          <div 
            key={cat} 
            className="px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap"
            style={{ 
              backgroundColor: i === 0 ? colors.purple : "transparent",
              color: i === 0 ? "white" : textColor,
              border: i === 0 ? "none" : `1px solid ${borderColor}`
            }}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex-1 px-6 py-2 space-y-4">
        {PRODUCTS.map((prod, i) => {
          const prodAppear = spring({ frame: frame - (20 + i * 5), fps });
          const isAdded = (i === 0 && isItem1Added) || (i === 1 && isItem2Added);
          
          return (
            <div 
              key={prod.id}
              className="p-4 rounded-2xl flex items-center gap-4 shadow-sm border"
              style={{ 
                opacity: prodAppear,
                transform: `translateX(${interpolate(prodAppear, [0, 1], [30, 0])}px)`,
                backgroundColor: cardBg,
                borderColor: borderColor
              }}
            >
              <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl">
                {prod.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{prod.name}</h3>
                <p className="text-purple font-bold">{prod.price}</p>
              </div>
              <button 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: isAdded ? colors.golden : colors.purple,
                  color: "white"
                }}
              >
                {isAdded ? <CheckCircle2 size={20} /> : <Plus size={20} />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating Cart Summary */}
      <Sequence from={item1AddedFrame}>
        <div 
          className="absolute bottom-10 left-6 right-6 p-4 rounded-2xl shadow-2xl flex items-center justify-between z-10"
          style={{ 
            backgroundColor: colors.charcoal,
            color: "white",
            transform: `translateY(${interpolate(cartPop, [0, 1], [100, 0])}px) scale(${interpolate(cartUpdate, [0, 0.5, 1], [1, 1.05, 1])})`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart size={24} />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-golden rounded-full text-[10px] flex items-center justify-center font-bold text-charcoal">
                {isItem2Added ? "2" : "1"}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold opacity-70 leading-none">Tu pedido</p>
              <p className="font-bold">{isItem2Added ? "$16.440" : "$8.990"}</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-purple rounded-xl font-bold text-sm">
            Ver Carrito
          </div>
        </div>
      </Sequence>

      {/* Success Banner */}
      <Sequence from={190}>
        <div 
          className="absolute inset-0 z-20 flex items-center justify-center p-8 bg-black/20 backdrop-blur-sm"
          style={{ opacity: bannerAppear }}
        >
          <div 
            className="w-full p-8 rounded-[2rem] shadow-2xl flex flex-col items-center text-center space-y-4"
            style={{ 
              backgroundColor: colors.golden,
              transform: `scale(${interpolate(bannerAppear, [0, 1], [0.8, 1])})`,
            }}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 size={48} color="white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-charcoal leading-tight">¡LISTO!</h2>
              <p className="font-bold text-charcoal/80">Tu pedido ha sido enviado a cocina</p>
            </div>
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
