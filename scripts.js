/* ---------- TAB SWITCHING ---------- */
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-link');

  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-hidden', 'true');
  });

  buttons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  const activeTab = document.getElementById(tabId);
  if (!activeTab) return;

  requestAnimationFrame(() => {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-hidden', 'false');
  });

  const activeBtn = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
  }

  try {
    localStorage.setItem('activeTab', tabId);
  } catch (_) {}
}

/* ---------- ACCORDION ANIMATION ---------- */
document.querySelectorAll('details').forEach(details => {
  const summary = details.querySelector('summary');

  // Wrap all non-summary content
  const wrapper = document.createElement('div');
  wrapper.className = 'accordion-content';

  while (details.children.length > 1) {
    wrapper.appendChild(details.children[1]);
  }
  details.appendChild(wrapper);

  // Set initial state
  if (details.open) {
    wrapper.style.height = wrapper.scrollHeight + 'px';
    wrapper.style.opacity = '1';
  }

  summary.addEventListener('click', e => {
    e.preventDefault();

    if (details.open) {
      // CLOSE
      const height = wrapper.scrollHeight;
      wrapper.style.height = height + 'px';

      requestAnimationFrame(() => {
        wrapper.style.height = '0px';
        wrapper.style.opacity = '0';
      });

      setTimeout(() => {
        details.open = false;
      }, 350);
    } else {
      // OPEN
      details.open = true;
      const height = wrapper.scrollHeight;

      wrapper.style.height = '0px';
      wrapper.style.opacity = '0';

      requestAnimationFrame(() => {
        wrapper.style.height = height + 'px';
        wrapper.style.opacity = '1';
      });

      setTimeout(() => {
        wrapper.style.height = 'auto';
      }, 350);
    }
  });
});

/* ---------- RESTORE LAST TAB ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const savedTab = localStorage.getItem('activeTab');
  if (savedTab && document.getElementById(savedTab)) {
    switchTab(savedTab);
  }
});
