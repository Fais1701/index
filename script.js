function scrollToForm() {
  document.getElementById("formSection").scrollIntoView({
    behavior: "smooth"
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const successScreen = document.getElementById("successScreen");

  // FORCE hide on every load
  successScreen.style.display = "none";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.innerText = "Sending...";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        form.reset();
        successScreen.style.display = "flex";
      } else {
        alert("Submission failed. Try again.");
      }
    } catch {
      alert("Network error.");
    }

    btn.disabled = false;
    btn.innerText = "Submit";
  });
});
