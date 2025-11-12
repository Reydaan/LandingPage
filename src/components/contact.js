// Contact form and inputs
export function initContact() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    const submitBtn = contactForm.querySelector(".form-submit");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = "Message Sent! ✓";
      submitBtn.style.background = "#4CAF50";
      contactForm.reset();
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
        submitBtn.style.opacity = "";
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });

  const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");
  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.style.transform = "translateY(-2px)";
    });
    input.addEventListener("blur", () => {
      input.parentElement.style.transform = "";
    });
  });
}
