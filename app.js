let express = require("express")
let bodyParser = require("body-parser")
let GuestbookEntry = require("./src/blogEntry")
const path = require("path")
const mongoose = require("mongoose")

let app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("./public"))

// Anfang
// Link zur Verbindung mit MongoDB
const uri = "mongodb+srv://flamur:12345@cluster0.axyol2u.mongodb.net/?retryWrites=true&w=majority"

// Funktion zur Verbindung mit MongoDB
async function connect() {
  try {
    await mongoose.connect(uri)
    console.log("Verbunden mit Flamurs MongoDB")
  } catch (error) {
    console.error(error)
  }}

connect()

// Die Startseite
app.get("/", (req, res) => {
  res.send('<a href="/register">Zur Registrierung</a><a href="/login">Zum Login</a>')
})

// login.html mit dem Server verbinden
app.get("/login", function (req, res) {
  res.sendFile("login.html", { root: "./" })
})

// register.html mit dem Server verbinden
app.get("/register", function (req, res) {
  res.sendFile("register.html", { root: "./" })
})

// "User" erstellen mit MongoDB
const User = mongoose.model("User", {
  username: String,
  password: String,
})

// Registrierung von "User"
app.post("/register", async (req, res) => {
  const { username, password } = req.body
  await User.create({ username, password });
  res.send('<p>Registrierung erfolgreich.</p><a href="/login">Zum Login.</a>')
})

// Login von "User"
app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username, password })
  if (user) {
    res.redirect("/index")
  } else {
    res.send("Falscher Benutzername oder Passwort.")
  }
})

app.set("view engine", "ejs")
app.set("views", "./views")

let entries = [
    new GuestbookEntry(1,"BlogTitel", " HEEEELOOOOOOO WOOORLD!"),
    new GuestbookEntry(2,"Blog Title 2", "This is the second blog post."),
]

app.get("/index", (req, res) => {           
    res.render("index", {
        entries: entries
    })
})

app.post("/blog/delete", (req, res) => {

    const entryIdToDelete = parseInt(req.body.entryId)
    const entryIndex = entries.findIndex((entry) => entry.id === entryIdToDelete)

    entries.splice(entryIndex, 1)
    res.redirect("/index")
})

app.post("/blog/new", (req,res) =>{
let content = req.body.content
let title = req.body.title

const newId = entries.length + 1

let newEntry = new GuestbookEntry(title, content)
entries.push(newEntry)
res.redirect("/index")
})

app.listen(3000, () => {
    console.log("App wurde gestartet auf localhost:3000")
})