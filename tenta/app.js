let dataFromAPI;
const list = document.querySelector(".list");

/* ---------------------------------- fetch --------------------------------- */

async function getJSON() {
    const response = await fetch('./data.json');
    const data = await response.json();
    dataFromAPI = data;
    return data;
  }


/* ---------------------------------- init ---------------------------------- */

window.addEventListener("DOMContentLoaded", () => {
    getJSON()
    .then(data => {
        UI.paintUI(data)
    })
});

/* ----------------------------------- UI ----------------------------------- */

class UI {

/* ----------------------------- initial render ----------------------------- */

    static paintUI(array) {
        let itemsFromJson = [];
        array[0].forEach((elem) => {
            itemsFromJson.push(`
            <li class="list-item">
                <i class="check far fa-circle"></i>
                <p class="name-of-item">${elem}</p>
                <i class="delete far fa-times-circle"></i>
            </li>
            `);
            list.innerHTML = itemsFromJson.join("")
        });
    }

/* -------------------------------- add item -------------------------------- */

    static addItem(item) {
        let newItem = `
        <li class="list-item">
            <i class="check far fa-circle"></i>
            <p class="name-of-item">${item.value}</p>
            <i class="delete far fa-times-circle"></i>
        </li>
        `;
        list.innerHTML += newItem;
    }
}

/* ---------------------------------- form ---------------------------------- */

const itemFormValue = document.querySelector(".input-text");
const submitButton = document.querySelector(".submit-button")

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (itemFormValue.value !== "") {
        UI.addItem(itemFormValue)
        itemFormValue.value = "";
    }
})

/* ------------------------------ functionality ----------------------------- */

document.querySelector(".list").addEventListener("click", (e) => userInteraction(e));

function userInteraction(e) {

    if (e.target.classList.contains("fa-circle")) {
        e.target.classList.remove("fa-circle");
        e.target.classList.add("fa-check-circle");
    } else if (e.target.classList.contains("fa-check-circle")) {
        e.target.classList.remove("fa-check-circle");
        e.target.classList.add("fa-circle");
    }

    if (e.target.classList.contains("delete")) {
        const deleteThis = e.target.parentElement;
        list.removeChild(deleteThis);
    }
};