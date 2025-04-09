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