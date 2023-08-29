// Include third party library
const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// Express App
const app = express();

// Connect to MongoDB
const dbURI = "mongodb+srv://anthrofax:mar777it39@anthrofax.bzf9t83.mongodb.net/node-tutorial";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(res => {
  app.listen(3000,  function() {
    console.log('Siap menerima permintaan.')
    })
})
.catch(err => console.log('Halo Salah!'));

// Register View Engine
app.set("view engine", "ejs");
// app.set("view", "myview", "ejs"); //Syntax untuk mendaftarkan View Engine, tapi view folder nya memiliki nama yang berbeda (bukan "views")

// Middleware & Static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev')); //Tidak dijelaskan secara rinci fungsinya di net ninja

// -------------------------- NODE EXPRESS ROUTES -------------------------- //

// Mongoose & Mongo Sandbox Routes
/*
app.get('/add-blog', function(req, res) {
  const newBlog = new Blog({
    title: 'Hiprofax',
    snippet: 'Polusi Jakarta menduduki polusi terburuk di dunia saat ini.',
    body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi cum facere, quidem vel unde nostrum molestias sapiente soluta suscipit tempora placeat dolores, voluptatum eveniet totam consequatur voluptas accusamus dignissimos tenetur.'
  })

  newBlog.save()
  .then(result => res.send(result))
  .catch(err => console.log(err));
})

app.get('/all-blogs', function(req, res) {
  Blog.find()
  .then(result => res.send(result))
  .catch(err => console.log(err));
})

// app.get('/single-blog', function(req, res) {
//   Blog.findById()
// })

*/

// Old Home Page
/*
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
  res.render("index", { title: "Home", blogs });
});
*/

// New Home Page
app.get('/', function(req, res) {
  res.redirect('/blogs');
})

app.get("/about", function (req, res) {
  // res.sendFile("./views/about.html", { root: __dirname });

  res.render("about", { title: "About" });
});

/*
app.get("/about-us", function (req, res) {
  res.redirect("/about"); //Sudah otomatis mengatur status code nya menjadi 301
});
*/

app.use('/blogs', blogRoutes)

app.use(function (req, res) {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });

  res.status(404).render("404", { title: "404" });
});