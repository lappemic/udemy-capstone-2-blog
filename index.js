import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];


app.get("/", (req, res) => {
    res.render('index', { posts: posts });
});

app.get("/write" , (req, res) => {
    res.render('write');
});

app.post('/write', (req, res) => {
    console.log('You hit the post route')
    const post = {
        title: req.body.title,
        content: req.body.content
    }
    console.log(post);
    posts.push(post);
    res.redirect("/");
})

app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1);
    }
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})