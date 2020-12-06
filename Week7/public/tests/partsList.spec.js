const partsService = new PartsService();
const partListBuilder = new PartListBuilder(partsService);

describe('PartsListBuilder App', () => {
  it('should initialize some HTML', () => {
    spyOn(partListBuilder, 'init');
    partListBuilder.init();

    expect(partListBuilder.init).toHaveBeenCalled();
  });

  it('should add a part', async () => {
    const newPartMinusID = {
      part_name: 'Some Part',
      part_unit: 'feet',
    };
    const addPartServiceSpy = spyOn(partsService, 'addPart');

    expect(partListBuilder.parts.length).toBe(0);

    await partListBuilder.addPartByObjectSpecification(newPartMinusID);

    expect(addPartServiceSpy).toHaveBeenCalled();
    expect(partListBuilder.parts.length).toBe(1);
  });

  it('should delete a part', async () => {
    const existingPart = {
      part_id: 0,
      part_name: 'Part1 Name',
      part_unit: 'Part1 Unit Name',
    };

    const deletePartServiceSpy = spyOn(partsService, 'deletePart');

    expect(partListBuilder).toBe(1);

    await partListBuilder.deletePartByID(existingPart.part_id);

    expect(deletePartServiceSpy).toHaveBeenCalled();
    expect(partListBuilder.tasks.length).toBe(0);
  });

  it('should update an individual task', async () => {
    const existingPart = {
        part_name: 'Part1 Existing Name',
      };

      const newPart = {
        part_name: 'Part1 New Name',
        part_unit: 'Part1 New Unit Name',
      };  
      const updatePartServiceSpy = spyOn(partsService, 'updatePart');
  
      expect(partListBuilder).toBe(1);
  
      await partListBuilder.updatePartByPartName(existingPart.part_name, newPart.part_name, newPart.part_unit);
  
      expect(updatePartServiceSpy).toHaveBeenCalled();
      expect(partListBuilder.tasks.length).toBe(1);
  });


});
