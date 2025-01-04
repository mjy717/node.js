const db = require('./db');

async function insertPostTag(postId, tagId) {
    const result = await db.query(
        'INSERT INTO post_tags (post_id, tag_id) VALUES (?,?)',
        [postId, tagId]
    );
    return result.insertId;
}

async function insertPostTags(postId, tags) {

    await Promise.all(tags.map(async tag => {
        await insertPostTag(postId, tag);
    }));
}


async function deletePostTag(postId, tagId) {
    const result = await db.query(
        'DELETE FROM post_tags WHERE post_id =? AND tag_id =?',
        [postId, tagId]
    );
    return result.affectedRows;
}

async function getPostTags(postId) {
    const result = await db.query(
        'SELECT tag_id FROM post_tags WHERE post_id =?',
        [postId]
    );
    return result.map(item => item.tag_id);
}

module.exports = {
    insertPostTags,
    insertPostTag,
    deletePostTag,
    getPostTags
};