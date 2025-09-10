/**
 * Creates and shows a smooth notification at the top of the page
 * @param {string} title - The notification title
 * @param {string} message - The notification message
 */
function showNotification(title, message) {
  // Remove any existing notification
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');

  notification.innerHTML = `
    <div class="notification-title">${title}</div>
    <div class="notification-text">${message}</div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Trigger show animation with slight delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });
  });

  // Auto-hide after 3 seconds with smooth animation
  setTimeout(() => {
    notification.classList.remove('show');
    // Remove from DOM after animation completes
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 400); // Match CSS transition duration
  }, 3000);
}

export function installLinkTracker(container){
  container.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!a) return;

    // Prevent default behavior (no navigation/redirection)
    e.preventDefault();

    // Get the card title for the notification
    const cardTitle = a.querySelector('.card__title')?.textContent || 'Card';

    // Create simplified anchor element object for console logging
    const simplifiedAnchor = {
      href: a.href,
      textContent: a.textContent.trim(),
      ariaLabel: a.getAttribute('aria-label'),
      className: a.className,
      target: a.target || '_self',
      rel: a.getAttribute('rel')
    };

    // Log simplified anchor element to console as requested
    console.log('Card link clicked:', simplifiedAnchor);

    // Show stylish notification
    showNotification(
      'Link Captured & Logged',
      `"${cardTitle}" anchor element logged to console`
    );
  });
}
