var requests_url = "http://123.56.245.91:34435";
// var requests_url = "http://127.0.0.1:34435";

function sha512(message) {
    const hash = CryptoJS.SHA512(message);
    return hash.toString(CryptoJS.enc.Hex);
}
function registerUser() {
    window.location.href = "register.html";
}

localStorage.removeItem('campuswalls_user_username');
localStorage.removeItem('campuswalls_user_passwd');
$(document).ready(function () {
    document.getElementById('submit-button').addEventListener('click', function (event) {
        event.preventDefault();
        const formData = new FormData(document.getElementById('registration-form'));
        const jsonData = {};
        for (let [key, value] of formData.entries()) {
            jsonData[key] = value;
        }
        jsonData.password = sha512(jsonData.password);
        localStorage.removeItem('campuswalls_user_username');
        localStorage.removeItem('campuswalls_user_passwd');
        $.ajax({
            url: requests_url + '/api/campuswalls/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (data) {
                if (data.success) {
                    alert('登录成功！点击确认跳转至主页~');
                    localStorage.setItem('campuswalls_user_username', jsonData.username);
                    localStorage.setItem('campuswalls_user_passwd', jsonData.password);
                    // window.location.href = "index.html";
                } else {
                    alert('登录失败：' + data.message);
                }
            },
            error: function (error) {
                alert('登录失败：' + (error.responseJSON ? error.responseJSON.message : '未知错误'));
            }
        });

    });
});
