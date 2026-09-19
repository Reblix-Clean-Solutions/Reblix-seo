import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { runSeoOptimization } from "./server/geminiService.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// API endpoint for SEO optimization, spelling, capitalization and grammar
app.post("/api/optimize-seo", async (req, res) => {
  try {
    const { rawText, focusKeyword, contentType, tone } = req.body;

    const data = await runSeoOptimization({
      rawText,
      focusKeyword,
      contentType,
      tone,
    });

    return res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("Error optimizing SEO text:", error);
    return res.status(500).json({
      error: error?.message || "Fehler bei der SEO-Optimierung. Bitte versuche es erneut.",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KI-Prompt-Assistent Server running on http://localhost:${PORT}`);
  });
}

startServer();
