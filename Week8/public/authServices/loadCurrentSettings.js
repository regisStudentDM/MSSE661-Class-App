const myLoad = async () => {

    try {
        authAPIService = new AuthAPIService();

        resp = await authAPIService.getUser();
    
        const currUsername = document.getElementById('formInputNewUsernameReg');
        const currEmail = document.getElementById('formInputNewEmailReg');
    
        currUsername.value = resp[0].username;
        currEmail.value = resp[0].email;  
    } catch (error) {
        console.log(error);
    }
  
  };

myLoad();
