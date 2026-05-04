const SECRET_PASSWORD = "adminputra"; // ganti sesuai keinginan

// LOGIN
function login() {
  const input = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (input === SECRET_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";

    renderComments();
  } else {
    error.textContent = "Password salah!";
  }
}

// RENDER KOMENTAR
function renderComments(filteredComments = null) {
  const adminList = document.getElementById("adminList");
  let comments = filteredComments || JSON.parse(localStorage.getItem("comments")) || [];

  if (comments.length === 0) {
    adminList.innerHTML = '<div class="empty-state"><p>Belum ada komentar</p></div>';
    return;
  }

  adminList.innerHTML = "";

  comments.forEach((c, index) => {
    const globalIndex = JSON.parse(localStorage.getItem("comments") || "[]").indexOf(c);
    adminList.innerHTML += `
      <div class="comment-card" data-index="${globalIndex}">
        <div class="comment-header">
          <span class="comment-author">${c.name}</span>
          <span class="comment-date">${new Date(c.date).toLocaleString('id-ID')}</span>
        </div>
        <div class="comment-text">${c.text}</div>
        <div class="comment-actions">
          <button class="btn-delete" onclick="deleteComment(${globalIndex})">
            <span>🗑️ Hapus</span>
          </button>
        </div>
      </div>
    `;
  });
}

// HAPUS KOMENTAR
function deleteComment(index) {
  if (!confirm('Hapus komentar ini?')) return;

  const card = document.querySelector(`[data-index="${index}"]`);
  card.style.animation = 'shake 0.5s ease-in-out';
  
  setTimeout(() => {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
  }, 500);
}

// SEARCH
let searchTimeout;
document.getElementById('search')?.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => performSearch(e.target.value), 300);
});

function performSearch(query) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  const filtered = comments.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.text.toLowerCase().includes(query.toLowerCase())
  );
  renderComments(filtered);
}

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// LOADER
function showLoader() {
  document.getElementById('adminList').innerHTML = '<div class="skeleton-loader"><div class="skeleton"></div><div class="skeleton"></div></div>';
}

// REFRESH with loader
function loadKomentar() {
  showLoader();
  setTimeout(() => renderComments(), 800);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("adminPanel");
  if (panel && panel.style.display === "block") {
    renderComments();
  }
});
