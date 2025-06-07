"use strict";

const myLibrary = [];

class Book{
    constructor(title, author, pages, status, genre, publishedDate){
        this.title = title;
        this.author = author ;
        this.pages = pages;
        this.status = status;
        this.genre = genre;
        this.publishedDate = publishedDate ;
        this.id = crypto.randomUUID();
    };
};

class addBookToLibrary{
    constructor(bookObj){
        myLibrary.push(bookObj);
    }
};