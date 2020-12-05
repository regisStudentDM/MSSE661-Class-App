/**
 * @class PartList
 *
 * Creates a list of parts and updates a list
 */

class PartList {
  parts = [];
  partNames = [];

  constructor() {}

  /**
   * Build part list parent.
   * Uses bootstrap classes with some custom overrides.
   */
  createPartListParent = () => {
    const ul = document.createElement('ul');
    ul.id = 'parts-list';
    ul.className = 'list-group list-group-flush checked-list-box';
    return ul;
  };


  _deleteEventHandler = (partId) => async () => {
    if (partId) {
      const res = await deletePart(partId);

      if (res !== null) {
        this.parts = this.parts.filter((part) => part.part_id !== partId);
        const part = document.getElementById(`part-${partId}`);
        part.remove();

        if (!this.parts.length) {
          const div = document.getElementById('parts');
          const loadingDiv = div.childNodes[1];
          const errDiv = this.generateErrorMsg('Create some new parts!');
          div.replaceChild(errDiv, loadingDiv);
        }
      }
    }
  };

  /**
   * Builds the list item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deletePart(e, index)">X</button>
   *   <span>Part name</span>
   *   <span>pending</span>
   *   <span>date create</span>
   * </li>
   */
  buildPartListRowItem = (part) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `part-${part.part_id}`; // part-1
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(part.part_id));
    deleteBtn.appendChild(deleteBtnTxt);

    const partNameSpan = document.createElement('span');
    const partName = document.createTextNode(part.part_name);
    partNameSpan.appendChild(partName);

    const partUnitSpan = document.createElement('span');
    const partUnit = document.createTextNode(part.unit);
    partUnitSpan.append(partUnit);

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(partNameSpan);
    listGroupItem.append(partUnitSpan);

    return listGroupItem;
  };

  /**
   * Assembles the list items then mounts them to a parent node.
   * Uses bootstrap classes with some custom overrides.
   */
  buildPartsList = (mount, parts) =>
    parts.map((part) => {
      const listGroupRowItem = this.buildPartListRowItem(part);

      // add entire list item
      mount.append(listGroupRowItem);
    });

  generateErrorMsg = (msg) => {
    const div = document.createElement('div');
    const text = document.createTextNode(msg);
    div.id = 'user-message';
    div.className = 'center';
    div.appendChild(text);
    return div;
  };

  generateParts = async () => {
    const res = await getParts();
    const div = document.getElementById('parts');
    const loadingDiv = div.childNodes[1];

    if (res.length) {
      this.parts = res;
      const partsDiv = this.createPartListParent();
      this.buildPartsList(partsDiv, res);
      div.replaceChild(partsDiv, loadingDiv);
    } else {
      const errDiv = this.generateErrorMsg(res.msg);
      div.replaceChild(errDiv, loadingDiv);
    }

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

  };

}

const inst = new PartList();

// This is an IIFE (Immediately Invoked Function Expression).
(async () => {
  inst.generateParts();
  console.log(inst.partNames);
})();
