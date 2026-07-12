/*
 * ═══════════════════════════════════════════════════════════════
 *  FluxLight — esp32_code.ino  v2.2
 *  Firmware para ESP32 DevKit V4
 *  ✅ Adicionado: Shelly individual/global + Bandeiras
 * ═══════════════════════════════════════════════════════════════
 */

#include <WiFi.h>
#include <WebServer.h>
#include <HTTPClient.h>
#include <Adafruit_NeoPixel.h>
#include <uri/UriBraces.h>   // rotas dinâmicas /shelly/{n}/...

// ═══════════════════════════════════════════════════════════════
// WIFI
// ═══════════════════════════════════════════════════════════════

const char* ssid     = "NOS_Internet_32C0";
const char* password = "2LL8NJ77E5E";

// ═══════════════════════════════════════════════════════════════
// LEDS
// ═══════════════════════════════════════════════════════════════

#define LED_PIN  13
#define NUM_LEDS 300

// ═══════════════════════════════════════════════════════════════
// SHELLY
// ═══════════════════════════════════════════════════════════════

String shellyIPs[] = {
  "192.168.1.101",
  "192.168.1.102",
};

const int NUM_SHELLY = 2;

// ═══════════════════════════════════════════════════════════════
// OBJETOS
// ═══════════════════════════════════════════════════════════════

WebServer server(80);

Adafruit_NeoPixel strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

// ═══════════════════════════════════════════════════════════════
// ESTADO GLOBAL
// ═══════════════════════════════════════════════════════════════

bool     ledOn        = false;
uint8_t  ledR         = 255;
uint8_t  ledG         = 106;
uint8_t  ledB         = 0;
uint8_t  ledBrightness = 200;
String   currentEffect = "";
bool     effectRunning = false;
uint32_t effectTimer   = 0;
uint8_t  effectStep    = 0;

// Bandeira personalizada: até 8 faixas de cor recebidas da app via /flag/custom
uint8_t  customFlagColors[8][3];
int      customFlagCount = 0;

// ═══════════════════════════════════════════════════════════════
// DECLARAÇÕES ANTECIPADAS
// ═══════════════════════════════════════════════════════════════

void addCORSHeaders();
void applyLEDColor();
void startEffect(const String& name);
void shellyRequest(int index, String action);
void shellyColor(int index, int r, int g, int b);
void shellyBrightness(int index, int val);
void flagFrame(String code);
void customFlagFrame();
void sparkleFrame();
void meteorFrame();

// ═══════════════════════════════════════════════════════════════
// SETUP
// ═══════════════════════════════════════════════════════════════

