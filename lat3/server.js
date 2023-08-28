const http = require("http");

// Cara Lama
/*
const server = http.createServer(function (req, res) {
  console.log(req.url, req.method);

  res.setHeader("Content-Type", "text/html");
  res.write(`<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="#"></head>`);
  res.write("<h1>Hello World!</h1>");
  res.write("<p>My name is Afridho Ikhsan</p>");
  res.end();
});
*/

// Cara Cepat (menggunakan file html yang dibuat secara terpisah)
const fileSystem = require("fs");
const _ = require("lodash");

const server = http.createServer(function (req, res) {
  //   console.log(req.url, req.method);

  //   Testing Lodash (as a third party library)
  /*
  const num = _.random(1, 20);
  const mentionNum = _.once(function () {
    console.log(num);
  });

  mentionNum();
  mentionNum();
  */

  res.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  fileSystem.readFile(path, function (err, data) {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //   res.write(data);  //Jika kita hanya perlu menulis 1x "res.write(data)", kita bisa hanya perlu menjadikannya sebagai argument dari end method
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", function () {
  console.log("Server siap untuk menerima permintaan.");
});
