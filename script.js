/* ═══════════════════════════════════════════════════════════════
   FluxLight — script.js  v2.0  FINAL
   ═══════════════════════════════════════════════════════════════
   ⚙️  CONFIGURAÇÃO — alterar aqui
   ─────────────────────────────────────────────────────────────── */

// ❗ IP do ESP32 (ver no Serial Monitor após gravar)
// Endereço do ESP32 na rede. TEM de ser igual ao IP fixo definido no firmware.
const ESP32_IP = "http://192.168.1.115";

// ❗ IPs das 2 lâmpadas Shelly RGBW E27
// Lista dos IPs das lâmpadas Shelly (a mesma que está no ESP32).
const SHELLY_IPS = [
  "192.168.1.101",   // Lâmpada 1
  "192.168.1.102",   // Lâmpada 2
];

/* ═══════════════════════════════════════════════════════════════
   TRADUÇÕES — 5 LÍNGUAS
   ═══════════════════════════════════════════════════════════════ */
// Todos os textos da app nas 5 línguas (PT/EN/DE/FR/ES). A função t() vai buscar aqui a tradução certa.
const TRANSLATIONS = {
  pt: {
    nav_dashboard:"Dashboard", nav_strip:"Fita LED", nav_bulbs:"Lâmpadas",
    nav_effects:"Efeitos", nav_flags:"Bandeiras", nav_settings:"Definições", nav_about:"Sobre",
    stat_strip:"Fita LED", stat_bulbs:"Lâmpadas", stat_effect:"Efeito", stat_flag:"Bandeira",
    quick_ctrl:"Controlo Rápido", scenes:"Cenas Rápidas",
    scene_relax:"Relaxar", scene_focus:"Foco", scene_party:"Festa", scene_night:"Noite",
    flags_quick_sub:"9 bandeiras animadas",
    strip_title:"Fita LED WS2812B", color:"Cor", brightness:"Brilho",
    all_bulbs:"Todas as Lâmpadas", all_bulbs_sub:"Controlo global · 2 × Shelly RGBW",
    bulb_label:"Lâmpada", on:"ON", off:"OFF",
    effects_title:"Efeitos Dinâmicos",
    effects_desc:"Seleciona um efeito para a Fita LED. Os efeitos correm no ESP32.",
    fx_rainbow:"Ciclo de cores contínuo", fx_disco:"Cores aleatórias rápidas",
    fx_fire:"Simulação de chama real", fx_pulse:"Pulsação suave",
    fx_wave:"Onda percorrendo a fita", fx_fade:"Transição suave de cores",
    fx_sparkle:"Faíscas aleatórias", fx_meteor:"Meteoro de luz",
    stop_effect:"Parar Efeito",
    flags_title:"Bandeiras em LED", flags_desc:"Escolhe uma bandeira para a fita LED animar com as cores nacionais em onda contínua.",
    flag_pt:"Portugal", flag_br:"Brasil", flag_es:"Espanha", flag_fr:"França",
    flag_de:"Alemanha", flag_it:"Itália", flag_gb:"Reino Unido", flag_us:"EUA", flag_jp:"Japão",
    stop_flag:"Parar Bandeira",
    settings_title:"Configuração", wifi:"Rede Wi-Fi", wifi_ssid:"SSID (Nome da rede)",
    wifi_pass:"Password", esp_ip:"IP do ESP32", edit:"Editar",
    bulb_ips:"IPs das Lâmpadas Shelly", esp_config:"Configuração Hardware",
    num_leds:"Número de LEDs", gpio:"GPIO da fita LED", edit_in:"Alterar em",
    about_tagline:"Sistema de Iluminação Inteligente",
    pap_title:"Prova de Aptidão Profissional", school:"Escola", course:"Curso", year:"Ano Letivo",
    team_title:"Equipa", student:"Aluno", teacher:"Professor Orientador",
    hardware_title:"Hardware", hw_mcu:"Microcontrolador", hw_strip:"Fita LED endereçável",
    hw_psu:"Alimentação", hw_shelly:"Lâmpadas inteligentes Wi-Fi",
    sw_title:"Tecnologias",
    school_sub:"Cofinanciado pela União Europeia · Portugal 2030",
    copyright_sub:"Todos os direitos reservados · PAP · TGEI",
    connecting:"A ligar...", connected:"Ligado", disconnected:"ESP32 inacessível",
    splash_msgs:["A iniciar o sistema...","A ligar ao ESP32...","A carregar interface...","Pronto!"],
  },
  en: {
    nav_dashboard:"Dashboard", nav_strip:"LED Strip", nav_bulbs:"Bulbs",
    nav_effects:"Effects", nav_flags:"Flags", nav_settings:"Settings", nav_about:"About",
    stat_strip:"LED Strip", stat_bulbs:"Bulbs", stat_effect:"Effect", stat_flag:"Flag",
    quick_ctrl:"Quick Control", scenes:"Quick Scenes",
    scene_relax:"Relax", scene_focus:"Focus", scene_party:"Party", scene_night:"Night",
    flags_quick_sub:"9 animated flags",
    strip_title:"WS2812B LED Strip", color:"Color", brightness:"Brightness",
    all_bulbs:"All Bulbs", all_bulbs_sub:"Global control · 2 × Shelly RGBW",
    bulb_label:"Bulb", on:"ON", off:"OFF",
    effects_title:"Dynamic Effects",
    effects_desc:"Select an effect for the LED Strip. Effects run on the ESP32.",
    fx_rainbow:"Continuous color cycle", fx_disco:"Fast random colors",
    fx_fire:"Real flame simulation", fx_pulse:"Smooth pulsing",
    fx_wave:"Wave across the strip", fx_fade:"Smooth color transition",
    fx_sparkle:"Random sparkles", fx_meteor:"Light meteor",
    stop_effect:"Stop Effect",
    flags_title:"Flags on LED", flags_desc:"Choose a flag to animate the LED strip with national colors in a continuous wave.",
    flag_pt:"Portugal", flag_br:"Brazil", flag_es:"Spain", flag_fr:"France",
    flag_de:"Germany", flag_it:"Italy", flag_gb:"United Kingdom", flag_us:"USA", flag_jp:"Japan",
    stop_flag:"Stop Flag",
    settings_title:"Settings", wifi:"Wi-Fi Network", wifi_ssid:"SSID (Network name)",
    wifi_pass:"Password", esp_ip:"ESP32 IP", edit:"Edit",
    bulb_ips:"Shelly Bulb IPs", esp_config:"Hardware Configuration",
    num_leds:"Number of LEDs", gpio:"LED strip GPIO", edit_in:"Edit in",
    about_tagline:"Smart Lighting System",
    pap_title:"Professional Aptitude Test (PAP)", school:"School", course:"Course", year:"School Year",
    team_title:"Team", student:"Student", teacher:"Supervising Teacher",
    hardware_title:"Hardware", hw_mcu:"Microcontroller", hw_strip:"Addressable LED strip",
    hw_psu:"Power supply", hw_shelly:"Smart Wi-Fi bulbs",
    sw_title:"Technologies",
    school_sub:"Co-funded by the European Union · Portugal 2030",
    copyright_sub:"All rights reserved · PAP · TGEI",
    connecting:"Connecting...", connected:"Connected", disconnected:"ESP32 unreachable",
    splash_msgs:["Starting system...","Connecting to ESP32...","Loading interface...","Ready!"],
  },
  de: {
    nav_dashboard:"Dashboard", nav_strip:"LED-Streifen", nav_bulbs:"Lampen",
    nav_effects:"Effekte", nav_flags:"Flaggen", nav_settings:"Einstellungen", nav_about:"Über",
    stat_strip:"LED-Streifen", stat_bulbs:"Lampen", stat_effect:"Effekt", stat_flag:"Flagge",
    quick_ctrl:"Schnellsteuerung", scenes:"Schnellszenen",
    scene_relax:"Entspannen", scene_focus:"Fokus", scene_party:"Party", scene_night:"Nacht",
    flags_quick_sub:"9 animierte Flaggen",
    strip_title:"WS2812B LED-Streifen", color:"Farbe", brightness:"Helligkeit",
    all_bulbs:"Alle Lampen", all_bulbs_sub:"Globale Steuerung · 2 × Shelly RGBW",
    bulb_label:"Lampe", on:"EIN", off:"AUS",
    effects_title:"Dynamische Effekte",
    effects_desc:"Wähle einen Effekt für den LED-Streifen. Effekte laufen auf dem ESP32.",
    fx_rainbow:"Kontinuierlicher Farbzyklus", fx_disco:"Schnelle Zufallsfarben",
    fx_fire:"Echte Flammensimulation", fx_pulse:"Sanftes Pulsieren",
    fx_wave:"Welle über den Streifen", fx_fade:"Sanfter Farbübergang",
    fx_sparkle:"Zufällige Funken", fx_meteor:"Lichtmeteor",
    stop_effect:"Effekt stoppen",
    flags_title:"Flaggen auf LED", flags_desc:"Wähle eine Flagge für den LED-Streifen.",
    flag_pt:"Portugal", flag_br:"Brasilien", flag_es:"Spanien", flag_fr:"Frankreich",
    flag_de:"Deutschland", flag_it:"Italien", flag_gb:"Vereinigtes Königreich", flag_us:"USA", flag_jp:"Japan",
    stop_flag:"Flagge stoppen",
    settings_title:"Einstellungen", wifi:"WLAN-Netzwerk", wifi_ssid:"SSID (Netzwerkname)",
    wifi_pass:"Passwort", esp_ip:"ESP32-IP", edit:"Bearbeiten",
    bulb_ips:"Shelly Lampen IPs", esp_config:"Hardware-Konfiguration",
    num_leds:"Anzahl LEDs", gpio:"LED-Streifen GPIO", edit_in:"Bearbeiten in",
    about_tagline:"Intelligentes Beleuchtungssystem",
    pap_title:"Berufseignungstest (PAP)", school:"Schule", course:"Kurs", year:"Schuljahr",
    team_title:"Team", student:"Schüler", teacher:"Betreuungslehrer",
    hardware_title:"Hardware", hw_mcu:"Mikrocontroller", hw_strip:"Adressierbarer LED-Streifen",
    hw_psu:"Netzteil", hw_shelly:"Intelligente WLAN-Lampen",
    sw_title:"Technologien",
    school_sub:"Mitfinanziert von der EU · Portugal 2030",
    copyright_sub:"Alle Rechte vorbehalten · PAP · TGEI",
    connecting:"Verbinde...", connected:"Verbunden", disconnected:"ESP32 nicht erreichbar",
    splash_msgs:["System wird gestartet...","Verbinde mit ESP32...","Interface wird geladen...","Bereit!"],
  },
  fr: {
    nav_dashboard:"Tableau de bord", nav_strip:"Bandeau LED", nav_bulbs:"Ampoules",
    nav_effects:"Effets", nav_flags:"Drapeaux", nav_settings:"Paramètres", nav_about:"À propos",
    stat_strip:"Bandeau LED", stat_bulbs:"Ampoules", stat_effect:"Effet", stat_flag:"Drapeau",
    quick_ctrl:"Contrôle Rapide", scenes:"Scènes Rapides",
    scene_relax:"Détente", scene_focus:"Concentration", scene_party:"Fête", scene_night:"Nuit",
    flags_quick_sub:"9 drapeaux animés",
    strip_title:"Bandeau LED WS2812B", color:"Couleur", brightness:"Luminosité",
    all_bulbs:"Toutes les Ampoules", all_bulbs_sub:"Contrôle global · 2 × Shelly RGBW",
    bulb_label:"Ampoule", on:"ON", off:"OFF",
    effects_title:"Effets Dynamiques",
    effects_desc:"Sélectionnez un effet pour le bandeau LED. Les effets s'exécutent sur l'ESP32.",
    fx_rainbow:"Cycle de couleurs continu", fx_disco:"Couleurs aléatoires rapides",
    fx_fire:"Simulation de flamme réelle", fx_pulse:"Pulsation douce",
    fx_wave:"Vague traversant le bandeau", fx_fade:"Transition douce des couleurs",
    fx_sparkle:"Étincelles aléatoires", fx_meteor:"Météore lumineux",
    stop_effect:"Arrêter l'effet",
    flags_title:"Drapeaux sur LED", flags_desc:"Choisissez un drapeau pour animer le bandeau LED.",
    flag_pt:"Portugal", flag_br:"Brésil", flag_es:"Espagne", flag_fr:"France",
    flag_de:"Allemagne", flag_it:"Italie", flag_gb:"Royaume-Uni", flag_us:"États-Unis", flag_jp:"Japon",
    stop_flag:"Arrêter le drapeau",
    settings_title:"Paramètres", wifi:"Réseau Wi-Fi", wifi_ssid:"SSID (Nom du réseau)",
    wifi_pass:"Mot de passe", esp_ip:"IP de l'ESP32", edit:"Modifier",
    bulb_ips:"IPs des ampoules Shelly", esp_config:"Configuration matérielle",
    num_leds:"Nombre de LEDs", gpio:"GPIO du bandeau LED", edit_in:"Modifier dans",
    about_tagline:"Système d'éclairage intelligent",
    pap_title:"Épreuve d'Aptitude Professionnelle", school:"École", course:"Cours", year:"Année scolaire",
    team_title:"Équipe", student:"Élève", teacher:"Professeur superviseur",
    hardware_title:"Matériel", hw_mcu:"Microcontrôleur", hw_strip:"Bandeau LED adressable",
    hw_psu:"Alimentation", hw_shelly:"Ampoules intelligentes Wi-Fi",
    sw_title:"Technologies",
    school_sub:"Cofinancé par l'Union Européenne · Portugal 2030",
    copyright_sub:"Tous droits réservés · PAP · TGEI",
    connecting:"Connexion...", connected:"Connecté", disconnected:"ESP32 inaccessible",
    splash_msgs:["Démarrage du système...","Connexion à l'ESP32...","Chargement...","Prêt!"],
  },
  es: {
    nav_dashboard:"Panel", nav_strip:"Tira LED", nav_bulbs:"Bombillas",
    nav_effects:"Efectos", nav_flags:"Banderas", nav_settings:"Ajustes", nav_about:"Acerca de",
    stat_strip:"Tira LED", stat_bulbs:"Bombillas", stat_effect:"Efecto", stat_flag:"Bandera",
    quick_ctrl:"Control Rápido", scenes:"Escenas Rápidas",
    scene_relax:"Relajar", scene_focus:"Foco", scene_party:"Fiesta", scene_night:"Noche",
    flags_quick_sub:"9 banderas animadas",
    strip_title:"Tira LED WS2812B", color:"Color", brightness:"Brillo",
    all_bulbs:"Todas las Bombillas", all_bulbs_sub:"Control global · 2 × Shelly RGBW",
    bulb_label:"Bombilla", on:"ON", off:"OFF",
    effects_title:"Efectos Dinámicos",
    effects_desc:"Selecciona un efecto para la Tira LED. Los efectos se ejecutan en el ESP32.",
    fx_rainbow:"Ciclo de colores continuo", fx_disco:"Colores aleatorios rápidos",
    fx_fire:"Simulación de llama real", fx_pulse:"Pulsación suave",
    fx_wave:"Ola recorriendo la tira", fx_fade:"Transición suave de colores",
    fx_sparkle:"Chispas aleatorias", fx_meteor:"Meteoro de luz",
    stop_effect:"Detener Efecto",
    flags_title:"Banderas en LED", flags_desc:"Elige una bandera para animar la tira LED.",
    flag_pt:"Portugal", flag_br:"Brasil", flag_es:"España", flag_fr:"Francia",
    flag_de:"Alemania", flag_it:"Italia", flag_gb:"Reino Unido", flag_us:"EE.UU.", flag_jp:"Japón",
    stop_flag:"Detener Bandera",
    settings_title:"Ajustes", wifi:"Red Wi-Fi", wifi_ssid:"SSID (Nombre de red)",
    wifi_pass:"Contraseña", esp_ip:"IP del ESP32", edit:"Editar",
    bulb_ips:"IPs de las bombillas Shelly", esp_config:"Configuración de hardware",
    num_leds:"Número de LEDs", gpio:"GPIO de la tira LED", edit_in:"Editar en",
    about_tagline:"Sistema de Iluminación Inteligente",
    pap_title:"Prueba de Aptitud Profesional", school:"Escuela", course:"Curso", year:"Año escolar",
    team_title:"Equipo", student:"Alumno", teacher:"Profesor supervisor",
    hardware_title:"Hardware", hw_mcu:"Microcontrolador", hw_strip:"Tira LED direccionable",
    hw_psu:"Fuente de alimentación", hw_shelly:"Bombillas inteligentes Wi-Fi",
    sw_title:"Tecnologías",
    school_sub:"Cofinanciado por la Unión Europea · Portugal 2030",
    copyright_sub:"Todos los derechos reservados · PAP · TGEI",
    connecting:"Conectando...", connected:"Conectado", disconnected:"ESP32 inaccesible",
    splash_msgs:["Iniciando sistema...","Conectando al ESP32...","Cargando interfaz...","¡Listo!"],
  },
};

