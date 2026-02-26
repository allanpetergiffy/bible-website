let verses = [];
let favorites = [];

// Load verses.json
async function loadVerses() {
  let response = await fetch("verses.json");
  verses = await response.json();
  document.getElementById("content").innerHTML = "<p>Verses loaded! Click the button above.</p>";
}
loadVerses();

// Show random verse
function getRandomVerse() {
  if (verses.length === 0) {
    document.getElementById("content").innerHTML = "<p>Loading verses...</p>";
    return;
  }
  let randomIndex = Math.floor(Math.random() * verses.length);
  let verse = verses[randomIndex];
  document.getElementById("content").innerHTML = `
    <div class="verse-card">
      <h2>${verse.reference}</h2>
      <p>${verse.text}</p>
      <button onclick="addFavorite(${randomIndex})">⭐ Add to Favorites</button>
      <button onclick="copyVerse('${verse.reference}: ${verse.text}')">📋 Copy</button>
    </div>
  `;
}

// Favorites
function addFavorite(index) {
  favorites.push(verses[index]);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Verse added to favorites!");
}

function showFavorites() {
  favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.length === 0) {
    document.getElementById("content").innerHTML = "<p>No favorites yet.</p>";
    return;
  }
  document.getElementById("content").innerHTML = favorites.map(v =>
    `<div class="verse-card"><h3>${v.reference}</h3><p>${v.text}</p></div>`
  ).join("");
}

// Copy verse
function copyVerse(text) {
  navigator.clipboard.writeText(text);
  alert("Verse copied to clipboard!");
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
