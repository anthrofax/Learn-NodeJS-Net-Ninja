const express = require("express");

const app = express();

// Register View Engine
app.set("view engine", "ejs");

// app.set("view", "myview", "ejs"); //Syntax untuk mendaftarkan View Engine, tapi view folder nya memiliki nama yang berbeda (bukan "views")

app.listen(3000, function () {
  console.log("Server siap untuk menerima permintaan.");
}); //Menggunakan express, sudah otomatis mengatur host url nya menjadi 'localhost' & membuat instance dari http.createServer(). Jadi kita tidak perlu melakukannya lagi

app.get("/", function (req, res) {
  // res.sendFile("./views/index.html", { root: __dirname });
  //Dengan menggunakan send() method,
  // 1. Sudah otomatis melakukan tugas dari method write() & end(),
  // 2. Melakukan tugas dari method setHeader() dan otomatis menentukan type content nya menyesuaikan apa yang kita jadikan argument pada method send() tersebut.
  // 3.  Menentukan respond status berdasarkan apa yang terjadi setelah kita mengirimkan request.

  const blogs = [
    { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur" },
  ];
  w;
  res.render("index", { title: "Home", blogs });
});

app.get("/about", function (req, res) {
  // res.sendFile("./views/about.html", { root: __dirname });

  res.render("about");
});

/*
app.get("/about-us", function (req, res) {
  res.redirect("/about"); //Sudah otomatis mengatur status code nya menjadi 301
});
*/

app.use(function (req, res) {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });

  res.status(404).render("404");
});
