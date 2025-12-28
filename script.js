// Login form role-based redirection

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Stop page reload

  const selectedRole = document.getElementById("roleSelect").value;

  if (selectedRole === "hod") {
    window.location.href = "hod-attendance.html";
  }
  else if (selectedRole === "year") {
    window.location.href = "year-attendance.html";
  }
  else if (selectedRole === "counselor") {
    window.location.href = "counselor-attendance.html";
  }
  else if (selectedRole === "admin") {
    alert("Admin module will be implemented later.");
  }
  else {
    alert("Please select a role to continue.");
  }
});
