const express = require('express');
const router = express.Router();
const {Book, validateBook} = require('../models/books');

//POST: CREATE A NEW BOOK
router.post('/', async (req, res) => {
    const error = await validateBook(req.body);

    if(error && error.message) {
        res.status(400).send(error.message);
    }

    book = new Book({
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge
        },
        genre: req.body.genre
    });

    book
    .save()
    .then((book) => {
        res.send(book);
    })
    .catch((error) => {
        res.status(500).send('Book was not stored in db');
    });
});


//Get All Books
router.get('/', (req, res) => {
    Book.find().then(book => res.send(book))
    .catch((error) => {
        res.status(500).send('Something went wrong');
    });
});

//Get a book by ID
router.get('/:bookId', async (req, res) => {
    const book = await Book.findById(req.params.bookId);

    if(!book) res.status(404).send('Book not found');
    res.send(book);
});

//Update book based on ID
router.put('/:bookId', async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, {
        name:req.body.bookName,
        author: {
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    },
    {new:true});

    if(!updatedBook) {
        res.status(404).send("Book not found");
    }

    res.send(updatedBook);
})

//Delete Book based on ID
router.delete('/:bookId', async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.bookId);

    if(!book) {
        res.status(404).send('Send with Id not found');
    }

    res.send(book);
})



module.exports = router;