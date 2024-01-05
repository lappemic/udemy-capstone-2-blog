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

app.get('/posts/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
        const post = {
            title: posts[index].title,
            content: posts[index].content,
            index: index,
        }
        res.render('post', { post: post });
    } else {
        res.redirect('/');
    }
})

app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
        const post = {
            title: posts[index].title,
            content: posts[index].content,
            index: index,
        }
        res.render('edit', { post: post });
    } else {
        res.redirect('/');
    }
})

app.post('/update/:index', (req, res) => {
    console.log('You hit the update route')
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
        posts[index].title = req.body.title;
        posts[index].content = req.body.content;
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})

app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1);
    } else {
        res.redirect('/');
    }
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})