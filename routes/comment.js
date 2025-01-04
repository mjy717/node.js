const express = require('express');
const router = express.Router();
const { addComment } = require('../models/comment');
const { addCommentsCount } = require('../models/article');

router.post('/addComment', async (req, res) => {

    console.log("route: addComment", req.body);
    try {
        const result = await addComment(req.body);
        await addCommentsCount(req.body.post_id); // 调用 addCommentsCount 函数，更新文章的评论数
        res.json({
            code: 200,
            message: '添加评论成功',
            data: result
        })
    } catch (error) {
        res.json({
            code: 500,
            message: '添加评论失败',
            data: error
        })
    }


});

module.exports = router;    