void setup() {

  Serial.begin(115200);
  Serial.println("\n[FluxLight] A iniciar...");

  // LEDs
  strip.begin();
  strip.setBrightness(ledBrightness);
  strip.clear();
  strip.show();

  // IP FIXO
  IPAddress local_IP(192, 168, 1, 115);   // alinhado com ESP32_IP no script.js
  IPAddress gateway(192, 168, 1, 1);
  IPAddress subnet(255, 255, 255, 0);
  WiFi.config(local_IP, gateway, subnet);

  // WIFI
  WiFi.begin(ssid, password);
  Serial.print("[FluxLight] A ligar ao Wi-Fi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("[FluxLight] Wi-Fi ligado!");
  Serial.print("[FluxLight] IP do ESP32: ");
  Serial.println(WiFi.localIP());

  // Desligar power-save do Wi-Fi — CRÍTICO para estabilidade.
  // Sem isto, o ESP32 adormece a rádio entre pacotes e as ligações
  // começam a expirar (timeout) passado algum tempo de uso.
  WiFi.setSleep(false);

  // ROUTES + SERVER
  setupRoutes();
  server.begin();
  Serial.println("[FluxLight] Servidor iniciado");

  // BOOT
  bootAnimation();
}

// ═══════════════════════════════════════════════════════════════
// LOOP
// ═══════════════════════════════════════════════════════════════

void loop() {
  server.handleClient();
  if (effectRunning) runEffect();
}

// ═══════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════

void setupRoutes() {

  // ROOT
  server.on("/", HTTP_GET, []() {
    addCORSHeaders();
    server.send(200, "text/plain", "FluxLight API Online v2.2");
  });

  // STATUS
  server.on("/status", HTTP_GET, []() {
    addCORSHeaders();
    String json =
      "{\"status\":\"ok\",\"ledOn\":" +
      String(ledOn ? "true" : "false") +
      ",\"effect\":\"" + currentEffect + "\"}";
    server.send(200, "application/json", json);
  });

  // ═══ LED ═══

  server.on("/led/on", HTTP_GET, []() {
    addCORSHeaders();
    ledOn = true;
    effectRunning = false;
    currentEffect = "";
    applyLEDColor();
    server.send(200, "application/json", "{\"led\":\"on\"}");
  });

  server.on("/led/off", HTTP_GET, []() {
    addCORSHeaders();
    ledOn = false;
    effectRunning = false;
    currentEffect = "";
    strip.clear();
    strip.show();
    server.send(200, "application/json", "{\"led\":\"off\"}");
  });

  server.on("/led/color", HTTP_GET, []() {
    addCORSHeaders();
    ledR = server.arg("r").toInt();
    ledG = server.arg("g").toInt();
    ledB = server.arg("b").toInt();
    ledOn = true;
    effectRunning = false;
    currentEffect = "";
    applyLEDColor();
    server.send(200, "application/json", "{\"color\":\"ok\"}");
  });

  server.on("/led/brightness", HTTP_GET, []() {
    addCORSHeaders();
    ledBrightness = constrain(server.arg("value").toInt(), 0, 255);
    strip.setBrightness(ledBrightness);
    strip.show();
    server.send(200, "application/json", "{\"brightness\":\"ok\"}");
  });

  // ═══ EFEITOS ═══

  server.on("/effect/rainbow", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("rainbow");
    server.send(200, "application/json", "{\"effect\":\"rainbow\"}");
  });

  server.on("/effect/disco", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("disco");
    server.send(200, "application/json", "{\"effect\":\"disco\"}");
  });

  server.on("/effect/fire", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("fire");
    server.send(200, "application/json", "{\"effect\":\"fire\"}");
  });

  server.on("/effect/pulse", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("pulse");
    server.send(200, "application/json", "{\"effect\":\"pulse\"}");
  });

  server.on("/effect/wave", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("wave");
    server.send(200, "application/json", "{\"effect\":\"wave\"}");
  });

  server.on("/effect/fade", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("fade");
    server.send(200, "application/json", "{\"effect\":\"fade\"}");
  });

  server.on("/effect/sparkle", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("sparkle");
    server.send(200, "application/json", "{\"effect\":\"sparkle\"}");
  });

  server.on("/effect/meteor", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("meteor");
    server.send(200, "application/json", "{\"effect\":\"meteor\"}");
  });

  server.on("/effect/stop", HTTP_GET, []() {
    addCORSHeaders();
    effectRunning = false;
    currentEffect = "";
    strip.clear();
    strip.show();
    server.send(200, "application/json", "{\"effect\":\"stopped\"}");
  });

  // ═══ SHELLY — GLOBAL ═══

  server.on("/shelly/on", HTTP_GET, []() {
    addCORSHeaders();
    // Responder PRIMEIRO ao browser, contactar as lâmpadas DEPOIS.
    // Evita bloquear o handleClient() enquanto se fala com as Shelly.
    server.send(200, "application/json", "{\"shelly\":\"all_on\"}");
    for (int i = 0; i < NUM_SHELLY; i++) shellyRequest(i, "on");
  });

  server.on("/shelly/off", HTTP_GET, []() {
    addCORSHeaders();
    server.send(200, "application/json", "{\"shelly\":\"all_off\"}");
    for (int i = 0; i < NUM_SHELLY; i++) shellyRequest(i, "off");
  });

  // ═══ SHELLY — INDIVIDUAL (dinâmico: /shelly/{n}/...) ═══
  // Usa UriBraces para aceitar qualquer índice de lâmpada (0, 1, 2, ...)
  // Assim, adicionar lâmpadas na app funciona sem reprogramar o ESP32.

  server.on(UriBraces("/shelly/{}/on"), HTTP_GET, []() {
    addCORSHeaders();
    int idx = server.pathArg(0).toInt();
    server.send(200, "application/json", "{\"shelly\":\"" + String(idx) + "_on\"}");
    shellyRequest(idx, "on");
  });

  server.on(UriBraces("/shelly/{}/off"), HTTP_GET, []() {
    addCORSHeaders();
    int idx = server.pathArg(0).toInt();
    server.send(200, "application/json", "{\"shelly\":\"" + String(idx) + "_off\"}");
    shellyRequest(idx, "off");
  });

  server.on(UriBraces("/shelly/{}/color"), HTTP_GET, []() {
    addCORSHeaders();
    int idx = server.pathArg(0).toInt();
    int r = server.arg("r").toInt(), g = server.arg("g").toInt(), b = server.arg("b").toInt();
    server.send(200, "application/json", "{\"shelly\":\"" + String(idx) + "_color_ok\"}");
    shellyColor(idx, r, g, b);
  });

  server.on(UriBraces("/shelly/{}/brightness"), HTTP_GET, []() {
    addCORSHeaders();
    int idx = server.pathArg(0).toInt();
    int val = server.arg("value").toInt();
    server.send(200, "application/json", "{\"shelly\":\"" + String(idx) + "_brightness_ok\"}");
    shellyBrightness(idx, val);
  });

  // ═══ BANDEIRAS ═══

  server.on("/flag/pt", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("flag_pt");
    server.send(200, "application/json", "{\"flag\":\"pt\"}");
  });

  server.on("/flag/br", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("flag_br");
    server.send(200, "application/json", "{\"flag\":\"br\"}");
  });

  server.on("/flag/es", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("flag_es");
    server.send(200, "application/json", "{\"flag\":\"es\"}");
  });

  server.on("/flag/fr", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("flag_fr");
    server.send(200, "application/json", "{\"flag\":\"fr\"}");
  });

  server.on("/flag/de", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("flag_de");
    server.send(200, "application/json", "{\"flag\":\"de\"}");
  });

  server.on("/flag/it", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("flag_it");
    server.send(200, "application/json", "{\"flag\":\"it\"}");
  });

  server.on("/flag/gb", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("flag_gb");
    server.send(200, "application/json", "{\"flag\":\"gb\"}");
  });

  server.on("/flag/us", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("flag_us");
    server.send(200, "application/json", "{\"flag\":\"us\"}");
  });

  server.on("/flag/jp", HTTP_GET, []() {
    addCORSHeaders();
    startEffect("flag_jp");
    server.send(200, "application/json", "{\"flag\":\"jp\"}");
  });

  // Bandeira personalizada criada na app.
  // Formato: /flag/custom?c=RRGGBB,RRGGBB,...  (hex sem #, até 8 cores)
  server.on("/flag/custom", HTTP_GET, []() {
    addCORSHeaders();
    String c = server.arg("c");
    customFlagCount = 0;
    int start = 0;
    while (start < c.length() && customFlagCount < 8) {
      int comma = c.indexOf(',', start);
      if (comma == -1) comma = c.length();
      String hex = c.substring(start, comma);
      if (hex.length() == 6) {
        long v = strtol(hex.c_str(), NULL, 16);
        customFlagColors[customFlagCount][0] = (v >> 16) & 0xFF; // R
        customFlagColors[customFlagCount][1] = (v >> 8)  & 0xFF; // G
        customFlagColors[customFlagCount][2] =  v        & 0xFF; // B
        customFlagCount++;
      }
      start = comma + 1;
    }
    if (customFlagCount > 0) {
      startEffect("flag_custom");
      server.send(200, "application/json", "{\"flag\":\"custom\",\"n\":" + String(customFlagCount) + "}");
    } else {
      server.send(400, "application/json", "{\"error\":\"no colors\"}");
    }
  });

  server.on("/flag/stop", HTTP_GET, []() {
    addCORSHeaders();
    effectRunning = false;
    currentEffect = "";
    strip.clear();
    strip.show();
    server.send(200, "application/json", "{\"flag\":\"stopped\"}");
  });

  // ═══ 404 ═══

  server.onNotFound([]() {
    addCORSHeaders();
    server.send(404, "application/json", "{\"error\":\"Not found\"}");
  });
}

