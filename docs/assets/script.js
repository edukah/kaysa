// Function to toggle between Dark Mode and Light Mode
function toggleMode () {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    sessionStorage.removeItem('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
    sessionStorage.setItem('dark-mode', '1');
  }
}

function openPopup () {
  const overlay = document.getElementById("examplesPopupOverlay");
  const popup = document.getElementById("examplesPopup");
  overlay.style.visibility = "visible";
  overlay.style.opacity = "1";
  popup.classList.add("is-open");
}

function closePopup () {
  const overlay = document.getElementById("examplesPopupOverlay");
  const popup = document.getElementById("examplesPopup");
  overlay.style.opacity = "0";
  overlay.style.visibility = "hidden";
  popup.classList.remove("is-open");
}

document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('currentYear')) {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  }
});

/**
 * Sets active state for navigation links based on current page URL
 */
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = new URL(globalThis.location.href).pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('nav a, .navi-popup a, .bottom-tab a').forEach(a => {
    const linkPage = new URL(a.href, globalThis.location.href).pathname.split('/').pop();
    if (linkPage === currentPage) {
      a.classList.add('active');
    }
  });
});
