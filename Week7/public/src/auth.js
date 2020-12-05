const doLogin = async (e) => {
  e.preventDefault();
  const username = document.getElementById('formInputUsername').value;
  const password = document.getElementById('formInputPassword').value;

  const res = await login({ username, password }).catch((err) => {
    alert('Failed to login. Please try again later.');
  });

  if (res) {
    if (res.msg == 'Invalid password!') {
      alert('Invalid password!');
    } else {
      const { auth, access_token, refresh_token } = res;

      setStorage('isAuth', auth);
      setStorage('access_token', access_token);
      setStorage('refresh_token', refresh_token);
    
      window.location.href = 'home.html';
    }
  }
};

const doRegister = async (e) => {
  e.preventDefault();
  const username = document.getElementById('formInputUsernameReg').value;
  const email = document.getElementById('formInputEmailReg').value;
  const password = document.getElementById('formInputPasswordReg').value;

  const res = await register({
    username,
    email,
    password,
  });

  if (res) {
    window.location.href = 'index.html';
  }
};

const doLogout = (e) => {
  e.preventDefault();
  logout();
  window.location.href = 'index.html';
};