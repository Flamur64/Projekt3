let express = require("express")
let bodyParser = require("body-parser")
let GuestbookEntry = require("./src/blogEntry")

let app = express()

app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

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

let entries = [
    new GuestbookEntry("BlogTitel", " HEEEELOOOOOOO WOOORLD!"),
]

app.get("/index", (req, res) => {           
    res.render("index", {
        entries: entries
    })
})

app.post("/blog/new", (req,res) =>{
let content = req.body.content
let title = req.body.title

let newEntry = new GuestbookEntry(title, content)
entries.push(newEntry)
res.redirect("/index")
})

app.listen(5000, () => {
    console.log("App wurde gestartet auf localhost:5000")
})