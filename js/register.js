var requests_url = "http://123.56.245.91:34435";
// var requests_url = "http://127.0.0.1:34435";

function sha512(message) {
    const hash = CryptoJS.SHA512(message);
    return hash.toString(CryptoJS.enc.Hex);
}
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
            url: requests_url + '/api/campuswalls/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (data) {
                if (data.success) {
                    alert('注册成功！点击确认跳转至登录页面~');
                    localStorage.setItem('campuswalls_user_username', jsonData.username);
                    localStorage.setItem('campuswalls_user_passwd', jsonData.password);
                    // window.location.href = "login.html";

                } else {
                    alert('注册失败：' + data.message);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });

    });
});