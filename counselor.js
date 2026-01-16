/* ===============================
   ELEMENT REFERENCES
================================ */
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const overlay = document.getElementById("overlay");
const addModal = document.getElementById("addModal");
const removeModal = document.getElementById("removeModal");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const datePicker = document.getElementById("datePicker");

/* ===============================
   IN-MEMORY ATTENDANCE STORE
   (Frontend simulation – backend-ready)
================================ */
const attendanceDB = {}; 
// structure:
// attendanceDB["YYYY-MM-DD"][regNo] = "P" | "A" | null

/* ===============================
   UTIL FUNCTIONS
================================ */
function todayDate() {
  return new Date().toISOString().split("T")[0];
}

function isPastDate(date) {
  return date < todayDate();
}

function openModal(modal) {
  overlay.classList.add("active");
  modal.classList.add("active");
}

function closeModal() {
  overlay.classList.remove("active");
  addModal.classList.remove("active");
  removeModal.classList.remove("active");
}

/* ===============================
   MODAL CONTROLS
================================ */
addBtn.onclick = () => openModal(addModal);
removeBtn.onclick = () => openModal(removeModal);

overlay.onclick = closeModal;

document.querySelectorAll(".cancel").forEach(btn => {
  btn.addEventListener("click", closeModal);
});

/* ===============================
   SEARCH (REG NO)
================================ */
searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim();
  document.querySelectorAll(".row").forEach(row => {
    const reg = row.querySelector(".reg").innerText;
    row.style.display = reg.includes(value) ? "" : "none";
  });
});

/* ===============================
   ADD STUDENT
================================ */
document.querySelector("#addModal .primary").onclick = () => {
  const r = addReg.value.trim();
  const n = addName.value.trim();
  const p = addPercent.value.trim();

  if (!r || !n || !p) return;

  const status = p >= 75 ? "Regular" : "Defaulter";
  const cls = p >= 75 ? "ok" : "bad";

  tableBody.innerHTML += `
    <div class="row">
      <span class="reg">${r}</span>
      <span>${n}</span>
      <span>${p}</span>
      <span class="${cls}">${status}</span>

      <div class="attendance">
        <div class="check present">P</div>
        <div class="check absent">A</div>
      </div>

      <div class="center">
        <button class="action-btn email">Send</button>
      </div>
      <div class="center">
        <button class="action-btn sms">Send</button>
      </div>
    </div>
  `;

  addReg.value = "";
  addName.value = "";
  addPercent.value = "";
  closeModal();
};

/* ===============================
   REMOVE STUDENT
================================ */
document.querySelector("#removeModal .danger").onclick = () => {
  const reg = removeReg.value.trim();
  document.querySelectorAll(".row").forEach(row => {
    if (row.querySelector(".reg").innerText === reg) {
      row.remove();
    }
  });
  removeReg.value = "";
  closeModal();
};

/* ===============================
   DATE CHANGE HANDLER
================================ */
datePicker.addEventListener("change", () => {
  const selectedDate = datePicker.value;

  // visual glow
  datePicker.style.boxShadow = "0 0 25px rgba(0,245,160,0.9)";
  setTimeout(() => datePicker.style.boxShadow = "", 600);

  document.querySelectorAll(".row").forEach(row => {
    const reg = row.querySelector(".reg").innerText;
    const checks = row.querySelectorAll(".check");

    // reset UI
    checks.forEach(c => c.classList.remove("active"));
    row.classList.remove("locked");

    // load previous attendance
    if (
      attendanceDB[selectedDate] &&
      attendanceDB[selectedDate][reg]
    ) {
      const val = attendanceDB[selectedDate][reg];
      if (val === "P") row.querySelector(".present").classList.add("active");
      if (val === "A") row.querySelector(".absent").classList.add("active");
    }

    // lock past dates
    if (isPastDate(selectedDate)) {
      row.classList.add("locked");
    }
  });
});

/* ===============================
   ATTENDANCE TOGGLE (P / A / UNMARK)
================================ */
document.addEventListener("click", e => {
  if (!e.target.classList.contains("check")) return;

  const row = e.target.closest(".row");
  if (row.classList.contains("locked")) return;

  const reg = row.querySelector(".reg").innerText;
  const date = datePicker.value;

  if (!attendanceDB[date]) attendanceDB[date] = {};

  const parent = e.target.parentElement;
  const wasActive = e.target.classList.contains("active");

  parent.querySelectorAll(".check").forEach(c => c.classList.remove("active"));

  if (wasActive) {
    attendanceDB[date][reg] = null; // unmark
  } else {
    e.target.classList.add("active");
    attendanceDB[date][reg] = e.target.classList.contains("present") ? "P" : "A";
  }
});

/* ===============================
   EMAIL & SMS FEEDBACK
================================ */
document.addEventListener("click", e => {
  if (!e.target.classList.contains("action-btn")) return;

  const btn = e.target;
  const oldText = btn.innerText;
  btn.innerText = "Sent ✔";
  btn.disabled = true;

  setTimeout(() => {
    btn.innerText = oldText;
    btn.disabled = false;
  }, 1200);
});

/* ===============================
   INIT (SET TODAY)
================================ */
datePicker.value = todayDate();
datePicker.dispatchEvent(new Event("change"));
