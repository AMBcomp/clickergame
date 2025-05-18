const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co"; // ← جایگزین کن
const SUPABASE_KEY = "YOUR_ANON_KEY"; // ← جایگزین کن

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const tonConnect = new TonConnect();

let score = 0;
let address = null;

document.getElementById("connect-wallet").addEventListener("click", async () => {
  await tonConnect.connect();
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
  const { data, error } = await client
    .from('users')
    .upsert({ wallet: address }, { onConflict: ['wallet'] });

  if (error) console.error("Error saving user:", error);
}

async function loadUserScore(address) {
  const { data, error } = await client
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
  const { data, error } = await client
    .from('users')
    .update({ score: score })
    .eq('wallet', address);

  if (error) {
    console.error("خطا در آپدیت امتیاز:", error);
  }
}

document.getElementById("click-btn").addEventListener("click", () => {
  score++;
  document.getElementById("score").innerText = score;
  if (address) updateScore(address, score);
});