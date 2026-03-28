import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const OrdersComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const primary = "#7B5EA7";
  const secondary = "#D4A017";
  const background = "#0F0F0F";

  const scanProgress = spring({
    frame,
    fps,
    config: {
      damping: 12,
    },
  });

  const menuAppear = spring({
    frame: frame - 20,
    fps,
    config: {
      stiffness: 100,
    },
  });

  const orderSent = spring({
    frame: frame - 60,
    fps,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 300,
          height: 600,
          backgroundColor: "#1A1A1A",
          borderRadius: 40,
          border: "8px solid #333",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          scale: 0.8,
        }}
      >
        {/* Header */}
        <div style={{ height: 60, backgroundColor: "#222", display: "flex", alignItems: "center", padding: "0 20px" }}>
          <div style={{ width: 100, height: 10, backgroundColor: "#444", borderRadius: 5 }} />
        </div>

        {/* Content */}
        <div style={{ padding: 20, flex: 1 }}>
          <div style={{ width: "100%", height: 150, backgroundColor: "#222", borderRadius: 10, marginBottom: 20, opacity: menuAppear }}>
            <div style={{ width: "60%", height: 15, backgroundColor: primary, margin: 15, borderRadius: 5 }} />
            <div style={{ width: "40%", height: 10, backgroundColor: "#444", margin: "0 15px", borderRadius: 5 }} />
          </div>
          
          <div style={{ width: "100%", height: 100, backgroundColor: "#222", borderRadius: 10, opacity: menuAppear }}>
            <div style={{ width: "50%", height: 15, backgroundColor: secondary, margin: 15, borderRadius: 5 }} />
          </div>
        </div>

        {/* Scan line animation */}
        {frame < 30 && (
          <div
            style={{
              position: "absolute",
              top: interpolate(scanProgress, [0, 1], [0, 600]),
              left: 0,
              width: "100%",
              height: 2,
              backgroundColor: primary,
              boxShadow: `0 0 20px ${primary}`,
            }}
          />
        )}

        {/* Confirmation banner */}
        <div
          style={{
            position: "absolute",
            bottom: interpolate(orderSent, [0, 1], [-100, 20]),
            left: 20,
            right: 20,
            height: 60,
            backgroundColor: primary,
            borderRadius: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            fontFamily: "sans-serif",
          }}
        >
          ¡Pedido enviado!
        </div>
      </div>
    </AbsoluteFill>
  );
};
