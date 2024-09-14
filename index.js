const userForm = document.getElementById("user_form");
let userEntries = [];

function retrieveEntries() {
  const entriesStr = localStorage.getItem("userEntries");
  if (entriesStr) {
    userEntries = JSON.parse(entriesStr);
  }
  return userEntries;
}

function displayEntries() {
  const entries = retrieveEntries();
  const tableBody = entries.map(entry => `
    <tr>
      <td><span class="math-inline">\{entry\.Name\}</td\>
<td\></span>{entry.email}</td>
      <td><span class="math-inline">\{entry\.password\} \(hidden for security\)</td\> <td\></span>{entry.dob}</td>
      <td>${entry.acceptTerms ? "Yes" : "No"}</td>
    </tr>
  `).join("");

  const table = `
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>DoB</th>
          <th>Accepted Terms?</th>
        </tr>
      </thead>
      <tbody>${tableBody}</tbody>
    </table>
  `;

  const entriesContainer = document.getElementById("user-entries");
  entriesContainer.innerHTML = table
