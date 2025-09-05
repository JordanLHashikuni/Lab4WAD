// ======================
// Dark / Light Mode Toggle
// ======================
const themeSwitch = document.getElementById("themeSwitch");
themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeSwitch.checked);
    document.body.classList.toggle("light", !themeSwitch.checked);
});

// ======================
// Form Validation + Submission
// ======================
function validateEmail(value) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    document.getElementById("err-email").textContent = ok ? "" : "Enter a valid email.";
    return ok;
}

function getSelectedYear() {
    const years = document.querySelectorAll("input[name='year']");
    for (let y of years) if (y.checked) return y.value;
    return "";
}

function getSelectedInterests() {
    const checks = document.querySelectorAll("input[name='interests']:checked");
    return Array.from(checks).map(c => c.value);
}

function addEntry(data) {
    // Card
    const card = document.createElement("div");
    card.className = "card-person";
    card.innerHTML = `
    <img src="${data.photo || 'https://placehold.co/128'}" alt="Profile photo">
    <h3>${data.first} ${data.last}</h3>
    <p><span class="badge">${data.prog}</span> <span class="badge">Year ${data.year}</span></p>
    <p>${data.interests.length ? data.interests.join(", ") : "No interests"}</p>
    <button onclick="removeEntry(this)">Remove</button>
  `;
    document.getElementById("cards").prepend(card);

    // Table row
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${data.first} ${data.last}</td>
    <td>${data.prog}</td>
    <td>${data.year}</td>
    <td>${data.interests.length ? data.interests.join(", ") : "None"}</td>
    <td><button onclick="removeEntry(this)">Remove</button></td>
  `;
    document.querySelector("#summary tbody").prepend(tr);
}

function removeEntry(button) {
    const parent = button.closest(".card-person") || button.closest("tr");
    parent.remove();
}

// Form submit
document.getElementById("regForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const first = document.getElementById("first").value.trim();
    const last = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();
    const prog = document.getElementById("prog").value;
    const year = getSelectedYear();
    const interests = getSelectedInterests();
    const photo = document.getElementById("photo").value.trim();

    // Reset errors
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    let valid = true;
    if (!first) { document.getElementById("err-first").textContent = "First name required."; valid = false; }
    if (!last) { document.getElementById("err-last").textContent = "Last name required."; valid = false; }
    if (!validateEmail(email)) valid = false;
    if (!prog) { document.getElementById("err-prog").textContent = "Select a programme."; valid = false; }
    if (!year) { document.getElementById("err-year").textContent = "Select a year."; valid = false; }

    if (!valid) {
        document.getElementById("live").textContent = "Fix errors before submitting.";
        return;
    }

    addEntry({ first, last, email, prog, year, interests, photo });
    document.getElementById("regForm").reset();
    document.getElementById("live").textContent = "Profile added successfully!";
});
