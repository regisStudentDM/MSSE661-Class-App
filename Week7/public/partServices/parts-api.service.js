const PARTS_API = `${BASE_API_URL}/parts`; // http://localhost:3000/api/parts

class PartsService{
  getParts = () => _get(PARTS_API, OPTIONS_WITH_AUTH);

  getPartIDByUserAndPartName = (partName) => _get_with_params(`${PARTS_API}/getPartIdByName/${partName}`, DEFAULT_OPTIONS_WITH_AUTH);
  
  getPartByID = (partID) => _get_with_params(`${PARTS_API}/${partID}`, DEFAULT_OPTIONS_WITH_AUTH);
  
  addPart = (formData) => _post(PARTS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);
  
  updatePart = (formData, partId) => _put(`${PARTS_API}/${partId}`, formData, DEFAULT_OPTIONS_WITH_AUTH);
  
  deletePart = (partId) => _delete(`${PARTS_API}/${partId}`, OPTIONS_WITH_AUTH);
  }


