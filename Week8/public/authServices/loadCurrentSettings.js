(async () => {
    const currUsername = document.getElementById('formInputUsernameReg');
    const currEmail = document.getElementById('formInputEmailReg');
    const currPassWord = document.getElementById('formInputNewPasswordReg');

    authAPIService = new AuthAPIService();

    const resp = await authAPIService.getUser();
    
    currUsername.value = resp[0].username;
    currEmail.value = resp[0].email;
  })(); 