const authAPIService = new AuthAPIService();

describe('Auth Checks', () => {
    it('should verify getUser is being called', () => {
      const userUpdateSpy = spyOn(authAPIService, 'getUser');
      
      authAPIService.getUser();
  
      expect(userUpdateSpy).toHaveBeenCalled();
    });

    //Can modify to test more precisely by resplacing jasmin.any with specific
    //values for the currently logged in user
    it('should verify getUser returns correct values from db', async () => {        
        const resp = await authAPIService.getUser();
    
        expect(resp[0].user_id).toEqual(jasmine.any(Number));
        expect(resp[0].username).toEqual(jasmine.any(String));
        expect(resp[0].email).toEqual(jasmine.any(String));
    });

    it("should verify that the user's data is updated correctly", async () => {        
        const username = 'new admin1';
        const email = 'newadmin1@example.com';
        const password = 'newpass1';
        
        const resp = await authAPIService.updateUser({username, email, password});
    
        expect(resp.msg).toEqual('Updated succesfully!');
    });

    it("should verify that the user's data can change back to original values correctly", async () => {        
        const username = 'admin1';
        const email = 'admin@example.com';
        const password = 'pass1';
        
        const resp = await authAPIService.updateUser({username, email, password});
    
        expect(resp.msg).toEqual('Updated succesfully!');
    });
  
  });
  