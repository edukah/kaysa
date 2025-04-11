// Function to toggle between Dark Mode and Light Mode
function toggleMode () {
  const body = document.body;
  const switchButton = document.querySelector('.mode-toggle-switch');

  // If dark-mode class exists, remove it; otherwise, add it
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    switchButton.classList.remove('active'); // Update switch state
  } else {
    body.classList.add('dark-mode');
    switchButton.classList.add('active'); // Update switch state
  }
}

function openPopup () {
  document.getElementById("examplesPopupOverlay").style.visibility = "visible";
  document.getElementById("examplesPopupOverlay").style.opacity = "1";
  document.getElementById("examplesPopup").style.top = "20%";
}

function closePopup () {
  document.getElementById("examplesPopupOverlay").style.opacity = "0";
  document.getElementById("examplesPopupOverlay").style.visibility = "hidden";
  document.getElementById("examplesPopup").style.top = "-100%";
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});
