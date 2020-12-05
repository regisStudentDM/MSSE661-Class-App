/**
 * AJAX add new parts to part list on save.
 */
const doAddPart = async (e) => {
    e.preventDefault();
  
    const partInput = document.getElementById('formInputPartName');
    const part_name = partInput.value;
    const unitInput = document.getElementById('formInputPartUnit');
    const part_unit = unitInput.value;
  
    if (!part_name) {
      alert('Please enter a part name.');
      return;
    }
  
    const res = await addPart({ part_name, part_unit });
  
    if (res !== null) {
      if (res.msg == 'Cannot process response at the time. Please try again shortly.') {
        alert("Can't add item at this time. Possible duplicate entry?")
      } else {
        alert(res.msg);
      }
      inst.generateParts();
    }
    partInput.value = '';
  };


  const doUpdatePart = async (e) => {
    e.preventDefault();

    const oldPartNameSelect = document.getElementById('formPartToEditName');
    const oldPartSelectOptions = oldPartNameSelect.options;
    const oldPartSelectedIndex = oldPartNameSelect.selectedIndex;
    var part_name = oldPartSelectOptions[oldPartSelectedIndex].text;

    const partinfo = await getPartIDByUserAndPartName(part_name).catch((err) => {
      throw err;
    });

    var partIDOfUpdatedPart = partinfo[0].part_id;
  
    const partInput = document.getElementById('formUpdatedPartName');
    part_name = partInput.value;
    const unitInput = document.getElementById('formUpdatedPartUnit');
    const part_unit = unitInput.value;
  
    if (!part_name) {
      alert('Please enter an updated part name.');
      return;
    }
  
    const res = await updatePart({ part_name, part_unit }, partIDOfUpdatedPart);
  
    if (res !== null) {
      inst.generateParts();
      console.log(inst.partNames);
    }
    partInput.value = '';
  };
  