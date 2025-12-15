function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-link');

  // Hide all tabs
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-hidden', 'true');
  });

  // Deactivate all buttons
  buttons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  // Activate selected tab
  const activeTab = document.getElementById(tabId);
  if (!activeTab) return;

  activeTab.classList.add('active');
  activeTab.setAttribute('aria-hidden', 'false');

  // Activate matching button
  const activeBtn = document.querySelector(
    `.tab-link[data-tab="${tabId}"]`
  );
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
  }

  // Remember selected tab
  try {
    localStorage.setItem('activeTab', tabId);
  } catch (_) {}
}

// Restore last active tab on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTab = localStorage.getItem('activeTab');
  if (savedTab && document.getElementById(savedTab)) {
    switchTab(savedTab);
  }
});