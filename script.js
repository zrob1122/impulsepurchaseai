document.getElementById('regret-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value;
  const tagsRaw = document.getElementById('tags').value;
  const tagCount = tagsRaw
    ? tagsRaw.split(',').map(tag => tag.trim()).filter(Boolean).length
    : 0;
  const priceSensitivity = document.getElementById('priceSensitivity').value;
  const lovesCategory = document.getElementById('lovesCategory').value === 'true';

  const response = await fetch('http://localhost:5000/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      price,
      category,
      tagCount,
      priceSensitivity,
      lovesCategory
    }),
  });

  const data = await response.json();

  if (data?.regretScore !== undefined) {
    const score = data.regretScore.toFixed(2);
    let message = `🤖 Regret Score: ${score}`;

    // Optional: interpret score with fun tiers
    const numScore = parseFloat(score);
    if (numScore >= 81) {
      message += " — 🚨 HOLD UP! This screams impulse buy energy.";
    } else if (numScore >= 61) {
      message += " — ⚠️ Maybe think on it? This might be one of those purchases...";
    } else if (numScore >= 40) {
      message += " — 🤔 Could go either way. You're in the gray zone.";
    } else if (numScore >= 11) {
      message += " — ✅ Looks pretty solid, but still — don’t click 'Buy Now' just yet.";
    } else {
      message += " — 🟢 Chill — this doesn’t feel impulsive at all.";
    }

    document.getElementById('result').innerText = message;
  } else {
    document.getElementById('result').innerText = `❌ Error: Invalid response`;
    console.error('Backend response:', data);
  }
});