// ═══════════════════════════════════════════════════════════════
// LED CONTROL
// ═══════════════════════════════════════════════════════════════

void applyLEDColor() {
  uint32_t color = strip.Color(ledR, ledG, ledB);
  for (int i = 0; i < NUM_LEDS; i++) {
    strip.setPixelColor(i, color);
  }
  strip.show();
}

// ═══════════════════════════════════════════════════════════════
// SHELLY HTTP
// ═══════════════════════════════════════════════════════════════

// ─── Helper: faz um GET simples e devolve o código HTTP ───
int shellyGET(const String& url) {
  HTTPClient http;
  http.begin(url);
  http.setConnectTimeout(800);  // desistir depressa se a lâmpada não atende
  http.setTimeout(1200);        // leitura curta — evita bloqueios longos
  int code = http.GET();
  http.end();
  return code;
}

// ─── Helper: envia um comando às Shelly tentando 2 gerações ───
// Estratégia "blindada": tenta primeiro o formato Gen2/Gen3 (RPC).
// Se falhar (código HTTP inválido), tenta o formato Gen1 (antigo).
// Assim funciona seja qual for a geração da lâmpada, sem alterar código.
void shellyDual(int index, const String& rpcUrl, const String& gen1Url) {
  if (index < 0 || index >= NUM_SHELLY) return;
  int code = shellyGET(rpcUrl);
  // Só tenta Gen1 se a lâmpada RESPONDEU mas rejeitou o RPC (code >= 400).
  // Se code <= 0 a lâmpada está inacessível — tentar Gen1 só acumularia
  // mais um timeout à toa.
  if (code >= 400) {
    shellyGET(gen1Url);
  }
}

