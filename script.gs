function makeOurForm() {
  var form = FormApp.create('Survey-same-page')
  
  form.setDescription('Enter GDPR description.');
  
  getSpreadsheetData().forEach(function (row) {
    Logger.log(row);
    var reward = row.reward;
    var permission = row.key;
    var category = row.category;

    form.addSectionHeaderItem().setTitle(category);

    var item = form.addMultipleChoiceItem();
    var question = "For €"+reward+", would you give your information on - "+permission + " ?";
    item.setTitle(question)
      .setChoices([
        item.createChoice('Yes'),
        item.createChoice('No')
      ]);
    form.addPageBreakItem();
  });
}


function getSpreadsheetData() {
  // This function gives you an array of objects modeling a worksheet's tabular data, where the first items — column headers — become the property names.
  Logger.log(SpreadsheetApp.getActiveSpreadsheet().getUrl());
  Logger.log(SpreadsheetApp.getActiveSpreadsheet().getSheetName());
  
  var arrayOfArrays = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1').getDataRange().getValues();
  var headers = arrayOfArrays.shift();
  return arrayOfArrays.map(function (row) {
    return {'key':row[0], 'reward':row[1], 'category':row[2]}
  });
}

