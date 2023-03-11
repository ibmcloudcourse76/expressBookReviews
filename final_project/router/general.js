const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Creating a promise method to send all books async
    let getBooksPromise = new Promise((resolve,reject) => {
    res.send(JSON.stringify({books},null,4));
    resolve("All books sent");
    })
    
    console.log("Before calling promise getBooksPromise");

    //Call the promise and wait for it to be resolved and then print a message.
    getBooksPromise.then((successMessage) => {
    console.log("From Callback getBooksPromise: " + successMessage)
    })

    //Console log after calling the promise
    console.log("After calling promise getBooksPromise");
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Creating a promise method to send the book by isbn
    let getBookByISBNPromise = new Promise((resolve,reject) => {
        const isbn = req.params.isbn;
        res.send(books[isbn])
        resolve("Book sent filtered by ISBN");
    })

    console.log("Before calling promise getBookByISBNPromise");

    //Call the promise and wait for it to be resolved and then print a message.
    getBookByISBNPromise.then((successMessage) => {
        console.log("From Callback getBookByISBNPromise: " + successMessage)
    })

    //Console log after calling the promise
    console.log("After calling promise getBookByISBNPromise");
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Creating a promise method to send the book by author
    let getBookByAuthorPromise = new Promise((resolve,reject) => {
        const author = req.params.author;
        let filtered_books = new String();

        let keys = Object.keys(books);
        for (let i = 0; i < keys.length; i++) {
            if (books[keys[i]].author === author){
                filtered_books += JSON.stringify(books[keys[i]],null,4);
            }
        } 

        res.send(filtered_books)
        resolve("Book sent filtered by Author");
    })
    
    console.log("Before calling promise getBookByAuthorPromise");

    //Call the promise and wait for it to be resolved and then print a message.
    getBookByAuthorPromise.then((successMessage) => {
        console.log("From Callback getBookByAuthorPromise: " + successMessage)
    })

    //Console log after calling the promise
    console.log("After calling promise getBookByAuthorPromise");
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Creating a promise method to send the book by title
    let getBookByTitlePromise = new Promise((resolve,reject) => {
        const title = req.params.title;
        let filtered_books = new String();

        let keys = Object.keys(books);
        for (let i = 0; i < keys.length; i++) {
            if (books[keys[i]].title === title){
                filtered_books += JSON.stringify(books[keys[i]],null,4);
            }
        } 

        res.send(filtered_books)
        resolve("Book sent filtered by Title");
    })

    console.log("Before calling promise getBookByTitlePromise");

    //Call the promise and wait for it to be resolved and then print a message.
    getBookByTitlePromise.then((successMessage) => {
        console.log("From Callback getBookByTitlePromise: " + successMessage)
    })

    //Console log after calling the promise
    console.log("After calling promise getBookByTitlePromise");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let strReturnMessage = "isbn not existing";

    if (books[isbn] != null){
        strReturnMessage = books[isbn]["reviews"];
    }

    res.send(strReturnMessage);
});

module.exports.general = public_users;
