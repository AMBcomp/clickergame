// script.js
import { TonConnect } from "https://unpkg.com/@tonconnect/sdk?module";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://covylkvckkgzomoukfcf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdnlsa3Zja2tnem9tb3VrZmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1OTA1ODQsImV4cCI6MjA2MzE2NjU4NH0.QPtnmWaLA-mMqOi2s2ZFT9BLGdYg2Qsoa9sHMhPWT8A";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const tonConnect = new TonConnect();

let score = 0;
let address = null;

document.getElementById("connect-wallet").addEventListener("click", async () => {
  try {
    await tonConnect.connect();
  } catch (e) {
    console.error("Error connecting wallet:", e);
  }
});

tonConnect.onStatusChange(async (walletInfo) => {
  if (walletInfo && walletInfo.account) {
    address = walletInfo.account.address;
    document.getElementById("wallet-address").innerText = address;
    localStorage.setItem("walletAddress", address);

    await saveUser(address);
    await loadUserScore(address);
  }
});

async function saveUser(address) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ wallet: address }, { onConflict: ['wallet'] });

  if (error) console.error("Error saving user:", error);
}

async function loadUserScore(address) {
  const { data, error } = await supabase
    .from('users')
    .select('score')
    .eq('wallet', address)
    .single();

  if (data) {
    score = data.score || 0;
    document.getElementById("score").innerText = score;
  }
}

async function updateScore(address, score) {
  const { data, error } = await supabase
    .from('users')
    .update({ score: score })
    .eq('wallet', address);

  if (error) {
    console.error("Error updating score:", error);
  }
}

document.getElementById("click-btn").addEventListener("click", () => {
  score++;
  document.getElementById("score").innerText = score;
  if (address) updateScore(address, score);
});
