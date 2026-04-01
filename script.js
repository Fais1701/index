document.addEventListener("DOMContentLoaded", () => {

  // SAFE typing effect
  const text = "I built this for you.";
  const typingEl = document.getElementById("typingText");
  let i = 0;

  function type() {
    if (!typingEl) return; // prevent crash

    if (i < text.length) {
      typingEl.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 40);
    } else {
      setTimeout(() => {
        const intro = document.getElementById("intro");
        if (intro) intro.style.display = "none";
      }, 800);
    }
  }

  type();

  // FORM + LOGIC
  const form = document.querySelector("form");
  const successScreen = document.getElementById("successScreen");
  const cards = document.getElementById("cards");
  const btn = form.querySelector("button");

  // Load saved wishes
  const saved = JSON.parse(localStorage.getItem("wishes")) || [];
  saved.forEach(addCard);

  function addCard(text) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = text;
    cards.prepend(div);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    btn.innerText = "Saving...";
    btn.disabled = true;

    const data = new FormData(form);
    const wish = data.get("wish");

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        form.reset();

        const current = JSON.parse(localStorage.getItem("wishes")) || [];
        current.push(wish);
        localStorage.setItem("wishes", JSON.stringify(current));

        addCard(wish);

        successScreen.style.display = "flex";
        setTimeout(() => successScreen.style.display = "none", 2000);
      }
    } catch {}

    btn.innerText = "Submit";
    btn.disabled = false;
  });
});

// SCROLL
function scrollToForm() {
  document.getElementById("formSection").scrollIntoView({ behavior: "smooth" });
  document.getElementById
