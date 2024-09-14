import { getCurrentUser } from "../auth";
export default function Dashboard(): string {
  const user = getCurrentUser();
  return `
  <section>
    <h1>Dashboard, ${user?.email}</h1>
    <p>Welcome to the dashboard</p>
  </section>
  `;
}

export function initDashboard() {
  const logoutBtn = document.querySelector<HTMLButtonElement>(".logout-btn")!;
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  });
}
