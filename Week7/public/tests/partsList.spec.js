const partsService = new PartsService();
const partListBuilder = new PartListBuilder(partsService);

//Flow of tests will
// 1) Verify that the part can be created by adding a part with the following info
// 2) Verify that the program can look this part up
// 3) Verify that the part can be updated
// 4) Verify the updated part can be deleted by deleting it
const testPartName = 'test_part_name';
const testPartUnit = 'feet';
var testPartID;

describe('PartsListBuilder App', () => {
  it('should verify DOM rendering on class loading', () => {
    const renderSpy = spyOn(partListBuilder, 'render');
    partListBuilder.init();

    //The call to init() should call render().
    //Passing this test validates that init() was called successfully
    //and that render() was called successfully
    expect(renderSpy).toHaveBeenCalled();
  });

  it('should verify part addition', async () => {
    const newPartMinusID = {
      part_name: testPartName,
      part_unit: testPartUnit,
    };

    const renderSpy = spyOn(partListBuilder, 'render');

    await partListBuilder.addPartByObjectSpecification(newPartMinusID);

    // If the call to partService.addPart returns a valid response, then the partListBuilder.render() function will be called
    // Passing the following expect test validates that the backend returned a valid response, as well as that the DOM render function was executed.
    // If a part already exists in the database that matches this criteria, a "DUPLICATE" message will pop up which is the correct behavior.
    expect(renderSpy).toHaveBeenCalled();
  });

  it('should get the correct ID of an existing part', async () => {

    const resp = await partsService.getPartIDByUserAndPartName(testPartName);

    //The only way this will return a number is if it found the part and returned the number
    expect(resp[0].part_id).toEqual(jasmine.any(Number));
    testPartID = resp[0].part_id;
  });

  it('should lookup the correct part by the given ID', async () => {

    const resp = await partsService.getPartByID(testPartID);

    //The only way this will return a number is if it found the part and returned the number
    expect(resp[0].part_name).toEqual(testPartName);
  });

  it('should update an individual part', async () => {
    const newPart = {
      part_name: 'test part newly updated name',
      part_unit: 'test part newly updated unit',
    };

    const resp = await partListBuilder.updatePartByPartName(testPartName, newPart.part_name, newPart.part_unit);

    expect(resp.affectedRows).toEqual(1);
    
  });

  it('should delete an individual part', async () => {

    // the value of testPartID is set by a previous test above
    const resp = await partListBuilder.deletePartByID(testPartID);
    
    expect(resp.msg).toEqual('Deleted successfully.');
    
  });

});
