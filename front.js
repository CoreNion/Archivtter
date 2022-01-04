import generateLink from "./generateLink.js";

const submitButton = document.getElementById("submitButton");
const resultAreaDivided = document.getElementById("resultArea");
const tweetAreaDivided = document.getElementById("tweetArea");

//作成ボタンが押された時の動作
submitButton.onclick = () => {
  var [userName, sinceDate, untilDate] = getInputValue();
  //入力漏れがない場合は実行
  if (!isInputError(userName, sinceDate, untilDate)) {
    var link = generateLink(userName, sinceDate, untilDate);
    //リンク作成でエラーが発生してない場合のみ実行
    if (!(link == 1)) {
      //resultAreaとtweetAreaに要素が残ってたらすべて削除
      removeAllChildren(tweetAreaDivided);
      removeAllChildren(resultAreaDivided);
      //resultAreaに結果のメッセージとURLを表示
      const resultText = document.createElement("a");
      const completeText = document.createElement("h4");
      completeText.innerText = "リンクを作成しました！下のリンクをクリックすれば検索画面を開けます。";
      resultText.href = link;
      //リンクの文字を赤にし、display:blockでaタグにmarginを適用する
      resultText.style.cssText = "color: red; display:block;";
      resultText.innerText = link;
      resultAreaDivided.appendChild(completeText);
      resultAreaDivided.appendChild(resultText);

      //ツイートボタン
      const twScript = document.createElement('script');
      twScript.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      tweetAreaDivided.appendChild(twScript);
      const tweetButton = document.createElement("a");
      var tweetText = "@" + userName + "の" + sinceDate + "～" + untilDate + "までのツイートです！\n" +
        "https://twitter.com/search?q=from%3A" + userName + "%20since%3A" + sinceDate + "%20until%3A" + untilDate + "\n\n" +
        "作成サイト:";
      tweetButton.setAttribute("href", "https://twitter.com/share?ref_src=twsrc%5Etfw");
      tweetButton.className = "twitter-share-button";
      tweetButton.setAttribute("data-size", "large");
      tweetButton.setAttribute("data-text", tweetText);
      tweetButton.setAttribute("data-url", "https://corenion.github.io/Archivtter/");
      tweetButton.setAttribute("data-hashtags", "Archivtter");
      tweetButton.setAttribute("data-show-count", "false");
      tweetButton.innerText = "ツイートする";
      tweetAreaDivided.appendChild(tweetButton);
    }
  }
};

//Inputを読み取ってValueを返す関数
function getInputValue() {
  const sinceDateInput = document.getElementById("sinceDate");
  const untilDateInput = document.getElementById("untilDate");
  const userNameInput = document.getElementById("userName");
  const userName = userNameInput.value;
  const sinceDate = sinceDateInput.value;
  const untilDate = untilDateInput.value;
  return [userName, sinceDate, untilDate];
}

/**
 * 入力された値をチェックする関数。
 * @param {string} userName ユーザー名
 * @param {string} sinceDate 検索開始の日付
 * @param {string} untilDate 検索終了の日付
 */
 function isInputError(userName, sinceDate, untilDate){
  //各種入力された値が空じゃないかのチェック
  if(!userName){
      alert("エラー:ユーザー名を入力してください。");
      return true;
  }
  if(!sinceDate){
      alert("エラー:検索を開始する日付を入力してください。");
      return true;
  }
  if(!untilDate){
      alert("エラー:検索を終了する日付を入力してください。");
      return true;
  }

  //ユーザー名に空白が含まれていないかチェック
  if(userName.match(/ /) || userName.match(/　/)){
      alert("エラー:ユーザー名に空白が含まれています。ユーザー名はTwitterで@から始まる名前ののことです。");
      return true;
  }
  //ユーザー名に英語以外の文字列が含まれていないかのチェック
  var isEnglish = true;
  for(var i=0; i < userName.length; i++){
      if(userName.charCodeAt(i) >= 256) {
        isEnglish = false;
        break;
      }
  }
  if(!isEnglish){
      alert("ユーザー名に英語以外の文字が含まれています。ユーザー名はTwitterで@から始まる名前ののことです。");
      return true;
  }
  return false;
}

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
 function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}
