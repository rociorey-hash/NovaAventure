import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Helper to safely get the Gemini Client (lazy load)
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY no está configurada. Por favor, añádela en la barra de Ajustes > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST route to generate a mobile app specification & source files based on a prompt
app.post("/api/generate-app", async (req, res) => {
  try {
    const { prompt, selectedFramework, appTemplate } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "El prompt es requerido para generar la aplicación." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Eres un Ingeniero Líder de Desarrollo Móvil experto en iOS (SwiftUI, Kotlin/Compose) y Frameworks Híbridos (React Native, Flutter).
Tu objetivo es responder con un JSON detallado y válido que estructure la interfaz simulada para iPhone y Android, y proporcione código fuente real y completo para cada tecnología móvil para la idea del usuario.

El usuario quiere una aplicación descrita como: "${prompt}".
Framework seleccionado sugerido: "${selectedFramework || 'react-native'}".
Plantilla sugerida: "${appTemplate || 'custom'}".

Debes generar una especificación interactiva de la aplicación con múltiples pantallas realistas, botones operables, listados y componentes visuales, junto con guías de instalación claras y el código fuente completo.

IMPORTANTE: El JSON de respuesta debe cumplir ESPECÍFICAMENTE con este esquema y contener datos ricos, sin marcadores de posición truncados ni comentarios estilo '// ... resto del código'. Todo el código fuente en reactNative, flutter, swiftUI y jetpackCompose debe ser completo y autocompilable en un solo archivo principal (por ejemplo, App.tsx para Expo o main.dart para Flutter).`;

    const userPrompt = `Genera un JSON completo y estructurado en español como respuesta a la aplicación móvil descrita por el usuario: "${prompt}". 
Cumple estrictamente con la estructura JSON que define las pantallas del simulador, el código de producción completo en los 4 formatos móviles, y los tutoriales interactivos paso a paso para Android Studio y Xcode.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "appName", 
            "appDescription", 
            "primaryColor", 
            "secondaryColor", 
            "accentColor", 
            "screens", 
            "reactNativeCode", 
            "flutterCode", 
            "nativeiOSCode", 
            "nativeAndroidCode", 
            "androidGuide", 
            "iosGuide"
          ],
          properties: {
            appName: {
              type: Type.STRING,
              description: "Nombre elegante de la aplicación en base al prompt del usuario."
            },
            appDescription: {
              type: Type.STRING,
              description: "Descripción profesional detallada de la app móvil generada."
            },
            primaryColor: {
              type: Type.STRING,
              description: "Código de color hexadecimal principal (ej. '#4F46E5')."
            },
            secondaryColor: {
              type: Type.STRING,
              description: "Código de color hexadecimal secundario (ej. '#10B981')."
            },
            accentColor: {
              type: Type.STRING,
              description: "Código de color hexadecimal de acento (ej. '#F59E0B')."
            },
            screens: {
              type: Type.ARRAY,
              description: "Listado de pantallas funcionales que se simularán en los dispositivos iPhone & Android (mínimo 3 pantallas).",
              items: {
                type: Type.OBJECT,
                required: ["id", "title", "icon", "elements"],
                properties: {
                  id: { type: Type.STRING, description: "ID único de la pantalla (ej. 'home', 'shop', 'profile', 'cart')." },
                  title: { type: Type.STRING, description: "Título visible en el header móvil (ej. 'Mi Tienda', 'Perfil de Usuario')." },
                  icon: { type: Type.STRING, description: "Nombre de icono de Lucide en minúsculas (ej. 'home', 'shopping-bag', 'user', 'settings', 'message-square', 'heart', 'calendar')." },
                  elements: {
                    type: Type.ARRAY,
                    description: "Componentes UI interactivos que estructuran la pantalla para simular la interfaz real de iOS/Android.",
                    items: {
                      type: Type.OBJECT,
                      required: ["type", "title", "subtitle", "content"],
                      properties: {
                        type: { 
                          type: Type.STRING,
                          description: "Tipo de componente: 'header' | 'banner' | 'card' | 'list' | 'input-button' | 'stat-grid' | 'button' | 'chat-bubble'"
                        },
                        title: { type: Type.STRING, description: "Título o etiqueta principal del elemento." },
                        subtitle: { type: Type.STRING, description: "Subtítulo, precio, estado o metadato." },
                        content: { type: Type.STRING, description: "Texto largo de descripción o array de ítems separados por comas que representen la lista dinámica." },
                        color: { type: Type.STRING, description: "Color de fondo opcional o acento para el elemento." }
                      }
                    }
                  }
                }
              }
            },
            reactNativeCode: {
              type: Type.STRING,
              description: "Código completo de React Native (Expo) autocompilable en un solo archivo App.tsx con estilos increíbles usando Hooks de React."
            },
            flutterCode: {
              type: Type.STRING,
              description: "Código completo de Flutter (main.dart) con diseño de Material 3 y estado dinámico."
            },
            nativeiOSCode: {
              type: Type.STRING,
              description: "Código completo de Swift/SwiftUI adaptado a los últimos estándares de iOS."
            },
            nativeAndroidCode: {
              type: Type.STRING,
              description: "Código completo de Kotlin con Jetpack Compose para simular el look nativo moderno."
            },
            androidGuide: {
              type: Type.STRING,
              description: "Guía paso a paso en formato Markdown detallando los comandos para configurar el CLI de React Native/Flutter, abrir el proyecto en Android Studio, compilar en Gradle y ejecutar el emulador de Android."
            },
            iosGuide: {
              type: Type.STRING,
              description: "Guía detallada en Markdown sobre Xcode, simuladores de iOS, instalación de extensiones, CocoaPods / SPM, cuentas de Apple Developer y firmas ('Signing & Capabilities') para iPhone."
            }
          }
        }
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    return res.json(parsedJson);

  } catch (error: any) {
    console.error("Error generating app specification:", error);
    return res.status(500).json({ 
      error: error.message || "Error al conectar con la API de Gemini. Comprueba que el Secret GEMINI_API_KEY esté correctamente configurado." 
    });
  }
});

// Setup Vite Dev server or Asset server
async function startServer() {
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
    console.log(`[Creador de Apps Móviles] Servidor Express iniciado en el puerto ${PORT}`);
  });
}

startServer();