/* ═══════════════════════════════════════════════════════════════
   ESTADO DA APLICAÇÃO
   ═══════════════════════════════════════════════════════════════ */
// O 'estado' da app no browser: guarda se a fita está ligada, cor, brilho, efeito atual, etc.
const state = {
  lang:       "pt",
  led:        { on: false, color: "#ff6a00", brightness: 200 },
  bulbs:      SHELLY_IPS.map(() => ({ on: false, color: "#ffffff", brightness: 100 })),
  effect:     null,
  flag:       null,
  master:     false,
  esp32Ok:    false,
};

// Tempo máximo (ms) à espera de resposta do ESP32 antes de desistir.
const HTTP_TIMEOUT = 4000;

/* ═══════════════════════════════════════════════════════════════
   SPLASH SCREEN
   ═══════════════════════════════════════════════════════════════ */
// Ecrã de abertura (splash): anima as partículas e a barra de progresso, depois desaparece.
function initSplash() {
  const canvas  = document.getElementById("splashCanvas");
  const bar     = document.getElementById("splashBar");
  const msgEl   = document.getElementById("splashMsg");
  const splash  = document.getElementById("splash");

  if (!canvas) return;

  // Canvas partículas
  const ctx = canvas.getContext("2d");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.6 + 0.1,
    hue: Math.random() * 40 + 20, // 20–60 → laranja/amarelo
  }));

  let animId;
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha})`;
      ctx.fill();
    });
    animId = requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // Barra de progresso + mensagens
  const msgs = TRANSLATIONS[state.lang].splash_msgs || ["A carregar...","","","Pronto!"];
  const steps = [
    { pct: 20,  msg: msgs[0], delay: 200 },
    { pct: 55,  msg: msgs[1], delay: 900 },
    { pct: 85,  msg: msgs[2], delay: 1700 },
    { pct: 100, msg: msgs[3], delay: 2400 },
  ];

  steps.forEach(s => {
    setTimeout(() => {
      bar.style.width = s.pct + "%";
      if (msgEl) msgEl.textContent = s.msg;
    }, s.delay);
  });

  // Fechar splash
  setTimeout(() => {
    cancelAnimationFrame(animId);
    splash.classList.add("hidden");
    setTimeout(() => splash.remove(), 900);
  }, 3200);
}

/* ═══════════════════════════════════════════════════════════════
   INICIALIZAÇÃO
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initSplash();
  buildBulbCards();
  buildShellyIpFields();
  syncUI();
  applyTranslations();

  setTimeout(() => {
    checkConnection();
    if (window.lucide) lucide.createIcons();
  }, 3400);

  setInterval(checkConnection, 15000);
});

/* ═══════════════════════════════════════════════════════════════
   COMUNICAÇÃO HTTP COM ESP32
   ═══════════════════════════════════════════════════════════════ */
// FUNÇÃO CENTRAL: envia um pedido ao ESP32 (ex: /led/on). Trata do timeout e mostra sucesso/erro.
async function esp32Request(endpoint, desc = "") {
  // ➕ ACRESCENTO v2.1 — Modo offline/demonstração: simula sucesso sem contactar o ESP32
  if (typeof offlineModeActive !== "undefined" && offlineModeActive) {
    if (desc) showToast(`🧪 ${desc} (demo)`, "info");
    return true;
  }
  const url = `${ESP32_IP}${endpoint}`;
  try {
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), HTTP_TIMEOUT);
    const res   = await fetch(url, { method:"GET", signal:ctrl.signal, mode:"cors" });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (desc) showToast(`✅ ${desc}`, "success");
    setConnectionStatus(true);
    return true;
  } catch (err) {
    const msg = err.name === "AbortError" ? "Timeout" : err.message;
    if (desc) showToast(`❌ ${msg}`, "error");
    setConnectionStatus(false);
    return false;
  }
}

// Verifica de tempos a tempos se o ESP32 continua acessível (atualiza o ponto verde/vermelho).
async function checkConnection() {
  // ➕ ACRESCENTO v2.1 — Em modo offline, mostrar estado "demo" sem tentar ligar
  if (typeof offlineModeActive !== "undefined" && offlineModeActive) {
    setDemoStatus();
    return;
  }
  try {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 3000);
    const res = await fetch(`${ESP32_IP}/status`, { method:"GET", signal:ctrl.signal, mode:"cors" });
    setConnectionStatus(res.ok || res.status === 404);
  } catch { setConnectionStatus(false); }
}

/* ═══════════════════════════════════════════════════════════════
   FITA LED WS2812B
   ═══════════════════════════════════════════════════════════════ */
// Liga/desliga a fita LED.
async function toggleLED(isOn) {
  state.led.on = isOn;
  await esp32Request(isOn ? "/led/on" : "/led/off",
    isOn ? t("stat_strip") + " ON" : t("stat_strip") + " OFF");
  syncUI();
}

// Envia ao ESP32 a nova cor da fita (converte de hex para r,g,b).
async function applyLEDColor() {
  const hex = document.getElementById("ledColor").value;
  const { r, g, b } = hexToRGB(hex);
  state.led.color = hex;
  updateColorBars();
  await esp32Request(`/led/color?r=${r}&g=${g}&b=${b}`);
}

// Envia ao ESP32 o novo brilho da fita.
async function applyLEDBrightness(value) {
  state.led.brightness = parseInt(value);
  await esp32Request(`/led/brightness?value=${value}`);
}

/* ═══════════════════════════════════════════════════════════════
   LÂMPADAS SHELLY — 5 INDIVIDUAIS
   ═══════════════════════════════════════════════════════════════ */

/** Gera os cards das 5 lâmpadas dinamicamente */
// Cria dinamicamente os cartões de cada lâmpada Shelly no ecrã.
function buildBulbCards() {
  const container = document.getElementById("bulbsContainer");
  if (!container) return;

  container.innerHTML = SHELLY_IPS.map((ip, i) => {
    const n = i + 1;
    const label = t("bulb_label");
    return `
    <div class="control-card" id="bulbCard${n}">
      <div class="control-card-header">
        <div class="device-info">
          <div class="device-icon bulb-led" id="bulbIcon${n}"><i data-lucide="lightbulb"></i></div>
          <div>
            <strong>${label} ${n}</strong>
            <small id="bulbIpLabel${n}">${ip}</small>
          </div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="bulb${n}Toggle" onchange="toggleBulb(${n}, this.checked)" />
          <span class="toggle-track"></span>
        </label>
      </div>
      <div class="color-preview-bar" id="bulb${n}ColorBar"></div>
      <div class="control-section">
        <label class="ctrl-label" data-i18n="color">${t("color")}</label>
        <div class="color-row">
          <input type="color" class="color-wheel" id="bulb${n}Color" value="#ffffff" oninput="applyBulbColor(${n})" />
          <div class="color-swatches">
            <button class="swatch" style="--c:#ff2200" onclick="setColor('bulb${n}','#ff2200')"></button>
            <button class="swatch" style="--c:#ff8800" onclick="setColor('bulb${n}','#ff8800')"></button>
            <button class="swatch" style="--c:#ffee00" onclick="setColor('bulb${n}','#ffee00')"></button>
            <button class="swatch" style="--c:#00ff44" onclick="setColor('bulb${n}','#00ff44')"></button>
            <button class="swatch" style="--c:#00aaff" onclick="setColor('bulb${n}','#00aaff')"></button>
            <button class="swatch" style="--c:#aa00ff" onclick="setColor('bulb${n}','#aa00ff')"></button>
            <button class="swatch" style="--c:#ffffff" onclick="setColor('bulb${n}','#ffffff')"></button>
          </div>
        </div>
      </div>
      <div class="control-section">
        <label class="ctrl-label">${t("brightness")} <span class="ctrl-value" id="bulb${n}BrightVal">100</span>%</label>
        <input type="range" class="slider" id="bulb${n}Brightness" min="0" max="100" value="100"
          oninput="updateBrightLabel(this.value,'bulb${n}BrightVal')"
          onchange="applyBulbBrightness(${n},this.value)" />
      </div>
    </div>`;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

// Liga/desliga uma lâmpada específica.
async function toggleBulb(index, isOn) {
  const i = index - 1;
  state.bulbs[i].on = isOn;
  await esp32Request(
    isOn ? `/shelly/${i}/on` : `/shelly/${i}/off`,
    `${t("bulb_label")} ${index} ${isOn ? "ON" : "OFF"}`
  );
  syncUI();
}

// Liga TODAS as lâmpadas de uma vez.
async function shellyAllOn() {
  state.bulbs.forEach((b, i) => {
    b.on = true;
    const tog = document.getElementById(`bulb${i+1}Toggle`);
    if (tog) tog.checked = true;
  });
  await esp32Request("/shelly/on", t("all_bulbs") + " ON");
  syncUI();
}

// Desliga TODAS as lâmpadas de uma vez.
async function shellyAllOff() {
  state.bulbs.forEach((b, i) => {
    b.on = false;
    const tog = document.getElementById(`bulb${i+1}Toggle`);
    if (tog) tog.checked = false;
  });
  await esp32Request("/shelly/off", t("all_bulbs") + " OFF");
  syncUI();
}

// Muda a cor de uma lâmpada específica.
async function applyBulbColor(index) {
  const i   = index - 1;
  const hex = document.getElementById(`bulb${index}Color`).value;
  const { r, g, b } = hexToRGB(hex);
  state.bulbs[i].color = hex;
  const bar = document.getElementById(`bulb${index}ColorBar`);
  if (bar) bar.style.background = hex;
  await esp32Request(`/shelly/${i}/color?r=${r}&g=${g}&b=${b}`);
}

// Muda o brilho de uma lâmpada específica.
async function applyBulbBrightness(index, value) {
  const i = index - 1;
  state.bulbs[i].brightness = parseInt(value);
  await esp32Request(`/shelly/${i}/brightness?value=${value}`);
}

/* ═══════════════════════════════════════════════════════════════
   EFEITOS LED
   Endpoints: /effect/rainbow|disco|fire|pulse|wave|fade|sparkle|meteor|stop
   ═══════════════════════════════════════════════════════════════ */
// Arranca um efeito na fita (rainbow, fire, etc.) e sincroniza as lâmpadas com esse efeito.
async function applyEffect(name) {
  state.effect = name;
  state.flag   = null;

  document.querySelectorAll(".effect-card").forEach(el => el.classList.remove("active"));
  const card = document.getElementById(`fx-${name}`);
  if (card) card.classList.add("active");

  document.getElementById("statEffect").textContent = capitalize(name);
  document.getElementById("statFlag").textContent   = "—";

  // Sincronizar Shelly com o efeito
  syncShellyEffect(name);

  await esp32Request(`/effect/${name}`, t("effect_activated").replace("{n}", capitalize(name)));
}

// Para o efeito que está a correr na fita.
async function stopEffect() {
  state.effect = null;
  document.querySelectorAll(".effect-card").forEach(el => el.classList.remove("active"));
  document.getElementById("statEffect").textContent = "—";
  await esp32Request("/effect/stop", t("stop_effect"));
}

/** Envia cor para as Shelly a simular o efeito */
// Faz as lâmpadas acompanharem o efeito da fita, dando-lhes cores a condizer.
async function syncShellyEffect(name) {
  const effectColors = {
    rainbow: ["#ff0000","#ff8800","#ffff00","#00ff00","#0000ff"],
    disco:   ["#ff00ff","#00ffff","#ffff00","#ff8800","#00ff88"],
    fire:    ["#ff2200","#ff6600","#ff9900","#ffcc00","#ff3300"],
    pulse:   ["#ff6a00","#ff6a00","#ff6a00","#ff6a00","#ff6a00"],
    wave:    ["#0044ff","#0088ff","#00aaff","#0088ff","#0044ff"],
    fade:    ["#ff0000","#00ff00","#0000ff","#ff00ff","#ffff00"],
    sparkle: ["#ffffff","#ffff00","#ffffff","#ffaaff","#ffffff"],
    meteor:  ["#ffffff","#aaaaff","#5555ff","#0000ff","#000088"],
  };
  const colors = effectColors[name] || ["#ff6a00","#ff6a00","#ff6a00","#ff6a00","#ff6a00"];
  SHELLY_IPS.forEach((_, i) => {
    const hex = colors[i % colors.length];
    const { r, g, b } = hexToRGB(hex);
    esp32Request(`/shelly/${i}/color?r=${r}&g=${g}&b=${b}`);
  });
}

/* ═══════════════════════════════════════════════════════════════
   BANDEIRAS
   Endpoint: GET /flag/pt | /flag/br | ... | /flag/stop
   ═══════════════════════════════════════════════════════════════ */
// Cores de cada bandeira nacional (usadas para pôr as lâmpadas a condizer com a bandeira).
const FLAG_DATA = {
  pt: { name:"Portugal",      colors:["#006600","#ffcc00","#cc0000"] },
  br: { name:"Brasil",        colors:["#009c3b","#ffdf00","#002776"] },
  es: { name:"España",        colors:["#c60b1e","#ffc400","#c60b1e"] },
  fr: { name:"France",        colors:["#002395","#ffffff","#ed2939"] },
  de: { name:"Deutschland",   colors:["#000000","#dd0000","#ffce00"] },
  it: { name:"Italia",        colors:["#009246","#ffffff","#ce2b37"] },
  gb: { name:"United Kingdom",colors:["#012169","#ffffff","#c8102e"] },
  us: { name:"USA",           colors:["#b22234","#ffffff","#3c3b6e"] },
  jp: { name:"Japan",         colors:["#ffffff","#bc002d","#ffffff"] },
};

// Arranca uma bandeira na fita e põe as lâmpadas com as cores dessa bandeira.
async function applyFlag(code) {
  state.flag   = code;
  state.effect = null;

  document.querySelectorAll(".flag-card").forEach(el => el.classList.remove("active"));
  const card = document.getElementById(`flag-${code}`);
  if (card) card.classList.add("active");
  document.querySelectorAll(".effect-card").forEach(el => el.classList.remove("active"));

  const flagInfo = FLAG_DATA[code];
  if (flagInfo) {
    document.getElementById("statFlag").textContent   = flagInfo.name;
    document.getElementById("statEffect").textContent = "—";

    // Sincronizar Shelly com as cores da bandeira
    flagInfo.colors.forEach((hex, i) => {
      if (i >= SHELLY_IPS.length) return;
      const { r, g, b } = hexToRGB(hex);
      esp32Request(`/shelly/${i}/color?r=${r}&g=${g}&b=${b}`);
      esp32Request(`/shelly/${i}/on`);
    });
  }

  await esp32Request(`/flag/${code}`, `🏳 Bandeira ${flagInfo?.name || code}`);
}

// Para a animação da bandeira.
async function stopFlag() {
  state.flag = null;
  document.querySelectorAll(".flag-card").forEach(el => el.classList.remove("active"));
  document.getElementById("statFlag").textContent = "—";
  await esp32Request("/flag/stop", t("stop_flag"));
}

/* ═══════════════════════════════════════════════════════════════
   CENAS RÁPIDAS
   ═══════════════════════════════════════════════════════════════ */
// Aplica uma 'cena' pronta (Relaxar, Foco, Festa, Noite): define cor, brilho e efeito de uma vez.
async function applyScene(scene) {
  const scenes = {
    relax: { color:"#ff7700", brightness:120, effect:null,      desc:"🌅" },
    focus: { color:"#ffffff", brightness:255, effect:null,      desc:"💡" },
    party: { color:"#ff00ff", brightness:255, effect:"rainbow", desc:"🎉" },
    night: { color:"#ff1100", brightness:30,  effect:"fade",    desc:"🌙" },
  };
  const cfg = scenes[scene];
  if (!cfg) return;

  setColor("led", cfg.color);
  document.getElementById("ledBrightness").value = cfg.brightness;
  updateBrightLabel(cfg.brightness, "ledBrightVal");
  await esp32Request(`/led/brightness?value=${cfg.brightness}`);

  if (cfg.effect) await applyEffect(cfg.effect);
  else await stopEffect();

  // Ligar LEDs
  document.getElementById("ledToggle").checked = true;
  await toggleLED(true);

  showToast(`${cfg.desc} ${t("scene_" + scene)}`, "success");
}

/* ═══════════════════════════════════════════════════════════════
   CONTROLO MESTRE
   ═══════════════════════════════════════════════════════════════ */
// Botão mestre: liga ou desliga tudo (fita + lâmpadas) ao mesmo tempo.
async function masterToggle() {
  state.master = !state.master;
  document.getElementById("masterBtn").classList.toggle("on", state.master);

  if (state.master) {
    document.getElementById("ledToggle").checked = true;
    await toggleLED(true);
    await shellyAllOn();
  } else {
    document.getElementById("ledToggle").checked = false;
    await toggleLED(false);
    await shellyAllOff();
    await stopEffect();
  }
}

/* ═══════════════════════════════════════════════════════════════
   NAVEGAÇÃO
   ═══════════════════════════════════════════════════════════════ */
// Títulos de cada secção da app (Dashboard, Fita, Lâmpadas...).
const SECTION_META = {
  dashboard: { title:"Dashboard",         sub:"stat_strip" },
  strip:     { title:"nav_strip",         sub:"" },
  bulbs:     { title:"nav_bulbs",         sub:"" },
  effects:   { title:"nav_effects",       sub:"" },
  flags:     { title:"nav_flags",         sub:"" },
  settings:  { title:"settings_title",    sub:"" },
  about:     { title:"nav_about",         sub:"" },
};

// Troca a secção visível na app quando se clica no menu lateral.
function showSection(name, navEl) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  const target = document.getElementById(`section-${name}`);
  if (target) target.classList.remove("hidden");

  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  if (navEl) navEl.classList.add("active");

  const meta = SECTION_META[name];
  if (meta) {
    document.getElementById("pageTitle").textContent = t(meta.title) || meta.title;
    document.getElementById("pageSub").textContent   = meta.sub ? t(meta.sub) : "";
  }

  if (window.innerWidth <= 700) toggleSidebar(false);
  if (window.lucide) lucide.createIcons();
}

// Abre/fecha o menu lateral (usado sobretudo no telemóvel).
function toggleSidebar(forceClose) {
  const sidebar  = document.getElementById("sidebar");
  const overlay  = document.getElementById("overlay");
  const isOpen   = sidebar.classList.contains("open");

  if (forceClose === false || isOpen) {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  } else {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  }
}

/* ═══════════════════════════════════════════════════════════════
   SISTEMA DE TRADUÇÕES
   ═══════════════════════════════════════════════════════════════ */
// Devolve o texto traduzido para a língua atual. Se não existir, devolve a própria chave.
function t(key) {
  return (TRANSLATIONS[state.lang] || TRANSLATIONS.pt)[key] || key;
}

// Muda a língua da app e volta a desenhar tudo traduzido.
function setLang(lang) {
  state.lang = lang;

  // Atualizar botões ativos
  document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
  const flags = { pt:"🇵🇹", en:"🇬🇧", de:"🇩🇪", fr:"🇫🇷", es:"🇪🇸" };
  document.querySelectorAll(".lang-btn").forEach(btn => {
    Object.entries(flags).forEach(([l, f]) => {
      if (btn.textContent.trim() === f) btn.classList.toggle("active", l === lang);
    });
  });

  applyTranslations();
  buildBulbCards(); // recriar com nova língua
  buildShellyIpFields();
  syncUI();
  if (window.lucide) lucide.createIcons();
}

// Percorre a página e substitui os textos pela tradução da língua escolhida.
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val && val !== key) el.textContent = val;
  });

  // Status text
  const statusText = document.getElementById("statusText");
  if (statusText) {
    statusText.textContent = state.esp32Ok ? `${t("connected")} — ${ESP32_IP}` : t("connecting");
  }
}

/* ═══════════════════════════════════════════════════════════════
   SINCRONIZAÇÃO DA INTERFACE
   ═══════════════════════════════════════════════════════════════ */
// Atualiza o ecrã para refletir o estado atual (cores, ON/OFF, contadores...).
function syncUI() {
  // LED stat
  const ledStatus = document.getElementById("statLedStatus");
  const ledDot    = document.getElementById("statLedDot");
  if (ledStatus) ledStatus.textContent = state.led.on ? "ON" : "OFF";
  if (ledDot)    ledDot.classList.toggle("on", state.led.on);

  // Bulbs stat
  const onCount   = state.bulbs.filter(b => b.on).length;
  const bulbsOn   = document.getElementById("statBulbsOn");
  const bulbsDot  = document.getElementById("statBulbsDot");
  if (bulbsOn)  bulbsOn.textContent = `${onCount}/${SHELLY_IPS.length}`;
  if (bulbsDot) bulbsDot.classList.toggle("on", onCount > 0);

  // Quick preview
  const qPreview = document.getElementById("qLedPreview");
  if (qPreview) qPreview.style.background = state.led.color;

  // Ícones das lâmpadas
  SHELLY_IPS.forEach((_, i) => {
    const icon = document.getElementById(`bulbIcon${i+1}`);
    if (icon) icon.classList.toggle("on", state.bulbs[i].on);
  });

  // Color bars
  updateColorBars();

  // IPs nas definições
  const dispEsp = document.getElementById("displayEspIp");
  if (dispEsp) dispEsp.textContent = ESP32_IP;
}

// Atualiza as barrinhas de cor que aparecem por baixo de cada controlo.
function updateColorBars() {
  const bar = document.getElementById("ledColorBar");
  if (bar) bar.style.background = state.led.color;

  SHELLY_IPS.forEach((_, i) => {
    const b = document.getElementById(`bulb${i+1}ColorBar`);
    if (b) b.style.background = state.bulbs[i].color;
  });
}

/* ═══════════════════════════════════════════════════════════════
   DEFINIÇÕES — CAMPOS DE IP
   ═══════════════════════════════════════════════════════════════ */
// Cria os campos das Definições onde se veem/editam os IPs das lâmpadas.
function buildShellyIpFields() {
  const container = document.getElementById("shellyIpFields");
  if (!container) return;

  container.innerHTML = SHELLY_IPS.map((ip, i) => {
    const n = i + 1;
    return `
    <div class="settings-field">
      <label>${t("bulb_label")} ${n}</label>
      <div class="settings-row">
        <code class="code-tag" id="displayBulb${n}Ip">${ip}</code>
        <button class="btn-edit" onclick="editBulbIp(${n})">${t("edit")}</button>
      </div>
      <input type="text" class="settings-input hidden" id="bulb${n}IpInput"
        placeholder="${ip}" onblur="saveBulbIp(${n}, this.value)" />
    </div>`;
  }).join("");
}

// Mostra a caixa para editar o IP do ESP32.
function editEspIp() {
  const input = document.getElementById("espIpInput");
  input.value = ESP32_IP;
  input.classList.remove("hidden");
  input.focus();
}

// Guarda o novo IP do ESP32 (só nesta sessão).
function saveEspIp(value) {
  if (value && value.startsWith("http")) {
    document.getElementById("displayEspIp").textContent = value;
    document.getElementById("espIpInput").classList.add("hidden");
    showToast(`ESP32 — ${t("ip_updated")}`, "info");
  }
}

// Mostra a caixa para editar o IP de uma lâmpada.
function editBulbIp(index) {
  const input = document.getElementById(`bulb${index}IpInput`);
  input.value = SHELLY_IPS[index - 1] || "";
  input.classList.remove("hidden");
  input.focus();
}

// Guarda o novo IP de uma lâmpada.
function saveBulbIp(index, value) {
  if (value) {
    SHELLY_IPS[index - 1] = value;
    const disp = document.getElementById(`displayBulb${index}Ip`);
    if (disp) disp.textContent = value;
    document.getElementById(`bulb${index}IpInput`).classList.add("hidden");
    const lbl = document.getElementById(`bulbIpLabel${index}`);
    if (lbl) lbl.textContent = value;
    showToast(`${t("bulb_label")} ${index} — ${t("ip_updated")}`, "info");
  }
}

/* ═══════════════════════════════════════════════════════════════
   ESTADO DE LIGAÇÃO
   ═══════════════════════════════════════════════════════════════ */
// Atualiza o indicador de ligação (verde = ligado, vermelho = inacessível).
function setConnectionStatus(ok) {
  state.esp32Ok = ok;
  const dot  = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  if (!dot || !text) return;
  dot.className  = "status-dot" + (ok ? " connected" : "");
  text.textContent = ok ? `${t("connected")} — ${ESP32_IP}` : t("disconnected");
}

/* ═══════════════════════════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════════════════════════ */
let toastTimer = null;

// Mostra uma mensagem breve no canto do ecrã (sucesso, erro ou info).
function showToast(msg, type = "info", ms = 3000) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.className   = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), ms);
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
// Aplica uma cor escolhida (do seletor ou de um swatch) à fita ou a uma lâmpada.
function setColor(target, hex) {
  if (target === "led") {
    document.getElementById("ledColor").value = hex;
    state.led.color = hex;
    applyLEDColor();
  } else {
    // ex: "bulb1", "bulb3"
    const match = target.match(/bulb(\d+)/);
    if (match) {
      const n = parseInt(match[1]);
      const el = document.getElementById(`bulb${n}Color`);
      if (el) el.value = hex;
      state.bulbs[n - 1].color = hex;
      applyBulbColor(n);
    }
  }
}

// Atualiza o número do brilho que aparece ao lado do slider.
function updateBrightLabel(value, elementId) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = value;
}

// Converte uma cor de formato hex (#ff6a00) para valores separados r, g, b.
function hexToRGB(hex) {
  const c = hex.replace("#","");
  return {
    r: parseInt(c.substring(0,2), 16),
    g: parseInt(c.substring(2,4), 16),
    b: parseInt(c.substring(4,6), 16),
  };
}

// Põe a primeira letra de uma palavra em maiúscula.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ═══════════════════════════════════════════════════════════════
   DEFINIÇÕES — Password Wi-Fi + Modo Offline
   ═══════════════════════════════════════════════════════════════ */

let wifiPassVisible = false;
let offlineModeActive = false;

// Mostra/oculta a password do Wi-Fi nas Definições.
function toggleWifiPass() {
  const display = document.getElementById("displayWifiPass");
  const input   = document.getElementById("wifiPassInput");
  wifiPassVisible = !wifiPassVisible;
  if (wifiPassVisible) {
    input.classList.remove("hidden");
    input.focus();
    display.textContent = input.value || "••••••••";
  } else {
    input.classList.add("hidden");
    display.textContent = "••••••••";
  }
}

// Guarda a password do Wi-Fi escrita nas Definições.
function saveWifiPass(value) {
  const display = document.getElementById("displayWifiPass");
  if (value) {
    display.textContent = "••••••••";
    showToast("⚠️ Alterar no esp32_code.ino e regravar", "info", 4000);
  }
  document.getElementById("wifiPassInput").classList.add("hidden");
  wifiPassVisible = false;
}

// Liga/desliga o modo offline (demonstração sem ESP32 ligado).
function toggleOfflineMode(isOn) {
  offlineModeActive = isOn;
  const label = document.getElementById("offlineModeLabel");
  if (label) label.textContent = isOn ? "Ativado — modo demonstração" : "Desativado";
  showToast(isOn ? "📶 Modo offline ativado" : "📶 Modo offline desativado", "info");
  // ➕ ACRESCENTO v2.1 — atualizar o indicador de ligação imediatamente
  if (isOn) setDemoStatus();
  else checkConnection();
}

// ➕ ACRESCENTO v2.1 — estado visual "modo demonstração" na sidebar
// Coloca o indicador em modo 'demonstração'.
function setDemoStatus() {
  state.esp32Ok = true;
  const dot  = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  if (dot)  dot.className = "status-dot connecting";
  if (text) text.textContent = "🧪 Modo demonstração";
}

/* ═══════════════════════════════════════════════════════════════
   PASSWORD DE ACESSO À APP
   ═══════════════════════════════════════════════════════════════ */

// Mostra a caixa para alterar a password de entrada da app.
function editAppPass() {
  const input = document.getElementById("appPassInput");
  input.classList.remove("hidden");
  input.value = "";
  input.focus();
}

// Guarda a nova password de entrada da app.
function saveAppPass(value) {
  const input   = document.getElementById("appPassInput");
  const display = document.getElementById("displayAppPass");
  input.classList.add("hidden");
  if (value && value.length >= 4) {
    localStorage.setItem("fluxlight_pass", value);
    display.textContent = "••••••••";
    showToast("🔐 Password de acesso atualizada", "success");
  } else if (value) {
    showToast("❌ Password demasiado curta (mín. 4 caracteres)", "error");
  }
}

/* ═══════════════════════════════════════════════════════════════
   PASSWORD DE ACESSO — Sistema completo
   ═══════════════════════════════════════════════════════════════ */

// Password de entrada por defeito da app (1234).
const DEFAULT_PASS = "1234";

// Devolve a password de entrada atual (a guardada ou a de defeito).
function getAppPassword() {
  return localStorage.getItem("fluxlight_pass") || DEFAULT_PASS;
}

// Trata da mudança de password: valida a atual, confirma a nova e guarda.
function changeAppPassword() {
  const current  = document.getElementById("currentPassInput").value;
  const newPass  = document.getElementById("newPassInput").value;
  const confirm  = document.getElementById("confirmPassInput").value;
  const msgEl    = document.getElementById("passChangeMsg");

  msgEl.style.display = "block";

  if (!current || !newPass || !confirm) {
    msgEl.style.color = "var(--off)";
    msgEl.textContent = "❌ Preenche todos os campos.";
    return;
  }

  if (current !== getAppPassword()) {
    msgEl.style.color = "var(--off)";
    msgEl.textContent = "❌ Password atual incorreta.";
    return;
  }

  if (newPass.length < 4) {
    msgEl.style.color = "var(--off)";
    msgEl.textContent = "❌ A nova password deve ter pelo menos 4 caracteres.";
    return;
  }

  if (newPass !== confirm) {
    msgEl.style.color = "var(--off)";
    msgEl.textContent = "❌ As passwords não coincidem.";
    return;
  }

  localStorage.setItem("fluxlight_pass", newPass);
  msgEl.style.color = "var(--on)";
  msgEl.textContent = "✅ Password alterada com sucesso!";

  document.getElementById("currentPassInput").value = "";
  document.getElementById("newPassInput").value = "";
  document.getElementById("confirmPassInput").value = "";

  showToast("🔐 Password de acesso atualizada", "success");

  setTimeout(() => { msgEl.style.display = "none"; }, 3000);
}

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.1 — LOCK SCREEN (Password de Acesso à App)
   Usa getAppPassword() já definida acima (defeito: 1234)
   ═══════════════════════════════════════════════════════════════ */

// Prepara o ecrã de bloqueio (login) que aparece ao abrir a app.
function initLockScreen() {
  const lock = document.getElementById("lockScreen");
  if (!lock) return;

  // Se já foi desbloqueado nesta sessão do browser, não pede outra vez
  if (sessionStorage.getItem("fluxlight_unlocked") === "1") {
    lock.remove();
    return;
  }

  // Focar o campo assim que o splash desaparecer
  setTimeout(() => {
    const input = document.getElementById("lockPassInput");
    if (input) input.focus();
  }, 3400);
}

// Verifica a password escrita no login e, se estiver certa, entra na app.
function tryUnlock() {
  const input  = document.getElementById("lockPassInput");
  const errEl  = document.getElementById("lockError");
  const form   = document.getElementById("lockForm");
  const lock   = document.getElementById("lockScreen");
  if (!input || !lock) return;

  if (input.value === getAppPassword()) {
    sessionStorage.setItem("fluxlight_unlocked", "1");
    lock.classList.add("hidden");
    setTimeout(() => lock.remove(), 700);
    showToast("🔓 Bem-vindo ao FluxLight!", "success");
  } else {
    if (errEl) errEl.classList.add("show");
    if (form) {
      form.classList.remove("shake");
      void form.offsetWidth; // reiniciar a animação
      form.classList.add("shake");
    }
    input.value = "";
    input.focus();
    setTimeout(() => { if (errEl) errEl.classList.remove("show"); }, 2500);
  }
}

// Inicializar o lock screen (listener adicional — não mexe no existente)
document.addEventListener("DOMContentLoaded", initLockScreen);

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.2 — LOCK: mostrar/ocultar password (olho 👁)
   ═══════════════════════════════════════════════════════════════ */

// Mostra/oculta a password no ecrã de login (ícone do olho 👁).
function toggleLockPassVisibility() {
  const input = document.getElementById("lockPassInput");
  const icon  = document.getElementById("lockEyeIcon");
  if (!input) return;
  const showing = input.type === "text";
  input.type = showing ? "password" : "text";
  if (icon) {
    icon.setAttribute("data-lucide", showing ? "eye" : "eye-off");
    if (window.lucide) lucide.createIcons();
  }
  input.focus();
}

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.2 — 🎤 CONTROLO POR VOZ (Web Speech API)
   ───────────────────────────────────────────────────────────────
   Comandos suportados (PT + EN + DE/FR/ES básicos):
   · "ligar tudo" / "desligar tudo"
   · "ligar fita" / "desligar fita"
   · "ligar lâmpadas" / "desligar lâmpadas"
   · "ligar lâmpada 3" / "desligar lâmpada 2"
   · "brilho 200"            → fita (escala real 0–255)
   · "lâmpada 2 brilho 50"   → lâmpada (escala 0–100%)
   · "cor vermelho" / "fita azul" / "lâmpada 1 verde"
   · "efeito rainbow|disco|fogo|pulse|onda|fade|sparkle|meteoro"
   · "parar efeito" / "parar bandeira" / "parar"
   · "bandeira portugal|brasil|espanha|frança|alemanha|itália|
      reino unido|eua|japão"
   · "cena festa|relaxar|foco|noite"
   ═══════════════════════════════════════════════════════════════ */

// Estado do controlo por voz (ligado/desligado) e o objeto de reconhecimento.
let voiceActive      = false;
let voiceRecognition = null;

// Código de idioma para o reconhecimento de voz em cada língua.
const VOICE_LOCALES = { pt:"pt-PT", en:"en-GB", de:"de-DE", fr:"fr-FR", es:"es-ES" };

// Remove acentos e põe em minúsculas para comparar comandos
// Normaliza o texto reconhecido (minúsculas, sem acentos) para ser mais fácil de comparar.
function vNorm(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

/* ─── Pílula visual "a ouvir..." ─── */
// Garante que existe a 'bolha' onde aparece o texto reconhecido por voz.
function ensureVoicePill() {
  let pill = document.getElementById("voicePill");
  if (!pill) {
    pill = document.createElement("div");
    pill.className = "voice-pill";
    pill.id = "voicePill";
    pill.innerHTML = `<span class="voice-dot"></span><span id="voicePillText">🎤 A ouvir...</span>`;
    document.body.appendChild(pill);
  }
  return pill;
}

// Mostra na bolha o que a app percebeu que foi dito.
function showVoicePill(text) {
  const pill = ensureVoicePill();
  const t = document.getElementById("voicePillText");
  if (t) t.innerHTML = text;
  pill.classList.add("show");
}

// Esconde a bolha do controlo por voz.
function hideVoicePill() {
  const pill = document.getElementById("voicePill");
  if (pill) pill.classList.remove("show");
}

/* ─── Resposta falada ─── */
// Faz a app 'falar' de volta (resposta por voz).
function voiceSay(text) {
  try {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = VOICE_LOCALES[state.lang] || "pt-PT";
    u.rate = 1.05;
    speechSynthesis.speak(u);
  } catch (e) { /* silencioso */ }
}

/* ─── Ligar/desligar o microfone ─── */
// Liga/desliga o microfone e o reconhecimento de voz (Web Speech API).
function toggleVoiceControl() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const btn = document.getElementById("micBtn");

  if (!SR) {
    if (btn) btn.classList.add("unsupported");
    showToast("❌ Este browser não suporta reconhecimento de voz. Usa Chrome/Edge.", "error", 4500);
    return;
  }

  if (voiceActive) {
    voiceActive = false;
    if (voiceRecognition) try { voiceRecognition.stop(); } catch (e) {}
    if (btn) btn.classList.remove("listening");
    hideVoicePill();
    showToast("🎤 Controlo por voz desativado", "info");
    return;
  }

  voiceActive = true;
  if (btn) btn.classList.add("listening");
  showVoicePill(t("voice_listening"));
  showToast("🎤 Controlo por voz ativado — diz um comando", "success");

  voiceRecognition = new SR();
  voiceRecognition.lang = VOICE_LOCALES[state.lang] || "pt-PT";
  voiceRecognition.continuous = true;
  voiceRecognition.interimResults = true;

  voiceRecognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    const text   = result[0].transcript;
    showVoicePill(`🎤 <em>"${text}"</em>`);
    if (result.isFinal) handleVoiceCommand(text);
  };

  voiceRecognition.onerror = (e) => {
    if (e.error === "not-allowed") {
      showToast("❌ Microfone bloqueado — permite o acesso nas definições do browser", "error", 5000);
      voiceActive = false;
      if (btn) btn.classList.remove("listening");
      hideVoicePill();
    }
  };

  // Reiniciar automaticamente enquanto estiver ativo
  voiceRecognition.onend = () => {
    if (voiceActive) {
      try { voiceRecognition.start(); } catch (e) {}
    }
  };

  try { voiceRecognition.start(); } catch (e) {}
}

/* ─── Interpretar o comando ─── */
// CÉREBRO DA VOZ: interpreta o que foi dito e executa a ação certa (ligar, cor, efeito, bandeira...).
async function handleVoiceCommand(raw) {
  const cmd = vNorm(raw);
  console.log("[Voz]", cmd);

  // Número dito no comando (dígitos ou palavras comuns em PT)
  const num = extractVoiceNumber(cmd);

  /* ══ 1. TUDO ══
     IMPORTANTE: verificar DESLIGAR primeiro — "desliga tudo" contém "liga tudo",
     por isso se testássemos "ligar" primeiro, apanhava o comando errado. */
  if (matchAny(cmd, ["desligar tudo","apagar tudo","desliga tudo","apaga tudo","turn everything off","turn all off","everything off","all off","alles aus","tout eteindre","apagar todo","apaga todo"])) {
    if (state.master) await masterToggle();
    else { document.getElementById("ledToggle").checked = false; await toggleLED(false); await shellyAllOff(); await stopEffect(); }
    state.master = false;
    document.getElementById("masterBtn").classList.remove("on");
    return voiceOK("🌑 Tudo desligado", "Tudo desligado");
  }
  if (matchAny(cmd, ["ligar tudo","acender tudo","liga tudo","acende tudo","turn everything on","turn all on","everything on","all on","alles an","tout allumer","encender todo","enciende todo"])) {
    if (!state.master) await masterToggle();
    else { document.getElementById("ledToggle").checked = true; await toggleLED(true); await shellyAllOn(); }
    state.master = true;
    document.getElementById("masterBtn").classList.add("on");
    return voiceOK("💡 Tudo ligado", "Tudo ligado");
  }

  /* ══ 2. LÂMPADA INDIVIDUAL (antes da fita, porque "lampada" pode conter número) ══ */
  const bulbMatch = cmd.match(/(?:lampada|bulb|lampe|ampoule|bombilla)\s*(\d+)/);
  if (bulbMatch) {
    const n = parseInt(bulbMatch[1]);
    if (n >= 1 && n <= SHELLY_IPS.length) {
      // brilho da lâmpada (0–100)
      if (matchAny(cmd, ["brilho","brightness","helligkeit","luminosite","brillo"]) && num !== null) {
        const v = Math.max(0, Math.min(100, num));
        const slider = document.getElementById(`bulb${n}Brightness`);
        if (slider) { slider.value = v; updateBrightLabel(v, `bulb${n}BrightVal`); }
        await applyBulbBrightness(n, v);
        return voiceOK(`💡 Lâmpada ${n} — brilho ${v}%`, `Lâmpada ${n}, brilho ${v} por cento`);
      }
      // cor da lâmpada
      const bulbColor = extractVoiceColor(cmd);
      if (bulbColor) {
        setColor(`bulb${n}`, bulbColor.hex);
        return voiceOK(`🎨 Lâmpada ${n} — ${bulbColor.nome}`, `Lâmpada ${n} em ${bulbColor.nome}`);
      }
      // ligar/desligar a lâmpada
      if (matchAny(cmd, ["desligar","apagar","off","aus","eteindre","apagar"])) {
        const tog = document.getElementById(`bulb${n}Toggle`); if (tog) tog.checked = false;
        await toggleBulb(n, false);
        return voiceOK(`💡 Lâmpada ${n} OFF`, `Lâmpada ${n} desligada`);
      }
      const tog = document.getElementById(`bulb${n}Toggle`); if (tog) tog.checked = true;
      await toggleBulb(n, true);
      return voiceOK(`💡 Lâmpada ${n} ON`, `Lâmpada ${n} ligada`);
    }
  }

  /* ══ 3. TODAS AS LÂMPADAS ══ */
  if (matchAny(cmd, ["ligar lampadas","acender lampadas","liga as lampadas","ligar as lampadas","bulbs on","lampen an","ampoules","encender bombillas"]) && !matchAny(cmd, ["desligar","apagar","off"])) {
    await shellyAllOn();
    return voiceOK("💡 Lâmpadas ligadas", "Lâmpadas ligadas");
  }
  if (matchAny(cmd, ["desligar lampadas","apagar lampadas","desligar as lampadas","bulbs off","lampen aus","apagar bombillas"])) {
    await shellyAllOff();
    return voiceOK("💡 Lâmpadas desligadas", "Lâmpadas desligadas");
  }

  /* ══ 4. BRILHO DA FITA (escala real 0–255) ══ */
  if (matchAny(cmd, ["brilho","brightness","helligkeit","luminosite","brillo"])) {
    let v = null;
    if (matchAny(cmd, ["maximo","max","maximum"])) v = 255;
    else if (matchAny(cmd, ["minimo","min","minimum"])) v = 10;
    else if (matchAny(cmd, ["metade","half","halfte","moitie","mitad"])) v = 128;
    else if (num !== null) v = num;
    if (v !== null) {
      v = Math.max(0, Math.min(255, v));   // corresponde à escala 0–255 do slider
      const slider = document.getElementById("ledBrightness");
      if (slider) { slider.value = v; updateBrightLabel(v, "ledBrightVal"); }
      await applyLEDBrightness(v);
      return voiceOK(`🔆 Brilho da fita: ${v}/255`, `Brilho ${v}`);
    }
  }

  /* ══ 5. BANDEIRAS ══ */
  const flagVoice = {
    pt:["portugal"], br:["brasil","brazil"], es:["espanha","spain","espana","espagne","spanien"],
    fr:["franca","france","frankreich","francia"], de:["alemanha","germany","deutschland","allemagne","alemania"],
    it:["italia","italy","italie","italien"], gb:["reino unido","inglaterra","united kingdom","england","uk"],
    us:["eua","estados unidos","usa","america","vereinigte staaten","etats unis"], jp:["japao","japan","japon"],
  };
  if (matchAny(cmd, ["bandeira","flag","flagge","drapeau","bandera"])) {
    if (matchAny(cmd, ["parar","stop","arreter","detener"])) {
      await stopFlag();
      return voiceOK("🏳 Bandeira parada", "Bandeira parada");
    }
    for (const [code, names] of Object.entries(flagVoice)) {
      if (matchAny(cmd, names)) {
        await applyFlag(code);
        return voiceOK(`🏳 Bandeira ${FLAG_DATA[code]?.name || code}`, `Bandeira ${FLAG_DATA[code]?.name || code}`);
      }
    }
  }

  /* ══ 6. EFEITOS ══ */
  const fxVoice = {
    rainbow:["rainbow","arco iris","arco-iris","regenbogen","arc en ciel","arcoiris"],
    disco:["disco"], fire:["fire","fogo","feuer","feu","fuego","chama"],
    pulse:["pulse","pulsar","pulso","impuls"], wave:["wave","onda","welle","vague","ola"],
    fade:["fade","transicao","fondu"], sparkle:["sparkle","faisca","faiscas","funken","etincelle","chispas"],
    meteor:["meteor","meteoro","meteore","meteorito"],
  };
  if (matchAny(cmd, ["parar efeito","stop effect","efeito parar","effekt stoppen","arreter effet","detener efecto"])) {
    await stopEffect();
    return voiceOK("⏹ Efeito parado", "Efeito parado");
  }
  for (const [name, words] of Object.entries(fxVoice)) {
    if (matchAny(cmd, words)) {
      await applyEffect(name);
      return voiceOK(`✨ Efeito ${capitalize(name)}`, `Efeito ${name}`);
    }
  }

  /* ══ 7. CENAS ══ */
  const sceneVoice = {
    relax:["relaxar","relax","entspannen","detente","relajar"],
    focus:["foco","focus","fokus","concentration"],
    party:["festa","party","fete","fiesta"],
    night:["noite","night","nacht","nuit","noche"],
  };
  for (const [scene, words] of Object.entries(sceneVoice)) {
    if (matchAny(cmd, words)) {
      await applyScene(scene);
      return voiceOK(`🎬 Cena ${t("scene_" + scene)}`, `Cena ${t("scene_" + scene)}`);
    }
  }

  /* ══ 8. COR DA FITA ══ */
  const cor = extractVoiceColor(cmd);
  if (cor) {
    setColor("led", cor.hex);
    return voiceOK(`🎨 Fita em ${cor.nome}`, `Cor ${cor.nome}`);
  }

  /* ══ 9. FITA LED ON/OFF (desligar primeiro — "desligar" contém "ligar") ══ */
  if (matchAny(cmd, ["desligar fita","apagar fita","desliga a fita","desliga fita","desligar led","desligar luz","apagar luz","strip off","led off","licht aus","eteindre","apagar tira"])) {
    document.getElementById("ledToggle").checked = false;
    await toggleLED(false);
    return voiceOK("⚡ Fita LED desligada", "Fita desligada");
  }
  if (matchAny(cmd, ["ligar fita","acender fita","liga a fita","liga fita","ligar led","ligar luz","acender luz","strip on","led on","licht an","allumer","encender tira","encender luz"])) {
    document.getElementById("ledToggle").checked = true;
    await toggleLED(true);
    return voiceOK("⚡ Fita LED ligada", "Fita ligada");
  }

  /* ══ 10. PARAR GENÉRICO ══ */
  if (matchAny(cmd, ["parar","stop","stoppen","arreter","detener"])) {
    await stopEffect(); await stopFlag();
    return voiceOK("⏹ Tudo parado", "Parado");
  }

  // Não reconhecido
  showVoicePill(`❓ ${t("voice_unknown")}: <em>"${raw}"</em>`);
  setTimeout(() => { if (voiceActive) showVoicePill(t("voice_listening")); }, 2200);
}

/* ─── Helpers de voz ─── */
// Verifica se o comando de voz contém alguma das palavras-chave de uma lista.
function matchAny(cmd, list) {
  return list.some(w => cmd.includes(vNorm(w)));
}

// Tenta encontrar um número no comando de voz (ex: brilho 80).
function extractVoiceNumber(cmd) {
  const d = cmd.match(/\d+/);
  if (d) return parseInt(d[0]);
  // Palavras comuns em PT (o reconhecimento normalmente já devolve dígitos)
  const words = { "zero":0,"dez":10,"vinte":20,"trinta":30,"quarenta":40,"cinquenta":50,
                  "sessenta":60,"setenta":70,"oitenta":80,"noventa":90,"cem":100,"duzentos":200 };
  for (const [w, v] of Object.entries(words)) if (cmd.includes(w)) return v;
  return null;
}

// Tenta encontrar uma cor no comando de voz (ex: 'vermelho').
function extractVoiceColor(cmd) {
  const cores = [
    { nome:"vermelho", hex:"#ff0000", words:["vermelho","red","rot","rouge","rojo"] },
    { nome:"laranja",  hex:"#ff6a00", words:["laranja","orange","naranja"] },
    { nome:"amarelo",  hex:"#ffff00", words:["amarelo","yellow","gelb","jaune","amarillo"] },
    { nome:"verde",    hex:"#00ff00", words:["verde","green","grun","vert"] },
    { nome:"ciano",    hex:"#00bfff", words:["ciano","cyan","turquesa"] },
    { nome:"azul",     hex:"#0000ff", words:["azul","blue","blau","bleu"] },
    { nome:"roxo",     hex:"#8a2be2", words:["roxo","violeta","purple","lila","violet","morado"] },
    { nome:"rosa",     hex:"#ff69b4", words:["rosa","pink","rose"] },
    { nome:"branco",   hex:"#ffffff", words:["branco","white","weiss","blanc","blanco"] },
  ];
  // Só considerar cor se houver intenção ("cor", "fita", nome direto)
  for (const c of cores) {
    if (matchAny(cmd, c.words)) return c;
  }
  return null;
}

// Confirma um comando de voz (mostra toast + responde por voz).
function voiceOK(toastMsg, spoken) {
  showToast(toastMsg, "success");
  showVoicePill(`✅ ${toastMsg}`);
  voiceSay(spoken);
  setTimeout(() => { if (voiceActive) showVoicePill(t("voice_listening")); }, 2200);
}

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.5 — NOVAS CHAVES DE TRADUÇÃO (5 línguas)
   (Object.assign acrescenta sem tocar nos objetos originais)
   ═══════════════════════════════════════════════════════════════ */
Object.assign(TRANSLATIONS.pt, {
  add_strip:"Adicionar Fita LED", add_bulb:"Adicionar Lâmpada", add_flag:"Adicionar Bandeira",
  new_strip_prompt:"IP do ESP32 da nova fita (ex: http://192.168.1.120):",
  new_bulb_prompt:"IP da nova lâmpada Shelly:",
  flag_editor_title:"Nova Bandeira", flag_name_ph:"Nome da bandeira",
    flag_colors:"Cores da bandeira", add_color:"Adicionar cor",
  save:"Guardar", cancel:"Cancelar", remove:"Remover",
  added:"adicionada", removed:"removida",
  wifi_pass_title:"Password Wi-Fi", pass_current:"Password atual",
  show:"Mostrar", hide:"Ocultar",
  offline_title:"Modo Offline",
  offline_desc:"Quando o ESP32 não está acessível, a interface continua a funcionar em modo demonstração.",
  state_label:"Estado", off_label:"Desativado", demo_on:"Ativado — modo demonstração",
  pass_access:"Password de Acesso",
  pass_access_desc:"Password utilizada para entrar na app FluxLight. Por defeito:",
  pass_new:"Nova password", pass_confirm:"Confirmar nova password", save_pass:"Guardar Password",
  pass_fill:"❌ Preenche todos os campos.", pass_wrong:"❌ Password atual incorreta.",
  pass_short:"❌ A nova password deve ter pelo menos 4 caracteres.",
  pass_mismatch:"❌ As passwords não coincidem.", pass_ok:"✅ Password alterada com sucesso!",
  ino_note:"⚠️ Alterar no esp32_code.ino e regravar",
  session_note:"atualizado (sessão atual)",
  lock_sub:"Acesso Restrito", lock_enter:"Entrar", lock_hint:"Password predefinida:",
  lock_error:"❌ Password incorreta",
  voice_listening:t("voice_listening"), voice_unknown:"❓ Não percebi:",
});
Object.assign(TRANSLATIONS.en, {
  add_strip:"Add LED Strip", add_bulb:"Add Bulb", add_flag:"Add Flag",
  new_strip_prompt:"ESP32 IP of the new strip (e.g. http://192.168.1.120):",
  new_bulb_prompt:"IP of the new Shelly bulb:",
  flag_editor_title:"New Flag", flag_name_ph:"Flag name",
    flag_colors:"Flag colors", add_color:"Add color",
  save:"Save", cancel:"Cancel", remove:"Remove",
  added:"added", removed:"removed",
  wifi_pass_title:"Wi-Fi Password", pass_current:"Current password",
  show:"Show", hide:"Hide",
  offline_title:"Offline Mode",
  offline_desc:"When the ESP32 is unreachable, the interface keeps working in demo mode.",
  state_label:"State", off_label:"Disabled", demo_on:"Enabled — demo mode",
  pass_access:"Access Password",
  pass_access_desc:"Password used to enter the FluxLight app. Default:",
  pass_new:"New password", pass_confirm:"Confirm new password", save_pass:"Save Password",
  pass_fill:"❌ Fill in all fields.", pass_wrong:"❌ Current password is incorrect.",
  pass_short:"❌ New password must be at least 4 characters.",
  pass_mismatch:"❌ Passwords don't match.", pass_ok:"✅ Password changed successfully!",
  ino_note:"⚠️ Change in esp32_code.ino and re-flash",
  session_note:"updated (current session)",
  lock_sub:"Restricted Access", lock_enter:"Enter", lock_hint:"Default password:",
  lock_error:"❌ Wrong password",
  voice_listening:"🎤 Listening... say a command", voice_unknown:"❓ Didn't catch:",
});
Object.assign(TRANSLATIONS.de, {
  add_strip:"LED-Streifen hinzufügen", add_bulb:"Lampe hinzufügen", add_flag:"Flagge hinzufügen",
  new_strip_prompt:"ESP32-IP des neuen Streifens (z.B. http://192.168.1.120):",
  new_bulb_prompt:"IP der neuen Shelly-Lampe:",
  flag_editor_title:"Neue Flagge", flag_name_ph:"Name der Flagge",
    flag_colors:"Flaggenfarben", add_color:"Farbe hinzufügen",
  save:"Speichern", cancel:"Abbrechen", remove:"Entfernen",
  added:"hinzugefügt", removed:"entfernt",
  wifi_pass_title:"WLAN-Passwort", pass_current:"Aktuelles Passwort",
  show:"Anzeigen", hide:"Verbergen",
  offline_title:"Offline-Modus",
  offline_desc:"Wenn der ESP32 nicht erreichbar ist, funktioniert die Oberfläche im Demo-Modus weiter.",
  state_label:"Status", off_label:"Deaktiviert", demo_on:"Aktiviert — Demo-Modus",
  pass_access:"Zugangspasswort",
  pass_access_desc:"Passwort für den Zugang zur FluxLight-App. Standard:",
  pass_new:"Neues Passwort", pass_confirm:"Neues Passwort bestätigen", save_pass:"Passwort speichern",
  pass_fill:"❌ Alle Felder ausfüllen.", pass_wrong:"❌ Aktuelles Passwort falsch.",
  pass_short:"❌ Neues Passwort muss mindestens 4 Zeichen haben.",
  pass_mismatch:"❌ Passwörter stimmen nicht überein.", pass_ok:"✅ Passwort erfolgreich geändert!",
  ino_note:"⚠️ In esp32_code.ino ändern und neu flashen",
  session_note:"aktualisiert (aktuelle Sitzung)",
  lock_sub:"Zugang Beschränkt", lock_enter:"Eintreten", lock_hint:"Standard-Passwort:",
  lock_error:"❌ Falsches Passwort",
  voice_listening:"🎤 Höre zu... sag einen Befehl", voice_unknown:"❓ Nicht verstanden:",
});
Object.assign(TRANSLATIONS.fr, {
  add_strip:"Ajouter un bandeau LED", add_bulb:"Ajouter une ampoule", add_flag:"Ajouter un drapeau",
  new_strip_prompt:"IP de l'ESP32 du nouveau bandeau (ex: http://192.168.1.120):",
  new_bulb_prompt:"IP de la nouvelle ampoule Shelly:",
  flag_editor_title:"Nouveau Drapeau", flag_name_ph:"Nom du drapeau",
  save:"Enregistrer", cancel:"Annuler", remove:"Supprimer",
  added:"ajouté", removed:"supprimé",
  wifi_pass_title:"Mot de passe Wi-Fi", pass_current:"Mot de passe actuel",
  show:"Afficher", hide:"Masquer",
  offline_title:"Mode Hors Ligne",
  offline_desc:"Quand l'ESP32 est inaccessible, l'interface continue de fonctionner en mode démonstration.",
  state_label:"État", off_label:"Désactivé", demo_on:"Activé — mode démonstration",
  pass_access:"Mot de passe d'accès",
  pass_access_desc:"Mot de passe pour entrer dans l'app FluxLight. Par défaut:",
  pass_new:"Nouveau mot de passe", pass_confirm:"Confirmer le nouveau mot de passe", save_pass:"Enregistrer",
  pass_fill:"❌ Remplissez tous les champs.", pass_wrong:"❌ Mot de passe actuel incorrect.",
  pass_short:"❌ Le nouveau mot de passe doit avoir au moins 4 caractères.",
  pass_mismatch:"❌ Les mots de passe ne correspondent pas.", pass_ok:"✅ Mot de passe modifié!",
  ino_note:"⚠️ Modifier dans esp32_code.ino et reflasher",
  session_note:"mis à jour (session actuelle)",
  lock_sub:"Accès Restreint", lock_enter:"Entrer", lock_hint:"Mot de passe par défaut:",
  lock_error:"❌ Mot de passe incorrect",
  voice_listening:"🎤 J'écoute... dites une commande", voice_unknown:"❓ Pas compris:",
});
Object.assign(TRANSLATIONS.es, {
  add_strip:"Añadir Tira LED", add_bulb:"Añadir Bombilla", add_flag:"Añadir Bandera",
  new_strip_prompt:"IP del ESP32 de la nueva tira (ej: http://192.168.1.120):",
  new_bulb_prompt:"IP de la nueva bombilla Shelly:",
  flag_editor_title:"Nueva Bandera", flag_name_ph:"Nombre de la bandera",
    flag_colors:"Colores de la bandera", add_color:"Añadir color",
  save:"Guardar", cancel:"Cancelar", remove:"Eliminar",
  added:"añadida", removed:"eliminada",
  wifi_pass_title:"Contraseña Wi-Fi", pass_current:"Contraseña actual",
  show:"Mostrar", hide:"Ocultar",
  offline_title:"Modo Offline",
  offline_desc:"Cuando el ESP32 no está accesible, la interfaz sigue funcionando en modo demostración.",
  state_label:"Estado", off_label:"Desactivado", demo_on:"Activado — modo demostración",
  pass_access:"Contraseña de Acceso",
  pass_access_desc:"Contraseña para entrar en la app FluxLight. Por defecto:",
  pass_new:"Nueva contraseña", pass_confirm:"Confirmar nueva contraseña", save_pass:"Guardar Contraseña",
  pass_fill:"❌ Rellena todos los campos.", pass_wrong:"❌ Contraseña actual incorrecta.",
  pass_short:"❌ La nueva contraseña debe tener al menos 4 caracteres.",
  pass_mismatch:"❌ Las contraseñas no coinciden.", pass_ok:"✅ ¡Contraseña cambiada!",
  ino_note:"⚠️ Cambiar en esp32_code.ino y regrabar",
  session_note:"actualizado (sesión actual)",
  lock_sub:"Acceso Restringido", lock_enter:"Entrar", lock_hint:"Contraseña predeterminada:",
  lock_error:"❌ Contraseña incorrecta",
  voice_listening:"🎤 Escuchando... di un comando", voice_unknown:"❓ No entendí:",
});

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.5 — CORREÇÕES i18n (wrappers, sem tocar no original)
   ═══════════════════════════════════════════════════════════════ */

// Guardar a secção atual para o título traduzir ao mudar de língua
state.currentSection = "dashboard";
const _origShowSection = showSection;
showSection = function (name, navEl) {
  state.currentSection = name;
  _origShowSection(name, navEl);
};

// applyTranslations melhorado: título da página, placeholders e labels dinâmicos
const _origApplyTranslations = applyTranslations;
applyTranslations = function () {
  _origApplyTranslations();

  // 1. Título e subtítulo da página na língua atual
  const meta = SECTION_META[state.currentSection || "dashboard"];
  if (meta) {
    const pt = document.getElementById("pageTitle");
    const ps = document.getElementById("pageSub");
    if (pt) pt.textContent = t(meta.title) || meta.title;
    if (ps) ps.textContent = meta.sub ? t(meta.sub) : "";
  }

  // 2. Placeholders traduzidos (data-i18n só cobre textContent)
  const phMap = {
    currentPassInput: "pass_current",
    newPassInput: "pass_new",
    confirmPassInput: "pass_confirm",
    flagNameInput: "flag_name_ph",
  };
  Object.entries(phMap).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = t(key);
  });

  // 3. Labels dinâmicos que o data-i18n não apanha
  const ol = document.getElementById("offlineModeLabel");
  if (ol) ol.textContent = (typeof offlineModeActive !== "undefined" && offlineModeActive) ? t("demo_on") : t("off_label");
  const wb = document.getElementById("wifiShowBtn");
  if (wb) wb.textContent = (typeof wifiPassVisible !== "undefined" && wifiPassVisible) ? t("hide") : t("show");
  const le = document.getElementById("lockError");
  if (le) le.textContent = t("lock_error");

  // 4. Reconstruir listas dinâmicas na nova língua
  if (typeof renderExtraStrips === "function") renderExtraStrips();
  if (typeof renderCustomFlags === "function") renderCustomFlags();
};

// toggleWifiPass com Mostrar/Ocultar traduzido (substitui o rótulo, mesma lógica)
toggleWifiPass = function () {
  const display = document.getElementById("displayWifiPass");
  const input   = document.getElementById("wifiPassInput");
  const btn     = document.getElementById("wifiShowBtn");
  wifiPassVisible = !wifiPassVisible;
  if (wifiPassVisible) {
    input.classList.remove("hidden");
    input.focus();
    display.textContent = input.value || "••••••••";
  } else {
    input.classList.add("hidden");
    display.textContent = "••••••••";
  }
  if (btn) btn.textContent = wifiPassVisible ? t("hide") : t("show");
};

// changeAppPassword com mensagens traduzidas (mesma lógica, textos por t())
changeAppPassword = function () {
  const current = document.getElementById("currentPassInput").value;
  const newPass = document.getElementById("newPassInput").value;
  const confirm = document.getElementById("confirmPassInput").value;
  const msgEl   = document.getElementById("passChangeMsg");
  msgEl.style.display = "block";

  const fail = (key) => { msgEl.style.color = "var(--off)"; msgEl.textContent = t(key); };
  if (!current || !newPass || !confirm) return fail("pass_fill");
  if (current !== getAppPassword())     return fail("pass_wrong");
  if (newPass.length < 4)               return fail("pass_short");
  if (newPass !== confirm)              return fail("pass_mismatch");

  localStorage.setItem("fluxlight_pass", newPass);
  msgEl.style.color = "var(--on)";
  msgEl.textContent = t("pass_ok");
  ["currentPassInput","newPassInput","confirmPassInput"].forEach(id => document.getElementById(id).value = "");
  showToast("🔐 " + t("pass_ok"), "success");
  setTimeout(() => { msgEl.style.display = "none"; }, 3000);
};

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.5 — DEFINIÇÕES: Editar SSID / Password / Hardware
   (mesmo padrão do editEspIp — edição visual da sessão + aviso .ino)
   ═══════════════════════════════════════════════════════════════ */
// Auxiliar: mostra a caixa de edição de um campo das Definições.
function _editCodeTag(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.classList.remove("hidden");
  input.focus();
}

function editSsid() { _editCodeTag("ssidInput"); }
function saveSsid(value) {
  const input = document.getElementById("ssidInput");
  if (value) {
    document.getElementById("displaySsid").textContent = `const char* ssid = "${value}";`;
    showToast(t("ino_note"), "info", 4000);
  }
  input.classList.add("hidden");
}

function editWifiPassCode() { _editCodeTag("wifiPassCodeInput"); }
function saveWifiPassCode(value) {
  const input = document.getElementById("wifiPassCodeInput");
  if (value) {
    document.getElementById("displayWifiPassCode").textContent = `const char* password = "${value}";`;
    showToast(t("ino_note"), "info", 4000);
  }
  input.classList.add("hidden");
}

function editNumLeds() { _editCodeTag("numLedsInput"); }
function saveNumLeds(value) {
  const input = document.getElementById("numLedsInput");
  const v = parseInt(value);
  if (v > 0) {
    document.getElementById("displayNumLeds").textContent = `#define NUM_LEDS ${v}`;
    showToast(t("ino_note"), "info", 4000);
  }
  input.classList.add("hidden");
}

