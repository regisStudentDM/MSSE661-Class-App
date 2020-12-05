(() => {
  const isAuth = getStorage('isAuth');
  if (!isAuth) {
    logout();
    alert('Log in to view your parts.');
    window.location.href = '/login.html';
  }
})();
