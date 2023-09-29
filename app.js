
// with npm installed
let express = require("express");
let bodyParser = require("body-parser");
const ejs = require('ejs');
let blogEntry = require("./src/blogEntry");
let commentEntry = require("./src/commentEntry");
const mongoose = require("mongoose")

const path = require("path");
let app = express();

// ejs nutzbar
app.set("view engine", "ejs");
app.set("views", "./views");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public")); // makes the file "public" accecable
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));



const uri = "mongodb+srv://flamur:12345@cluster0.axyol2u.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
  try {
    await mongoose.connect(uri)
    console.log("Verbunden mit Flamurs MongoDB")
  } catch (error) {
    console.error(error)
  }}
connect()

app.get("/", (req, res) => {
  res.send('<a href="/register">Zur Registrierung</a><a href="/login">Zum Login</a>')
})

app.get("/login", function (req, res) {
  res.sendFile("login.html", { root: "./" })
})

app.get("/register", function (req, res) {
  res.sendFile("register.html", { root: "./" })
})

const User = mongoose.model("User", {
  username: String,
  password: String,
})

app.post("/register", async (req, res) => {
  const { username, password } = req.body
  const user = new User({ username, password })
  await user.save()
  res.send('<a href="/login">Zum Login</a>')
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username, password })
  if (user) {
    res.redirect("/index")
  } else {
    res.send("Falscher Benutzername oder Passwort.")
  }
})




let entries = [   // list for entrys ( see src)
    new blogEntry(1,"Blog Titel", " HEEEELOOOOOOO WOOORLD!"),
    new blogEntry(2,"Blog Title 2", "This is the second blog post."),  // Constructer defined on Guestbook entry
];  




app.get("/index", (req, res) => {           
    res.render("index", {
        entries: entries,  // Objekt mit daten damit kann index.ejs entries nutzen
                          // seperat z.B title: BLOG  mit <%= title %>
   
    });                    
});






app.post("/blog/new", (req,res) =>{
    let content = req.body.content; // 
    let title = req.body.title;  //
    //let imageURL = req.body.imageURL

    const newId = entries.length + 1; // zählt die id hoch zur zuordnung
   
    let newEntry = new blogEntry(newId,title, content);
    entries.push(newEntry);
    res.redirect("/index"); // browser wird auf index weitergeleitet
    
    });
    

   


// how delete works?

//app.delete("/blog/delete/:id" , (req,res) =>
//{
 //req.params.id()

//}
app.post("/blog/delete", (req, res) => {

    const entryIdToDelete = parseInt(req.body.entryId); // nimmt Die id von der HTML die ich löschen möchte              
    const entryIndex = entries.findIndex((entry) => entry.id === entryIdToDelete); // 
                                                                                   //einzige Funktion von ChatG
entries.splice(entryIndex, 1);   // eintrag wird entfernt   ..?                                     
    res.redirect("/index");
});


app.post("/blog/:id/add-comment", (req, res) => {  // :id der Liste entry

    const entryId = parseInt(req.params.id);
    const comment = req.body.comment;
    const visitor = req.body.visitor;

    
    const entry = entries.find((entry) => entry.id === entryId); // Filtert wie beim Delete die Id heraus

        const newComment = new commentEntry(comment, visitor);
        entry.comments.push(newComment);
    

    res.redirect("/index");
});

app.get("/blog/edit/:id", (req, res) => { // nimmt sich den geposteten text
    const entryId = parseInt(req.params.id); // wandelt id in int um

    const entryToEdit = entries.find((entry) => entry.id === entryId); //sucht nachdem eintrag der übereinstimmt
    res.render("edit", { entry: entryToEdit }); // rendert die ansicht
  });

  app.post("/blog/edit/:id", (req, res) => {
    const entryId = parseInt(req.params.id);

    
  

    const entryToEdit = entries.find((entry) => entry.id === entryId);  // sucht nachdem eintrag der übereinstimmt
  

    const updatedContent = req.body.content; // 
    // aktualisierung des inhalts von content
    entryToEdit.content = updatedContent;  
  
    res.redirect("/index"); // Redirect to the main page or wherever you want after editing.
  });


app.listen(5000, () => {
    console.log("App wurde gestartet auf localhost:5000");
})



  



// Daten vom Browser zum Server schicken

