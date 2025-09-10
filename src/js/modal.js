let lastFocused = null;
let currentModalListeners = null;
let isKeyboardUser = false;
let modalOpenedBy = 'mouse'; // 'mouse' or 'keyboard'

// Mark keyboard usage for proper focus management
function markKeyboardUsage() {
  isKeyboardUser = true;
}

// Detect if user is using keyboard navigation
function detectKeyboardUsage() {
  let keyboardUsed = false;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ') {
      keyboardUsed = true;
      isKeyboardUser = true;
    }
  });

  document.addEventListener('mousedown', () => {
    if (keyboardUsed) {
      isKeyboardUser = false;
      keyboardUsed = false;
    }
  });
}

// Initialize keyboard detection
detectKeyboardUsage();

// Ensure body scroll is restored if something goes wrong
window.addEventListener('beforeunload', () => {
  document.body.style.overflow = '';
});

// Safety check to restore scroll if modal is somehow left open
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-root');
  if (modal && modal.classList.contains('hidden')) {
    document.body.style.overflow = '';
  }
});

export function openModal(src, alt, caption, openMethod = 'mouse'){
  const root = document.getElementById('modal-root');
  const img = root.querySelector('.modal-img');
  const cap = root.querySelector('.modal-caption');

  // Set up modal content with proper accessibility
  img.src = src;
  img.alt = alt ? `Enlarged view: ${alt}` : 'Enlarged image view';
  // Don't show caption - hide it
  cap.textContent = '';
  cap.style.display = 'none';

  // Disable body scroll
  document.body.style.overflow = 'hidden';

  // Show modal and make it accessible - use ready class instead of hidden
  root.classList.remove('hidden');
  root.setAttribute('aria-hidden', 'false');

  // Store how the modal was opened and the focused element
  modalOpenedBy = openMethod;
  lastFocused = document.activeElement;

  // Mark the element for keyboard users
  if (lastFocused && lastFocused.getAttribute && isKeyboardUser) {
    lastFocused.setAttribute('data-was-focused', 'true');
  }

  const closeBtn = root.querySelector('.close');

  // Use requestAnimationFrame to ensure the modal is visible before focusing
  requestAnimationFrame(() => {
    closeBtn.focus();
  });

  // Handle click outside modal to close
  function handleClickOutside(e) {
    // Close if clicking on overlay
    if (e.target.classList.contains('overlay')) {
      closeModal('mouse');
      return;
    }

    // Close if clicking on close button
    if (e.target.matches('[data-close-modal]')) {
      closeModal('mouse');
      return;
    }

    // Get the modal image and dialog elements
    const dialog = root.querySelector('.dialog');
    const modalImg = root.querySelector('.modal-img');

    // Don't close if clicking on the image itself
    if (e.target === modalImg) {
      return;
    }

    // Close if clicking outside the dialog but inside the modal
    if (e.target === root && !dialog.contains(e.target)) {
      closeModal('mouse');
    }
  }

  function onKey(e){
    if(e.key === 'Escape'){
      markKeyboardUsage();
      closeModal('keyboard');
    }
    if(e.key === 'Tab'){
      markKeyboardUsage();
      // Simple focus trap
      const focusables = root.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
      const first = focusables[0];
      const last = focusables[focusables.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }

  // Store listeners for proper cleanup
  currentModalListeners = {
    handleClickOutside,
    onKey
  };

  root.addEventListener('click', handleClickOutside);
  root.addEventListener('keydown', onKey);
  root.dataset.listener = '1';
}

export function closeModal(closeMethod = 'mouse'){
  const root = document.getElementById('modal-root');

  // Remove focus from any elements inside the modal first
  const focusedElement = document.activeElement;
  if (root.contains(focusedElement)) {
    focusedElement.blur();
  }

  // Re-enable body scroll
  document.body.style.overflow = '';

  // Clean up event listeners properly WITHOUT cloning
  if (currentModalListeners) {
    root.removeEventListener('click', currentModalListeners.handleClickOutside);
    root.removeEventListener('keydown', currentModalListeners.onKey);
    currentModalListeners = null;
  }

  // Then set aria-hidden and add hidden class
  root.setAttribute('aria-hidden', 'true');
  root.classList.add('hidden');

  // Wait for animation to complete before handling focus
  setTimeout(() => {
    // Clean up the data attribute
    const markedElements = document.querySelectorAll('[data-was-focused="true"]');
    markedElements.forEach(el => el.removeAttribute('data-was-focused'));

    // Smart focus management based on user interaction
    if (closeMethod === 'keyboard' || isKeyboardUser) {
      // For keyboard users: restore focus to the element that opened the modal
      let elementToFocus = null;

      if (lastFocused && document.contains(lastFocused)) {
        elementToFocus = lastFocused;
      } else {
        elementToFocus = document.querySelector('[data-was-focused="true"]');
      }

      if (elementToFocus && elementToFocus.focus) {
        elementToFocus.focus();
      }
    } else {
      // For mouse users: remove focus completely (no visible focus ring)
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
      // Focus the body to ensure no element has focus
      document.body.focus();
      // Immediately remove focus from body to avoid focus ring
      setTimeout(() => {
        if (document.activeElement === document.body) {
          document.activeElement.blur();
        }
      }, 0);
    }

    // Reset references
    lastFocused = null;
    modalOpenedBy = 'mouse';
  }, 300); // Match CSS transition duration
}
