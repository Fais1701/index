function scrollToForm() {
  document.getElementById("formSection").scrollIntoView({
    behavior: "smooth"
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const successScreen = document.getElementById("successScreen");

  // Ensure success screen is hidden on load
  successScreen.classList.add("hidden");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(() => {
      form.reset();
      successScreen.classList.remove("hidden");
    })
    .catch(() => {
      alert("Something went wrong. Try again.");
    });
  });
});
