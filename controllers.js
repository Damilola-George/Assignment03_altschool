const { readFile, writeFile } = require("fs");
const path = require("path");

const booksDBPath = path.join(__dirname, "db", "books.json");
const authorsDBPath = path.join(__dirname, "db", "authors.json");

const booksControllers = {
  getAllBooks: (_, res) => {
    readFile(booksDBPath, "utf-8", (err, books) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Error!");
      }
      res.end(books);
    });
  },

  addBook: (req, res) => {
    const newBook = req.body;

    readFile(booksDBPath, "utf-8", (err, books) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Error!");
      }

      const existingBooks = JSON.parse(books);
      newBook.id = existingBooks.length + 1;
      const allBooks = [...existingBooks, newBook];

      writeFile(booksDBPath, JSON.stringify(allBooks), (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500);
          res.end("Error.");
        }
        res.end(JSON.stringify(newBook));
      });
    });
  },

  updateBook: (req, res) => {
    const updateContent = req.body;
    const bookId = updateContent.id;

    if (!bookId) {
      res.writeHead(400);
      res.end("No ID!");
    }

    readFile(booksDBPath, "utf-8", (err, books) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Error!");
      }

      const existingBooks = JSON.parse(books);

      const bookIndex = existingBooks.findIndex((item) => {
        return item.id === bookId;
      });

      if (!existingBooks[bookIndex]) {
        res.writeHead(400);
        res.end("Wrong ID!");
      }

      //update books object
      existingBooks[bookIndex] = {
        ...existingBooks[bookIndex],
        ...updateContent,
      };

      
      writeFile(booksDBPath, JSON.stringify(existingBooks), (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500);
          res.end("Error!");
        }
        res.end(JSON.stringify(existingBooks[bookIndex]));
      });
    });
  },

  deleteBook: (req, res) => {
    const updateContent = req.body;
    const bookId = updateContent.id;

    if (!bookId) {
      res.writeHead(400);
      res.end("No ID!");
    }

    readFile(booksDBPath, "utf-8", (err, books) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("An error occured.");
      }

      const existingBooks = JSON.parse(books);

      const bookIndex = existingBooks.findIndex((item) => {
        return item.id === bookId;
      });

      if (!existingBooks[bookIndex]) {
        res.writeHead(400);
        res.end("Wrong ID!");
      }

      //delete book 
      existingBooks.splice(bookIndex, 1);

      writeFile(booksDBPath, JSON.stringify(existingBooks), (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500);
          res.end("Error!");
        }
        res.end("Deleted!");
      });
    });
  },
};

const authorsControllers = {
  getAllAuthors: (_, res) => {
    readFile(authorsDBPath, "utf-8", (err, authors) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Error!");
      }
      res.end(authors);
    });
  },

  addAuthor: (req, res) => {
    const newAuthor = req.body;

    readFile(authorsDBPath, "utf-8", (err, authors) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Error");
      }

      const existingAuthors = JSON.parse(authors);
      newAuthor.id = existingAuthors.length + 1;
      const allAuthors = [...existingAuthors, newAuthor];

      writeFile(authorsDBPath, JSON.stringify(allAuthors), (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500);
          res.end("Error!");
        }
        res.end(JSON.stringify(newAuthor));
      });
    });
  },

  updateAuthor: (req, res) => {
    const updateContent = req.body;
    const authorId = updateContent.id;

    if (!authorId) {
      res.writeHead(400);
      res.end("No ID!");
    }

    readFile(authorsDBPath, "utf-8", (err, authors) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Error!");
      }

      const existingAuthors = JSON.parse(authors);

      const bookIndex = existingAuthors.findIndex((item) => {
        return item.id === authorId;
      });

      if (!existingAuthors[bookIndex]) {
        res.writeHead(400);
        res.end("Wrong ID!");
      }

      //update authors 
      existingAuthors[bookIndex] = {
        ...existingAuthors[bookIndex],
        ...updateContent,
      };

      //Write updated authors object to database
      writeFile(authorsDBPath, JSON.stringify(existingAuthors), (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500);
          res.end("Error!");
        }
        res.end(JSON.stringify(existingAuthors[bookIndex]));
      });
    });
  },

  deleteAuthor: (req, res) => {
    const updateContent = req.body;
    const authorId = updateContent.id;

    if (!authorId) {
      res.writeHead(400);
      res.end("No ID!");
    }

    readFile(authorsDBPath, "utf-8", (err, authors) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Error!");
      }

      const existingAuthors = JSON.parse(authors);

      const bookIndex = existingAuthors.findIndex((item) => {
        return item.id === authorId;
      });

      if (!existingAuthors[bookIndex]) {
        res.writeHead(400);
        res.end("Wrong ID!");
      }

      
      existingAuthors.splice(bookIndex, 1);

      writeFile(authorsDBPath, JSON.stringify(existingAuthors), (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500);
          res.end("Error!");
        }
        res.end("Deleted!");
      });
    });
  },
};

module.exports = { booksControllers, authorsControllers };