void shellyRequest(int index, String action) {
  if (index < 0 || index >= NUM_SHELLY) return;
  String ip = shellyIPs[index];
  bool on = (action == "on");
  // Gen3 (RPC): /rpc/RGBW.Set?id=0&on=true|false
  String rpc  = "http://" + ip + "/rpc/RGBW.Set?id=0&on=" + (on ? "true" : "false");
  // Gen1: /light/0?turn=on|off
  String gen1 = "http://" + ip + "/light/0?turn=" + action;
  shellyDual(index, rpc, gen1);
}

void shellyColor(int index, int r, int g, int b) {
  if (index < 0 || index >= NUM_SHELLY) return;
  String ip = shellyIPs[index];
  // Gen3 (RPC): rgb como array [r,g,b] + on=true
  String rpc  = "http://" + ip + "/rpc/RGBW.Set?id=0&on=true&rgb=[" +
                String(r) + "," + String(g) + "," + String(b) + "]";
  // Gen1: /light/0?red=&green=&blue=&white=0&turn=on
  String gen1 = "http://" + ip + "/light/0?red=" + String(r) +
                "&green=" + String(g) + "&blue=" + String(b) +
                "&white=0&turn=on";
  shellyDual(index, rpc, gen1);
}

void shellyBrightness(int index, int val) {
  if (index < 0 || index >= NUM_SHELLY) return;
  val = constrain(val, 0, 100);
  String ip = shellyIPs[index];
  // Gen3 (RPC): brightness 0..100
  String rpc  = "http://" + ip + "/rpc/RGBW.Set?id=0&brightness=" + String(val);
  // Gen1: gain 0..100
  String gen1 = "http://" + ip + "/light/0?gain=" + String(val);
  shellyDual(index, rpc, gen1);
}

