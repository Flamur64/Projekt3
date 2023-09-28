import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000

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
    res.send("Anmeldung Erfolgreich.")
  } else {
    res.send("Anmeldung fehlgeschlagen.")
  }
})

app.listen(port, function () {
  console.log("Server listening on port: " + port)
})