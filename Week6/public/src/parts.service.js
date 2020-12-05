const PARTS_API = `${BASE_API_URL}/parts`; // http://localhost:3000/api/parts

const getParts = () => _get(PARTS_API, OPTIONS_WITH_AUTH);


const getPartIDByUserAndPartName = (partName) => 
_get_with_params(`${PARTS_API}/getPartIdByName/${partName}`, DEFAULT_OPTIONS_WITH_AUTH);


const addPart = (formData) =>
  _post(PARTS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const updatePart = (formData, partId) =>
  _put(`${PARTS_API}/${partId}`, formData, DEFAULT_OPTIONS_WITH_AUTH);


const deletePart = (partId) =>
  _delete(`${PARTS_API}/${partId}`, OPTIONS_WITH_AUTH);
