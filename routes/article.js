//业务层
const express = require('express');
const router = express.Router();
const { getTags, getArticleList, createArticle, getMyArticleList, getArticleById } = require('../models/article');
const { getCommentsByArticleId } = require('../models/comment');
const{insertPostTags} = require('../models/postTags')
router.post('/tagList', async (req, res) => {
    console.log('get tag list');

    try {
        let result = await getTags();
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/articleList', async (req, res) => {
    console.log('get article list', req.body);
    let { id, page, pageSize } = req.body;
    try {
        if (!id) {
            let tagList = await getTags();
            let articleList = await getArticleList(page, pageSize);
            let result = {
                tagList,
                articleList
            };
            res.json(result);
        } else {
            console.log('get article list by tag id', id);
            let articleList = await getArticleList(page, pageSize, id);
            let result = {
                articleList
            };
            res.json(result);
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/myArticleList', async (req, res) => {
    console.log('get my article list', req.body);
    let { user_id } = req.body;
    try {
        let articleList = await getMyArticleList(user_id, 1, 50);
        let result = {
            articleList
        };
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post ('/favoriteArticleList',async (req,res) =>{
    console.log('get favorite article list',req.body);
    let {user_id,page,pageSize} = req.body;
    try{
        let articleList = await getFavoriteArticleList(user_id,1,50);
        let result = {
            articleList
        };
        res.json(result);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

router.post('/articleDetail', async (req, res) => {
    console.log('get article detail', req.body);
    let { id } = req.body;
    try {
        let article = await getArticleById(id);
        let comments = await getCommentsByArticleId(id);
        res.json({
            article,
            comments
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/create', async (req, res) => {

    console.log('create article', req.body);

    try {
        let result = await createArticle(req.body);
        console.log("create article result", result)
        if (result && req.body.tags && req.body.tags.length > 0) {
            await insertPostTags(result, req.body.tags);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;