function editLedPin() { _editCodeTag("ledPinInput"); }
function saveLedPin(value) {
  const input = document.getElementById("ledPinInput");
  const v = parseInt(value);
  if (v >= 0) {
    document.getElementById("displayLedPin").textContent = `#define LED_PIN ${v}`;
    showToast(t("ino_note"), "info", 4000);
  }
  input.classList.add("hidden");
}

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.5 — ➕ ADICIONAR FITAS LED EXTRA
   Cada fita extra = outro ESP32 na rede (com o mesmo firmware)
   ═══════════════════════════════════════════════════════════════ */
let EXTRA_STRIPS = JSON.parse(localStorage.getItem("fluxlight_strips") || "[]");

function persistStrips() { localStorage.setItem("fluxlight_strips", JSON.stringify(EXTRA_STRIPS)); }

// Adiciona uma fita LED extra à interface.
function addStrip() {
  const ip = prompt(t("new_strip_prompt"), "http://192.168.1.120");
  if (!ip) return;
  EXTRA_STRIPS.push({ ip: ip.startsWith("http") ? ip : "http://" + ip, on: false, color: "#ff6a00", brightness: 200 });
  persistStrips();
  renderExtraStrips();
  showToast(`⚡ ${t("nav_strip")} ${EXTRA_STRIPS.length + 1} ${t("added")}`, "success");
}

