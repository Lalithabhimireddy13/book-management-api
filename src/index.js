const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];


app.post('/books', (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});


app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});


app.put('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id == req.params.id);
  if (bookIndex !== -1) {
    books[bookIndex] = { id: parseInt(req.params.id), ...req.body };
    res.json(books[bookIndex]);
  } else {
    res.status(404).send('Book not found');
  }
});


app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id == req.params.id);
  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook);
  } else {
    res.status(404).send('Book not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
