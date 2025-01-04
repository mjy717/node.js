$(function () {

    function createTabs(tags) {
        $(".center").empty();
        $(".center").append($("<ul class='tab-links'></ul>"));
        $('.center').append($("<ul class='article-list'></ul>"))

        if (tags) {

            var tagLink = $("<li></li>").attr("id", 0).text("最近").addClass("active");
            $(".tab-links").append(tagLink);
            tags.forEach(function (tag) {
                var tagLink = $("<li></li>").attr("id", tag.id).text(tag.name);
                $(".tab-links").append(tagLink);
            });

            $('.tab-links li').click(function () {
                let index = $(this).index();
                $('.tab-links li').removeClass('active');
                $(this).addClass('active');
                let id = $(this).attr("id");
                if (id == 0) {
                    $.post("/api/article/articleList", { page: 1, pageSize: 10 }, function (data) {
                        console.log(data);
                        let { tagList, articleList } = data;
                        createTabs(tagList);
                        createArticles(articleList);
                    });
                } else {
                    console.log(id);
                    $.post("/api/article/articleList", { page: 1, pageSize: 10, id: id }, function (data) {
                        console.log(data);
                        let { articleList } = data;
                        createArticles(articleList);
                    });
                }
            })

        }
    }


    function createArticles(articles) {

        $(".article-list").empty();
        if (articles) {
            articles.forEach(function (article) {
                let ariticleItem = ` <li class="article-item" onclick="articleDetail(${article.id})">
                <h2 class="article-title">${article.title}</h2>
                <p class="article-content">${article.summary}</p>
                <p class="article-meta">创建时间: ${article.created_at}</p>
                <div class="icons">
                <!-- 点赞图标 -->
                <i class="fas fa-thumbs-up" onclick="onLike(event,${article.id})"></i> <span id="like-count-${article.id}">点赞${article.likes_count}</span>
                <!-- 收藏图标 -->
                <i class="fas fa-heart"  onclick="onFavorite(event,${article.id})"></i><span id="favorite-count-${article.id}"> 收藏 ${article.favorites_count}</span>
                <!-- 评论图标 -->
                <i class="fas fa-comment" onclick="addComment(event,${article.id})"></i>  <span id = "comment-count-${article.id}">评论${article.comments_count}</span>
                </div>
            </li>`
                $(".article-list").append(ariticleItem);
            });
        }


    }

    window.loadArticles = function (tag) {
        if (!tag) {
            $.post("/api/article/articleList", { page: 1, pageSize: 10 }, function (data) {
                console.log(data);
                let { tagList, articleList } = data;
                createTabs(tagList);
                createArticles(articleList);
            });
        }
    }
    window.loadFavoriteArticles = function () {
        $.post("/api/article/favoriteList", {user_id: localStorage.getItem("user_id") }, function (data) {
            let {articleList} = data;
            $(".center").empty();
            $(".center").append($("<ul class='article-list'></ul>"));
            createArticles(articleList);
        })
    }

    window.loadMyArticles = function () {
        $.post("/api/article/myArticleList", { user_id: localStorage.getItem("user_id") }, function (data) {
            let { articleList } = data;
            $(".center").empty();
            $('.center').append($("<ul class='article-list'></ul>"))
            createArticles(articleList);
        })
    }

});
