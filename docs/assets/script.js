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

document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('currentYear')) {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  }
});

/**
 * Sets active state for navigation links based on current page URL
 * Handles both main nav links and dropdown menu links
 */
document.addEventListener('DOMContentLoaded', () => {
  // Get current page URL
  const currentUrl = new URL(window.location.href);
  
  // Extract filename WITHOUT query parameters or hash
  const currentPath = currentUrl.pathname; // "/example.html"
  const currentPage = currentPath.split('/').pop() || 'index.html'; // "example.html"
  
  document.querySelectorAll('nav ul.nav-links > li').forEach(li => {
    let hasActiveChild = false;
    
    li.querySelectorAll('a').forEach(a => {
      // Create URL object using current page as base for relative URLs
      const linkUrl = new URL(a.href, window.location.href);
      

      // Get clean pathname only (ignores query/hash)
      const linkPath = linkUrl.pathname; // "/basic.html"
      const linkPage = linkPath.split('/').pop(); // "basic.html"
      
      // Reset active state
      a.classList.remove('active');
      
      // Compare ONLY the filename portions
      if (linkPage === currentPage) {
        a.classList.add('active');
        hasActiveChild = true;
      }
    });
    
    if (hasActiveChild) {
      li.querySelector('a:first-child').classList.add('active');
    }
  });
});
