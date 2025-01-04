//交互层 接口层  业务层
//收藏列表 没有tabs 我的收藏和我的文章列表一样  可以复用，页面一样==交互一样，数据和业务不一样
//关联 文章列表和 收藏列表 子查询/笛卡儿积  文章列表和收藏列表  关联  收藏列表和用户表  关联
//use_id post_id 当前用户 没写分页
const{query} = require('./db')
const {addFavoriteCount, reduceFavoriteCount} =  require('./article');
async function exitsFavorite(postId, userId){
    const sql = 'select * from favorites where post_id = ? and user_id = ? ';
    const result = await query(sql, [postId,userId]);
    if (result && result.length > 0)
        return true;
    return false;
}   
async function addFavorite(postId,userId){
    const sql = 'insert into favorites (post_id, user_id) values (?,?)';
    const result = await query(sql, [postId,userId]);
    if (result.affectedRows > 0) {
        await addFavoriteCount(postId);
    }
    return result;
}
async function deleteFavorite(postId,userId){
    const sql = 'delete from favorites where post_id = ? and user_id = ?';
    const result = await query(sql,[postId,userId]);
    if (result.affectedRows > 0) {
        await reduceFavoriteCount(postId);
    }
    return result;
}
module.exports = {
    exitsFavorite,
    addFavorite,
    deleteFavorite,
};