document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loginUser");
  const headerEl = document.getElementById("header-container");
  if (!headerEl) return;

  headerEl.innerHTML = `
    <header class="header">
      <a href="/index.html" class="logo">Livee</a>
      <div class="right-icons">
        <span id="welcomeMsg">
          ${isLoggedIn ? `${JSON.parse(isLoggedIn).name}님` : ''}
        </span>
        <i class="ri-notification-line"></i>
      </div>
    </header>
  `;
});