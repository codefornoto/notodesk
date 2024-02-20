let index = 0;
let imageList = [];
const imageURLColumn = 2;
const imageDispIntervalColomn = 4;
const defaultImageURL =
  "https://lh3.googleusercontent.com/d/1u3pXM4l88Gy-bHLNg7Qsepke86vEWGxS";
const defaultInterval = 5; //秒
let timerID = null;

function changeImage() {
  let imageURL = "";
  let interval = 0;
  if (index == imageList.length - 1) {
    getDataFromSpreadSheet();
    index = 0;
  }
  if (imageList[index][imageURLColumn] == "") {
    imageURL = defaultImageURL;
  } else {
    imageURL = imageList[index][imageURLColumn];
  }
  if (imageList[index][imageDispIntervalColomn] == "") {
    interval = defaultInterval;
  } else {
    interval = imageList[index][imageDispIntervalColomn];
  }
  index++;
  showImage(imageURL, interval);
  addImagePreloadLink(imageList[index][imageDispIntervalColomn]);

  if (timerID) {
    clearTimeout(timerID);
  }
  timerID = setTimeout(() => changeImage(), interval * 1000);
}

// フェードインアウトの処理
function fadeInOut(interval) {
  const element = document.querySelector("#image");
  element.animate(
    { opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0] },
    {
      duration: 13000,
    }
  );
}

//引数の画像を表示
function showImage(url, interval) {
  fadeInOut(interval * 1000);
  const imgElement = document.getElementById("image");
  imgElement.src = url;
}

function clearPreloadLink() {
  // 既存のpreloadリンクを削除
  const existingPreloadLinks = document.querySelectorAll(
    'link[rel="preload"][as="image"]'
  );
  existingPreloadLinks.forEach((link) => link.remove());
}

function addImagePreloadLink(imageURL) {
  clearPreloadLink();
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = imageURL;
  document.head.appendChild(preloadLink);
}

function getDataFromSpreadSheet() {
  const END_POINT =
    "https://script.google.com/macros/s/AKfycbwwFLLGWd1Bw_nedItK-8Eahe5WMDaWkyfO4864pO2ryjzmJv9RT7AL3wUq31qJV31J/exec";
  $.ajax({
    type: "GET",
    url: END_POINT,
  })
    .done((result) => {
      // 成功した時の処理
      imageList = JSON.parse(result);
    })
    .fail((error) => {
      // 失敗した時の処理
      alert("Error:" + JSON.stringify(error));
    })
    .always((res) => {
      // 常にやる処理
      // do something
    });
}
// main
getDataFromSpreadSheet();
setTimeout(() => changeImage(), 5000);
