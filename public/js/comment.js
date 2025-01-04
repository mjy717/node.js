$(function() {
    function loadComments(articleId) {
        $.get(`/api/comments/${articleId}`, function(data) {
            $("#commentList").empty();
            data.forEach(comment => {
                var li = $("<li></li>").text(comment.content);
                $("#commentList").append(li);
            });
        });
    }

    $("body").on('click','#addCommentBtn',function() {
        var content = $("#commentContent").val();
        var articleId = $("#articleId").val();
        $.post(`/api/comments/${articleId}`, { content: content }, function(data) {
            alert('评论添加成功');
            loadComments(articleId);
        }).fail(function() {
            alert('评论添加失败');
        });
    });
});