// Remove uma fita LED extra.
function removeStrip(i) {
  EXTRA_STRIPS.splice(i, 1);
  persistStrips();
  renderExtraStrips();
  showToast(`⚡ ${t("nav_strip")} ${t("removed")}`, "info");
}

// Envia um pedido ao ESP32 para uma fita LED extra.
async function extraStripRequest(i, endpoint, desc = "") {
  if (typeof offlineModeActive !== "undefined" && offlineModeActive) {
    if (desc) showToast(`🧪 ${desc} (demo)`, "info");
    return true;
  }
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), HTTP_TIMEOUT);
    const res = await fetch(`${EXTRA_STRIPS[i].ip}${endpoint}`, { method: "GET", signal: ctrl.signal, mode: "cors" });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (desc) showToast(`✅ ${desc}`, "success");
    return true;
  } catch (err) {
    if (desc) showToast(`❌ ${err.name === "AbortError" ? "Timeout" : err.message}`, "error");
    return false;
  }
}

// Desenha no ecrã os cartões das fitas LED extra.
function renderExtraStrips() {
  const c = document.getElementById("extraStripsContainer");
  if (!c) return;
  c.innerHTML = EXTRA_STRIPS.map((s, i) => `
    <div class="control-card">
      <div class="control-card-header">
        <div class="device-info">
          <div class="device-icon"><i data-lucide="zap"></i></div>
          <div>
            <strong>${t("nav_strip")} ${i + 2}</strong>
            <small>${s.ip}</small>
          </div>
        </div>
        <div class="card-actions">
          <label class="toggle-switch">
            <input type="checkbox" ${s.on ? "checked" : ""} onchange="toggleExtraStrip(${i}, this.checked)" />
            <span class="toggle-track"></span>
          </label>
          <button class="btn-remove-item" onclick="removeStrip(${i})" title="${t("remove")}">&times;</button>
        </div>
      </div>
      <div class="color-preview-bar" style="background:${s.color}"></div>
      <div class="control-section">
        <label class="ctrl-label">${t("color")}</label>
        <div class="color-row">
          <input type="color" class="color-wheel" id="extraStripColor${i}" value="${s.color}" oninput="extraStripColor(${i}, this.value)" />
          <div class="color-swatches">
            <button class="swatch" style="--c:#ff0000" onclick="setExtraStripColor(${i},'#ff0000')"></button>
            <button class="swatch" style="--c:#ff6a00" onclick="setExtraStripColor(${i},'#ff6a00')"></button>
            <button class="swatch" style="--c:#ffff00" onclick="setExtraStripColor(${i},'#ffff00')"></button>
            <button class="swatch" style="--c:#00ff00" onclick="setExtraStripColor(${i},'#00ff00')"></button>
            <button class="swatch" style="--c:#00bfff" onclick="setExtraStripColor(${i},'#00bfff')"></button>
            <button class="swatch" style="--c:#0000ff" onclick="setExtraStripColor(${i},'#0000ff')"></button>
            <button class="swatch" style="--c:#8a2be2" onclick="setExtraStripColor(${i},'#8a2be2')"></button>
            <button class="swatch" style="--c:#ffffff" onclick="setExtraStripColor(${i},'#ffffff')"></button>
          </div>
        </div>
      </div>
      <div class="control-section">
        <label class="ctrl-label">${t("brightness")} <span class="ctrl-value" id="extraStripBright${i}">${s.brightness}</span></label>
        <input type="range" class="slider" min="0" max="255" value="${s.brightness}"
          oninput="document.getElementById('extraStripBright${i}').textContent=this.value"
          onchange="extraStripBrightness(${i}, this.value)" />
      </div>
    </div>`).join("");
  if (window.lucide) lucide.createIcons();
}

