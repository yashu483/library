"use strict";

const addBookBtn = document.querySelector(".add-new-book");
const formSubmitBtn = document.querySelector("#add");
const cancelBtn = document.querySelector("#cancel");
const resetBtn = document.querySelector("#reset");
const form = document.querySelector(".form");
const formOverlay = document.querySelector(".form-overlay");
const formContainer = document.querySelector(".form-container");
const cardContainer = document.querySelector(".card-container");


let allBooks = [];

// new book object constructor
function Book(title, author, pages, status, date, lang) {

    if (!new.target) {
        throw Error("You should use `new` operator for creating objects using constructors")

    };
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.lang = lang;
    this.date = date;
    const randomId = crypto.randomUUID();
    this.id = randomId;
};

function addBookToLibrary(title, author, pages, status, date, lang) {
    allBooks[allBooks.length] = new Book(title, author, pages, status, date, lang);
}


// create a function for add new Book button 

function addNewBookBtn(event) {
    event.preventDefault();
    formOverlay.style.display = "flex"
};

formSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        const titleInput = document.querySelector("#title");
        const authorInput = document.querySelector("#author");
        const pagesInput = document.querySelector("#pages");
        const dateInput = document.querySelector("#date");
        const langInput = document.querySelector("#language");
        const statusInput = document.querySelector("#status");

        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, statusInput.value, dateInput.value, langInput.value);

        resetBtn.click();

        createCard(allBooks);
        formOverlay.style.display = "none";
    }
});

function createCard(arr) {
    cardContainer.innerHTML = "";
    arr.forEach((item, index) => {
        const newCard = document.createElement("div");
        newCard.classList.add("cards");

        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const div3 = document.createElement("div");

        // book number node section
        div1.classList.add("book-number");
        const bookNumberPara = document.createElement("p");
        bookNumberPara.textContent = "Book ";

        const bookNumber = document.createElement("span");
        bookNumber.textContent = `${index + 1}`;
        bookNumberPara.append(bookNumber);
        div1.append(bookNumberPara);

        // book details section
        div2.classList.add("book-details");
        let detailArr = ["Title", "Author", "Pages", "Status", "Language", "Published date"];
        let bookDetailArr = ["title", "author", "pages", "status", "lang", "date"];
        const detailUl = document.createElement('ul');

        for (let i = 0; i < detailArr.length; i++) {
            const li = document.createElement("li");
            li.textContent = `${detailArr[i]}: ${item[bookDetailArr[i]]}`;
            detailUl.appendChild(li);
        };
        div2.append(detailUl);

        // card buttons nodes
        div3.classList.add("card-buttons");
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-button");
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.id = item.id;
        deleteBtn.classList.add("delete-button");
        deleteBtn.textContent = "Delete";
        div3.append(editBtn, deleteBtn);
        newCard.id = item.id;
        newCard.append(div1, div2, div3);

        cardContainer.appendChild(newCard);
    });

    createDeleteBtnNodelist();
};

cancelBtn.addEventListener("click", (event) => {
    resetBtn.click();
    formOverlay.style.display = "none";
});


addBookBtn.addEventListener("click", addNewBookBtn);

formOverlay.addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm("Do you really want to quit?")
    ) {
        resetBtn.click();
        formOverlay.style.display = "none";
    }
});

formContainer.addEventListener("click", (event) => {
    event.stopPropagation();
});


// deleting cards

function createDeleteBtnNodelist() {
    const deleteBtnTemp = document.querySelectorAll(".delete-button");

    deleteBtnTemp.forEach((item) => {
        item.addEventListener("click", () => {
            allBooks.forEach((key) => {
                if (key.id == item.id) {
                    const cards = document.querySelectorAll(".cards");
                    cards.forEach((element) => {

                        if (element.id == item.id) {
                            element.remove();
                        }
                    })
                }
            })
        })
    });
    cardContainer.innerHTML = "";
    createCard(allBooks);
}

addBookToLibrary("The Hobit", "JR Tolkien", 33, "not-read", 33, "Marathi")
createCard(allBooks);
