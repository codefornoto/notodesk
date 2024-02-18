const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1bLkn1UgmdJVsoZ4-s0YVdWpBOFewe7gm113HOpGgTQQ/";
const sheet = SpreadsheetApp.openByUrl(sheetUrl).getSheetByName("main");

function doGet() {
  const data = sheet.getDataRange().getValues();
  data.shift();
  return ContentService.createTextOutput(JSON.stringify(data));
}

function test() {
  const data = doGet();
  console.log(data);
}
