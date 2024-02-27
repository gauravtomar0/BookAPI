// Framework
const express = require("express");

//Database
const Database = require("./database/index");

//initization
const shapeAI = express();

//configuration

shapeAI.use(express.json());

//----------------------------GET-------------------------------------------

/*
Route             /
Description     get all books 
Access          Public
Parameter       NONE
Method          GET 
*/

shapeAI.get("/", (req, res) => {
  return res.json({ books: Database.books });
});

/*
Route               /
Description     get specfic book based on isbn 
Access          Public
Parameter       isbn
Method          GET 
*/

shapeAI.get("/is/:isbn", (req, res) => {
  const getSpecficBook = Database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if (getSpecficBook.length === 0) {
    return res.json({ error: `No book found for the isbn ${req.params.isbn}` });
  }
  return res.json({ books: getSpecficBook });
});

/*
Route              /c
Description     get specfic books based on category
Access          Public
Parameter       category
Method          GET 
*/

shapeAI.get("/c/:category", (req, res) => {
  const getSpecificBook = Database.books.filter((book) =>
    book.category.includes(req.params.category)
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `no book found for this category of ${req.params.category}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

/*
Route             /author
Description     get all Author
Access          Public
Parameter       NONE
Method          GET 
*/

shapeAI.get("/author", (req, res) => {
  return res.json({ authors: Database.authors });
});

/*
Route           /authors/id
Description     get all Author
Access          Public
Parameter       id
Method          GET 
*/

shapeAI.get("/author/:id", (req, res) => {
  const getSpecficAuthor = Database.authors.filter(
    (author) => author.id === +req.params.id
  );
  if (getSpecficAuthor === 0) {
    return res.json({
      error: `there is no author for this ${req.params.id} number`,
    });
  }
  return res.json({ author: getSpecficAuthor });
});

/*
Route           /author
Description     get a list of author based on a book's ISBN
Access          Public
Parameter       isbn
Method          GET 
*/

shapeAI.get("/author/:isbn", (req, res) => {
  const getSpecficAuthor = Database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );
  if (getSpecficAuthor.length === 0) {
    return res.json({ error: `no book for this author ${req.params.isbn}` });
  }
  return res.json({ author: getSpecficAuthor });
});

/*
Route           /publication
Description     get all publication
Access          Public
Parameter       none
Method          GET 
*/

shapeAI.get("/publication", (req, res) => {
  return res.json({ publication: Database.publication });
});

/*
Route           /publication/id
Description     get specific publication
Access          Public
Parameter       id
Method          GET 
*/

shapeAI.get("/publication/:id", (req, res) => {
  const getSpecificPublication = Database.publication.filter(
    (publish) => publish.id === +req.params.id
  );
  if (getSpecificPublication.length === 0) {
    return res.json({ error: `there is no publication for this number` });
  }
  return res.json({ publish: getSpecificPublication });
});

/*
Route           /publication/books
Description     get a list of publication based on books
Access          Public
Parameter       books
Method          GET 
*/

shapeAI.get("/publication/:isbn", (req, res) => {
  const getSpecificPublication = Database.publication.filter((publish) =>
    publish.books.includes(req.params.isbn)
  );

  if (getSpecificPublication === 0) {
    return res.json({
      errror: `ther is no publication based on book ${req.params.isbn}`,
    });
  }
  return res.json({ publish: getSpecificPublication });
});

//------------------POST------------------------------------
/*
Route           /book/new
Description     add new book
Access          Public
Parameter       NONE
Method          POST
*/

shapeAI.post("/book/new", (req, res) => {
  const { newBook } = req.body;
  Database.books.push(newBook);
  return res.json({ books: Database.books, message: "book was added" });
});

/*
Route           /author/new
Description     add new author
Access          Public
Parameter       NONE
Method          POST
*/

shapeAI.post("/author/new", (req, res) => {
  const { newAuthor } = req.body;
  Database.authors.push(newAuthor);
  return res.json({ authors: Database.authors, message: "author was added" });
});

/*
Route           /publication/new
Description     add new publication
Access          Public
Parameter       NONE
Method          POST
*/

// shapeAI.post("/publication/new", (req, res)=>{
//   const { newPublication } = req.body;
//  Database.publication.push(newPublication);
//  return res.json({publication: Database.publication, message: "publication was added"})
// })

shapeAI.post("/publication/new", (req, res) => {
  const { newPublication } = req.body;
  Database.publication.push(newPublication);
  return res.json({
    publication: Database.publication,
    message: "publication was 2 added",
  });
});

//----------------------------PUT---------------------------

/*
Route           /book/update
Description     update title of book
Access          Public
Parameter       ISBN
Method          PUT
*/

shapeAI.put("/book/update/:isbn", (req, res) => {
  Database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.bookTitle;
      return;
    }
  });
  return res.json({ books: Database.books });
});

/*
Route           /book/author/update
Description     update/add new author
Access          Public
Parameter       ISBN
Method          PUT

-----smj nhi aya ya-------
*/

shapeAI.put("/book/author/update/:isbn", (req, res) => {
  // update the book database
  Database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn)
      return book.authors.push(req.body.newAuthor);
  });
  //update the author database
  Database.authors.forEach((author) => {
    if (author.id === req.params.newAuthor)
      return author.books.push(req.params.isbn);
  });
  return res.json({
    books: Database.books,
    authors: Database.authors,
    message: "books and author updated",
  });
});

/*
Route           /publication/update/
Description     update Publication name 
Access          Public
Parameter       id
Method          PUT
*/

shapeAI.put("/publication/update/:id", (req, res) => {
  Database.publication.forEach((publisher) => {
    if (publisher.id === req.params.id) {
      publisher.name = req.body.pubid;
      return;
    }
  });
  return res.json({ publication: Database.publication });
});

/*
Route           /publication/update/book
Description     update/add new book to a Publication
Access          Public
Parameter       ISBN
Method          PUT
*/

shapeAI.put("/publication/update/book/:isbn", (req, res) => {
  //update the publication database
  Database.publication.forEach((publisher) => {
    if (publisher.id === req.params.pubId) {
      return publisher.books.push(req.body.isbn);
    }
  });
  //update the book database
  Database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.params.pubId;
      return;
    }
  });
  return res.json({ books: Database.books  , publication:Database.publication, message: "update was succesfully"});
});

shapeAI.listen(3000, () => console.log("server is running!!"));
