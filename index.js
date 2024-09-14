let userForm = document.getElementById('user-form');
let entries = localStorage.getItem('userEntries') ? JSON.parse(localStorage.getItem('userEntries')) : [];

const loadEntries = () => {
    const entriesTable = document.getElementById('user-entries');
    entriesTable.innerHTML = "";

    if (entries.length > 0) {
        const tableContent = `
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Name</th>
                        <th class="px-4 py-2">Email</th>
                        <th class="px-4 py-2">Password</th>
                        <th class="px-4 py-2">DOB</th>
                        <th class="px-4 py-2">Accepted Terms?</th>
                    </tr>
                </thead>
                <tbody>
                    ${entries.map(entry => `
                        <tr>
                            <td class="border px-4 py-2">${entry.name}</td>
                            <td class="border px-4 py-2">${entry.email}</td>
                            <td class="border px-4 py-2">${entry.password}</td>
                            <td class="border px-4 py-2">${entry.dob}</td>
                            <td class="border px-4 py-2">${entry.acceptTerms ? 'Yes' : 'No'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        entriesTable.innerHTML = tableContent;
    }
};

const saveEntry = (event) => {
    event.preventDefault();
    let formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value,
        acceptTerms: document.getElementById('acceptTerms').checked
    };

    let dobYear = new Date(formData.dob).getFullYear();
    let age = new Date().getFullYear() - dobYear;

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55.");
        document.getElementById('dob').style.border = "1px solid red";
        return;
    } else {
        document.getElementById('dob').style.border = "";
    }

    entries.push(formData);
    localStorage.setItem('userEntries', JSON.stringify(entries));
    loadEntries();
    userForm.reset();
};

userForm.addEventListener('submit', saveEntry);
loadEntries();

