const dev = process.env.NODE_ENV !== "production";
export const baseUrl = dev
  ? "http://localhost:3001"
  : "https://covid-heatmap-timeline.vercel.app";
