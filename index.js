import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

const blogPosts = [];


app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/write" , (req, res) => {
    res.render("write.ejs")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})