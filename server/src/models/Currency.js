const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema(
  {
    name: { type: String },
    symbol: { type: String },
    rank: { type: Number },
    age: { type: Number },
    color: { type: String },
    png32: { type: String },
    png64: { type: String },
    webp32: { type: String },
    webp64: { type: String },
    exchanges: { type: Number },
    markets: { type: Number },
    pairs: { type: Number },
    categories: [{ type: String }],
    allTimeHighUSD: { type: Number },
    circulatingSupply: { type: Number },
    totalSupply: { type: Number },
    maxSupply: { type: Number, default: null },
    links: {
      website: { type: String, default: null },
      whitepaper: { type: String, default: null },
      twitter: { type: String, default: null },
      reddit: { type: String, default: null },
      telegram: { type: String, default: null },
      discord: { type: String, default: null },
      medium: { type: String, default: null },
      instagram: { type: String, default: null },
      tiktok: { type: String, default: null },
      youtube: { type: String, default: null },
      linkedin: { type: String, default: null },
      twitch: { type: String, default: null },
      spotify: { type: String, default: null },
      naver: { type: String, default: null },
      wechat: { type: String, default: null },
      soundcloud: { type: String, default: null },
    },
    rate: { type: Number },
    volume: { type: Number },
    cap: { type: Number },
    liquidity: { type: Number },
    delta: {
      hour: { type: Number },
      day: { type: Number },
      week: { type: Number },
      month: { type: Number },
      quarter: { type: Number },
      year: { type: Number },
    },
  },
  { timestamps: true }
);

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;
