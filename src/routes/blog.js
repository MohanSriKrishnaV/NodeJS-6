const router = require('express').Router();
const { query } = require('express');
const Blog = require('../models/Blog')

// Your routing code goes here
router.post('/blog', async (req, res) => {
    try {
        const data = await Blog.create(req.body)
        res.send({
            status: "success",
            result: data
        })
    } catch (e) {
        res.send({
            status: "failure",
            result: e
        })
    }

})

router.get('/blog', async (req, res) => {
    try {
        const { page = 1, search = "" } = req.query;
        var blogs;
        if (search == "") {
            blogs = await Blog.find().skip((page - 1) * 5).limit(5);
            res.json({
                status: "success",
                result: blogs
            }
            )
        } else {
            blogs = await Blog.find({ topic: search });
            res.json({
                status: "success",
                result: blogs
            }
            )
        }
    } catch (e) {
        res.json({
            status: "failure",
            result: e.message
        }
        )
    }
})

router.put('/blog/:id', async (req, res) => {
    try {
        let update = req.body
        let data = await Blog.updateOne({ _id: req.params.id }, update)
        res.send({
            status: "success",
            result: data
        })

    } catch (e) {
        res.send({
            status: "failure",
            result: e.message
        })
    }
})

router.delete("/blog/:id", async (req, res) => {
    try {
        let user = await Blog.find({ _id: req.params.id })
        let data = await Blog.deleteOne({ _id: req.params.id })
        res.send({
            status: "success",
            result: user
        })
    } catch (e) {
        res.send({
            status: "failure",
            result: e.message
        })
    }
})

module.exports = router;