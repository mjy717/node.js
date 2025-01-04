$(function () {

    function loadAbout() {
        $('.center').empty();
        $('.center').load('/about.html');
    }

    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = '/login.html';
    } else {
        $('#username').text(user.username);
    }

    $('body').on('click','#logout',function () {
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    })

    $('body').on('click','#addArticleBtn',function () {
        $('.center').empty();
        $('.center').load('/writeArticle.html');
    })

    // 关闭模态框
    $('body').on('click','#closeModalBtn',function () {
        $('#modalOverlay').hide();
    });

    // 点击背景层关闭模态框
    $('body').on('click','#modalOverlay',function (event) {
        if (event.target.id === 'modalOverlay') {
            $('#modalOverlay').hide();
        }
    });

    $('body').on('click','#publishBtn',function () {
        let comment = $('#articleComment').val();
        if (comment.trim() === '') {
            alert('评论不能为空');
            return;
        } else {
            let article_id = $('#publishBtn').attr('article_id');
            $.post("/api/comment/addComment", { post_id: article_id, comment: comment.trim(), user_id: user.id }, function (data) {
                $('#modalOverlay').hide();
                console.log(data);
                let text = $('#comment-count-' + article_id).text();//评论 1
                let count = text.split(' ')[1] - 0;
              
                $('#comment-count-' + article_id).text('评论 ' + (count + 1));
                //update page
                alert('评论成功');
            }).fail(function (error) {
                console.log(error);
                alert('评论失败');
            });
        }
    })

    $('body').on('click','.sidebar a',function () {
        $('.sidebar a').removeClass('active');
        $(this).addClass('active');
        switch ($(this).attr('id')) {
            case 'home':
                loadArticles();
                break;
            case 'articles':
                loadMyArticles();
                break;
            case 'favorites':
                loadFavoriteArticles();
                break;
            case 'about':
                loadAbout();
                break;
            default:
                break;
        }
    })

    loadArticles();


    window.addComment = function (event, id) {

        $('#modalOverlay').show();
        console.log(id);
        $('#publishBtn').attr('article_id', id);
        event.stopPropagation();
    }



    window.articleDetail = function (id) {
        console.log('articleDetail', id);
        $('.center').empty();
        $.post('/api/article/articleDetail', { "id": id - 0 }, (data) => {
            let { article, comments } = data
            let articleHtml = `<h1>${article.title}</h1><p>${article.content}</p>`
            $('.center').append($(articleHtml))
            $('.center').append($("<div id='comments'><h2>评论</h2></div>"))
            comments.forEach(element => {
                let commentHtml = ` <div class="comment">
                <h4>${element.author_username}</h4> at ${element.comment_created_at}
                <p>${element.comment_content}</p> </div>`
                $('#comments').append($(commentHtml))
            });
        })
    }

    window.onLike=function(event,id){
        console.log(id);
        event.stopPropagation();
        $.post("/api/like/setLike",{post_id: id,user_id:user.id},function(data){
            let count = $('#like-count-'+id).text().split(' ')[1] - 0;
            if (data.code == 200){
                $('#like-count-'+id).text('点赞'+ (count + 1));
            }else{
                $('#like-count-'+ id).text('点赞'+ (count - 1));
            }
        }).fail(function(error){
            alert("点赞失败");
        });
    }
    window.onFavorite = function (event , id){
        console.log(id);
        event.stopPropagation();
        $.post("/api/favorite/setFavorite",{post_id:id,user_id:user.id},function (data){
            let count = $('#favorite-count-'+ id).text().split(' ')[1] - 0;
            if (data.code == 200) {
                $('#favorite-count-' + id).text('收藏' + (count + 1));
            }else{
                $('#favorite-count-' + id).text('收藏' + (count - 1));
            }
        }).fail(function (error){
            alert("收藏失败");
        });
    }
    
})
