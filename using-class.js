"use strict";

class Book {

    #title;
    #author;
    #pages;
    #status;
    #genre;
    #publishedDate;
    #id;

    constructor(title, author, pages, status, genre, publishedDate) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#status = status;
        this.#genre = genre;
        this.#publishedDate = publishedDate;
        this.#id = crypto.randomUUID();
    };

    getTitle() {
        return this.#title;
    }

    getAuthor() {
        return this.#author;
    };

    getPages() {
        return this.#pages;
    };

    getStatus() {

        const tempStatus = this.#status;
        return tempStatus;
    };

    getGenre() {
        const tempGenre = this.#genre
        return tempGenre;
    };

    getPublishedDate() {
        return this.#publishedDate;
    };

    changeStatus(value) {
        this.#status = value;
    };

    setTitle(value) {
        this.#title = value;
    }

    setAuthor(value) {
        this.#author = value;
    };

    setPages(value) {
        this.#pages = value;
    };

    setGenre(value) {
        this.#genre = value;
    };

    setPublishedDate(value) {
        this.#publishedDate = value;
    };

    getId() {
        return this.#id;
    }
};

class LibraryController {

    static #myLibrary = [];

    static addBookToLibrary(bookObj) {
        this.#myLibrary.push(bookObj);
    };

    static removeBook(id) {
        this.#myLibrary.forEach((obj, index) => {
            if (id == obj.getId()) {
                this.#myLibrary.splice(index, 1);
            }
        })
    };

    static getAllBooks() {
        return this.#myLibrary;
    };
    static addTwoInitialBooks() {
        const book1 = new Book('Atomic Habits', 'James Clear', 320, 'completed', 'Non-fiction', '2018-10-16');
        const book2 = new Book('The Lord Of the Rings', 'John Ronald Reuel Tolkien',
            1300, 'unread', 'Fantasy', '1954-07-29'
        );
        this.addBookToLibrary(book1);
        this.addBookToLibrary(book2);
    }
};

class DOMController {
    static editButtonIsActive = false;

    static createBookCard(bookObj) {
        const cardContainer = document.querySelector("#book-holder");

        //create card container
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = bookObj.getId();

        // create and append required elements into card container
        // create card heading and append it
        const cardHeading = document.createElement("div")
        cardHeading.classList.add("card-heading")
        cardHeading.textContent = "Book";
        card.appendChild(cardHeading);

        // create card details section and append it to card

        const cardDetailsUl = document.createElement("ul");
        cardDetailsUl.classList.add("card-details");
        for (let i = 0; i < 6; i++) {
            switch (i) {
                // create title 
                case 0: const title = document.createElement("li");
                    title.classList.add("title");
                    title.textContent = `Title: ${bookObj.getTitle()}`;
                    cardDetailsUl.appendChild(title);
                    break;

                // add author
                case 1: const author = document.createElement("li");
                    author.classList.add("author");
                    author.textContent = `Author: ${bookObj.getAuthor()}`;
                    cardDetailsUl.appendChild(author);
                    break;

                // add pages
                case 2: const pages = document.createElement("li");
                    pages.classList.add("pages");
                    pages.textContent = `Pages: ${bookObj.getPages()}`;
                    cardDetailsUl.appendChild(pages);
                    break;

                // add genre
                case 3: const genre = document.createElement("li");
                    genre.classList.add("genre");
                    genre.textContent = `Genre: ${bookObj.getGenre()}`;
                    cardDetailsUl.appendChild(genre);
                    break;

                //add status
                case 4: const status = document.createElement("li");
                    status.classList.add("status");
                    status.textContent = `Status: ${bookObj.getStatus()}`;
                    cardDetailsUl.appendChild(status);
                    break;

                // add published date
                case 5: const publishedDate = document.createElement("li");
                    publishedDate.classList.add("published-date");
                    publishedDate.textContent = `Published Date: ${bookObj.getPublishedDate()}`;
                    cardDetailsUl.appendChild(publishedDate);
                    break;
            }

        };
        card.appendChild(cardDetailsUl);

        // create and add card buttons
        const cardButtons = document.createElement("div");
        cardButtons.classList.add("card-buttons")

        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.id = bookObj.getId();
        editButton.textContent = "Edit";
        cardButtons.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.id = bookObj.getId();
        deleteButton.textContent = "Delete";
        cardButtons.appendChild(deleteButton);
        card.appendChild(cardButtons);
        cardContainer.appendChild(card);
    };
    static showAllBooks() {
        const bookHolder = document.querySelector('#book-holder');
        bookHolder.innerHTML = '';
        const allBooks = LibraryController.getAllBooks();
        allBooks.forEach((obj) => {
            this.createBookCard(obj);
        });
        this.deleteButton();
        this.editBtn();
    }
    static addNewBookButton() {
        const addNewBook = document.querySelector("#add-new-book");
        addNewBook.addEventListener('click', () => {
            const formContainer = document.querySelector(".form-container");

            formContainer.style.display = 'flex';
        })
    };

