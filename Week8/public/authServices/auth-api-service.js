const USER_API = `${BASE_API_URL}/user`; // http://localhost:3000/api/user

class AuthAPIService{
  getUser = () => _get(`${USER_API}/me`, OPTIONS_WITH_AUTH);

  updateUser = (formData) => _put(`${USER_API}/me/update`, formData, DEFAULT_OPTIONS_WITH_AUTH);

  }


