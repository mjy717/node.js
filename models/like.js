const {query} = require('./db');
const{addLikeCount,reduceLikeCount} = require('./article');

async function exitsLike(postId,userId){
    const sql ='select * from likes where post_id=? and user_id=? ';
    const result = await query(sql,[postId,userId]);
    if (result && result.length > 0)
        return true;
    return false;
}
async function addLike(postId, userId){
    const sql = 'insert into likes (post_id,user_id) values(?,?)';
    const result=await query(sql,[postId,userId]);
    if (result.affectedRows > 0){
        await addLikeCount (postId);
    }
        return result;
}
async function deleteLike(postId, userId){
    const sql='delete from likes where post_id =? and user_id =?';
    const result=await query(sql,[postId,userId]);
    if (result.affectedRows > 0){
        await reduceLikeCount(postId);
    }
    return result;
}
module.exports={
    exitsLike,
    addLike,
    deleteLike
};

