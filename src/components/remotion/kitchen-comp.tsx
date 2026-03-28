import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const KitchenComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const primary = "#7B5EA7";
  const secondary = "#D4A017";
  const background = "#0F0F0F";

  const card1Appear = spring({ frame: frame - 10, fps });
  const card2Appear = spring({ frame: frame - 25, fps });
  const card3Appear = spring({ frame: frame - 40, fps });
  
  const moveProgress = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 50 },
  });

  const cards = [
    { title: "Mesa 4 - Pizza", delay: 10, status: "doing", color: primary, progress: card1Appear },
    { title: "Mesa 2 - Pasta", delay: 25, status: "new", color: secondary, progress: card2Appear },
    { title: "Mesa 7 - Ensalada", delay: 40, status: "new", color: "#444", progress: card3Appear },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: background, padding: 40, display: "flex", flexDirection: "row", gap: 20 }}>
      {/* Column New */}
      <div style={{ flex: 1, backgroundColor: "#1A1A1A", borderRadius: 20, padding: 15, display: "flex", flexDirection: "column", gap: 15 }}>
        <div style={{ height: 20, width: "60%", backgroundColor: "#333", borderRadius: 10, marginBottom: 10 }} />
        {cards.filter(c => c.status === "new").map((c, i) => (
          <div
            key={i}
            style={{
              height: 100,
              backgroundColor: "#222",
              borderRadius: 15,
              borderLeft: `5px solid ${c.color}`,
              padding: 15,
              opacity: c.progress,
              transform: `translateX(${interpolate(moveProgress, [0, 1], [0, -300])}px)`,
              display: i === 0 && moveProgress > 0 ? "none" : "block",
            }}
          >
             <div style={{ height: 15, width: "80%", backgroundColor: "#444", borderRadius: 5, marginBottom: 10 }} />
             <div style={{ height: 10, width: "40%", backgroundColor: "#333", borderRadius: 5 }} />
          </div>
        ))}
      </div>

      {/* Column Doing */}
      <div style={{ flex: 1, backgroundColor: "#1A1A1A", borderRadius: 20, padding: 15, display: "flex", flexDirection: "column", gap: 15 }}>
        <div style={{ height: 20, width: "60%", backgroundColor: primary, borderRadius: 10, opacity: 0.3, marginBottom: 10 }} />
        
        {/* Animated card moving from column to column */}
        <div
            style={{
              height: 100,
              backgroundColor: "#222",
              borderRadius: 15,
              borderLeft: `5px solid ${primary}`,
              padding: 15,
              opacity: card1Appear,
              transform: `scale(${interpolate(moveProgress, [0, 0.5, 1], [1, 1.1, 1])})`,
            }}
          >
             <div style={{ height: 15, width: "80%", backgroundColor: "#444", borderRadius: 5, marginBottom: 10 }} />
             <div style={{ height: 10, width: "40%", backgroundColor: "#333", borderRadius: 5 }} />
          </div>
      </div>
    </AbsoluteFill>
  );
};