// Liga/desliga uma fita LED extra.
async function toggleExtraStrip(i, isOn) {
  EXTRA_STRIPS[i].on = isOn;
  persistStrips();
  await extraStripRequest(i, isOn ? "/led/on" : "/led/off", `${t("nav_strip")} ${i + 2} ${isOn ? "ON" : "OFF"}`);
}

// Muda a cor de uma fita LED extra.
async function extraStripColor(i, hex) {
  EXTRA_STRIPS[i].color = hex;
  persistStrips();
  renderColorBarOnly(i, hex);
  const { r, g, b } = hexToRGB(hex);
  await extraStripRequest(i, `/led/color?r=${r}&g=${g}&b=${b}`);
}

function renderColorBarOnly(i, hex) {
  const cards = document.querySelectorAll("#extraStripsContainer .color-preview-bar");
  if (cards[i]) cards[i].style.background = hex;
}

// Muda o brilho de uma fita LED extra.
async function extraStripBrightness(i, value) {
  EXTRA_STRIPS[i].brightness = parseInt(value);
  persistStrips();
  await extraStripRequest(i, `/led/brightness?value=${value}`);
}

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.5 — ➕ ADICIONAR LÂMPADAS SHELLY
   ═══════════════════════════════════════════════════════════════ */
function persistExtraBulbs() {
  // Guardar apenas os IPs para além dos 5 originais
  localStorage.setItem("fluxlight_bulbs", JSON.stringify(SHELLY_IPS.slice(5)));
}

