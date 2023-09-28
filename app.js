let express = require("express")
let bodyParser = require("body-parser")
let GuestbookEntry = require("./src/blogEntry")
const path = require("path")

let app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("./public"))

app.get("/", (req, res) => {
  res.send(`<html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
      <style>
          body {
              background-color: blue;
              display: flex;
              justify-content: center; 
              align-items: center;
              height: 100vh;
          }
      </style>
      <body>
      <a href="/login">Zum Login</a>
  </body>
  </html>`)
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