-- 创建数据库，并指定字符集和排序规则
DROP DATABASE IF EXISTS blog;
CREATE DATABASE IF NOT EXISTS blog
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE blog;

-- 创建用户表
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建文章表
CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(160) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    comments_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    favorites_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建评论表
CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建标签表
CREATE TABLE tags (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建文章与标签关联表
CREATE TABLE post_tags (
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- 点赞表
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

-- 收藏表
CREATE TABLE favorites (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

-- 关注表
CREATE TABLE follows (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    follower_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (follower_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 




-- 插入用户
INSERT INTO users (username, email, password) VALUES
('zhangs', 'zhangs@qq.com', '123456'),
('lisi', 'lisi@qq.com', '123456');

-- 插入文章
INSERT INTO posts (title, content, user_id) VALUES
('我的第一篇博客', '这是我的第一篇博客文章。', 1),
('生活的美好', '生活中有许多美好的瞬间值得记录。', 2);

-- 插入评论
INSERT INTO comments (post_id, user_id, comment) VALUES
(1, 2, '写得很好，John！'),
(2, 1, '同意，Jane。继续加油！');

-- 插入标签
INSERT INTO tags (name) VALUES
('技术'),
('金融'),
('文化'),
('体育'),
('娱乐'),
('教育'),
('生活');

-- 关联文章与标签
INSERT INTO post_tags (post_id, tag_id) VALUES
(1, 1),
(2, 2);