const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1bLkn1UgmdJVsoZ4-s0YVdWpBOFewe7gm113HOpGgTQQ/";
const sheet = SpreadsheetApp.openByUrl(sheetUrl).getSheetByName("main");

function getData() {
  var data = sheet.getDataRange().getValues();
  // ヘッダーを削除
  data.shift();
  return data;
}

function doGet() {
  const output = HtmlService.createTemplateFromFile("index.html").evaluate();
  output.addMetaTag("viewport", "width=device-width, initial-scale=1");
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
