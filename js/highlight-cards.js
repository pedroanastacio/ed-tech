document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".highlight-card");

  cards.forEach((card) => {
    const btn = card.querySelector(".highlight-btn");
    const content = card.querySelector(".highlight-content");
    const cardContent = card.dataset.content;
    const isActive = card.classList.contains("active");

    content.innerHTML = isActive
      ? `<p class="text text-md text-slate">${cardContent}</p>`
      : `<p class="text">?</p>`;

    btn.addEventListener("click", () => {
      const currentlyActive = document.querySelector(".highlight-card.active");

      if (card.classList.contains("active")) {
        card.classList.remove("active");
        btn.textContent = "Abrir";
        content.innerHTML = `<p class="text">?</p>`;
      } else {
        if (currentlyActive) {
          currentlyActive.classList.remove("active");
          const activeBtn = currentlyActive.querySelector(".highlight-btn");
          const activeContent =
            currentlyActive.querySelector(".highlight-content");
          activeBtn.textContent = "Abrir";
          activeContent.innerHTML = `<p class="text">?</p>`;
        }

        card.classList.add("active");
        btn.textContent = "Fechar";
        content.innerHTML = `<p class="text text-md text-slate">${cardContent}</p>`;
      }
    });
  });
});
