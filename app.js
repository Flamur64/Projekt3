"use strict";
// with npm installed
let express = require("express");
let bodyParser = require("body-parser");
let GuestbookEntry = require("./src/blogEntry");

let app = express();

// ejs nutzbar
app.set("view engine", "ejs");
app.set("views", "./views");



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public")); // makes the file "public" accecable

let entries = [   // list for entrys ( see src)
    new GuestbookEntry("BlogTitel", " HEEEELOOOOOOO WOOORLD!"),  // Constructer defined on Guestbook entry
];



//req ---> enthält informationen wie Code,parameter
// res (response) --> Antwort an den browser


//Antwort des servers bei /index (kern)
app.get("/index", (req, res) => {           
    res.render("index", {
        entries: entries  // bblogentry.js
    });      // deklariert durch <%= entries.length %>
});


// Daten vom Browser zum Server schicken
app.post("/blog/new", (req,res) =>{
let content = req.body.content; // 
let title = req.body.title;  // bodyparser

let newEntry = new GuestbookEntry(title, content);
entries.push(newEntry);
res.redirect("/index"); // browser wird auf index weitergeleitet

});




app.listen(5000, () => {
    console.log("App wurde gestartet auf localhost:5000");
})


