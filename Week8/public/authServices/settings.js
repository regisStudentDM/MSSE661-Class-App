const getFormValues = () => {
    const username = document.getElementById('formInputNewUsernameReg').value;
    const email = document.getElementById('formInputNewEmailReg').value;
    const password = document.getElementById('formInputNewPasswordReg').value;

    return { username, email, password};
  };

  const checkValidInput = () => {
    const { username, email, password } = getFormValues();

    console.log(username);
    console.log(email);
    console.log(password);

    var validInput = false;
    var validationMessage = "";
  
    if (username == "") {
        validInput = false;
        validationMessage = 'User Name is a Required Field';
        return {'validInput': validInput, 'validationMessage': validationMessage};
    }
    if (email == "") {
        validInput = false;
        validationMessage = 'Email is a Required Field';
        return {'validInput': validInput, 'validationMessage': validationMessage};
    }
    if (password == "") {
        validInput = false;
        validationMessage = 'Password is a Required Field';
        return {'validInput': validInput, 'validationMessage': validationMessage};
    }
  
    validInput = true;
    validationMessage = '';
    return {'validInput': validInput, 'validationMessage': validationMessage};
};

  const saveUpdatedChanges = async(e) => {
    e.preventDefault();

    const {validInput, validationMessage} = checkValidInput();

    console.log("validInput:", validInput);
    console.log("validationMessage:", validationMessage);

    if(!validInput){
        alert(validationMessage);
        return;
    }

    const { username, email, password } = getFormValues();

    const resp = await authAPIService.updateUser({username, email, password});

    console.log(resp);

    if(resp){
        alert(resp.msg);
        return;
    }
    else{
        alert("Update unsuccessful, please try again later.");
        return;
    }
  };
  