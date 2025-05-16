# 🪙 Crypto Dashboard – RavenPay Assessment

This project is a cryptocurrency trading dashboard built using **React**, **SCSS Modules (BEM)**, and a **Node.js proxy server**. It fetches real-time market data and candlestick charts from the **Binance API**.

---

## ✨ Features

- Real-time trading pairs from Binance
- Interactive candlestick charts with ApexCharts
- Dropdown with search & filter tabs (USD, BTC, All)
- Gravatar profile image via email
- GitHub user lookup by email
- Responsive UI using BEM SCSS
- Node.js server proxy to handle Binance API requests

---

## 📁 Folder Structure

```
.
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── main.jsx
├── server/
│   └── server.js
├── package.json
└── README.md
```

---

## 💠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/crypto-dashboard.git
cd crypto-dashboard
```

### 2. Install dependencies

```bash
npm install
```

---

## 🚀 Running the App

To start both the **React app** and the **Node.js proxy server**, run:

```bash
npm run dev
```

This will:

- Start the frontend on `http://localhost:5173`
- Start the proxy server on `http://localhost:5000`

---

## 🔌 Proxy Server Info

The Node server proxies requests to Binance:

| Route               | Purpose                |
| ------------------- | ---------------------- |
| `/api/ticker`       | 24hr price ticker      |
| `/api/depth`        | Order book depth       |
| `/api/klines`       | Candlestick chart data |
| `/api/exchangeInfo` | Trading pairs metadata |

---

## 📂 Available Scripts

| Script            | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Run both client and server    |
| `npm run server`  | Start only the proxy server   |
| `npm run build`   | Build frontend for production |
| `npm run preview` | Preview built frontend        |

---

## 🧚 Test Features

- Visit `/gravatar-auth` and enter your email
- Redirects to `/gravatar-profile`
- Grabs your Gravatar and GitHub info based on the email

---

## 🧠 Tech Stack

- React 19 + Vite
- SCSS Modules (BEM)
- ApexCharts
- Axios
- Node.js + Express
- blueimp-md5 (for hashing email)

---

## 🧑‍💻 Author

**Idris Balogun (Xenon)**
GitHub: [@idbalorg](https://github.com/idbalorg)
Portfolio: [https://idbalorg.github.io/portfolio](https://idbalorg.github.io/portfolio)

---

## 📜 License

This project was created for the RavenPay Frontend Assessment
and is intended for learning and demo purposes only.
