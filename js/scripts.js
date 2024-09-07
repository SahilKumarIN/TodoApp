let btn = document.getElementById("submit");
let tablebody = document.getElementsByTagName("tbody")[0];
let items = [];

btn.addEventListener("click", (e) => {
  e.preventDefault();

  items = JSON.parse(localStorage.getItem("TODO")) || [];
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  items.push({ title: title, description: description });
  localStorage.setItem("TODO", JSON.stringify(items));
  alert("Todo saved ✅");
  display();
});

function display() {
  items = JSON.parse(localStorage.getItem("TODO")) || [];

  if (items.length === 0) {
    tablebody.innerHTML = `<tr>
                             <td colspan="5" style="text-align: center;">The list is empty</td>
                           </tr>`;
    return;
  }

  let data = items
    .map((item, index) => {
      return `<tr id="row-${index}">
              <td>${index + 1}</td>
              <td class="title">${item.title}</td>
              <td class="description">${item.description}</td>
              <td><button class="btn-ico" onclick="strikeOff(${index})">✔️</button></td>
              <td><button class="btn-ico" onclick="deleteItem(${index})">🗑️</button></td>
            </tr>`;
    })
    .join("");
  tablebody.innerHTML = data;
}

function strikeOff(index) {
  let row = document.getElementById(`row-${index}`);
  let title = row.querySelector(".title");
  let description = row.querySelector(".description");

  title.classList.toggle("strikethrough");
  description.classList.toggle("strikethrough");
}

function deleteItem(index) {
  items = JSON.parse(localStorage.getItem("TODO")) || [];
  items.splice(index, 1);
  localStorage.setItem("TODO", JSON.stringify(items));
  display();
}

window.onload = display;

const style = document.createElement("style");
style.innerHTML = `
  .strikethrough {
    text-decoration: line-through;
  }
`;
document.head.appendChild(style);
