let express = require("express")
let bodyParser = require("body-parser")
let GuestbookEntry = require("./src/blogEntry")
const path = require("path")

let app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("./public"))

app.get("/", (req, res) => {
  res.send('<a href="/login">Zum Login</a>')
})

app.get("/login", function (req, res) {
  res.sendFile("login.html", { root: "./" })
})

app.post("/login", function (req, res) {
  const { benutzername, passwort } = req.body
  if (benutzername === "gruppe3" && passwort === "12345") {
    res.redirect("/index")
  } else {
    res.send("Anmeldung fehlgeschlagen.")
  }
})

app.set("view engine", "ejs")
app.set("views", "./views")

let entries = [   // list for entrys ( see src)
    new GuestbookEntry(1,"BlogTitel", " HEEEELOOOOOOO WOOORLD!"),
    new GuestbookEntry(2,"Blog Title 2", "This is the second blog post."),  // Constructer defined on Guestbook entry
];

app.get("/index", (req, res) => {           
    res.render("index", {
        entries: entries
    })
})

app.post("/blog/delete", (req, res) => {

    const entryIdToDelete = parseInt(req.body.entryId); // nimmt Die id von der HTML
                                                        // wandelt html in JS um

    const entryIndex = entries.findIndex((entry) => entry.id === entryIdToDelete);

    entries.splice(entryIndex, 1);
    res.redirect("/index");

    
});

app.post("/blog/new", (req,res) =>{
let content = req.body.content
let title = req.body.title

const newId = entries.length + 1;

let newEntry = new GuestbookEntry(title, content)
entries.push(newEntry)
res.redirect("/index")
})

app.listen(3000, () => {
    console.log("App wurde gestartet auf localhost:3000")
})