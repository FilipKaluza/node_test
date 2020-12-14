const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const formidable = require("formidable"); // for upload image
const fs = require("fs"); //for upload 
const ObjectID = require('mongodb').ObjectID;


// helper function
let saveArticleAndRedirect = (path) => {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        article.image = req.body.pic

        try {
            article = await article.save()
            res.redirect(`/blog/${article.slug}`) // show added article
        } catch (e) {
            console.log(e);
            res.render(`/blog/${path}`, { article: article }) // if error back to form field for adding new article
        }
    }
}


// Blog

// View all articles
router.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" }) //all articles from DB sorted from newest
    res.render("blog/blog", { articles: articles });
});

// new article

router.get("/new", (req, res) => {
    res.render("blog/new_blog", {article: new Article()})
})

router.post("/post", async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        image: req.body.pic,
    })


    try {
        article = await article.save()
        res.send("Blog pridaný")
        res.redirect(`/blog/${article.slug}`) // show added article
    } catch (e) {
        console.log(e);
        res.send("Nastala chyba, skúste to znovu")
        res.render(`blog/${path}`, { article: article }) // if error back to form field for adding new article
    }
})

router.post("/do-upload-image", (req, res) => {
    const formData = new formidable.IncomingForm();
    formData.parse(req, (error, fields, files) => {
        let oldPath = files.file.path;
        let newPath = "static/images/blogimages/" + files.file.name;
        let title = fields.title
        let description = fields.description
        let markdown = fields.markdown
        fs.rename(oldPath, newPath, (err) => {
            res.send({pic: "/" + newPath, title: title, description: description, markdown: markdown});
        });
    });
    
});

// show blog
router.get("/:slug", async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) res.redirect("/"); // if there are no articles redirect to all articles
    res.render("blog/show", { article: article });
})

// edit
router.get("/edit/:id", async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render("blog/edit", { article: article })
})

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

//delete article


router.delete("/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/myaccount/admin")
})


module.exports = router;
