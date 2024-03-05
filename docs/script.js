let index = 0;
let imageList = [];
const URLColumn = 2;
const imageDispIntervalColomn = 4;
const movieFlagColumn = 5;
const movieURLColumn = 6;
const defaultImageURL =
  "https://lh3.googleusercontent.com/d/1u3pXM4l88Gy-bHLNg7Qsepke86vEWGxS";
const defaultInterval = 5; //秒
let timerID = null;

function changeImage() {
  let url = "";
  let interval = 0;
  if (index == imageList.length - 1) {
    getDataFromSpreadSheet();
    index = 0;
  }
  if (imageList[index][URLColumn] == "") {
    url = defaultImageURL;
  } else {
    url = imageList[index][URLColumn];
  }
  if (imageList[index][imageDispIntervalColomn] == "") {
    interval = defaultInterval;
  } else {
    interval = imageList[index][imageDispIntervalColomn];
  }
  showImage(url, interval);
  if (imageList[index][movieFlagColumn]) {
    showMovie(
      imageList[index][movieURLColumn] + "?autoplay=1&mute=1&loop=1&controls=0",
      interval
    );
  }
  index++;
  if (!imageList[index][movieURLColumn]) {
    addImagePreloadLink(imageList[index][imageDispIntervalColomn]);
  }

  if (timerID) {
    clearTimeout(timerID);
  }
  timerID = setTimeout(() => changeImage(), interval * 1000);
}

// フェードインアウトの処理
function fadeInOut(interval, target) {
  const element = document.querySelector(target);
  element.animate(
    { opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0] },
    {
      duration: 13000,
    }
  );
}

function hide(selector) {
  // iframe要素を取得する
  const dom = document.querySelector(selector);
  // iframe要素のスタイルを変更して非表示にする
  dom.style.visibility = "hidden";
}

function show(selector) {
  // iframe要素を取得する
  const dom = document.querySelector(selector);
  // iframe要素のスタイルを変更して非表示にする
  dom.style.visibility = "visible";
}
//引数の画像を表示
function showImage(url, interval) {
  fadeInOut(interval * 1000, "#image");
  const element = document.getElementById("image");
  hide(".video-frame");
  element.src = url;
  show(".upper-image");
}

function showMovie(url, interval) {
  fadeInOut(interval * 1000, "#video");
  const element = document.getElementById("video");
  hide(".upper-image");
  element.src = url;
  show(".video-frame");
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
    "https://script.google.com/macros/s/AKfycbx9n1nFCPnhNztb4I5GgXcRyd_QsM9OnwEEIOWX7n6Yv_nzyDExyNs3m5PqIfA8t6Cs/exec";
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
    });
}
// main
getDataFromSpreadSheet();
setTimeout(() => changeImage(), 5000);