    static formSubmitButton() {
        const form = document.querySelector('#form');
        form.addEventListener('submit', function (event) {
            const formContainer = document.querySelector('.form-container');
            const books = LibraryController.getAllBooks();
            let isOnEdit = books.filter((book) => {
                if (book.getId() == formContainer.id) { return true };
            });
            formContainer.id = null;
            if (isOnEdit.length == 1) {
                if (!form.checkValidity()) {
                    event.preventDefault(); // Prevent form submission
                    alert('Form is invalid. Please fill in all required fields.');
                } else {
                    event.preventDefault();
                    const title = document.querySelector('#title');
                    const author = document.querySelector('#author');
                    const pages = document.querySelector('#pages');
                    const genre = document.querySelector('#genre');
                    const status = document.querySelector('#status');
                    const publishedDate = document.querySelector('#published-date')

                    const obj = isOnEdit[0];
                    obj.setTitle(title.value);
                    obj.setAuthor(author.value);
                    obj.setPages(pages.value);
                    obj.setGenre(genre.value);
                    obj.changeStatus(status.value);
                    obj.setPublishedDate(publishedDate.value);

                    // remove card
                    const cards = document.querySelectorAll('.card');
                    cards.forEach((card) => {
                        if (card.id == obj.getId()) {
                            card.remove();
                        }
                    });

                    DOMController.showAllBooks();
                    const resetButton = document.querySelector("#reset-button");
                    resetButton.click();
                    formContainer.style.display = 'none';
                };
            }
            else {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    alert('Form is invalid. Please fill in all required fields.');
                } else {
                    event.preventDefault();
                    const title = document.querySelector('#title');
                    const author = document.querySelector('#author');
                    const pages = document.querySelector('#pages');
                    const genre = document.querySelector('#genre');
                    const status = document.querySelector('#status');
                    const publishedDate = document.querySelector('#published-date')

                    const obj = new Book(title.value,
                        author.value,
                        pages.value,
                        genre.value,
                        status.value,
                        publishedDate.value
                    )
                    obj.setTitle(title.value);
                    obj.setAuthor(author.value);
                    obj.setPages(pages.value);
                    obj.setGenre(genre.value);
                    obj.changeStatus(status.value);
                    obj.setPublishedDate(publishedDate.value);

                    LibraryController.addBookToLibrary(obj);

                    DOMController.showAllBooks();
                    const resetButton = document.querySelector("#reset-button");
                    resetButton.click();
                }
            }
        });
    };
    static cancelButton() {
        const cancel = document.querySelector('#cancel-button');
        cancel.addEventListener('click', () => {
            const formContainer = document.querySelector('.form-container');
            const resetButton = document.querySelector('#reset-button');
            resetButton.click();
            formContainer.style.display = 'none';
        });
    };

    static deleteButton() {
        const deleteBtn = document.querySelectorAll('.delete-button');
        const allCards = document.querySelectorAll('.card');

        deleteBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                allCards.forEach((card) => {
                    if (btn.id == card.id) {
                        card.remove();
                    }
                });

                const allBooks = LibraryController.getAllBooks();

                const bookId = allBooks.filter((book) => {
                    if (btn.id == book.getId()) { return true };
                })[0].getId();

                LibraryController.removeBook(bookId);
            })
        })

    };

    static editBtn() {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            card.addEventListener('click', (event) => {
                let target = event.target;
                if (target.classList.contains('edit-button')) {
                    const formContainer = document.querySelector('.form-container');
                    formContainer.style.display = 'flex';
                    formContainer.id = card.id;

                    const books = LibraryController.getAllBooks();

                    const titleInput = formContainer.querySelector('#title');
                    const authorInput = formContainer.querySelector('#author');
                    const pagesInput = formContainer.querySelector('#pages');
                    const genreInput = formContainer.querySelector('#genre');
                    const statusInput = formContainer.querySelector('#status');
                    const dateInput = formContainer.querySelector('#published-date');

                    // add existing book details into form 
                    books.forEach((book) => {
                        if (formContainer.id == book.getId()) {
                            titleInput.value = `${book.getTitle()}`;
                            authorInput.value = `${book.getAuthor()}`;
                            pagesInput.value = `${book.getPages()}`;
                            genreInput.value = `${book.getGenre()}`;
                            statusInput.value = `${book.getStatus()}`;
                            dateInput.value = `${book.getPublishedDate()}`;
                        }
                    })

                }
            })
        })
    }
    static initializePage() {
        LibraryController.addTwoInitialBooks();
        this.showAllBooks();
        this.addNewBookButton();
        this.formSubmitButton();
        this.cancelButton();
        this.deleteButton();
        this.editBtn();
    }
}

DOMController.initializePage();