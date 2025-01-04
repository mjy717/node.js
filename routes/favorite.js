const express = require('express');
const router = express.Router();
const {exitsFavorite,addFavorite,deleteFavorite} = require('../models/favorite');

router.post('/setFavorite', async (req, res) =>{
    
    console.log("route: setFavorite",req.body);

    let {user_id, post_id} = req.body;
    try{
        const result = await exitsFavorite(post_id,user_id);
        console.log("exitsFavorite result:",result);
        if (result){
            await deleteFavorite(post_id,user_id);
            res.json({
                code:201,
                message:'取消收藏成功',
                data:result
            })
        }else{
            await addFavorite(post_id,user_id);
            res.json({
                code:200,
                message:'收藏成功',
                data:result
            })
        }
    }catch (error){
        res.json({
            code:500,
            message:'收藏失败',
            data:error
        })
    }
});
module.exports = router