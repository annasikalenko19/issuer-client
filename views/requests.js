import { getRequests } from "../api.js";
import { navigate } from "../router.js";

export async function renderRequests() {
  const app = document.getElementById("app");
  const requests = await getRequests();

  app.innerHTML = `
    <h2>Pending Requests</h2>

    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Request ID</th>
          <th>Credential Type</th>
          <th>Created at</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${requests.map(r => `
          <tr>
            <td>${r.id}</td>
            <td>${r.credentialType}</td>
            <td>${r.requestedAt}</td>
            <td>${r.status}</td>
            <td>
              <button data-id="${r.id}">Open</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  app.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => navigate(`/requests/${btn.dataset.id}`);
  });
}
