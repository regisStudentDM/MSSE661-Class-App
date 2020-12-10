const partsService = new PartsService();
const partListBuilder = new PartListBuilder(partsService);

partListBuilder.init();