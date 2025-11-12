// Collections: category filter
export function initCollections() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const collectionCards = document.querySelectorAll(".collection-card");

  if (!tabButtons.length || !collectionCards.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      collectionCards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.animation = "fadeInUp 0.6s ease forwards";
          }, 100);
        } else {
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}
