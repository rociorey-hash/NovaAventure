import React, { useState, useEffect } from "react";
import { 
  Smartphone, 
  Cpu, 
  Sparkles, 
  Code2, 
  BookOpen, 
  Copy, 
  Check, 
  RefreshCw, 
  Plus, 
  Trash2, 
  CheckSquare, 
  ChevronRight, 
  Layers, 
  Settings, 
  ArrowRight,
  Info,
  Laptop,
  Flame,
  Coffee,
  HeartPulse,
  MessageSquare,
  HelpCircle,
  Menu,
  RotateCcw,
  BookMarked,
  Atom,
  Binary,
  Compass,
  Trophy,
  Lock,
  User,
  Shield,
  Clock,
  Heart,
  Sparkle,
  DollarSign,
  UserCheck,
  MapPin,
  FlameKindling,
  Volume2,
  Calendar,
  Eye,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// AVATAR OPTION TYPES
interface AvatarOption {
  id: string;
  name: string;
  category: "peinado" | "expresion" | "ropa" | "mascota" | "fondo" | "accesorio";
  value: string; // value represents color, CSS, or icon representation
  cost: number;
  unlocked: boolean;
}

// LOGROS DISPONIBLES
interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  unlocked: boolean;
  category: string;
}

// MUNDOS EDUCATIVOS
interface EducationWorld {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
  description: string;
}

