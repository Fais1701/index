let wishlist = [
  "A surprise date",
  "Late night drive",
  "Your favorite perfume"
];

const container = document.getElementById("wishlist");

function renderList() {
  container.innerHTML = "";

  wishlist.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <p>${item}</p>
      <button onclick="removeItem(${index})">X</button>
    `;

    container.appendChild(div);
  });
}

function addItem() {
  const input = document.getElementById("itemInput");
  const value = input.value.trim();

  if (value) {
    wishlist.push(value);
    input.value = "";
    renderList();
  }
}

function removeItem(index) {
  wishlist.splice(index, 1);
  renderList();
}

renderList();
