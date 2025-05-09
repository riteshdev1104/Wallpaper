const API_URL = "https://sheetdb.io/api/v1/f2iv9cgsu7dg3"; // Replace with your SheetDB API

const searchInput = document.getElementById("search");
const filterCategory = document.getElementById("filterCategory");
const wallpaperGrid = document.getElementById("wallpaperGrid");

function fetchWallpapers() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      displayWallpapers(data);
    });
}

function displayWallpapers(data) {
  const query = searchInput.value.toLowerCase();
  const category = filterCategory.value;

  wallpaperGrid.innerHTML = "";

  data.forEach(wallpaper => {
    const matchesSearch = wallpaper.title.toLowerCase().includes(query);
    const matchesCategory = !category || wallpaper.category === category;

    if (matchesSearch && matchesCategory) {
      const card = document.createElement("div");
      card.className = "wallpaper-card";

      const img = document.createElement("img");
      img.src = wallpaper.image_base64;
      img.alt = wallpaper.title;

      const title = document.createElement("p");
      title.textContent = wallpaper.title;

      const btn = document.createElement("button");
      btn.className = "download-btn";
      btn.textContent = "Download";
      btn.onclick = () => downloadImage(wallpaper.image_base64, wallpaper.title);

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(btn);
      wallpaperGrid.appendChild(card);
    }
  });
}

function downloadImage(base64, name) {
  const a = document.createElement("a");
  a.href = base64;
  a.download = name + ".jpg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

searchInput.addEventListener("input", fetchWallpapers);
filterCategory.addEventListener("change", fetchWallpapers);

fetchWallpapers();