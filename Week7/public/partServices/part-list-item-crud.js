/**
 * AJAX add new parts to part list on save.
 */
const doAddPart = async (e) => {
    e.preventDefault();
    partListBuilder._addPartByUserFormInputs();
  };
  
  const doUpdatePart = async (e) => {
    e.preventDefault();
    partListBuilder._updatePartByUserFormInputs();
  };

  const doDeletePart = async (e) => {
    e.preventDefault();
    partListBuilder._deletePartByUserFormInputs();
  };