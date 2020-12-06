(() => {
  if (!authService.isAuth()) {
    alert('Log in to view your tasks.');
    authService.logout();
  }
})();