// Adiciona uma lâmpada nova à app (fica guardada no browser).
function addBulb() {
  const ip = prompt(t("new_bulb_prompt"), `192.168.1.${101 + SHELLY_IPS.length}`);
  if (!ip) return;
  SHELLY_IPS.push(ip);
  state.bulbs.push({ on: false, color: "#ffffff", brightness: 100 });
  persistExtraBulbs();
  buildBulbCards();
  buildShellyIpFields();
  syncUI();
  showToast(`💡 ${t("bulb_label")} ${SHELLY_IPS.length} ${t("added")}`, "success");
}

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.5 — ➕ BANDEIRAS PERSONALIZADAS
   Endpoint ESP32: /flag/custom?c1=RRGGBB&c2=RRGGBB&c3=RRGGBB
   ═══════════════════════════════════════════════════════════════ */
// Bandeiras personalizadas criadas pelo utilizador (guardadas no browser).
let CUSTOM_FLAGS = JSON.parse(localStorage.getItem("fluxlight_flags") || "[]");

// Compatibilidade: converter bandeiras antigas {c1,c2,c3} → {colors:[...]}
CUSTOM_FLAGS = CUSTOM_FLAGS.map(f => flagColorsOf(f, true));

const FLAG_MIN_COLORS = 2;
const FLAG_MAX_COLORS = 6;

