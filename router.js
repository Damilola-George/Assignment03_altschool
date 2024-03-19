const { booksControllers, authorsControllers } = require("./controllers");
const authenticateUser = require("./middleware/auth");

const booksRouter = (req, res, method) => {
  switch (method) {
    case "get":
      booksControllers.getAllBooks(req, res);
      break;

    case "post":
      authenticateUser(req, res)
        .then(() => booksControllers.addBook(req, res))
        .catch((err) => {
          res.writeHead(400);
          res.end(err);
        });
      break;

    case "put":
      authenticateUser(req, res)
        .then(() => booksControllers.updateBook(req, res))
        .catch((err) => {
          res.writeHead(400);
          res.end(err);
        });

      break;

    case "delete":
      authenticateUser(req, res)
        .then(() => booksControllers.deleteBook(req, res))
        .catch((err) => {
          res.writeHead(400);
          res.end(err);
        });
      break;

    default:
      res.writeHead(404);
      res.write(
        JSON.stringify({
          message: "Not Found",
        })
      );
      res.end();
  }
};

const authorsRouter = (req, res, method) => {
  switch (method) {
    case "get":
      return authorsControllers.getAllAuthors(req, res);

    case "post":
      authenticateUser(req, res)
        .then(() => authorsControllers.addAuthor(req, res))
        .catch((err) => {
          res.writeHead(400);
          res.end(err);
        });
      break;

    case "put":
      authenticateUser(req, res)
        .then(() => authorsControllers.updateAuthor(req, res))
        .catch((err) => {
          res.writeHead(400);
          res.end(err);
        });
      break;

    case "DELETE":
      authenticateUser(req, res)
        .then(() => authorsControllers.deleteAuthor(req, res))
        .catch((err) => {
          res.writeHead(400);
          res.end(err);
        });
      break;

    default:
      res.writeHead(404);
      res.write(
        JSON.stringify({
          message: "Not Found",
        })
      );
      res.end();
  }
};

module.exports = { booksRouter, authorsRouter };
