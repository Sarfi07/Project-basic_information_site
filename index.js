const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  let filePath = "./";
  switch (req.url) {
    case "/":
      filePath += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      filePath += "about.html";
      res.statusCode = 200;
      break;
    case "/contact":
      filePath += "contact-me.html";
      res.statusCode = 200;
      break;
    case "/contact-me":
      res.statusCode = 301;
      res.setHeader("Location", "/contact");
      res.end();
      break;
    default:
      filePath += "404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(PORT, () => {
  console.log("Server Running");
});