// Cores de trabalho do editor (array editável)
let editorColors = ["#006600", "#ffcc00", "#cc0000"];

/** Devolve sempre um objeto com {name, colors:[...]}, aceitando o formato antigo c1/c2/c3 */
// Devolve a lista de cores de uma bandeira personalizada.
function flagColorsOf(f, keepName) {
  if (f && Array.isArray(f.colors) && f.colors.length) {
    return keepName ? { name: f.name, colors: f.colors.slice() } : f.colors.slice();
  }
  const arr = [f.c1, f.c2, f.c3].filter(Boolean);
  return keepName ? { name: f.name, colors: arr } : arr;
}

/** Gradiente em faixas iguais para N cores */
// Cria o degradê de cores para a pré-visualização da bandeira.
function flagGradient(colors) {
  if (!colors.length) return "transparent";
  if (colors.length === 1) return colors[0];
  const step = 100 / colors.length;
  const stops = colors.map((c, i) => {
    const start = (i * step).toFixed(2);
    const end = ((i + 1) * step).toFixed(2);
    return `${c} ${start}% ${end}%`;
  });
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

function persistFlags() { localStorage.setItem("fluxlight_flags", JSON.stringify(CUSTOM_FLAGS)); }

// Abre o editor para criar uma bandeira personalizada.
function openFlagEditor() {
  const ed = document.getElementById("flagEditor");
  if (!ed) return;
  ed.classList.remove("hidden");
  editorColors = ["#006600", "#ffcc00", "#cc0000"];
  renderFlagColorInputs();
  document.getElementById("flagNameInput").focus();
}

// Fecha o editor de bandeiras.
function closeFlagEditor() {
  const ed = document.getElementById("flagEditor");
  if (ed) ed.classList.add("hidden");
}

/** Desenha os seletores de cor do editor a partir de editorColors */
// Desenha os seletores de cor dentro do editor de bandeiras.
function renderFlagColorInputs() {
  const row = document.getElementById("flagColorsRow");
  if (!row) return;
  row.innerHTML = editorColors.map((hex, i) => `
    <div class="flag-color-chip">
      <button class="chip-remove" onclick="removeFlagColor(${i})" title="${t("remove")}">✕</button>
      <input type="color" class="color-wheel" value="${hex}" oninput="updateFlagColor(${i}, this.value)" />
    </div>`).join("");

  // Esconder o "remover" quando estamos no mínimo
  row.classList.toggle("at-min", editorColors.length <= FLAG_MIN_COLORS);

  // Desativar "adicionar" no máximo
  const addBtn = document.getElementById("addFlagColorBtn");
  if (addBtn) addBtn.disabled = editorColors.length >= FLAG_MAX_COLORS;

  updateFlagEditorPreview();
  if (window.lucide) lucide.createIcons();
}

// Adiciona mais uma cor à bandeira que está a ser criada.
function addFlagColor() {
  if (editorColors.length >= FLAG_MAX_COLORS) return;
  editorColors.push("#ffffff");
  renderFlagColorInputs();
}

// Remove uma cor da bandeira que está a ser criada.
function removeFlagColor(i) {
  if (editorColors.length <= FLAG_MIN_COLORS) return;
  editorColors.splice(i, 1);
  renderFlagColorInputs();
}

// Atualiza uma das cores da bandeira em edição.
function updateFlagColor(i, hex) {
  editorColors[i] = hex;
  updateFlagEditorPreview();
}

// Atualiza a pré-visualização enquanto se cria a bandeira.
function updateFlagEditorPreview() {
  const p = document.getElementById("flagEditorPreview");
  if (p) p.style.background = flagGradient(editorColors);
}

// Guarda a bandeira personalizada criada.
function saveCustomFlag() {
  const name = (document.getElementById("flagNameInput").value || "").trim();
  if (!name) { document.getElementById("flagNameInput").focus(); return; }
  CUSTOM_FLAGS.push({ name, colors: editorColors.slice() });
  persistFlags();
  renderCustomFlags();
  closeFlagEditor();
  document.getElementById("flagNameInput").value = "";
  showToast(`🏳 ${name} ${t("added")}`, "success");
}

// Apaga uma bandeira personalizada.
function removeCustomFlag(i) {
  const name = CUSTOM_FLAGS[i]?.name || "";
  CUSTOM_FLAGS.splice(i, 1);
  persistFlags();
  renderCustomFlags();
  showToast(`🏳 ${name} ${t("removed")}`, "info");
}

// Desenha no ecrã os botões das bandeiras personalizadas.
function renderCustomFlags() {
  const addCard = document.getElementById("addFlagCard");
  if (!addCard) return;
  // Limpar renders anteriores
  document.querySelectorAll(".custom-flag-card").forEach(el => el.remove());
  CUSTOM_FLAGS.forEach((f, i) => {
    const colors = flagColorsOf(f);
    const btn = document.createElement("button");
    btn.className = "flag-card custom-flag-card";
    btn.id = `flag-custom-${i}`;
    btn.onclick = () => applyCustomFlag(i);
    btn.innerHTML = `
      <span class="flag-remove" onclick="event.stopPropagation(); removeCustomFlag(${i})" title="${t("remove")}">✕</span>
      <div class="flag-preview" style="background:${flagGradient(colors)}"></div>
      <span class="flag-name">${f.name}</span>`;
    addCard.parentNode.insertBefore(btn, addCard);
  });
}

// Envia a bandeira personalizada para o ESP32 (endpoint /flag/custom) e sincroniza as lâmpadas.
async function applyCustomFlag(i) {
  const f = CUSTOM_FLAGS[i];
  if (!f) return;
  const colors = flagColorsOf(f);
  state.flag = "custom-" + i;
  state.effect = null;

  document.querySelectorAll(".flag-card").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".effect-card").forEach(el => el.classList.remove("active"));
  const card = document.getElementById(`flag-custom-${i}`);
  if (card) card.classList.add("active");

  document.getElementById("statFlag").textContent = f.name;
  document.getElementById("statEffect").textContent = "—";

  // Sincronizar as Shelly com as cores (distribui as cores pelas lâmpadas disponíveis)
  SHELLY_IPS.forEach((_, j) => {
    const hex = colors[j % colors.length];
    const { r, g, b } = hexToRGB(hex);
    esp32Request(`/shelly/${j}/color?r=${r}&g=${g}&b=${b}`);
    esp32Request(`/shelly/${j}/on`);
  });

  // Enviar todas as cores ao ESP32: /flag/custom?c=RRGGBB,RRGGBB,...
  const q = "c=" + colors.map(h => h.slice(1)).join(",");
  await esp32Request(`/flag/custom?${q}`, `🏳 ${f.name}`);
}

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.5 — Inicialização dos itens guardados
   (listener adicional; corre depois do original)
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // Repor lâmpadas extra guardadas
  const savedBulbs = JSON.parse(localStorage.getItem("fluxlight_bulbs") || "[]");
  if (savedBulbs.length) {
    savedBulbs.forEach(ip => {
      SHELLY_IPS.push(ip);
      state.bulbs.push({ on: false, color: "#ffffff", brightness: 100 });
    });
    buildBulbCards();
    buildShellyIpFields();
    syncUI();
  }
  renderExtraStrips();
  renderCustomFlags();
  applyTranslations();   // aplicar também os placeholders/labels novos
});

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.6 — REVISÃO GERAL DE TRADUÇÕES
   Chaves que faltavam nas 5 línguas (fundidas por Object.assign,
   sem tocar no objeto TRANSLATIONS original)
   ═══════════════════════════════════════════════════════════════ */
const TRANSLATIONS_EXTRA = {
  pt: {
    add_strip:"Adicionar Fita LED", add_bulb:"Adicionar Lâmpada", add_flag:"Adicionar Bandeira",
    save:"Guardar", cancel:"Cancelar", show:"Mostrar", hide:"Ocultar",
    added:"adicionada", removed:"removida", remove:"Remover",
    flag_editor_title:"Nova Bandeira", flag_name_ph:"Nome da bandeira",
    lock_sub:"Acesso Restrito", lock_enter:"Entrar", lock_hint:"Password predefinida:",
    lock_error:"❌ Password incorreta",
    wifi_pass_title:"Password Wi-Fi", pass_access:"Password de Acesso",
    pass_access_desc:"Password utilizada para entrar na app FluxLight. Por defeito:",
    pass_current:"Password atual", pass_new:"Nova password", pass_confirm:"Confirmar nova password",
    save_pass:"Guardar Password", pass_ok:"✅ Password alterada com sucesso!",
    offline_title:"Modo Offline",
    offline_desc:"Quando o ESP32 não está acessível, a interface continua a funcionar em modo demonstração.",
    state_label:"Estado", off_label:"Desativado", demo_on:"Ativado — modo demonstração",
    new_strip_prompt:"IP do ESP32 da nova fita (ex: http://192.168.1.120):",
    new_bulb_prompt:"IP da nova lâmpada Shelly:",
    ino_note:"⚠️ Alterar no esp32_code.ino e regravar",
    ip_updated:"IP atualizado",
    effect_activated:"Efeito {n} ativado",
    voice_listening:t("voice_listening"),
    voice_unknown:"Não percebi",
  },
  en: {
    add_strip:"Add LED Strip", add_bulb:"Add Bulb", add_flag:"Add Flag",
    save:"Save", cancel:"Cancel", show:"Show", hide:"Hide",
    added:"added", removed:"removed", remove:"Remove",
    flag_editor_title:"New Flag", flag_name_ph:"Flag name",
    lock_sub:"Restricted Access", lock_enter:"Enter", lock_hint:"Default password:",
    lock_error:"❌ Wrong password",
    wifi_pass_title:"Wi-Fi Password", pass_access:"Access Password",
    pass_access_desc:"Password used to enter the FluxLight app. Default:",
    pass_current:"Current password", pass_new:"New password", pass_confirm:"Confirm new password",
    save_pass:"Save Password", pass_ok:"✅ Password changed successfully!",
    offline_title:"Offline Mode",
    offline_desc:"When the ESP32 is unreachable, the interface keeps working in demo mode.",
    state_label:"State", off_label:"Disabled", demo_on:"Enabled — demo mode",
    new_strip_prompt:"IP of the new strip's ESP32 (e.g. http://192.168.1.120):",
    new_bulb_prompt:"IP of the new Shelly bulb:",
    ino_note:"⚠️ Change it in esp32_code.ino and re-flash",
    ip_updated:"IP updated",
    effect_activated:"Effect {n} activated",
    voice_listening:"🎤 Listening... say a command",
    voice_unknown:"I didn't understand",
  },
  de: {
    add_strip:"LED-Streifen hinzufügen", add_bulb:"Lampe hinzufügen", add_flag:"Flagge hinzufügen",
    save:"Speichern", cancel:"Abbrechen", show:"Anzeigen", hide:"Verbergen",
    added:"hinzugefügt", removed:"entfernt", remove:"Entfernen",
    flag_editor_title:"Neue Flagge", flag_name_ph:"Name der Flagge",
    lock_sub:"Zugriff beschränkt", lock_enter:"Eintreten", lock_hint:"Standard-Passwort:",
    lock_error:"❌ Falsches Passwort",
    wifi_pass_title:"WLAN-Passwort", pass_access:"Zugangspasswort",
    pass_access_desc:"Passwort für den Zugang zur FluxLight-App. Standard:",
    pass_current:"Aktuelles Passwort", pass_new:"Neues Passwort", pass_confirm:"Neues Passwort bestätigen",
    save_pass:"Passwort speichern", pass_ok:"✅ Passwort erfolgreich geändert!",
    offline_title:"Offline-Modus",
    offline_desc:"Wenn der ESP32 nicht erreichbar ist, funktioniert die Oberfläche im Demo-Modus weiter.",
    state_label:"Status", off_label:"Deaktiviert", demo_on:"Aktiviert — Demo-Modus",
    new_strip_prompt:"IP des ESP32 des neuen Streifens (z.B. http://192.168.1.120):",
    new_bulb_prompt:"IP der neuen Shelly-Lampe:",
    ino_note:"⚠️ In esp32_code.ino ändern und neu flashen",
    ip_updated:"IP aktualisiert",
    effect_activated:"Effekt {n} aktiviert",
    voice_listening:"🎤 Höre zu... sag einen Befehl",
    voice_unknown:"Nicht verstanden",
  },
  fr: {
    add_strip:"Ajouter un bandeau LED", add_bulb:"Ajouter une ampoule", add_flag:"Ajouter un drapeau",
    save:"Enregistrer", cancel:"Annuler", show:"Afficher", hide:"Masquer",
    added:"ajoutée", removed:"supprimée", remove:"Supprimer",
    flag_editor_title:"Nouveau drapeau", flag_name_ph:"Nom du drapeau",
    flag_colors:"Couleurs du drapeau", add_color:"Ajouter une couleur",
    lock_sub:"Accès restreint", lock_enter:"Entrer", lock_hint:"Mot de passe par défaut :",
    lock_error:"❌ Mot de passe incorrect",
    wifi_pass_title:"Mot de passe Wi-Fi", pass_access:"Mot de passe d'accès",
    pass_access_desc:"Mot de passe utilisé pour entrer dans l'app FluxLight. Par défaut :",
    pass_current:"Mot de passe actuel", pass_new:"Nouveau mot de passe", pass_confirm:"Confirmer le nouveau mot de passe",
    save_pass:"Enregistrer le mot de passe", pass_ok:"✅ Mot de passe modifié avec succès !",
    offline_title:"Mode hors ligne",
    offline_desc:"Quand l'ESP32 est inaccessible, l'interface continue de fonctionner en mode démonstration.",
    state_label:"État", off_label:"Désactivé", demo_on:"Activé — mode démonstration",
    new_strip_prompt:"IP de l'ESP32 du nouveau bandeau (ex. http://192.168.1.120) :",
    new_bulb_prompt:"IP de la nouvelle ampoule Shelly :",
    ino_note:"⚠️ Modifier dans esp32_code.ino et reflasher",
    ip_updated:"IP mise à jour",
    effect_activated:"Effet {n} activé",
    voice_listening:"🎤 J'écoute... dites une commande",
    voice_unknown:"Je n'ai pas compris",
  },
  es: {
    add_strip:"Añadir Tira LED", add_bulb:"Añadir Bombilla", add_flag:"Añadir Bandera",
    save:"Guardar", cancel:"Cancelar", show:"Mostrar", hide:"Ocultar",
    added:"añadida", removed:"eliminada", remove:"Eliminar",
    flag_editor_title:"Nueva Bandera", flag_name_ph:"Nombre de la bandera",
    lock_sub:"Acceso Restringido", lock_enter:"Entrar", lock_hint:"Contraseña predeterminada:",
    lock_error:"❌ Contraseña incorrecta",
    wifi_pass_title:"Contraseña Wi-Fi", pass_access:"Contraseña de Acceso",
    pass_access_desc:"Contraseña utilizada para entrar en la app FluxLight. Por defecto:",
    pass_current:"Contraseña actual", pass_new:"Nueva contraseña", pass_confirm:"Confirmar nueva contraseña",
    save_pass:"Guardar Contraseña", pass_ok:"✅ ¡Contraseña cambiada con éxito!",
    offline_title:"Modo Offline",
    offline_desc:"Cuando el ESP32 no está accesible, la interfaz sigue funcionando en modo demostración.",
    state_label:"Estado", off_label:"Desactivado", demo_on:"Activado — modo demostración",
    new_strip_prompt:"IP del ESP32 de la nueva tira (ej. http://192.168.1.120):",
    new_bulb_prompt:"IP de la nueva bombilla Shelly:",
    ino_note:"⚠️ Cambiar en esp32_code.ino y regrabar",
    ip_updated:"IP actualizada",
    effect_activated:"Efecto {n} activado",
    voice_listening:"🎤 Escuchando... di un comando",
    voice_unknown:"No he entendido",
  },
};

