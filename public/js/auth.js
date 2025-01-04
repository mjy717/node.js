$(function () {
    $("#loginBtn").click(function () {
        var username = $("#loginUsername").val();
        var password = $("#loginPassword").val();
        $.post("/api/auth/login", { username: username, password: password }, function (data, status) {
            console.log(status);

            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('user_id', data.id);
              
                alert('登录成功');
                window.location.href = 'index.html';
            }
        }).fail(function (data, status, error) {
            alert('登录失败' + error);
        });
    });

    $("#registerBtn").click(function () {
        var email = $("#registerEmail").val();
        var username = $("#registerUsername").val();
        var password = $("#registerPassword").val();
        $.post("/api/auth/register", { username: username, email: email, password: password }, function (data) {
            alert('注册成功');
            window.location.href = 'index.html';
        }).fail(function () {
            alert('注册失败');
            window.location.href = 'login.html';
        });
    });
});
