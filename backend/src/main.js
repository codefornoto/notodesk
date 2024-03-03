const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1sE_Im2k6M0UtK_xrJjTIQkifmPTe5H25RXGUI1znfnI/";
const sheet = SpreadsheetApp.openByUrl(sheetUrl).getSheetByName("movie");

function doGet() {
  const data = sheet.getDataRange().getValues();
  data.shift();
  return ContentService.createTextOutput(JSON.stringify(data));
}

function test() {
  const data = doGet();
  console.log(data);
}
