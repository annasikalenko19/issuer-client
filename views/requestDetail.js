import { getRequest, approveRequest, rejectRequest } from "../api.js";
import { navigate } from "../router.js";

function claimsArrayToObject(claims) {
  const obj = {};
  claims.forEach(c => {
    obj[c.claimKey] = c.claimValue;
  });
  return obj;
}

function renderUniversityDegree(claims) {
  return `
    <h3>University Degree Information</h3>
    <table border="1" cellpadding="6" cellspacing="0">
      <tr><td>First name</td><td>${claims.first_name}</td></tr>
      <tr><td>Last name</td><td>${claims.last_name}</td></tr>
      <tr><td>Date of birth</td><td>${claims.birth_date}</td></tr>
      <tr><td>Student ID</td><td>${claims.student_id}</td></tr>
      <tr><td>Graduation year</td><td>${claims.graduation_year}</td></tr>
      <tr><td>Faculty</td><td>${claims.faculty}</td></tr>
      <tr><td>Degree</td><td>${claims.degree}</td></tr>
    </table>
  `;
}

function renderPassport(claims) {
  return `
    <h3>Passport Information</h3>
    <table border="1" cellpadding="6" cellspacing="0">
      <tr><td>First name</td><td>${claims.first_name}</td></tr>
      <tr><td>Last name</td><td>${claims.last_name}</td></tr>
      <tr><td>Date of birth</td><td>${claims.birth_date}</td></tr>
      <tr><td>Passport number</td><td>${claims.passport_number}</td></tr>
      <tr><td>Nationality</td><td>${claims.nationality}</td></tr>
    </table>
  `;
}

export async function renderRequestDetail(id) {
  const app = document.getElementById("app");
  const data = await getRequest(id);

  const claims = claimsArrayToObject(data.claims);

  let claimsSection = "<p>Unsupported credential type</p>";

  if (data.credentialType === "UniversityDegree") {
    claimsSection = renderUniversityDegree(claims);
  }

  if (data.credentialType === "Passport") {
    claimsSection = renderPassport(claims);
  }

  app.innerHTML = `
    <h2>Credential Request Detail</h2>

    <p><b>Request ID:</b> ${data.id}</p>
    <p><b>Transaction ID:</b> ${data.transactionId}</p>
    <p><b>Credential Type:</b> ${data.credentialType}</p>
    <p><b>Status:</b> ${data.status}</p>
    <p><b>Requested at:</b> ${data.requestedAt}</p>

    ${claimsSection}

    <br/>

    <button id="approve">Approve</button>
    <button id="reject">Reject</button>
    <button id="back">Back</button>
  `;

  document.getElementById("approve").onclick = async () => {
    await approveRequest(id);
    navigate("/requests");
  };

  document.getElementById("reject").onclick = async () => {
    const reason = prompt("Enter rejection reason:");

    if (!reason || reason.trim() === "") {
        alert("Rejection reason is required");
        return;
    }

    try {
        await rejectRequest(id, reason);
        alert("Credential request rejected");
        navigate("/requests");
    } catch (e) {
        alert("Reject failed");
        console.error(e);
    }
};


  document.getElementById("back").onclick = () => navigate("/requests");
}
