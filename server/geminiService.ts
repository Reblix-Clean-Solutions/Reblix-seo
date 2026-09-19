import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY fehlt: Bitte hinterlege deinen GEMINI_API_KEY im Netlify Dashboard unter Site Configuration > Environment Variables (oder lokal in der .env-Datei).");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SEO_SYSTEM_INSTRUCTION = `Du bist ein präziser deutscher Text-Optimierer für Rechtschreibung, Groß-/Kleinschreibung, Grammatik und SEO.

ABSOLUTE KERNREGEL:
BEARBEITE UND KORRIGIERE GENAU DEN TEXT, DEN DER NUTZER EINGEGEBEN HAT!
ERFINDE KEINE NEUEN THEMEN, KEINE FREMDEN ARTIKEL, KEINE BLOGPOSTS, KEINE RATGEBER UND KEINE ERFUNDENEN ÜBERSCHRIFTEN!
FÜGE KEINE UNGEFRAGTEN ÜBERSCHRIFTEN WIE '# Professionelle Kommunikation' ODER MARKETING-FLOSKELN HINZU!

Wenn der Nutzer einen kurzen Satz oder Gruß eingibt wie:
"halo wie geht es dire"
DANN MUSS DER FERTIGE TEXT GENAU LAUTEN:
"Hallo, wie geht es dir?"

Wenn der Nutzer eingibt:
"wir verkaufen rote schue fuer damen die schoen aussehen"
DANN LAUTET DER FERTIGE TEXT:
"Wir verkaufen rote Schuhe für Damen, die schön aussehen."

Wenn der Nutzer einen Produkttext, Webseitentext oder Absatz eingibt:
Optimiere GENAU diesen Text:
1. Groß- und Kleinschreibung: Alle Substantive, Satzanfänge, Eigennamen etc. exakt nach Duden-Grammatik korrigieren.
2. Rechtschreibfehler: Beseitige alle Tippfehler, Buchstabendreher und fehlende Umlaute (ä, ö, ü, ß).
3. Grammatik: Satzbau, Fälle (Dativ/Akkusativ), Kommasetzung und Zeiten perfektionieren.
4. SEO- & Lesbarkeit: Formuliere den Text so, dass er suchmaschinenfreundlich, klar und flüssig lesbar ist, OHNE den Sinn oder die Länge künstlich aufzublähen.

GIB IN 'optimizedText' NUR DEN FERTIG KORRIGIERTEN TEXT ZURÜCK. Keine einleitenden Sätze, keine Meta-Kommentare.`;

export async function runSeoOptimization(params: {
  rawText: string;
  focusKeyword?: string;
  contentType?: string;
  tone?: string;
}) {
  const { rawText, focusKeyword } = params;

  if (!rawText || typeof rawText !== "string" || !rawText.trim()) {
    throw new Error("Bitte gib einen Text ein, der optimiert werden soll.");
  }

  const ai = getAI();

  const promptMessage = `Hier ist der Rohtext des Nutzers, den du korrigieren (Groß-/Kleinschreibung, Rechtschreibung, Grammatik) und SEO-optimieren sollst. Erfinde keinen fremden Text dazu, sondern bearbeite exakt diesen Text:
"""
${rawText.trim()}
"""`;

  const modelsToTry = ["gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"];
  let response: any = null;
  let lastErr: any = null;

  for (const modelName of modelsToTry) {
    try {
      response = await ai.models.generateContent({
        model: modelName,
        contents: promptMessage,
        config: {
          systemInstruction: SEO_SYSTEM_INSTRUCTION,
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              optimizedText: {
                type: Type.STRING,
                description: "Der fertig korrigierte, SEO-optimierte Text des Nutzers. Genau der eingegebene Text mit korrigierter Groß-/Kleinschreibung, Grammatik und Rechtschreibung (keine erfundenen Blog-Überschriften oder fremde Zusätze!).",
              },
              optimizedPlainText: {
                type: Type.STRING,
                description: "Der gleiche fertige Text als Reintext.",
              },
              optimizedMarkdown: {
                type: Type.STRING,
                description: "Der fertige Text.",
              },
            },
            required: ["optimizedText"],
          },
        },
      });

      if (response && response.text) {
        break;
      }
    } catch (err: any) {
      console.warn(`Model ${modelName} failed, trying fallback:`, err?.message || err);
      lastErr = err;
    }
  }

  if (!response || !response.text) {
    throw lastErr || new Error("Keine Antwort von der KI erhalten.");
  }

  const parsed = JSON.parse(response.text);
  const cleanText = parsed.optimizedText || parsed.optimizedPlainText || parsed.optimizedMarkdown || "";

  return {
    optimizedText: cleanText,
    optimizedPlainText: cleanText,
    optimizedMarkdown: cleanText,
  };
}
