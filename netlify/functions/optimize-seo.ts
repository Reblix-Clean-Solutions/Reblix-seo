import { runSeoOptimization } from "../../server/geminiService.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

export const handler = async (event: any) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Method not allowed. Only POST is supported." }),
    };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const { rawText, focusKeyword, contentType, tone } = payload;

    const data = await runSeoOptimization({
      rawText,
      focusKeyword,
      contentType,
      tone,
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        data,
      }),
    };
  } catch (error: any) {
    console.error("Netlify Function optimize-seo error:", error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: error?.message || "Fehler bei der SEO-Optimierung.",
      }),
    };
  }
};
