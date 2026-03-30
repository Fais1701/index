function scrollToForm() {
  document.getElementById("formSection").scrollIntoView({
    behavior: "smooth"
  });
}

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then(() => {
    form.reset();
    document.getElementById("successScreen").classList.remove("hidden");
  })
  .catch(() => {
    alert("Something went wrong. Try again.");
  });
}
