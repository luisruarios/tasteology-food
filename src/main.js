import './styles.css';
import { openModal, closeModal } from './js/modal.js';
import { installLinkTracker } from './js/tracker.js';

/**
 * Main application initialization
 * Enhances pre-rendered content and adds interactive functionality
 */
async function load(){
  try {
    // Enhance existing pre-rendered content with interactive functionality
    enhanceGallery();
    enhanceCards();
    wireModal();
  } catch (error) {
    console.error('Failed to enhance site functionality:', error);
  }
}

/**
 * Enhances pre-rendered gallery images with modal functionality
 * Adds click handlers to existing image buttons
 */
function enhanceGallery(){
  const galleryButtons = document.querySelectorAll('.mosaic__img');

  galleryButtons.forEach(button => {
    const img = button.querySelector('img');
    if (img) {
      // Get the 3x resolution image for modal from srcset
      const srcset = img.getAttribute('srcset');
      let highResImg = img.src; // fallback to regular src

      if (srcset) {
        // Split srcset and find the 3x image
        const sources = srcset.split(',').map(s => s.trim());
        const highResSource = sources.find(s => s.includes('3x'));
        if (highResSource) {
          // Extract just the URL part (before the space and descriptor)
          highResImg = highResSource.split(' ')[0];
        }
      }

      button.addEventListener('click', () => {
        openModal(highResImg, img.alt, '');
      });
    }
  });
}/**
 * Enhances pre-rendered cards with link tracking
 * Adds click tracking to existing card links
 */
function enhanceCards(){
  const container = document.querySelector('[data-cards]');
  if (container) {
    installLinkTracker(container);
  }
}

/**
 * Hydrates text content from JSON data
 * Populates the article section with dynamic content
 */
function hydrateCopy(data){
  // Update intro text
  document.querySelector('[data-copy-intro]').textContent = data.hero.intro;

  // Update kicker and callout - keeping kicker static as per design
  const kicker = document.querySelector('[data-copy-kicker]');
  kicker.textContent = 'THE PERFECT EGG';

  const callout = document.querySelector('[data-copy-callout]');
  callout.innerHTML = data.hero.perfectEgg;
}

/**
 * Creates an interactive image button element for the gallery
 * @param {Object} img - Image data object containing src paths and metadata
 * @param {string} className - CSS class name for styling (determines image size)
 * @returns {HTMLButtonElement} - Clickable button containing the image
 */
function createImageElement(img, className) {
  const button = document.createElement('button');
  button.className = `mosaic__img ${className}`;
  button.type = 'button';
  button.style.border = 'none';
  button.style.background = 'none';
  button.style.padding = '0';
  button.style.cursor = 'pointer';
  // Add proper accessibility attributes
  button.setAttribute('aria-label', `Open larger view of ${img.alt}`);
  button.setAttribute('title', `Open larger view of ${img.alt}`);
  // Dimensions are controlled by CSS for responsive behavior

  const el = document.createElement('img');
  // Use eager loading for above-the-fold left image, lazy for others
  el.loading = className === 'mosaic__img--left' ? 'eager' : 'lazy';
  el.alt = img.alt; // Keep the descriptive alt text for the image
  el.width = 372;
  el.height = className === 'mosaic__img--left' ? 600 : 295;
  el.src = `/assets/${img.src}`;
  // Provide multiple resolutions for responsive images
  el.srcset = `/assets/${img.src} 1x, /assets/${img.src2x} 2x, /assets/${img.src3x} 3x`;
  el.style.width = '100%';
  el.style.height = '100%';
  el.style.objectFit = 'cover';
  el.style.display = 'block';
  // Remove the role="presentation" - images should be descriptive

  button.appendChild(el);
  // Always use highest resolution (3x) image for modal display
  const highResImg = `/assets/${img.src3x}`;
  button.addEventListener('click', () => openModal(highResImg, img.alt, ''));

  return button;
}/**
 * Renders the gallery section with three images
 * Creates clickable image buttons that open modal on click
 */
function renderGallery(data){
  const [left, rightTop, rightBottom] = data.gallery;

  // Render left image (largest, above-the-fold)
  const leftContainer = document.querySelector('[data-gallery-left]');
  leftContainer.appendChild(createImageElement(left, 'mosaic__img--left'));

  // Render center column images (two smaller images stacked)
  const centerContainer = document.querySelector('[data-gallery-center]');
  centerContainer.appendChild(createImageElement(rightTop, 'mosaic__img--rt'));
  centerContainer.appendChild(createImageElement(rightBottom, 'mosaic__img--rb'));
}

/**
 * Renders the cards section with color-themed content
 * Each card is clickable and implements link tracking as per requirements
 * No separate "Learn more" button - entire card serves as the interactive element
 */
function renderCards(data){
  const container = document.querySelector('[data-cards]');
  data.cards.forEach(card => {
    // Following industry standards: wrap entire card in anchor element
    // This provides semantic meaning, keyboard navigation, and screen reader support
    const cardLink = document.createElement('a');
    cardLink.href = card.href || '#'; // Fallback to # if no href provided
    cardLink.className = 'card-link';
    cardLink.setAttribute('rel', 'noopener'); // Security best practice for external links
    cardLink.setAttribute('target', '_self'); // Stay on same page unless specified
    cardLink.setAttribute('aria-label', `Learn more about ${card.title.toLowerCase()} foods`); // Enhanced accessibility

    const article = document.createElement('article');
    article.className = 'card';

    // Card media with responsive image
    const figure = document.createElement('figure');
    figure.className = 'card__media';

    const img = document.createElement('img');
    img.src = `/assets/${card.image.src}`;
    img.srcset = `/assets/${card.image.src} 1x, /assets/${card.image.src2x} 2x, /assets/${card.image.src3x} 3x`;
    img.alt = card.image.alt;
    img.loading = 'lazy'; // All card images are below-the-fold
    img.width = 372;
    img.height = 240;

    figure.appendChild(img);

    // Card content
    const title = document.createElement('h3');
    title.className = 'card__title';
    title.textContent = card.title;

    const text = document.createElement('p');
    text.className = 'card__text';
    text.textContent = card.body;

    article.appendChild(figure);
    article.appendChild(title);
    article.appendChild(text);

    cardLink.appendChild(article);
    container.appendChild(cardLink);
  });

  // Install link tracker to capture clicks and log to console (requirement)
  installLinkTracker(container);
}

/**
 * Sets up modal event handlers
 * Handles click-to-close, overlay close, ESC key, and image click
 */
function wireModal(){
  const root = document.getElementById('modal-root');

  // Handle clicks on overlay, close button, or image itself
  root.addEventListener('click', (e) => {
    if(e.target.matches('[data-close-modal], .overlay, .modal-img')) closeModal();
  });

  // ESC key handler for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !root.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// Initialize application when DOM is ready
load();
