const text = "I built this for you.";
let index = 0;

function typeEffect() {
  const el = document.getElementById("typingText");
  if (index < text.length) {
    el.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 50);
  } else {
    setTimeout(() => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
    }, 800);
  }
}

typeEffect();

function scrollToForm() {
  document.getElementById("formSection").scrollIntoView({ behavior: "smooth" });
  document.getElementById("startBtn").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const successScreen = document.getElementById("successScreen");
  const cards = document.getElementById("cards");
  const submitBtn = form.querySelector("button");

  // Load saved wishes
  const saved = JSON.parse(localStorage.getItem("wishes")) || [];
  saved.forEach(w => addCard(w));

  function addCard(text) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = text;
    cards.prepend(div);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.innerText = "Saving...";
    submitBtn.disabled = true;

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

        // Save locally
        const current = JSON.parse(localStorage.getItem("wishes")) || [];
        current.push(wish);
        localStorage.setItem("wishes", JSON.stringify(current));

        addCard(wish);

        successScreen.style.display = "flex";

        setTimeout(() => {
          successScreen.style.display = "none";
        }, 2000);
      }
    } catch {}

    submitBtn.innerText = "Submit";
    submitBtn.disabled = false;
  });
});