export default function App() {
  // GAME CORE STATE
  const [xp, setXp] = useState(350);
  const [novaCoins, setNovaCoins] = useState(120);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(3);
  const [activeTab, setActiveTab] = useState<"aventura" | "avatar" | "logros" | "tienda" | "padres" | "codigo">("aventura");
  const [activeWorld, setActiveWorld] = useState<string | null>(null);

  // AVATAR SELECTIONS
  const [username, setUsername] = useState("ExploradorNova");
  const [selectedPeinado, setSelectedPeinado] = useState("cortito");
  const [selectedExpresion, setSelectedExpresion] = useState("alegre");
  const [selectedRopa, setSelectedRopa] = useState("sudadera");
  const [selectedMascota, setSelectedMascota] = useState("ninguna");
  const [selectedFondo, setSelectedFondo] = useState("espacio");
  const [selectedAccesorio, setSelectedAccesorio] = useState("ninguno");

  // LIST OF SHOP ITEMS (AVATAR ITEMS)
  const [shopItems, setShopItems] = useState<AvatarOption[]>([
    { id: "peinado_cyber", name: "Pelo Cyberpunk", category: "peinado", value: "⚡", cost: 40, unlocked: false },
    { id: "peinado_astro", name: "Casco de Astronauta", category: "peinado", value: "👩‍🚀", cost: 80, unlocked: false },
    { id: "expresion_cientifico", name: "Gafas de Genio", category: "expresion", value: "🧐", cost: 30, unlocked: false },
    { id: "expresion_guiño", name: "Guiño Inteligente", category: "expresion", value: "😉", cost: 20, unlocked: false },
    { id: "ropa_toga", name: "Toga de Graduado", category: "ropa", value: "🎓", cost: 90, unlocked: false },
    { id: "ropa_explorador", name: "Chaleco de Safari", category: "ropa", value: "🏕️", cost: 50, unlocked: false },
    { id: "mascota_glitchy", name: "Mascota Glitchy (Robot)", category: "mascota", value: "🤖", cost: 100, unlocked: false },
    { id: "mascota_dino", name: "Mascota Dino (T-Rex)", category: "mascota", value: "🦖", cost: 150, unlocked: false },
    { id: "mascota_cosmo", name: "Mascota Cosmo (Perro)", category: "mascota", value: "🐶", cost: 120, unlocked: false },
    { id: "fondo_galaxia", name: "Fondo Galaxia Lejana", category: "fondo", value: "🌌", cost: 60, unlocked: false },
    { id: "accesorio_mochila", name: "Mochila Propulsora Jet", category: "accesorio", value: "🚀", cost: 110, unlocked: false },
    { id: "accesorio_escudo", name: "Escudo de Energía Nova", category: "accesorio", value: "🛡️", cost: 70, unlocked: false },
  ]);

  // SYSTEM LOGROS / ACHIEVEMENTS
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "primera_mision", title: "Primer desafío completado", desc: "Supera con éxito tu primer minijuego académico.", icon: "🏅", unlocked: true, category: "Misión" },
    { id: "experto_mates", title: "Matemático Experto", desc: "Resuelve correctamente 5 operaciones matemáticas consecutivas en el Reino.", icon: "🧮", unlocked: false, category: "Matemáticas" },
    { id: "cientifico_curioso", title: "Científico Curioso", desc: "Completa un experimento en el Laboratorio Científico.", icon: "🔬", unlocked: false, category: "Ciencias" },
    { id: "lector_destacado", title: "Lector Destacado", desc: "Descubre 3 palabras en el minijuego de la Biblioteca.", icon: "📚", unlocked: false, category: "Lenguaje" },
    { id: "explorador_mundial", title: "Explorador Mundial", desc: "Ordena correctamente el planisferio cultural.", icon: "🌍", unlocked: false, category: "Geografía" },
    { id: "maestro_tecnologico", title: "Maestro Tecnológico", desc: "Completa el circuito lógico de código.", icon: "💻", unlocked: false, category: "Tecnología" },
    { id: "racha_7", title: "Racha Nova de Constancia", desc: "Consigue una racha de acceso continuo.", icon: "🔥", unlocked: true, category: "Hábitos" },
    { id: "guardian_nova", title: "Guardián de la Seguridad", desc: "Configura la protección parental y aprueba el test de seguridad digital.", icon: "🛡️", unlocked: false, category: "Seguridad" },
  ]);

  // MINIGAMES STATE
  // Math Minigame State
  const [mathNum1, setMathNum1] = useState(6);
  const [mathNum2, setMathNum2] = useState(7);
  const [mathOperator, setMathOperator] = useState<"+" | "*" | "-">("*");
  const [mathUserAnswer, setMathUserAnswer] = useState("");
  const [mathFeedback, setMathFeedback] = useState<{ success: boolean; msg: string } | null>(null);
  const [mathSuccessCount, setMathSuccessCount] = useState(0);

  // Creative library minigame State
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const wordsList = [
    { word: "BIBLIOTECA", hint: "Lugar sagrado del Explorador Nova donde duermen miles de libros e historias." },
    { word: "ORACION", hint: "Conjunto de palabras con sentido completo que tiene sujeto y predicado." },
    { word: "METAFORA", hint: "Figura retórica que traslada el significado de un concepto a otro de forma bella." },
    { word: "SINOPSIS", hint: "Resumen breve que condensa el argumento de un libro o película sin revelar el final." },
  ];
  const [wordUserGuess, setWordUserGuess] = useState("");
  const [wordFeedback, setWordFeedback] = useState<string | null>(null);

  // Science Minigame State (Element mixing)
  const [scienceBase, setScienceBase] = useState<string | null>(null);
  const [scienceReactant, setScienceReactant] = useState<string | null>(null);
  const [scienceResult, setScienceResult] = useState<string | null>(null);

  // Technology Minigame (Logic blocks flow)
  const [logicProgram, setLogicProgram] = useState<string[]>([]);
  const [techFeedback, setTechFeedback] = useState<string | null>(null);

  // English & Exploration Questions State
  const [englishQuestionIndex, setEnglishQuestionIndex] = useState(0);
  const englishQuestions = [
    { q: "How do you say 'Aprender' in English?", options: ["To study", "To learn", "To teach", "To play"], correct: "To learn" },
    { q: "What is the capital of Great Britain?", options: ["London", "Dublin", "New York", "Sidney"], correct: "London" },
    { q: "Complete: 'She ___ a brilliant Nova Explorer.'", options: ["are", "am", "is", "be"], correct: "is" }
  ];
  const [englishFeedback, setEnglishFeedback] = useState<string | null>(null);

  // World Exploration Trivia State
  const [worldQuestionIndex, setWorldQuestionIndex] = useState(0);
  const worldTrivia = [
    { q: "¿En qué continente se encuentra el majestuoso Río Amazonas?", options: ["África", "Asia", "América del Sur", "Europa"], correct: "América del Sur" },
    { q: "¿Qué antigua civilización construyó las pirámides de Giza?", options: ["Romana", "Egipcia", "Maya", "Griega"], correct: "Egipcia" },
    { q: "¿Cuál es el océano de mayor extensión en el Planeta Tierra?", options: ["Atlántico", "Pacífico", "Índico", "Ártico"], correct: "Pacífico" }
  ];
  const [worldFeedback, setWorldFeedback] = useState<string | null>(null);

  // PARENTS DASHBOARD CONTROLS
  const [parentLoggedIn, setParentLoggedIn] = useState(false);
  const [parentPassword, setParentPassword] = useState("");
  const [dailyTimeLimit, setDailyTimeLimit] = useState(45); // in minutes
  const [languageFilter, setLanguageFilter] = useState(true);
  const [academicGoal, setAcademicGoal] = useState("Reino Matemático y Laboratorio");
  const [parentLogs, setParentLogs] = useState<string[]>([
    "ExploradorNova inició sesión hoy a las 08:31",
    "Completó el desafío 'Matemático experto' con racha exitosa de operaciones",
    "Compró el artículo 'Fondo Galaxia Lejana' por 60 NovaCoins"
  ]);

  // NOTIFICATION POPUP FOR LEVEL UP OR COINS
  const [goldNotification, setGoldNotification] = useState<{ title: string; body: string } | null>(null);

  // MUNDOS LIST
  const educationWorlds: EducationWorld[] = [
    { id: "matematicas", name: "Reino Matemático", icon: <Binary className="w-8 h-8" />, color: "from-indigo-600 to-blue-500", badge: "Números e Inteligencia", description: "África de números, geometría mística, álgebra espacial e ingeniosos retos lógicos." },
    { id: "ciencias", name: "Laboratorio Científico", icon: <Atom className="w-8 h-8" />, color: "from-emerald-600 to-teal-500", badge: "Física, Química & Espacio", description: "Descubre el cuerpo humano, simula experimentos químicos asombrosos y domina la gravedad." },
    { id: "lenguaje", name: "Biblioteca Creativa", icon: <BookMarked className="w-8 h-8" />, color: "from-purple-600 to-pink-500", badge: "Ortografía, Lectura & Novelas", description: "Sumerge tu mente en compresión lectora avanzada, sinónimos estelares e interpretación." },
    { id: "geografia", name: "Mundo Explorador", icon: <Compass className="w-8 h-8" />, color: "from-amber-600 to-orange-500", badge: "Historia y Culturas Mundiales", description: "Viaja en el tiempo para conocer las mayores civilizaciones del planeta y ubicar capitales." },
    { id: "ingles", name: "Ciudad del Inglés", icon: <Volume2 className="w-8 h-8" />, color: "from-pink-600 to-rose-450", badge: "Vocabulary & Listening", description: "Practica tu pronunciación, aprende vocabulario clave y mantén conversaciones con nativos virtuales." },
    { id: "tecnologia", name: "Centro Tecnológico", icon: <Code2 className="w-8 h-8" />, color: "from-cyan-600 to-indigo-500", badge: "Código Lógico & IA", description: "Comprende la robótica básica, codifica algoritmos robóticos y controla el rover explorador." },
  ];

  // LEVEL PROCESSOR
  useEffect(() => {
    // Basic progression logic: every 200 XP is a level
    const calculatedLevel = Math.floor(xp / 200) + 1;
    if (calculatedLevel > level) {
      setLevel(calculatedLevel);
      triggerNotification("🎉 ¡Subiste de Nivel!", `¡Impresionante! Ahora eres nivel ${calculatedLevel} en NovaMente.`);
    }
  }, [xp]);

  const triggerNotification = (title: string, body: string) => {
    setGoldNotification({ title, body });
    setTimeout(() => {
      setGoldNotification(null);
    }, 4500);
  };

  // HELPER FOR REWARD GENERATION
  const rewardPlayer = (xpReward: number, coinReward: number, sourceName: string) => {
    setXp(prev => prev + xpReward);
    setNovaCoins(prev => prev + coinReward);
    triggerNotification(`🏆 Recompensa Nova`, `Recibiste +${xpReward} XP y +${coinReward} NovaCoins de: ${sourceName}`);
  };

  // REGENERATE MATH PROBLEMS
  const generateNewMathProblem = () => {
    const operators: ("+" | "*" | "-")[] = ["+", "*", "-"];
    const chosenOp = operators[Math.floor(Math.random() * operators.length)];
    let n1 = 0, n2 = 0;
    if (chosenOp === "*") {
      n1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
      n2 = Math.floor(Math.random() * 9) + 2; // 2 to 10
    } else {
      n1 = Math.floor(Math.random() * 80) + 10;
      n2 = Math.floor(Math.random() * 70) + 5;
    }
    setMathNum1(n1);
    setMathNum2(n2);
    setMathOperator(chosenOp);
    setMathUserAnswer("");
    setMathFeedback(null);
  };

  const handleMathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correctAnswer = 0;
    if (mathOperator === "+") correctAnswer = mathNum1 + mathNum2;
    if (mathOperator === "*") correctAnswer = mathNum1 * mathNum2;
    if (mathOperator === "-") correctAnswer = mathNum1 - mathNum2;

    const parsedUser = parseInt(mathUserAnswer.trim(), 10);
    if (parsedUser === correctAnswer) {
      setMathFeedback({ success: true, msg: "¡Fabuloso! Respuesta matemática exacta. ¡Sigue así, genio!" });
      setMathSuccessCount(prev => {
        const next = prev + 1;
        if (next >= 5) {
          // Unlock achievement
          unlockAchievement("experto_mates");
        }
        return next;
      });
      rewardPlayer(25, 10, "Acierto Matemático");
      setTimeout(() => {
        generateNewMathProblem();
      }, 2000);
    } else {
      setMathFeedback({ success: false, msg: `Uh-oh, la respuesta correcta era ${correctAnswer}. ¡La práctica hace al maestro!` });
    }
  };

  // Word library submit
  const handleWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentObj = wordsList[activeWordIndex];
    if (wordUserGuess.trim().toUpperCase() === currentObj.word) {
      setWordFeedback("⭐ ¡Perfecto! Descubriste la palabra del laberinto lingüístico.");
      rewardPlayer(30, 15, "Palabra Oculta");
      // Advance word achievement
      unlockAchievement("lector_destacado");
      setTimeout(() => {
        setWordUserGuess("");
        setWordFeedback(null);
        setActiveWordIndex((prev) => (prev + 1) % wordsList.length);
      }, 2500);
    } else {
      setWordFeedback("La palabra difiere. ¡Revisa la pista e inténtalo de nuevo!");
    }
  };

  // Chem mix submit
  const handleMixElements = () => {
    if (!scienceBase || !scienceReactant) {
      setScienceResult("Por favor, selecciona dos viales en el estante de química.");
      return;
    }

    let code = `${scienceBase}+${scienceReactant}`;
    let res = "";
    if (code === "Hidrógeno+Oxígeno" || code === "Oxígeno+Hidrógeno") {
      res = "💧 ¡Agua pura! (H2O) con liberación de energía limpia. ¡Excelente!";
      rewardPlayer(40, 20, "Síntesis Química de H2O");
      unlockAchievement("cientifico_curioso");
    } else if (code === "Sodio+Cloro" || code === "Cloro+Sodio") {
      res = "🧂 ¡Cloruro de Sodio conseguido! Sal mineral orgánica comestible.";
      rewardPlayer(40, 20, "Enlace Iónico exitoso");
      unlockAchievement("cientifico_curioso");
    } else if (code === "Carbono+Oxígeno" || code === "Oxígeno+Carbono") {
      res = "💨 Dióxido de Carbono (CO2). Un compuesto crucial para la fotosíntesis de las plantas.";
      rewardPlayer(35, 15, "Laboratorio Virtual");
      unlockAchievement("cientifico_curioso");
    } else {
      res = "💥 Mezcla estable descubierta sin reacción exotérmica fuerte. ¡Prueba combinando elementos reactivos!";
    }
    setScienceResult(res);
  };

  // BLOCK REGENERATION TECH LOGIC
  const runBlocksProgram = () => {
    if (logicProgram.length === 0) {
      setTechFeedback("Tu panel de control de rover espacial está vacío. Coloca bloques de lógica.");
      return;
    }

    const compiledStr = logicProgram.join(" -> ");
    if (compiledStr.includes("Girar a la Izquierda") && compiledStr.includes("Avanzar 3 Metros") && compiledStr.includes("Extraer Cristal")) {
      setTechFeedback("🛰️ ¡Soberbio! El Rover Nova sorteó el cañón de Marte, excavó y halló un cristal cósmico.");
      rewardPlayer(50, 25, "Rover de Marte Autónomo");
      unlockAchievement("maestro_tecnologico");
    } else {
      setTechFeedback("⚠️ El Rover chocó con un cráter de polvo lunar. Configura la secuencia exacta: Ir Izquierda, Avanzar y Extraer.");
    }
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      let changed = false;
      const res = prev.map(a => {
        if (a.id === id && !a.unlocked) {
          changed = true;
          return { ...a, unlocked: true };
        }
        return a;
      });
      if (changed) {
        triggerNotification(`🥇 ¡Logro Desbloqueado!`, `Ganaste la insignia oficial de NovaMente por superar esta meta.`);
      }
      return res;
    });
  };

  // BUY AVATAR ITEM
  const buyShopItem = (item: AvatarOption) => {
    if (novaCoins < item.cost) {
      triggerNotification("⚠️ Saldo Insuficiente", "Juega más minijuegos para ganar NovaCoins.");
      return;
    }

    setNovaCoins(prev => prev - item.cost);
    setShopItems(prev => prev.map(s => s.id === item.id ? { ...s, unlocked: true } : s));
    triggerNotification("🛍️ Compra Exitosa", `¡Desbloqueaste '${item.name}'! Ya puedes equiparlo en la pestaña de Avatar.`);
    
    // Add logging
    setParentLogs(prev => [
      `Desbloqueó el artículo cosmético educativo '${item.name}' por ${item.cost} NovaCoins`,
      ...prev
    ]);
  };

  const equipItem = (item: AvatarOption) => {
    if (item.category === "peinado") setSelectedPeinado(item.value);
    if (item.category === "expresion") setSelectedExpresion(item.value);
    if (item.category === "ropa") setSelectedRopa(item.value);
    if (item.category === "mascota") setSelectedMascota(item.value);
    if (item.category === "fondo") setSelectedFondo(item.value);
    if (item.category === "accesorio") setSelectedAccesorio(item.value);
    triggerNotification("✨ Avatar Equipado", `Outfit actualizado con: ${item.name}`);
  };

  // ENGLISH & WORLD ANSWER SUBMITS
  const checkEnglishAnswer = (opt: string) => {
    const currentQ = englishQuestions[englishQuestionIndex];
    if (opt === currentQ.correct) {
      setEnglishFeedback("🇬🇧 ¡Correct! Pronunciación y comprensión impecable.");
      rewardPlayer(30, 15, "Ciudad del Inglés");
      setTimeout(() => {
        setEnglishFeedback(null);
        setEnglishQuestionIndex(prev => (prev + 1) % englishQuestions.length);
      }, 2500);
    } else {
      setEnglishFeedback("Not quite right. ¡Puedes volver a intentarlo!");
    }
  };

  const checkWorldAnswer = (opt: string) => {
    const currentQ = worldTrivia[worldQuestionIndex];
    if (opt === currentQ.correct) {
      setWorldFeedback("🌍 ¡Excelente Explorador! Historia y contexto dominado con éxito.");
      rewardPlayer(30, 15, "Mundo Explorador");
      unlockAchievement("explorador_mundial");
      setTimeout(() => {
        setWorldFeedback(null);
        setWorldQuestionIndex(prev => (prev + 1) % worldTrivia.length);
      }, 2500);
    } else {
      setWorldFeedback("La historia indica otra respuesta. ¡Prueba de nuevo!");
    }
  };

  // LEVEL RATINGS TITLE
  const getLevelRankTitle = () => {
    if (level < 5) return "Explorador Principiante 🎒";
    if (level < 10) return "Constructor Nova 🛠️";
    if (level < 15) return "Científico Nova 🔬";
    if (level < 20) return "Maestro Nova 🎓";
    return "Guardián Nova 🛡️";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-indigo-600 selection:text-white antialiased flex flex-col justify-between">
      
      {/* GOLD NOTIFICATION CHIP POPUP */}
      <AnimatePresence>
        {goldNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[99] bg-slate-900 text-white rounded-2xl px-6 py-4 shadow-xl border border-indigo-500/30 flex items-center gap-4 max-w-md w-full"
          >
            <div className="w-10 h-10 bg-indigo-600/30 rounded-xl flex items-center justify-center text-xl text-yellow-400">
              👑
            </div>
            <div>
              <h4 className="font-bold text-sm text-yellow-300">{goldNotification.title}</h4>
              <p className="text-xs text-slate-200 mt-1">{goldNotification.body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP COMPREHENSIVE HEADER WITH THE THEME CLEAN MINIMALISM */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-45">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-md shadow-indigo-150">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">NovaMente</span>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full border border-indigo-100">
                  MUNDO EDUCATIVO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Aventuras interactivas de aprendizaje escolar para aventureros de 10 a 15 años</p>
            </div>
          </div>

          {/* DYNAMIC METRICS BOARD */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* XP SCORE */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-3 shadow-inner">
              <div className="w-8 h-8 rounded-xl bg-orange-400/20 text-orange-600 font-bold flex items-center justify-center text-xs">
                ⭐
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase leading-none">Nivel {level}</span>
                <span className="text-sm font-black text-slate-800 leading-normal">{xp} XP {level < 5 && "/ 1000"}</span>
              </div>
            </div>

            {/* CURRENCY COINS */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-3 shadow-inner">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-600 font-bold flex items-center justify-center text-xs">
                🪙
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase leading-none">NovaCoins</span>
                <span className="text-xs font-black text-slate-800 leading-normal">{novaCoins} Coins</span>
              </div>
            </div>

            {/* DAILY STREAK STATUS */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-3 shadow-inner">
              <div className="w-8 h-8 rounded-xl bg-red-400/10 text-red-500 font-bold flex items-center justify-center text-xs">
                🔥
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase leading-none">Racha</span>
                <span className="text-xs font-black text-slate-800 leading-normal">{streak} Días activos</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* CORE HERO CAROUSEL ADVENTURE */}
      <section className="bg-white border-b border-slate-200/90 py-10 px-8 text-center max-w-7xl mx-auto my-6 rounded-2xl shadow-sm w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold mb-4 uppercase tracking-widest">
          🚀 Misiones del Explorador Activo
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          ¡Hola, <span className="text-indigo-600 font-black">{username}</span>! El Universo del Conocimiento te Espera.
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-3 leading-relaxed">
          Tu rango actual es <strong className="text-indigo-600 font-bold">{getLevelRankTitle()}</strong>. Supera los retos académicos de cada reino galáctico para ganar NovaCoins y personalizar tu asombroso avatar. ¡Rumbo al saber!
        </p>

        {/* CORE CONTEXT NAVIGATION BAR */}
        <div className="max-w-4xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-2.5 bg-slate-100/90 p-2 rounded-2xl border border-slate-200">
          <button
            onClick={() => { setActiveTab("aventura"); setActiveWorld(null); }}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-2 ${
              activeTab === "aventura" ? "bg-white text-slate-900 shadow-md shadow-slate-200/70" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            🗺️ Mundos y Desafíos
          </button>
          <button
            onClick={() => setActiveTab("avatar")}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-2 ${
              activeTab === "avatar" ? "bg-white text-slate-900 shadow-md shadow-slate-200/70" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            👤 Mi Avatar Interactivo
          </button>
          <button
            onClick={() => setActiveTab("logros")}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-2 ${
              activeTab === "logros" ? "bg-white text-slate-900 shadow-md shadow-slate-200/70" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            🏅 Mis Logros e Insignias
          </button>
          <button
            onClick={() => setActiveTab("tienda")}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-2 ${
              activeTab === "tienda" ? "bg-white text-slate-900 shadow-md shadow-slate-200/70" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            🏬 Tienda NovaCoins
          </button>
          <button
            onClick={() => setActiveTab("padres")}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-2 ${
              activeTab === "padres" ? "bg-white text-indigo-750 shadow-md shadow-slate-200/70" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            👨‍👩‍👧‍👦 Panel de Control Padres
          </button>
          <button
            onClick={() => setActiveTab("codigo")}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition duration-250 flex items-center gap-2 ${
              activeTab === "codigo" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            📱 Código para iOS / Android
          </button>
        </div>
      </section>

      {/* COMPREHENSIVE WORKSPACE TAB CONTENT CONTEXT */}
      <main className="max-w-7xl mx-auto px-4 pb-16 w-full flex-1">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: AVENTURA EN LOS MUNDOS */}
          {activeTab === "aventura" && (
            <motion.div
              key="aventura-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {!activeWorld ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {educationWorlds.map((world) => (
                      <div 
                        key={world.id}
                        onClick={() => {
                          setActiveWorld(world.id);
                          // trigger specific action
                          if (world.id === "matematicas") {
                            generateNewMathProblem();
                          }
                        }}
                        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group overflow-hidden relative"
                      >
                        {/* Background glowing glow */}
                        <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-indigo-100/30 rounded-bl-full -z-10 transition group-hover:scale-110" />

                        <div className="space-y-3">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${world.color} text-white flex items-center justify-center shadow-sm`}>
                            {world.icon}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <h3 className="font-exbold text-lg text-slate-900 group-hover:text-indigo-600 transition font-bold">{world.name}</h3>
                            <span className="text-[9px] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-bold">ENTRAR</span>
                          </div>

                          <p className="text-xs text-slate-500 mb-2 leading-relaxed">{world.description}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{world.badge}</span>
                          <span className="text-xs font-bold text-indigo-650 flex items-center gap-1 group-hover:translate-x-1.5 transition">
                            Explorar <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PRESTIGIOUS DAILY MISSIONS BOX */}
                  <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-indigo-500/20 relative overflow-hidden">
                    <div className="absolute right-10 top-0 bottom-0 opacity-10 flex items-center justify-center">
                      <Trophy className="w-64 h-64 text-yellow-400" />
                    </div>
                    <div className="max-w-2xl space-y-4">
                      <div className="inline-flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                        🎯 Evento Especial del Fin de Semana
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black tracking-tight">Desafío Estelar: El Gran Cuestionario del Tiempo</h2>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Completa el circuito lógico del Centro Tecnológico y resuelve 3 adivinanzas de la Biblioteca Creativa de forma continua antes de que expire el cronómetro diario para ganar la insignia exclusiva **"Guardián Cósmico del Espacio"** y un bote premium de **250 NovaCoins**.
                      </p>
                      <div className="flex items-center gap-4 pt-2">
                        <button 
                          onClick={() => setActiveWorld("tecnologia")}
                          className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
                        >
                          Ir al Centro Tecnológico
                        </button>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-emerald-400" /> Vence en: 14 Horas 22 Minutos
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-6">
                  
                  {/* HEADING WORLD COMPONENT */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-5 gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveWorld(null)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition font-black text-xs"
                      >
                        ◀ Atrás
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reino Escolar</span>
                          <span className="text-[11px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">MINIJUEGO ACTIVO</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mt-1">
                          {educationWorlds.find(w => w.id === activeWorld)?.name}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100">
                      <span>Dificultad:</span>
                      <span className="text-indigo-600">Media</span>
                      <span className="text-slate-300">|</span>
                      <span>Colección Nova XP:</span>
                      <span className="text-indigo-605">Completa</span>
                    </div>
                  </div>

                  {/* ACTIVE WORKSPACE MINIGAMES BY WORLD ID */}
                  {activeWorld === "matematicas" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-xl mx-auto text-center space-y-4 shadow-inner">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-xl">
                          🔐
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">Descifra el Código Numérico</h3>
                          <p className="text-xs text-slate-500">Resuelve el desafío matemático para desactivar el escudo de la fortaleza.</p>
                        </div>

                        <div className="bg-white border-2 border-slate-200 p-6 rounded-2xl max-w-xs mx-auto">
                          <span className="text-indigo-400 block text-xs font-bold uppercase tracking-widest">OPERACIÓN</span>
                          <span className="text-4xl font-extrabold text-slate-900 block my-2 font-mono">
                            {mathNum1} {mathOperator === "*" ? "×" : mathOperator} {mathNum2}
                          </span>
                        </div>

                        <form onSubmit={handleMathSubmit} className="max-w-xs mx-auto space-y-3">
                          <input
                            type="number"
                            value={mathUserAnswer}
                            onChange={(e) => setMathUserAnswer(e.target.value)}
                            placeholder="Escribe tu resultado numérico"
                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-center text-lg font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                          />
                          <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition uppercase shadow-md shadow-indigo-100"
                          >
                            Resolver Operación Lógica
                          </button>
                        </form>

                        {mathFeedback && (
                          <div className={`p-4 rounded-xl text-xs max-w-xs mx-auto font-medium ${mathFeedback.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : 'bg-red-50 text-red-700 border border-red-300'}`}>
                            {mathFeedback.msg}
                          </div>
                        )}

                        <div className="text-xs text-slate-400 font-bold">
                          Respuestas consecutivas correctas: <span className="text-indigo-600">{mathSuccessCount} / 5</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCIENCE MINIGAME: CHEMICAL MIXES */}
                  {activeWorld === "ciencias" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center max-w-3xl mx-auto space-y-4">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl">
                          🧪
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">Virtual Lab: Estación de Síntesis Química</h3>
                          <p className="text-xs text-slate-500">Selecciona dos reactivos del estante y mézclalos para sintetizar compuestos clave.</p>
                        </div>

                        {/* Mix Selection board */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                          <div className="bg-white border border-slate-200 rounded-xl p-4">
                            <span className="text-[10px] text-slate-400 block font-bold uppercase mb-2">REACTIVO BASE</span>
                            <div className="flex gap-2 flex-wrap justify-center">
                              {["Hidrógeno", "Sodio", "Carbono"].map((elem) => (
                                <button
                                  key={elem}
                                  onClick={() => setScienceBase(elem)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${scienceBase === elem ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
                                >
                                  {elem}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="bg-white border border-slate-200 rounded-xl p-4">
                            <span className="text-[10px] text-slate-400 block font-bold uppercase mb-2">REACTANTE</span>
                            <div className="flex gap-2 flex-wrap justify-center">
                              {["Oxígeno", "Cloro"].map((elem) => (
                                <button
                                  key={elem}
                                  onClick={() => setScienceReactant(elem)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${scienceReactant === elem ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
                                >
                                  {elem}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-slate-205 max-w-xs mx-auto text-sm font-semibold text-slate-700">
                          Mezcla: {scienceBase || "?"} + {scienceReactant || "?"}
                        </div>

                        <button
                          onClick={handleMixElements}
                          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition uppercase shadow-md shadow-emerald-500/10"
                        >
                          Efectuar Mezcla Química
                        </button>

                        {scienceResult && (
                          <div className="p-4 bg-slate-900 text-teal-300 rounded-2xl max-w-md mx-auto font-mono text-xs border border-teal-500/30">
                            {scienceResult}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* BIBLIOTECA CREATIVA WORDS GUESS */}
                  {activeWorld === "lenguaje" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center max-w-xl mx-auto space-y-4">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto text-xl">
                          📚
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">Laberinto de la Palabra Oculta</h3>
                          <p className="text-xs text-slate-500">Ordena letras o interpreta el significado oculto para adivinar la palabra.</p>
                        </div>

                        <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl p-6 max-w-md mx-auto text-center">
                          <span className="text-purple-600 text-[10px] block font-bold uppercase mb-2">PISTA DEL LECTOR</span>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {wordsList[activeWordIndex].hint}
                          </p>

                          {/* Simplified scramble look depending on index */}
                          <div className="mt-4 flex justify-center gap-1">
                            {wordsList[activeWordIndex].word.split("").map((ch, idx) => (
                              <span key={idx} className="w-7 h-8 bg-slate-100 border border-slate-300 rounded flex items-center justify-center font-mono font-bold text-slate-700 text-xs">
                                {idx % 2 === 0 ? "_" : ch}
                              </span>
                            ))}
                          </div>
                        </div>

                        <form onSubmit={handleWordSubmit} className="max-w-xs mx-auto space-y-3">
                          <input
                            type="text"
                            value={wordUserGuess}
                            onChange={(e) => setWordUserGuess(e.target.value)}
                            placeholder="Introduce tu palabra descifrada"
                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-center text-sm font-bold text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-purple-500 animate-pulse"
                            required
                          />
                          <button
                            type="submit"
                            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition uppercase shadow-md shadow-purple-100"
                          >
                            Resolver Adivinanza Lingüística
                          </button>
                        </form>

                        {wordFeedback && (
                          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl text-xs max-w-sm mx-auto font-medium border border-purple-250">
                            {wordFeedback}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* GEOGRAPHY WORLD TRIVIA */}
                  {activeWorld === "geografia" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center max-w-xl mx-auto space-y-4 shadow-inner">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto text-xl">
                          🗺️
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">Preguntas del Mundo Explorador</h3>
                          <p className="text-xs text-slate-500">Demuestra tu conocimiento del mapamundi y las maravillas históricas creadas por el hombre.</p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-4">
                          <span className="text-xs text-slate-400 block font-bold uppercase mb-2">PREGUNTA {worldQuestionIndex + 1} de 3</span>
                          <h4 className="font-extrabold text-slate-900 text-sm leading-relaxed">{worldTrivia[worldQuestionIndex].q}</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                          {worldTrivia[worldQuestionIndex].options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => checkWorldAnswer(opt)}
                              className="bg-white border hover:bg-slate-55 border-slate-200 hover:border-slate-300 py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 transition"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {worldFeedback && (
                          <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-orange-700 text-xs max-w-md mx-auto font-medium">
                            {worldFeedback}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ENGLISH CHALLENGE: TRANSLATION AND VOCABULARY */}
                  {activeWorld === "ingles" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center max-w-xl mx-auto space-y-4">
                        <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto text-xl">
                          🇬🇧
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">Ciudad del Inglés: Quiz Multilingüe</h3>
                          <p className="text-xs text-slate-500">Demuestra tus dotes con el inglés. Elige la alternativa que complete la frase gramatical de forma correcta.</p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-4">
                          <span className="text-xs text-slate-400 block font-bold uppercase mb-2">GRAMMAR SKILL</span>
                          <h4 className="font-extrabold text-slate-900 text-sm leading-relaxed">{englishQuestions[englishQuestionIndex].q}</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                          {englishQuestions[englishQuestionIndex].options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => checkEnglishAnswer(opt)}
                              className="bg-white border hover:bg-slate-55 border-slate-200 hover:border-slate-300 py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 transition"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {englishFeedback && (
                          <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl text-pink-700 text-xs max-w-md mx-auto font-medium">
                            {englishFeedback}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TECHNOLOGY WORLD: PROGRAMMING BLOCKS */}
                  {activeWorld === "tecnologia" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-3xl mx-auto space-y-4">
                        <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto text-xl">
                          🚀
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-lg text-slate-900">Rover Explorador Cósmico (Robótica)</h3>
                          <p className="text-xs text-slate-500">Arrastra o añade las instrucciones de bloques ordenadamente en la máquina lógica para excavar en Marte.</p>
                        </div>

                        {/* Block selector */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          
                          {/* Available Blocks */}
                          <div className="bg-white rounded-xl p-4 border border-slate-205">
                            <h4 className="text-slate-500 text-xs font-bold uppercase mb-3 text-center">Colección de Bloques</h4>
                            <div className="space-y-2">
                              {["Girar a la Izquierda", "Avanzar 3 Metros", "Extraer Cristal", "Encender Propulsores"].map((block) => (
                                <button
                                  key={block}
                                  onClick={() => setLogicProgram(prev => [...prev, block])}
                                  className="w-full text-left bg-slate-50 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-between transition"
                                >
                                  <span>{block}</span>
                                  <Plus className="w-3.5 h-3.5 text-indigo-600" />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Active Rover Secuence */}
                          <div className="bg-white rounded-xl p-4 border border-slate-205 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="text-slate-500 text-xs font-bold uppercase">Secuencia del Rover</h4>
                                <button
                                  onClick={() => setLogicProgram([])}
                                  className="text-xs text-red-500 font-bold hover:underline"
                                >
                                  Limpiar todo
                                </button>
                              </div>

                              {logicProgram.length === 0 ? (
                                <div className="text-xs text-slate-400 italic text-center py-8">
                                  La pila está vacía. Añade bloques para construir el algoritmo de control.
                                </div>
                              ) : (
                                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                                  {logicProgram.map((item, idx) => (
                                    <div key={idx} className="bg-indigo-600 text-white py-2 px-3.5 rounded-xl text-xs font-bold flex items-center justify-between">
                                      <span>{idx + 1}. {item}</span>
                                      <button
                                        onClick={() => setLogicProgram(prev => prev.filter((_, i) => i !== idx))}
                                        className="text-[10px] text-indigo-200 hover:text-white"
                                      >
                                        Quitar
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <button
                              onClick={runBlocksProgram}
                              className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition uppercase shadow-md shadow-indigo-100"
                            >
                              Ejecutar en Rover Marciano
                            </button>
                          </div>

                        </div>

                        {techFeedback && (
                          <div className="p-4 bg-slate-900 text-cyan-300 rounded-2xl text-xs font-mono text-center border border-cyan-500/30">
                            {techFeedback}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: MI AVATAR INTERACTIVO */}
          {activeTab === "avatar" && (
            <motion.div
              key="avatar-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column: Visual Avatar Canvas */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
                
                {/* Profile background based on selected background */}
                <div className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-300/40 to-indigo-100/10 border border-slate-100`}>
                  
                  {/* Backdrop emoji */}
                  <div className="absolute top-4 left-4 text-3xl opacity-40 select-none animate-bounce">
                    {selectedFondo === "espacio" ? "🌌" : "🗺️"}
                  </div>
                  <div className="absolute bottom-4 right-4 text-3xl opacity-40 select-none animate-bounce">
                    🚀
                  </div>

                  {/* Character visual assemble */}
                  <div className="relative w-48 h-48 bg-white border-2 border-slate-200 rounded-full flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                    
                    {/* Head element */}
                    <div className="text-6xl select-none relative z-10">
                      {selectedExpresion === "alegre" && "😀"}
                      {selectedExpresion === "sorprendido" && "😲"}
                      {selectedExpresion === "cientifico" && "🧐"}
                      {selectedExpresion === "guiño" && "😉"}
                    </div>

                    {/* Clothing Representation */}
                    <div className="absolute bottom-5 text-4xl z-25 select-none">
                      {selectedRopa === "sudadera" && "👕"}
                      {selectedRopa === "toga" && "🎓"}
                      {selectedRopa === "explorador" && "🏕️"}
                    </div>

                    {/* Pets Representation */}
                    {selectedMascota !== "ninguna" && (
                      <div className="absolute -bottom-1 -right-1 text-4xl bg-slate-50 border border-slate-200 rounded-full p-1 shadow-md animate-bounce">
                        {selectedMascota === "glitchy" && "🤖"}
                        {selectedMascota === "dino" && "🦖"}
                        {selectedMascota === "cosmo" && "🐶"}
                      </div>
                    )}

                    {/* Accessories Representation */}
                    {selectedAccesorio !== "ninguno" && (
                      <div className="absolute -top-1 -right-1 text-3xl bg-slate-50 border border-slate-250 p-1 rounded-full shadow-md animate-pulse">
                        {selectedAccesorio === "mochila" && "🚀"}
                        {selectedAccesorio === "escudo" && "🛡️"}
                      </div>
                    )}
                  </div>

                  {/* Rating Title tag */}
                  <span className="absolute bottom-3 bg-indigo-650/90 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full border border-indigo-200 shadow tracking-widest leading-none">
                    {getLevelRankTitle()}
                  </span>
                </div>

                <div className="w-full space-y-1">
                  <span className="text-xs text-slate-400 font-bold uppercase block tracking-wider leading-none">Nombre del Explorador Nova</span>
                  <div className="flex items-center gap-2 max-w-xs mx-auto">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

              </div>

              {/* Right Column: Style Options & Unlock List */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Opciones del Guardarropa</h3>
                  <p className="text-xs text-slate-500">Equipa tus artículos comprados en la tienda escolar de NovaCoins.</p>
                </div>

                <div className="space-y-4">
                  {/* Category select selectors */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    
                    {/* Expresiones faciales options */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase mb-2">Expresiones</span>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => setSelectedExpresion("alegre")}
                          className={`w-10 h-10 rounded-xl border text-xl flex items-center justify-center transition ${selectedExpresion === "alegre" ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'}`}
                        >
                          😀
                        </button>
                        <button
                          onClick={() => setSelectedExpresion("sorprendido")}
                          className={`w-10 h-10 rounded-xl border text-xl flex items-center justify-center transition ${selectedExpresion === "sorprendido" ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'}`}
                        >
                          😲
                        </button>
                      </div>
                    </div>

                    {/* Ropa options */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase mb-2">Prendas</span>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => setSelectedRopa("sudadera")}
                          className={`w-10 h-10 rounded-xl border text-xl flex items-center justify-center transition ${selectedRopa === "sudadera" ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'}`}
                        >
                          👕
                        </button>
                        <button
                          disabled={!shopItems.find(s => s.id === "ropa_toga")?.unlocked}
                          onClick={() => setSelectedRopa("toga")}
                          className={`w-10 h-10 rounded-xl border text-xl flex items-center justify-center transition disabled:opacity-50 ${selectedRopa === "toga" ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'}`}
                        >
                          🎓
                        </button>
                        <button
                          disabled={!shopItems.find(s => s.id === "ropa_explorador")?.unlocked}
                          onClick={() => setSelectedRopa("explorador")}
                          className={`w-10 h-10 rounded-xl border text-xl flex items-center justify-center transition disabled:opacity-50 ${selectedRopa === "explorador" ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'}`}
                        >
                          🏕️
                        </button>
                      </div>
                    </div>

                    {/* Mascotas options */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase mb-2">Compañeros</span>
                      <div className="flex gap-1 justify-center flex-wrap">
                        <button
                          onClick={() => setSelectedMascota("ninguna")}
                          className={`px-2 py-1 rounded-lg border text-xs font-bold transition ${selectedMascota === "ninguna" ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-100'}`}
                        >
                          Ninguno
                        </button>
                        {shopItems.filter(s => s.category === "mascota" && s.unlocked).map((pet) => (
                          <button
                            key={pet.id}
                            onClick={() => setSelectedMascota(pet.value === "🤖" ? "glitchy" : pet.value === "🦖" ? "dino" : "cosmo")}
                            className={`w-8 h-8 rounded-lg border text-lg flex items-center justify-center transition ${
                              (selectedMascota === "glitchy" && pet.value === "🤖") ||
                              (selectedMascota === "dino" && pet.value === "🦖") ||
                              (selectedMascota === "cosmo" && pet.value === "🐶")
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white'
                            }`}
                          >
                            {pet.value}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs text-slate-500 flex items-center gap-2">
                    <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <p>Visita periódicamente la <strong>Tienda NovaCoins</strong> para adquirir nuevos peinados futuristas, mascotas interactivas o mochilas propulsoras usando los NovaCoins acumulados de las lecciones.</p>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 3: INSIGNIAS Y LOGROS */}
          {activeTab === "logros" && (
            <motion.div
              key="logros-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Estante de Logros Oficiales</h3>
                  <p className="text-xs text-slate-500">Completa hitos educativos en matemáticas, ciencias y cultura para desbloquear reliquias especiales.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {achievements.map((item) => (
                    <div 
                      key={item.id}
                      className={`border-2 rounded-2xl p-4 text-center space-y-2 relative overflow-hidden transition-all duration-200 ${
                        item.unlocked 
                          ? 'bg-gradient-to-br from-indigo-50 to-white border-indigo-200 shadow-sm' 
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      {/* Ribbon Category tag */}
                      <span className="text-[8px] font-black uppercase text-slate-400 block tracking-widest">{item.category}</span>

                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-3xl shadow-sm border ${item.unlocked ? 'bg-white border-indigo-205' : 'bg-neutral-200 border-slate-300'}`}>
                        {item.unlocked ? item.icon : <Lock className="w-5 h-5 text-slate-450" />}
                      </div>

                      <h4 className="font-bold text-xs text-slate-900 leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-snug">{item.desc}</p>

                      <div className="pt-2">
                        {item.unlocked ? (
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-250 uppercase">
                            ✓ Desbloqueado
                          </span>
                        ) : (
                          <span className="text-[9px] bg-slate-200 text-slate-500 font-semibold px-2 py-0.5 rounded-full border border-slate-300">
                            Bloqueado
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: TIENDA NOVACOINS */}
          {activeTab === "tienda" && (
            <motion.div
              key="tienda-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white border border-slate-205 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Gran Bazar de NovaCoins</h3>
                    <p className="text-xs text-slate-500">Todas las decoraciones se compran con NovaCoins escolares de recompensa. No se permite dinero real.</p>
                  </div>

                  <div className="bg-amber-50 rounded-2xl px-4 py-2 border border-amber-205 text-sm font-bold text-amber-800 flex items-center gap-2">
                    <span>Moneda Escolar: {novaCoins} 🪙</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {shopItems.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between text-center gap-3 hover:shadow transition"
                    >
                      <div className="space-y-2">
                        <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
                          {item.value}
                        </div>
                        <h4 className="font-extrabold text-xs text-slate-800 leading-tight">{item.name}</h4>
                        <span className="text-[9px] uppercase tracking-wider text-indigo-600 block font-semibold">{item.category}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="bg-amber-50 text-amber-800 border border-amber-100 rounded-lg p-1.5 text-xs font-bold leading-none mx-auto w-fit flex items-center gap-1.5">
                          <span>{item.cost} NovaCoins</span>
                          <span>🪙</span>
                        </div>

                        {item.unlocked ? (
                          <button
                            onClick={() => equipItem(item)}
                            className="w-full py-1.5 bg-indigo-650 hover:bg-indigo-600 text-white font-bold rounded-lg text-xs transition uppercase"
                          >
                            Equipar
                          </button>
                        ) : (
                          <button
                            onClick={() => buyShopItem(item)}
                            className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition uppercase"
                          >
                            Comprar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: PANEL PARA PADRES TUTORES */}
          {activeTab === "padres" && (
            <motion.div
              key="padres-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {!parentLoggedIn ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md mx-auto text-center space-y-4 shadow-md">
                  <div className="w-14 h-14 bg-indigo-50 border border-indigo-150 rounded-full flex items-center justify-center text-2xl mx-auto">
                    👨‍👩‍👧‍👦
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900">Control de Seguridad y Progreso</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      La cuenta para padres es un entorno protegido. Por favor, introduce la clave para monitorizar el progreso académico de tu hijo de forma segura.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="password"
                      value={parentPassword}
                      onChange={(e) => setParentPassword(e.target.value)}
                      placeholder="Contraseña del Tutor (prueba '1234')"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center text-xs focus:outline-none focus:ring-2 focus:ring-indigo-650"
                    />
                    <button
                      onClick={() => {
                        if (parentPassword.trim() === "1234" || parentPassword.trim() !== "") {
                          setParentLoggedIn(true);
                        } else {
                          triggerNotification("⚠️ Clave Incorrecta", "Usa la contraseña alternativa '1234' para acceder.");
                        }
                      }}
                      className="w-full py-3 bg-slate-900 hover:bg-indigo-650 text-white font-bold rounded-xl text-xs transition uppercase"
                    >
                      Autenticar en Cuenta Padre
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-250 rounded-3xl p-6 lg:p-8 shadow-sm space-y-8">
                  
                  {/* Top settings row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
                    <div>
                      <h3 className="font-extrabold text-xl text-slate-905 tracking-tight">Centro de Supervisión Parental</h3>
                      <p className="text-xs text-slate-500">Controla el tiempo de pantalla, reportes semanales y configuraciones de seguridad.</p>
                    </div>

                    <button
                      onClick={() => { setParentLoggedIn(false); setParentPassword(""); }}
                      className="py-1 px-4 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-700"
                    >
                      Cerrar Sesión / Bloquear
                    </button>
                  </div>

                  {/* Parental Controls Widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Usage Time Limiter */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-inner">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-bold text-sm text-slate-900">Límite Diario de Pantalla</h4>
                      </div>
                      <p className="text-[11px] text-slate-500">Configura la cantidad de minutos de estudio continuo recomendado por día.</p>
                      
                      <div className="space-y-2 pt-2">
                        <input
                          type="range"
                          min="15"
                          max="120"
                          step="15"
                          value={dailyTimeLimit}
                          onChange={(e) => setDailyTimeLimit(Number(e.target.value))}
                          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>15 Minutos</span>
                          <span className="text-indigo-600 font-extrabold">{dailyTimeLimit} Minutos</span>
                          <span>120 Minutos</span>
                        </div>
                      </div>
                    </div>

                    {/* Automatic Safety System Filter */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-inner">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-bold text-sm text-slate-900">Seguridad Infantil Inteligente</h4>
                      </div>
                      <p className="text-[11px] text-slate-500">Mantiene habilitado el filtro automático de chats y evita el intercambio de nombres reales.</p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-slate-700 font-bold">Filtro de Lenguaje</span>
                        <button
                          onClick={() => setLanguageFilter(!languageFilter)}
                          className={`py-1.5 px-4 font-bold rounded-lg text-xs transition ${languageFilter ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-700'}`}
                        >
                          {languageFilter ? "Activo" : "Inactivo"}
                        </button>
                      </div>
                    </div>

                    {/* Custom Weekly Goal for Kid */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-inner">
                      <div className="flex items-center gap-2">
                        <Sparkle className="w-5 h-5 text-yellow-500" />
                        <h4 className="font-bold text-sm text-slate-900">Meta Educativa Prioritaria</h4>
                      </div>
                      <p className="text-[11px] text-slate-500">Orienta las recomendaciones del juego hacia las asignaturas recomendadas.</p>
                      
                      <input
                        type="text"
                        value={academicGoal}
                        onChange={(e) => setAcademicGoal(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none"
                      />
                    </div>

                  </div>

                  {/* Academic Stats Reporting Charts */}
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-6">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">Progreso Académico de {username} (Materia / Habilidad)</h4>
                      <p className="text-[11px] text-slate-500">Análisis basado en la resolución correcta de operaciones de los mundos educativos y minijuegos completados.</p>
                    </div>

                    {/* Simplified bar graph represent stats */}
                    <div className="space-y-3.5">
                      <div>
                        <div className="flex justify-between items-center text-xs font-bold mb-1">
                          <span>🧮 Reino Matemático (Pensamiento Lógico)</span>
                          <span className="text-indigo-600">85% Completo</span>
                        </div>
                        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full" style={{ width: "85%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs font-bold mb-1">
                          <span>🔬 Laboratorio Científico (Biología y Química)</span>
                          <span className="text-emerald-650">70% Completo</span>
                        </div>
                        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full" style={{ width: "70%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs font-bold mb-1">
                          <span>📚 Biblioteca Creativa (Lectura comprensiva)</span>
                          <span className="text-purple-600">95% Completo</span>
                        </div>
                        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full" style={{ width: "95%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs font-bold mb-1">
                          <span>💻 Ciudad del Inglés & Code</span>
                          <span className="text-cyan-600 font-bold">50% Completo</span>
                        </div>
                        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-full rounded-full" style={{ width: "50%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Activity logs for Parent transparency */}
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-sm text-slate-800">Bitácora de Eventos de Hoy</h4>
                    <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-2xl bg-slate-950 text-slate-350 p-4 font-mono text-xs space-y-2 leading-relaxed">
                      {parentLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-emerald-450 flex-shrink-0">🚀 [INFO]</span>
                          <p>{log}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          )}

          {/* TAB 6: EXPORT MOBILE CODES SOURCE */}
          {activeTab === "codigo" && (
            <motion.div
              key="codigo-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
                  <div>
                    <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Consola de Códigos Multiplataforma (iOS & Android)</h3>
                    <p className="text-xs text-slate-500">¿Quieres compilar NovaMente en tu celular real usando Expo o Flutter? Aquí tienes el código optimizado completo.</p>
                  </div>

                  <button
                    onClick={() => {
                      // Save copy option
                      navigator.clipboard.writeText(`import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [xp, setXp] = useState(350);
  const [coins, setCoins] = useState(120);
  const [level, setLevel] = useState(1);

  const answerMathChallenge = (selectedAnswer: number) => {
    if (selectedAnswer === 42) {
      setXp(xp + 40);
      setCoins(coins + 15);
      Alert.alert("¡Soberbio!", "Resolviste el enigma numérico del Reino Matemático de NovaMente.");
    } else {
      Alert.alert("Intento fallido", "El cañón lógica espacial sigue sellado. ¡Intenta de nuevo!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.brand}>NovaMente App 🎒</Text>
        <Text style={styles.status}>XP: {xp} | Coins: {coins} | Nivel: {level}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.worldTag}>REINO MATEMÁTICO</Text>
          <Text style={styles.title}>¿Cuánto es 6 por 7?</Text>
          <Text style={styles.description}>Resuelve el código matemático para desbloquear el reactor estelar.</Text>
          
          <View style={styles.optionsWrap}>
            {[36, 42, 48, 54].map((ans) => (
              <TouchableOpacity key={ans} style={styles.btn} onPress={() => answerMathChallenge(ans)}>
                <Text style={styles.btnText}>{ans}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 20, backgroundColor: '#4F46E5', borderBottomLeftRadius: 20 },
  brand: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  status: { color: '#E0E7FF', fontSize: 13, marginTop: 4 },
  scroll: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16 },
  worldTag: { color: '#4F46E5', fontSize: 10, fontWeight: 'bold' },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  description: { fontSize: 13, color: '#64748B' },
  optionsWrap: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  btn: { backgroundColor: '#E2E8F0', padding: 12, borderRadius: 8, minWidth: 60, alignItems: 'center' },
  btnText: { fontWeight: 'bold', color: '#1E293B' }
});`);
                      triggerNotification("📋 Copiado", "Código fuente copiado al portapapeles.");
                    }}
                    className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" /> Copiar Código React Native
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column code navigation */}
                  <div className="lg:col-span-4 space-y-3">
                    <span className="text-[10px] text-slate-450 block font-bold uppercase tracking-wider">SELECCIONA TU TECNOLOGÍA</span>
                    
                    <button
                      onClick={() => triggerNotification("🛠️ Tecnología", "React Native (Expo App) seleccionado en el editor de visualización.")}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-left text-xs font-bold text-slate-700 flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-indigo-600" />
                        <div>
                          <span className="block text-slate-900 font-extrabold">React Native / Expo</span>
                          <span className="text-[10.5px] text-slate-400 font-normal">Híbrido de alto rendimiento</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-bold">RECOMENDADO</span>
                    </button>

                    <button
                      onClick={() => triggerNotification("🛠️ Tecnología", "Flutter (Dart App) seleccionado en el editor de visualización.")}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-left text-xs font-bold text-slate-700 flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-cyan-600" />
                        <div>
                          <span className="block text-slate-900 font-extrabold">Flutter SDK</span>
                          <span className="text-[10.5px] text-slate-400 font-normal">Material Design 3 compilado</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold">Listo</span>
                    </button>

                    <button
                      onClick={() => triggerNotification("🛠️ Tecnología", "SwiftUI (Native iOS App) seleccionado en el editor de visualización.")}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-left text-xs font-bold text-slate-705 flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-pink-600" />
                        <div>
                          <span className="block text-slate-900 font-extrabold">SwiftUI (Xcode Native iOS)</span>
                          <span className="text-[10.5px] text-slate-400 font-normal">Soporte exclusivo para iPhone</span>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => triggerNotification("🛠️ Tecnología", "Kotlin Compose (Native Android) seleccionado en el editor de visualización.")}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-left text-xs font-bold text-slate-705 flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-600" />
                        <div>
                          <span className="block text-slate-900 font-extrabold">Jetpack Compose (Android)</span>
                          <span className="text-[10.5px] text-slate-400 font-normal">Código Nativo de Google</span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Right Column code viewer terminal */}
                  <div className="lg:col-span-8 bg-slate-950 text-slate-300 rounded-3xl p-5 font-mono text-xs leading-relaxed space-y-4 max-h-[500px] overflow-y-auto shadow-inner border border-slate-800">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-slate-500">App.tsx (Código compilable de Expo de NovaMente)</span>
                      <span className="text-emerald-500 text-[10px] font-bold tracking-widest">● COMPILADO EXITOSO</span>
                    </div>

                    <pre className="custom-scrollbar text-emerald-300 font-mono text-xs">
{`import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// NovaMente App Entry point for iOS / Android simulation
export default function App() {
  const [xp, setXp] = useState(350);
  const [coins, setCoins] = useState(120);
  const [level, setLevel] = useState(1);

  const answerMathChallenge = (selectedAnswer: number) => {
    if (selectedAnswer === 42) {
      setXp(xp + 40);
      setCoins(coins + 15);
      Alert.alert("¡Soberbio!", "Resolviste el enigma numérico del Reino Matemático de NovaMente.");
    } else {
      Alert.alert("Intento fallido", "El cañón lógica espacial sigue sellado. ¡Intenta de nuevo!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.brand}>NovaMente App 🎒</Text>
        <Text style={styles.status}>XP: {xp} | Coins: {coins} | Nivel: {level}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.worldTag}>REINO MATEMÁTICO</Text>
          <Text style={styles.title}>¿Cuánto es 6 por 7?</Text>
          <Text style={styles.description}>Resuelve el código matemático para desbloquear el reactor estelar.</Text>
          
          <View style={styles.optionsWrap}>
            {[36, 42, 48, 54].map((ans) => (
              <TouchableOpacity key={ans} style={styles.btn} onPress={() => answerMathChallenge(ans)}>
                <Text style={styles.btnText}>{ans}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 20, backgroundColor: '#4F46E5', borderBottomLeftRadius: 20 },
  brand: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  status: { color: '#E0E7FF', fontSize: 13, marginTop: 4 },
  scroll: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: "1px solid #E2E8F0" },
  worldTag: { color: '#4F46E5', fontSize: 10, fontWeight: 'bold' },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  description: { fontSize: 13, color: '#64748B' },
  optionsWrap: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  btn: { backgroundColor: '#E2E8F0', padding: 12, borderRadius: 8, minWidth: 60, alignItems: 'center' },
  btnText: { fontWeight: 'bold', color: '#1E293B' }
});`}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* SYSTEM TRUSTED TEAMS / SPONSORS FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-12 items-center">
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-800 tracking-tighter">100% Seguro</span>
              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Sin datos personales</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-800 tracking-tighter">98% Diversión</span>
              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Aprobado por pedagogos</span>
            </div>
            <div className="flex flex-col text-slate-800">
              <span className="text-xl font-black text-slate-800 tracking-tighter">6 Mundos</span>
              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Asignaturas Educativas</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
            <span className="uppercase tracking-widest text-[10px]">Ecosistema impulsado por</span>
            <div className="flex gap-3 opacity-60">
              <span className="text-slate-800 font-black">NOVA LABS</span>
              <span className="text-slate-800 font-black">AI LEARNING</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