// Fundir as chaves novas nas traduções existentes (sem apagar nada)
Object.keys(TRANSLATIONS_EXTRA).forEach(l => {
  if (TRANSLATIONS[l]) Object.assign(TRANSLATIONS[l], TRANSLATIONS_EXTRA[l]);
});

/* ─── Wrapper do applyTranslations: placeholders + título da página ───
   Mantém a função original intacta e acrescenta o que faltava:      */
const _applyTranslationsOriginal = applyTranslations;
applyTranslations = function () {
  _applyTranslationsOriginal();

  // 1) Placeholders com data-i18n-ph (não eram traduzidos)
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const k = el.getAttribute("data-i18n-ph");
    const v = t(k);
    if (v && v !== k) el.placeholder = v;
  });

  // 2) Título e subtítulo da página na língua atual (não mudavam ao trocar de língua)
  const activeNav = document.querySelector(".nav-item.active");
  const secName   = activeNav ? activeNav.getAttribute("data-section") : "dashboard";
  const meta      = SECTION_META[secName];
  if (meta) {
    const pt_ = document.getElementById("pageTitle");
    const ps  = document.getElementById("pageSub");
    let title = t(meta.title) || meta.title;
    if (title === meta.title) {
      // meta.title pode ser texto fixo (ex: "Dashboard") — tentar a chave de navegação
      const navKey = t("nav_" + secName);
      if (navKey && navKey !== "nav_" + secName) title = navKey;
    }
    if (pt_) pt_.textContent = title;
    if (ps)  ps.textContent  = meta.sub ? t(meta.sub) : "";
  }

  // 3) Etiqueta do modo offline na língua atual
  const off = document.getElementById("offlineModeLabel");
  if (off) off.textContent =
    (typeof offlineModeActive !== "undefined" && offlineModeActive) ? t("demo_on") : t("off_label");
};

// ➕ v2.7 — chave curta para o botão inline "Adicionar" (junto ao ON/OFF)
Object.assign(TRANSLATIONS.pt, { add_bulb_short:"Adicionar" });
Object.assign(TRANSLATIONS.en, { add_bulb_short:"Add" });
Object.assign(TRANSLATIONS.de, { add_bulb_short:"Hinzufügen" });
Object.assign(TRANSLATIONS.fr, { add_bulb_short:"Ajouter" });
Object.assign(TRANSLATIONS.es, { add_bulb_short:"Añadir" });

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.8 — Remover lâmpadas adicionadas (✕)
   As 5 lâmpadas originais ficam fixas; só as extra têm ✕,
   igual às fitas extra e às bandeiras personalizadas.
   ═══════════════════════════════════════════════════════════════ */
const BASE_BULBS = 1;   // ➕ v2.9 — só a Lâmpada 1 é obrigatória; as outras podem remover-se

function removeBulb(n) {
  const i = n - 1;
  if (i < BASE_BULBS) return;              // proteção: nunca remover as originais
  const ip = SHELLY_IPS[i];
  SHELLY_IPS.splice(i, 1);
  state.bulbs.splice(i, 1);
  persistExtraBulbs();
  buildBulbCards();
  buildShellyIpFields();
  syncUI();
  showToast(`💡 ${t("bulb_label")} (${ip}) ${t("removed")}`, "info");
}

/* Wrapper do buildBulbCards: depois de gerar os cards,
   acrescenta o ✕ às lâmpadas extra (índice >= 5) */
const _buildBulbCardsOriginal = buildBulbCards;
buildBulbCards = function () {
  _buildBulbCardsOriginal();
  for (let i = BASE_BULBS; i < SHELLY_IPS.length; i++) {
    const n = i + 1;
    const header = document.querySelector(`#bulbCard${n} .control-card-header`);
    if (header && !header.querySelector(".btn-remove-item")) {
      // Envolver o toggle existente + ✕ num grupo à direita (igual às fitas)
      const toggle = header.querySelector(".toggle-switch");
      const group = document.createElement("div");
      group.className = "card-actions";
      if (toggle) group.appendChild(toggle);   // move o toggle para dentro do grupo

      const btn = document.createElement("button");
      btn.className = "btn-remove-item";
      btn.title = t("remove");
      btn.innerHTML = "&times;";
      btn.onclick = (e) => { e.stopPropagation(); removeBulb(n); };
      group.appendChild(btn);

      header.appendChild(group);
    }
  }
};

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v2.9 — Persistência completa das lâmpadas
   Agora que só 1 lâmpada é obrigatória, guardamos a LISTA TODA
   de IPs (menos a obrigatória) para que remover/adicionar
   qualquer uma sobreviva ao recarregar a página.
   Sobrepõe a persistência antiga sem lhe tocar.
   ═══════════════════════════════════════════════════════════════ */

const DEFAULT_SHELLY_IPS = SHELLY_IPS.slice();   // IPs de fábrica (1..5)

// Substitui o que persistExtraBulbs guardava (slice(5)) por lista completa
persistExtraBulbs = function () {
  // guardar tudo a partir da 2ª lâmpada (índice 1), já que a 1ª é fixa
  localStorage.setItem("fluxlight_bulbs_full", JSON.stringify(SHELLY_IPS.slice(BASE_BULBS)));
};

// Repor a configuração de lâmpadas guardada (corre depois dos listeners anteriores)
document.addEventListener("DOMContentLoaded", () => {
  // Migração: se ainda existir a chave antiga (v2.5), converte para a nova e apaga-a
  const legacy = localStorage.getItem("fluxlight_bulbs");
  if (legacy !== null && localStorage.getItem("fluxlight_bulbs_full") === null) {
    try {
      const extra = JSON.parse(legacy) || [];
      // v2.5 guardava só as extra (>5). Nova lista = 4 originais restantes + extra
      const restantesOriginais = DEFAULT_SHELLY_IPS.slice(BASE_BULBS);
      localStorage.setItem("fluxlight_bulbs_full", JSON.stringify([...restantesOriginais, ...extra]));
    } catch {}
  }
  localStorage.removeItem("fluxlight_bulbs");   // impede o listener antigo de duplicar

  const raw = localStorage.getItem("fluxlight_bulbs_full");
  if (raw === null) return;   // primeira vez → mantém as 5 de fábrica

  let saved;
  try { saved = JSON.parse(raw); } catch { return; }
  if (!Array.isArray(saved)) return;

  // Reconstruir SHELLY_IPS = [obrigatória fixa] + [lista guardada]
  const fixas = DEFAULT_SHELLY_IPS.slice(0, BASE_BULBS);
  SHELLY_IPS.length = 0;
  SHELLY_IPS.push(...fixas, ...saved);

  // Reconstruir o estado das lâmpadas com o mesmo tamanho
  state.bulbs = SHELLY_IPS.map(() => ({ on: false, color: "#ffffff", brightness: 100 }));

  buildBulbCards();
  buildShellyIpFields();
  syncUI();
});

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTO v2.9b — Subtítulo "N × Shelly RGBW" dinâmico
   (acompanha o nº real de lâmpadas ao adicionar/remover)
   ═══════════════════════════════════════════════════════════════ */
// Atualiza o contador de lâmpadas (ex: 0/2) conforme o número real.
function updateBulbCount() {
  const n = SHELLY_IPS.length;
  // Card "Todas as Lâmpadas": trocar o "5" pelo número atual, mantendo a tradução
  const sub = document.querySelector('#section-bulbs [data-i18n="all_bulbs_sub"]');
  if (sub) sub.textContent = t("all_bulbs_sub").replace(/\d+/, n);
  // Card do dashboard
  const dashSub = document.querySelector('.quick-card small');
  document.querySelectorAll('.quick-card small').forEach(s => {
    if (/Shelly/i.test(s.textContent)) s.textContent = s.textContent.replace(/\d+/, n);
  });
}

// Ligar a atualização às ações que mexem no nº de lâmpadas + no arranque/troca de língua
["buildBulbCards","addBulb","removeBulb","applyTranslations"].forEach(fnName => {
  const orig = window[fnName];
  if (typeof orig === "function") {
    window[fnName] = function (...args) {
      const r = orig.apply(this, args);
      try { updateBulbCount(); } catch (e) {}
      return r;
    };
  }
});

document.addEventListener("DOMContentLoaded", () => setTimeout(updateBulbCount, 100));

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v3.0 — Swatches das fitas extra + contador dinâmico
   de bandeiras no Controlo Rápido
   ═══════════════════════════════════════════════════════════════ */

// Clicar num swatch da fita extra: atualiza a roda de cor e aplica
// Aplica uma cor (swatch) a uma fita LED extra.
function setExtraStripColor(i, hex) {
  const wheel = document.getElementById(`extraStripColor${i}`);
  if (wheel) wheel.value = hex;
  extraStripColor(i, hex);
}

// "9 bandeiras animadas" → nº real (9 nacionais + personalizadas)
// Atualiza o número de bandeiras mostrado na app.
function updateFlagCount() {
  const n = 9 + (typeof CUSTOM_FLAGS !== "undefined" ? CUSTOM_FLAGS.length : 0);
  const el = document.querySelector('.quick-card [data-i18n="flags_quick_sub"]');
  if (el) el.textContent = t("flags_quick_sub").replace(/\d+/, n);
}

// Ligar a atualização às ações que mexem no nº de bandeiras
["renderCustomFlags","saveCustomFlag","removeCustomFlag","applyTranslations"].forEach(fnName => {
  const orig = window[fnName];
  if (typeof orig === "function") {
    window[fnName] = function (...args) {
      const r = orig.apply(this, args);
      try { updateFlagCount(); } catch (e) {}
      return r;
    };
  }
});

document.addEventListener("DOMContentLoaded", () => setTimeout(updateFlagCount, 150));

/* ═══════════════════════════════════════════════════════════════
   ACRESCENTOS v3.2 — Partículas no fundo do ecrã de login
   (mesmo espírito do splash; só corre enquanto o lock existe)
   ═══════════════════════════════════════════════════════════════ */
// Anima as partículas do fundo do ecrã de login.
function initLockParticles() {
  const canvas = document.getElementById("lockCanvas");
  const lock   = document.getElementById("lockScreen");
  if (!canvas || !lock) return;
  if (sessionStorage.getItem("fluxlight_unlocked") === "1") return;  // já entrou, não anima

  const ctx = canvas.getContext("2d");
  function resize() {
    canvas.width  = lock.clientWidth  || window.innerWidth;
    canvas.height = lock.clientHeight || window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.1,
    hue: Math.random() * 40 + 20,   // 20–60 → laranja/amarelo
  }));

  let animId;
  function draw() {
    // parar se o lock já foi removido (utilizador entrou)
    if (!document.getElementById("lockScreen") ||
        lock.classList.contains("hidden")) {
      cancelAnimationFrame(animId);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // linhas subtis entre partículas próximas
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 110) {
          ctx.strokeStyle = `rgba(249,115,22,${0.08 * (1 - d / 110)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha})`;
      ctx.fill();
    }
    animId = requestAnimationFrame(draw);
  }
  draw();
}

document.addEventListener("DOMContentLoaded", initLockParticles);