// ═══════════════════════════════════════════════════════════════
// EFFECTS ENGINE
// ═══════════════════════════════════════════════════════════════

void startEffect(const String& name) {
  currentEffect = name;
  effectRunning = true;
  effectStep    = 0;
  effectTimer   = 0;
  ledOn         = true;
}

void runEffect() {
  uint32_t now = millis();

  if (currentEffect == "rainbow") {
    if (now - effectTimer >= 20) {
      effectTimer = now;
      rainbowFrame();
      effectStep++;
    }

  } else if (currentEffect == "disco") {
    if (now - effectTimer >= 80) {
      effectTimer = now;
      discoFrame();
    }

  } else if (currentEffect == "fire") {
    if (now - effectTimer >= 30) {
      effectTimer = now;
      fireFrame();
    }

  } else if (currentEffect == "pulse") {
    if (now - effectTimer >= 15) {
      effectTimer = now;
      pulseFrame();
    }

  } else if (currentEffect == "wave") {
    if (now - effectTimer >= 25) {
      effectTimer = now;
      waveFrame();
      effectStep++;
    }

  } else if (currentEffect == "fade") {
    if (now - effectTimer >= 20) {
      effectTimer = now;
      fadeFrame();
      effectStep++;
    }

  } else if (currentEffect == "sparkle") {
    if (now - effectTimer >= 50) {
      effectTimer = now;
      sparkleFrame();
    }

  } else if (currentEffect == "meteor") {
    if (now - effectTimer >= 30) {
      effectTimer = now;
      meteorFrame();
      effectStep++;
    }

  } else if (currentEffect == "flag_custom") {
    if (now - effectTimer >= 40) {
      effectTimer = now;
      customFlagFrame();
      effectStep++;
    }

  } else if (currentEffect.startsWith("flag_")) {
    if (now - effectTimer >= 40) {
      effectTimer = now;
      flagFrame(currentEffect.substring(5));
      effectStep++;
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// FRAMES DE EFEITOS
// ═══════════════════════════════════════════════════════════════

// RAINBOW
void rainbowFrame() {
  for (int i = 0; i < NUM_LEDS; i++) {
    uint16_t hue = ((uint32_t)i * 65536L / NUM_LEDS +
                    (uint32_t)effectStep * 256) & 0xFFFF;
    strip.setPixelColor(i, strip.gamma32(strip.ColorHSV(hue)));
  }
  strip.show();
}

// DISCO
void discoFrame() {
  for (int i = 0; i < NUM_LEDS; i++) {
    strip.setPixelColor(i, strip.Color(random(256), random(256), random(256)));
  }
  strip.show();
}

// FIRE
void fireFrame() {
  static uint8_t heat[NUM_LEDS];

  for (int i = 0; i < NUM_LEDS; i++) {
    if (heat[i] > 0) {
      heat[i] = constrain(heat[i] - random(2, 6), 0, 255);
    }
  }

  for (int i = NUM_LEDS - 1; i > 1; i--) {
    heat[i] = (heat[i - 1] + heat[i - 2] + heat[i - 2]) / 3;
  }

  if (random(255) < 120) {
    int pos = random(NUM_LEDS / 4);
    heat[pos] = constrain(heat[pos] + random(160, 255), 0, 255);
  }

  for (int i = 0; i < NUM_LEDS; i++) {
    uint8_t h = heat[i];
    uint8_t r, g, b;
    if (h < 85) {
      r = h * 3; g = 0; b = 0;
    } else if (h < 170) {
      r = 255; g = (h - 85) * 3; b = 0;
    } else {
      r = 255; g = 255; b = (h - 170) * 3;
    }
    strip.setPixelColor(i, strip.Color(r, g, b));
  }
  strip.show();
}

// PULSE
void pulseFrame() {
  static uint8_t pulseVal = 0;
  static bool    pulseUp  = true;

  if (pulseUp) {
    pulseVal += 3;
    if (pulseVal >= 252) { pulseVal = 252; pulseUp = false; }
  } else {
    pulseVal -= 3;
    if (pulseVal <= 3) { pulseVal = 3; pulseUp = true; }
  }

  uint32_t color = strip.Color(
    (uint8_t)(ledR * pulseVal / 255),
    (uint8_t)(ledG * pulseVal / 255),
    (uint8_t)(ledB * pulseVal / 255));

  for (int i = 0; i < NUM_LEDS; i++) strip.setPixelColor(i, color);
  strip.show();
}

// WAVE
void waveFrame() {
  for (int i = 0; i < NUM_LEDS; i++) {
    float   angle      = (i + effectStep) * 0.15f;
    uint8_t brightness = (uint8_t)((sin(angle) * 0.5f + 0.5f) * 255);
    strip.setPixelColor(i, strip.Color(
      (uint8_t)(ledR * brightness / 255),
      (uint8_t)(ledG * brightness / 255),
      (uint8_t)(ledB * brightness / 255)));
  }
  strip.show();
}

// FADE
void fadeFrame() {
  uint16_t hue   = (uint32_t)effectStep * 180;
  uint32_t color = strip.gamma32(strip.ColorHSV(hue, 255, ledBrightness));
  for (int i = 0; i < NUM_LEDS; i++) strip.setPixelColor(i, color);
  strip.show();
}

// SPARKLE — faíscas brancas aleatórias que desvanecem sobre a cor base
void sparkleFrame() {
  // Escurece toda a fita ligeiramente (efeito de rasto/desvanecer)
  for (int i = 0; i < NUM_LEDS; i++) {
    uint32_t col = strip.getPixelColor(i);
    uint8_t r = (uint8_t)(col >> 16) * 0.75;
    uint8_t g = (uint8_t)(col >> 8)  * 0.75;
    uint8_t b = (uint8_t)(col)       * 0.75;
    strip.setPixelColor(i, strip.Color(r, g, b));
  }
  // Acende algumas faíscas brancas em posições aleatórias
  int nSparks = NUM_LEDS / 40;               // densidade proporcional ao comprimento
  for (int s = 0; s < nSparks; s++) {
    int pos = random(NUM_LEDS);
    strip.setPixelColor(pos, strip.Color(255, 255, 255));
  }
  strip.show();
}

// METEOR — cometa que percorre a fita deixando rasto que desvanece
void meteorFrame() {
  const int meteorSize = 8;                  // tamanho da cabeça do meteoro

  // Desvanecer todos os LEDs (cria o rasto)
  for (int i = 0; i < NUM_LEDS; i++) {
    if (random(10) > 4) {                     // desvanecimento irregular = mais natural
      uint32_t col = strip.getPixelColor(i);
      uint8_t r = (uint8_t)(col >> 16) * 0.70;
      uint8_t g = (uint8_t)(col >> 8)  * 0.70;
      uint8_t b = (uint8_t)(col)       * 0.70;
      strip.setPixelColor(i, strip.Color(r, g, b));
    }
  }

  // Desenhar a cabeça do meteoro na posição atual (usa a cor escolhida na app)
  int head = effectStep % (NUM_LEDS + meteorSize);
  for (int j = 0; j < meteorSize; j++) {
    int p = head - j;
    if (p >= 0 && p < NUM_LEDS) {
      strip.setPixelColor(p, strip.Color(ledR, ledG, ledB));
    }
  }
  strip.show();
}

// BANDEIRAS — onda animada com as 3 cores nacionais
void flagFrame(String code) {

  // Bandeiras com 3 faixas — [R,G,B] por faixa
  // PT: Verde Amarelo Vermelho
  // ES: Vermelho Amarelo Vermelho
  // FR: Azul Branco Vermelho
  // DE: Preto Vermelho Amarelo
  // IT: Verde Branco Vermelho
  // GB: Azul Branco Vermelho
  // US: Vermelho Branco Azul
  // JP: Branco Vermelho Branco

  uint8_t c[4][3] = {{0,102,0},{255,204,0},{204,0,0},{0,0,0}};
  int numFaixas = 3;

  if      (code == "pt") { uint8_t t[4][3] = {{0,180,0},  {255,200,0},{255,0,0},  {0,0,0}};     memcpy(c,t,12); numFaixas=3; }
  else if (code == "br") { uint8_t t[4][3] = {{0,200,60}, {255,200,0},{0,40,200}, {255,255,255}};memcpy(c,t,12); numFaixas=4; }
  else if (code == "es") { uint8_t t[4][3] = {{255,0,0},  {255,180,0},{255,0,0},  {0,0,0}};      memcpy(c,t,12); numFaixas=3; }
  else if (code == "fr") { uint8_t t[4][3] = {{0,30,200}, {255,255,255},{255,0,0}, {0,0,0}};     memcpy(c,t,12); numFaixas=3; }
  else if (code == "de") { uint8_t t[4][3] = {{0,0,0},    {255,0,0},  {255,180,0},{0,0,0}};      memcpy(c,t,12); numFaixas=3; }
  else if (code == "it") { uint8_t t[4][3] = {{0,200,60}, {255,255,255},{255,0,0}, {0,0,0}};     memcpy(c,t,12); numFaixas=3; }
  else if (code == "gb") { uint8_t t[4][3] = {{0,20,180}, {255,255,255},{255,0,0}, {0,0,0}};     memcpy(c,t,12); numFaixas=3; }
  else if (code == "us") { uint8_t t[4][3] = {{255,0,0},  {255,255,255},{0,20,180},{0,0,0}};     memcpy(c,t,12); numFaixas=3; }
  else if (code == "jp") { uint8_t t[4][3] = {{255,255,255},{255,0,0},{255,255,255},{0,0,0}};    memcpy(c,t,12); numFaixas=3; }

  int seg = NUM_LEDS / numFaixas;

  for (int i = 0; i < NUM_LEDS; i++) {
    int zone = ((i + effectStep) % NUM_LEDS) / seg;
    if (zone >= numFaixas) zone = numFaixas - 1;
    strip.setPixelColor(i, strip.Color(c[zone][0], c[zone][1], c[zone][2]));
  }
  strip.show();
}

// Desenha a bandeira personalizada (cores recebidas via /flag/custom)
void customFlagFrame() {
  if (customFlagCount <= 0) return;
  int seg = NUM_LEDS / customFlagCount;
  if (seg < 1) seg = 1;
  for (int i = 0; i < NUM_LEDS; i++) {
    int zone = ((i + effectStep) % NUM_LEDS) / seg;
    if (zone >= customFlagCount) zone = customFlagCount - 1;
    strip.setPixelColor(i, strip.Color(customFlagColors[zone][0],
                                       customFlagColors[zone][1],
                                       customFlagColors[zone][2]));
  }
  strip.show();
}

// ═══════════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════════

void addCORSHeaders() {
  server.sendHeader("Access-Control-Allow-Origin",  "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
}

void bootAnimation() {
  for (int i = 0; i < NUM_LEDS; i++) {
    strip.setPixelColor(i, strip.Color(255, 106, 0));
  }
  strip.show();
  delay(400);

  for (int b = 255; b >= 0; b -= 5) {
    strip.setBrightness(b);
    strip.show();
    delay(5);
  }

  strip.clear();
  strip.show();
  strip.setBrightness(ledBrightness);
}
