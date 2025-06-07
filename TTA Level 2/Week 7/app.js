const USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
];

const app = document.getElementById("app");
const navHome = document.getElementById("nav-home");
const navDashboard = document.getElementById("nav-dashboard");
const navLogout = document.getElementById("nav-logout");

function renderLogin() {
  app.innerHTML = `
    <h2>Login</h2>
    <input id="username" placeholder="Username"><br><br>
    <input id="password" type="password" placeholder="Password"><br><br>
    <button onclick="handleLogin()">Login</button>
    <p id="error" style="color:red;"></p>
  `;
}

function renderHome() {
  app.innerHTML = `
    <h2>Welcome to the Home Page</h2>
    <p>This is a demo SPA with role-based access control.</p>
  `;
}

function renderDashboard(role) {
  if (role === "admin") {
    app.innerHTML = `<h2>👑 Admin Dashboard</h2><p>Welcome, admin! You have full access.</p>`;
  } else {
    app.innerHTML = `<h2>👤 User Dashboard</h2><p>Welcome, user! Enjoy your dashboard.</p>`;
  }
}

function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = USERS.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("session", JSON.stringify(user));
    updateNav();
    renderHome();
  } else {
    document.getElementById("error").textContent = "Invalid credentials.";
  }
}

function handleLogout() {
  localStorage.removeItem("session");
  updateNav();
  renderLogin();
}

function updateNav() {
  const session = JSON.parse(localStorage.getItem("session"));
  const loggedIn = !!session;

  navDashboard.style.display = loggedIn ? "inline" : "none";
  navLogout.style.display = loggedIn ? "inline" : "none";
}

// Initial setup
navHome.onclick = () => renderHome();
navDashboard.onclick = () => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (session) renderDashboard(session.role);
};
navLogout.onclick = handleLogout;

(function init() {
  const session = JSON.parse(localStorage.getItem("session"));
  updateNav();
  session ? renderHome() : renderLogin();
})();
