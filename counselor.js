const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const overlay = document.getElementById("overlay");
const addModal = document.getElementById("addModal");
const removeModal = document.getElementById("removeModal");
const table = document.getElementById("tableBody");

/* SEARCH */
searchInput.addEventListener("input",()=>{
  document.querySelectorAll(".row").forEach(row=>{
    row.style.display = row.querySelector(".reg").innerText.includes(searchInput.value) ? "" : "none";
  });
});

/* MODAL OPEN */
addBtn.onclick = () => openModal(addModal);
removeBtn.onclick = () => openModal(removeModal);

function openModal(modal){
  overlay.classList.add("active");
  modal.classList.add("active");
}

function closeModal(){
  overlay.classList.remove("active");
  addModal.classList.remove("active");
  removeModal.classList.remove("active");
}

/* CANCEL BUTTONS FIX */
document.querySelectorAll(".cancel").forEach(btn=>{
  btn.addEventListener("click", closeModal);
});

overlay.onclick = closeModal;

/* ADD STUDENT */
document.querySelector("#addModal .primary").onclick = () => {
  const r = addReg.value;
  const n = addName.value;
  const p = addPercent.value;
  if(!r || !n || !p) return;

  const status = p >= 75 ? "Regular" : "Defaulter";
  const cls = p >= 75 ? "ok" : "bad";

  table.innerHTML += `
  <div class="row">
    <span class="reg">${r}</span>
    <span>${n}</span>
    <span>${p}</span>
    <span class="${cls}">${status}</span>
    <div class="attendance">
      <div class="check present">P</div>
      <div class="check absent">A</div>
    </div>
    <div class="center"><button class="action-btn email">Send</button></div>
    <div class="center"><button class="action-btn sms">Send</button></div>
  </div>`;
  closeModal();
}

/* REMOVE STUDENT */
document.querySelector("#removeModal .danger").onclick = () => {
  document.querySelectorAll(".row").forEach(r=>{
    if(r.querySelector(".reg").innerText === removeReg.value){
      r.remove();
    }
  });
  closeModal();
}

/* ATTENDANCE TOGGLE */
document.addEventListener("click",e=>{
  if(e.target.classList.contains("check")){
    const parent = e.target.parentElement;
    parent.querySelectorAll(".check").forEach(c=>c.classList.remove("active"));
    e.target.classList.toggle("active");
  }
});

/* EMAIL & SMS FEEDBACK */
document.addEventListener("click",e=>{
  if(e.target.classList.contains("action-btn")){
    e.target.innerText = "Sent ✔";
    setTimeout(()=>e.target.innerText="Send",1000);
  }
});
