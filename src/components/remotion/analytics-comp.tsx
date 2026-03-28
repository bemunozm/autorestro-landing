import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const AnalyticsComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const primary = "#7B5EA7";
  const secondary = "#D4A017";
  const background = "#0F0F0F";

  const chartProgress = spring({
    frame,
    fps,
    config: {
      damping: 20,
    },
  });

  const bars = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 1.0];

  return (
    <AbsoluteFill style={{ backgroundColor: background, padding: 60, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 300, gap: 10 }}>
        {bars.map((heightScale, i) => {
          const barHeight = heightScale * 250;
          const currentHeight = interpolate(chartProgress, [0, 1], [0, barHeight]);
          
          return (
            <div
              key={i}
              style={{
                width: 40,
                height: currentHeight,
                backgroundColor: i === bars.length - 1 ? secondary : primary,
                borderRadius: "10px 10px 0 0",
                boxShadow: i === bars.length - 1 ? `0 0 30px ${secondary}44` : `0 0 20px ${primary}22`,
                opacity: 0.8 + (i * 0.03),
                transition: "height 0.1s ease-out",
              }}
            />
          );
        })}
      </div>
      
      {/* Metrics below */}
      <div style={{ display: "flex", gap: 30, marginTop: 40, opacity: chartProgress }}>
        <div style={{ flex: 1, backgroundColor: "#1A1A1A", borderRadius: 15, padding: 20, border: "1px solid #333" }}>
          <div style={{ height: 10, width: "40%", backgroundColor: "#444", borderRadius: 5, marginBottom: 10 }} />
          <div style={{ height: 25, width: "70%", backgroundColor: primary, borderRadius: 5 }} />
        </div>
        <div style={{ flex: 1, backgroundColor: "#1A1A1A", borderRadius: 15, padding: 20, border: "1px solid #333" }}>
          <div style={{ height: 10, width: "40%", backgroundColor: "#444", borderRadius: 5, marginBottom: 10 }} />
          <div style={{ height: 25, width: "70%", backgroundColor: secondary, borderRadius: 5 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
