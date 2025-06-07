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

    getTitle(){
        return this.#title;
    }

    getAuthor (){
        return this.#author;
    };

    getPages (){
        return this.#pages;
    };

    getStatus (){
        return this.#status;
    };

    getGenre(){
        return this.#genre;
    };

    getPublishedDate(){
        return this.#publishedDate;
    }
    changeStatus(value) {
        this.#status = value;
    };

    getId() {
        return this.#id;
    }
};

class LibraryController {

     static   #myLibrary = [];

    static addBookToLibrary(bookObj) {
        this.#myLibrary.push(bookObj);
    };

    static removeBook(bookObj) {
        this.#myLibrary.forEach((obj, index) => {
            if(bookObj.getId() == obj.getId()){
                this.#myLibrary.splice(index, 1);
            }
        })
    };

    static  getAllBooks (){
        return this.#myLibrary;
    }
};


