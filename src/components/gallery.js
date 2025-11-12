// Gallery: lightbox
export function initGallery() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  const galleryItems = document.querySelectorAll(".gallery-item img");

  if (!lightbox || !lightboxImage || galleryItems.length === 0) return;

  let currentImageIndex = 0;
  const imageArray = Array.from(galleryItems);

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImage.src = imageArray[index].src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function showNext() {
    currentImageIndex = (currentImageIndex + 1) % imageArray.length;
    lightboxImage.src = imageArray[currentImageIndex].src;
  }

  function showPrev() {
    currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
    lightboxImage.src = imageArray[currentImageIndex].src;
  }

  galleryItems.forEach((img, index) => {
    img.parentElement.addEventListener("click", () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener("click", showNext);
  if (lightboxPrev) lightboxPrev.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeLightbox();
  });
}
