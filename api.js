import { mockRequests } from "./mockData.js";
const API_BASE = "http://localhost:8080";

const USE_MOCK = false; // 🔴 переключатель

export async function getRequests() {
    const r = await fetch(`${API_BASE}/api/credentials/requests`);
    return r.json();
    //   if (USE_MOCK) {
    //     return Promise.resolve(mockRequests);
    //   }
}

export async function getRequest(id) {
    const r = await fetch(`${API_BASE}/api/credentials/requests/${id}`);

    if (!r.ok) {
        throw new Error("Failed to load request " + id);
    }

    return r.json();
}

export async function approveRequest(id) {
    if (USE_MOCK) {
        console.log("MOCK APPROVE:", id);
        return;
    }

    const response = await fetch(
        `${API_BASE}/api/credentials/requests/${id}/approve`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to approve credential request");
    }
}

export async function rejectRequest(id, reason) {
    const response = await fetch(
        `${API_BASE}/api/credentials/requests/${id}/reject`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reason })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to reject credential request");
    }
}
