/**
 * @class PartListBuilder
 *
 * Creates a list of parts and updates a list
 */

class PartListBuilder {
  parts = [];
  partsService;

  constructor(partsService) {
    this.partsService = partsService;
  }

  init() {
    this.render();
  }

  /**
   * Pure function for adding a task.
   *
   * @param {Object} newPartMinusID - form's values as an object
   */
  addPartByObjectSpecification = async (newPartMinusID) => {
    try {
      const resp = await this.partsService.addPart(newPartMinusID);
      
      if (resp) {
        if(resp.error){
          alert(resp.error.msg);
        }
        this.render();
      } else {
        alert('Unable to add part. Please try again later.');
        return;
      }
    } catch (err) {
      console.log(err);
      alert('Unable to add part. Please try again later.');
      return;
    }
  };

  /**
   * DOM Event handler helper for adding a part to the DOM.
   */
  _addPartByUserFormInputs = async () => {
    const partInput = document.getElementById('formInputPartName');
    const part_name = partInput.value;
	
	  const partUnitInput = document.getElementById('formInputPartUnit');
    const part_unit = partUnitInput.value;

    // validation checks
    if (!part_name) {
      alert('Please enter a part name.');
      return;
    }
	
	// validation checks
    if (!part_unit) {
      alert('Please enter a part unit.');
      return;
    }

    const res = await this.addPartByObjectSpecification({ part_name, part_unit });

    partInput.value = "";
    partUnitInput.value = "";

  };

  /**
   * Pure function for adding a task.
   *
   * @param {Object} partToUpdateName - form's values as an object
   */
  updatePartByPartName = async (partToUpdateName, part_name, part_unit) => {
    try {
      if (!partToUpdateName) {
        alert('Please select a part to update!.');
        return;      
      }

      if (!part_name) {
        alert('Please enter an updated part name.');
        return;
      }

      if (!part_unit) {
        alert('Please enter an updated part unit name.');
        return;
      }

      const partinfo = await this.partsService.getPartIDByUserAndPartName(partToUpdateName);

      var partIDOfUpdatedPart = partinfo[0].part_id;
      
      const resp = await this.partsService.updatePart({part_name, part_unit}, partIDOfUpdatedPart);

      if (resp) {
        return resp;
      } else {
        alert('Unable to update part. Please try again later.');
        return;
      }
    } catch (err) {
      console.log(err);
      alert('Unable to update part. Please try again later.');
      return;
    }
  };

  /**
   * DOM Event handler helper for adding a part to the DOM.
   */
  _updatePartByUserFormInputs = async () => {
    const oldPartNameSelect = document.getElementById('formPartToEditName');
    const oldPartSelectOptions = oldPartNameSelect.options;
    const oldPartSelectedIndex = oldPartNameSelect.selectedIndex;
    var partToUpdateName = oldPartSelectOptions[oldPartSelectedIndex].text;
    
    const partInput = document.getElementById('formUpdatedPartName');
    const part_name = partInput.value;
    const unitInput = document.getElementById('formUpdatedPartUnit');
    const part_unit = unitInput.value;

    // validation checks
    if (!part_name) {
      alert('Please enter an updated part name.');
      return;
    }
	
	// validation checks
    if (!part_unit) {
      alert('Please enter an updated part unit.');
      return;
    }

    const resp = await this.updatePartByPartName(partToUpdateName, part_name, part_unit);

    this.render();

    partInput.value = "";
    unitInput.value = "";
  };

  /**
   * DOM Event handler helper for delete a part from the DOM.
   * This relies on a pre-existing part in the list of parts.
   *
   * @param {number} partId - id of the part to delete
   */
  deletePartByID = async (partId) => {
    try {
      const res = await this.partsService.deletePart(partId);

      if (res !== null) {
        return res;
      }
    } 
    catch (err) {
      alert('Unable to delete part. Please try again later.');
    }
  };

  _deletePartByUserFormInputs = async () => {
    const oldPartNameSelect = document.getElementById('formPartToEditName');
    const oldPartSelectOptions = oldPartNameSelect.options;
    const oldPartSelectedIndex = oldPartNameSelect.selectedIndex;
    var partToDeleteName = oldPartSelectOptions[oldPartSelectedIndex].text;

    console.log(partToDeleteName);

    const partinfo = await this.partsService.getPartIDByUserAndPartName(partToDeleteName);

    if (partinfo){
      var partIDOfPartToDelete = partinfo[0].part_id;

      const part = document.getElementById(`part-${partIDOfPartToDelete}`);
      part.remove();

      this.parts = this.parts.filter((part) => part.part_id !== partIDOfPartToDelete);  

      const resp = await this.deletePartByID(partIDOfPartToDelete);

      this.render();
    }

  };

  render = async () => {
    const parts = await this.partsService.getParts();
  
    try {
      if (parts) {
        if (parts.msg) {
          this._renderMsg();
          this._updatePartEditSelections();
          return;
        }
        this.parts = parts;

        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  /**
   * DOM renderer for building the list row item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="_deleteEventHandler(e, index)">X</button>
   *   <span>Part name</span>
   *   <span>pending</span>
   *   <span>date create</span>
   * </li>
   */
  _renderListRowItem = (part) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `part-${part.part_id}`; // part-1
    listGroupItem.className = 'list-group-item';

    const partNameSpan = document.createElement('span');
    const partName = document.createTextNode(part.part_name);
    partNameSpan.appendChild(partName);

    const partUnitSpan = document.createElement('span');
    const partUnit = document.createTextNode(part.part_unit);
    partUnitSpan.appendChild(partUnit);

    // add list item's details
    listGroupItem.append(partNameSpan);
    listGroupItem.append(partUnitSpan);

    return listGroupItem;
  };

  /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const partsDiv = document.getElementById('parts');
    const loadingDiv = partsDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'parts-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.parts.map((part) => {
      const listGroupRowItem = this._renderListRowItem(part);

      // add entire list item
      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    partsDiv.replaceChild(fragment, loadingDiv);

    this._updatePartEditSelections();
  };

  _updatePartEditSelections = () => {
    for (const option of [...document.querySelector('#formPartToEditName').options]) {
      option.remove();
    }

    var myList = document.getElementById("formPartToEditName");
    var o;

    for (let index = 0; index < this.parts.length; index++) {
      o = document.createElement("option");
      o.value = this.parts[index].part_name;
      o.text = this.parts[index].part_name;
      myList.appendChild(o);
    }

    myList.selectedIndex = 0;
  }

  /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const partsDiv = document.getElementById('parts');
    const loadingDiv = partsDiv.childNodes[0];
    const listParent = document.getElementById('parts-list');
    const msgDiv = this._createMsgElement('Create some new parts!');

    if (partsDiv) {
      partsDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      partsDiv.replaceChild(msgDiv, listParent);
    }
  };

  /**
   * Creates a message div block.
   *
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

}
