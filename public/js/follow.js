$(function() {
    $("#followBtn").click(function() {
        var userId = $("#userId").val();
        $.post(`/api/users/${userId}/follow`, function(data) {
            alert('关注成功');
        }).fail(function() {
            alert('关注失败');
        });
    });
});
