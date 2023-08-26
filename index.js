const http = require("http");
const fs = require("fs");

const server = http.createServer();
const PORT = "8080";

server.listen(PORT, (error) => {
  if (error) {
    return console.error(error);
  }

  console.log("Server listening on port " + PORT);
});

server.on("request", (req, res) => {
  const { method, url } = req;
  res.setHeader("Content-Type", "text/html");

  if (method === "GET") {
    let filename = url === "/" ? "./index.html" : `.${url}.html`;
    if (url === "/") {
      filename = "./index.html";
    } else if (!["/about", "/contact"].includes(url)) {
      filename = "404.html";
    }

    fs.readFile(filename, "utf8", (err, file) => {
      if (err) {
        res.statusCode = 404;
      } else {
        res.statusCode = 200;
      }

      res.write(file);
      res.end();
    });
  }
});
