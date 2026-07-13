# 💡 FluxLight — Sistema de Iluminação Inteligente
**Prova de Aptidão Profissional (PAP) · 2025/2026**

---

## 📁 Estrutura do Projeto

```
FluxLight/
├── index.html        ← Interface web (estrutura HTML5)
├── style.css         ← Estilos visuais (dark mode premium, responsivo)
├── script.js         ← Lógica JavaScript (comunicação REST com ESP32)
├── esp32_codigo.ino  ← Firmware Arduino para ESP32 DevKitC
└── README.md         ← Este ficheiro
```

---

## ⚙️ Configuração Rápida

### 1. Firmware ESP32 (`esp32_codigo.ino`)

Abrir no Arduino IDE e alterar:

```cpp
// Wi-Fi
const char* ssid     = "O_TEU_WIFI";
const char* password = "A_TUA_PASSWORD";

// IP Fixo (recomendado)
IPAddress local_IP(192, 168, 1, 115);

// Fita LED
#define LED_PIN   13    // GPIO
#define NUM_LEDS  300   // Número de LEDs

// IPs das Shelly
String shellyIPs[] = {
  "192.168.1.101",
  "192.168.1.102",
};
```

**Bibliotecas necessárias (Arduino IDE → Gestor de Bibliotecas):**
- `Adafruit NeoPixel` by Adafruit
- Placa: `ESP32 Dev Module`

**Gravar:** Clica Upload, e quando aparecer `Connecting...` pressiona o botão BOOT no ESP32.

---

### 2. Aplicação Web (`script.js`)

Alterar no topo do ficheiro:

```js
const ESP32_IP = "http://192.168.1.115";  // IP do ESP32

const SHELLY_IPS = [
  "192.168.1.101",
  "192.168.1.102",
];
```

---

## 🔌 Pinagem ESP32

| Ligação | Pino ESP32 | Destino |
|---------|-----------|---------|
| DATA    | GPIO 13   | DIN da fita WS2812B |
| GND     | GND       | GND da fonte + GND da fita |
| 5V      | —         | 5V direto da fonte 5V 10A |

> ⚠️ **NÃO alimentar a fita pelo 5V do ESP32.** Usar fonte 5V 10A diretamente.

---

## 🌐 API REST do ESP32

| Endpoint | Descrição |
|----------|-----------|
| `GET /` | Confirma que a API está online |
| `GET /status` | Estado atual (JSON) |
| **— Fita LED —** | |
| `GET /led/on` | Ligar fita LED |
| `GET /led/off` | Desligar fita LED |
| `GET /led/color?r=255&g=0&b=0` | Cor RGB |
| `GET /led/brightness?value=200` | Brilho (0–255) |
| **— Efeitos —** | |
| `GET /effect/rainbow` | Efeito Rainbow |
| `GET /effect/disco` | Efeito Disco |
| `GET /effect/fire` | Efeito Fire |
| `GET /effect/pulse` | Efeito Pulse |
| `GET /effect/wave` | Efeito Wave |
| `GET /effect/fade` | Efeito Fade |
| `GET /effect/sparkle` | Efeito Sparkle |
| `GET /effect/meteor` | Efeito Meteor |
| `GET /effect/stop` | Parar efeito |
| **— Bandeiras —** | |
| `GET /flag/pt` | Bandeira Portugal |
| `GET /flag/br` | Bandeira Brasil |
| `GET /flag/es` | Bandeira Espanha |
| `GET /flag/fr` | Bandeira França |
| `GET /flag/de` | Bandeira Alemanha |
| `GET /flag/it` | Bandeira Itália |
| `GET /flag/gb` | Bandeira Reino Unido |
| `GET /flag/us` | Bandeira EUA |
| `GET /flag/jp` | Bandeira Japão |
| `GET /flag/custom?c=RRGGBB,RRGGBB,...` | Bandeira personalizada (até 8 cores) |
| `GET /flag/stop` | Parar bandeira |
| **— Shelly (global) —** | |
| `GET /shelly/on` | Ligar todas as Shelly |
| `GET /shelly/off` | Desligar todas as Shelly |
| **— Shelly (individual, `{n}` = 0, 1, ...) —** | |
| `GET /shelly/{n}/on` | Ligar Lâmpada n |
| `GET /shelly/{n}/off` | Desligar Lâmpada n |
| `GET /shelly/{n}/color?r=255&g=255&b=255` | Cor Lâmpada n |
| `GET /shelly/{n}/brightness?value=80` | Brilho Lâmpada n (0–100%) |

---

## 🚀 Como Utilizar

1. Gravar `esp32_codigo.ino` no ESP32
2. Verificar IP no Serial Monitor (115200 baud)
3. Confirmar `ESP32_IP` no `script.js` (deve ser `http://192.168.1.115`)
4. Colocar `index.html`, `style.css` e `script.js` na mesma pasta
5. Abrir `index.html` no browser (mesma rede Wi-Fi)
6. Password de acesso por defeito: **1234**

---

## 🛠️ Hardware

| Componente | Especificação |
|-----------|--------------|
| Microcontrolador | ESP32 DevKitC |
| Fita LED | WS2812B 5m · 300 LEDs |
| Fonte de alimentação | 5V 10A |
| Lâmpadas inteligentes | Shelly Bulb RGBW E27 Wi-Fi |

---

## 🌟 Funcionalidades

- Splash screen animada com partículas
- Dashboard com estado em tempo real
- 5 línguas — 🇵🇹 🇬🇧 🇩🇪 🇫🇷 🇪🇸
- Controlo da fita LED — ON/OFF, cor RGB, brilho
- 2 lâmpadas Shelly individuais (arquitetura escalável a N)
- 8 efeitos dinâmicos (Rainbow, Disco, Fire, Pulse, Wave, Fade, Sparkle, Meteor)
- 9 bandeiras animadas em onda
- 4 cenas rápidas (Relaxar, Foco, Festa, Noite)
- Password de acesso configurável
- Modo offline / demonstração
- Design responsivo mobile e PC
- IP fixo no ESP32

---


---

## 🔆 Compatibilidade das Lâmpadas Shelly

O firmware comunica com as Shelly tentando **automaticamente dois formatos**:

1. **Gen2/Gen3 (RPC)** — `http://<IP>/rpc/RGBW.Set?id=0&on=true&rgb=[255,0,0]`
2. **Gen1 (fallback)** — `http://<IP>/light/0?turn=on&red=255&green=0&blue=0`

Se o formato RPC falhar, tenta o Gen1. Assim funciona com qualquer geração sem alterar código.

> **Teste rápido ao receber a lâmpada:** no browser, abrir
> `http://<IP_DA_LAMPADA>/rpc/Shelly.GetDeviceInfo`.
> Se devolver JSON → é Gen3 (RPC). Caso contrário, o fallback Gen1 trata do resto.


*FluxLight · Rafael Figueiredo & Thomas Gonçalves · PAP 2025/2026*
