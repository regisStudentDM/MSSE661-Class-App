const doLogin = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').nodeValue;
    const password = document.getElementById('password').nodeValue;

    login({
        username: username,
        password: password
    }).then(function(res){
        window.location.href = 'home.html';
    });
};

const doRegister = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').nodeValue;
    const email = document.getElementById('email').nodeValue;
    const password = document.getElementById('password').nodeValue;

    register({
        username: username,
        email, email,
        password, password
    }).then(function(res){
        window.location.href = 'home.html'
    });
    
};

const doLogout = function(e) {
    e.preventDefault();
}