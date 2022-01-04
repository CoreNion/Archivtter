import generateLink from "./generateLink.js";

const submitButton = document.getElementById("submitButton");
const resultAreaDivided = document.getElementById("resultArea");
const tweetAreaDivided = document.getElementById("tweetArea");

//作成ボタンが押された時の動作
submitButton.onclick = () => {
  var [userName, sinceDate, untilDate] = getInputValue();
  //resultAreaとtweetAreaに要素が残ってたらすべて削除
  removeAllChildren(tweetAreaDivided);
  removeAllChildren(resultAreaDivided);
  //入力漏れがない場合は実行
  if (!isInputError(userName, sinceDate, untilDate)) {
    var link = generateLink(userName, sinceDate, untilDate);
    //リンク作成でエラーが発生してない場合のみ実行
    if (isNaN(link)) {
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

      /* ツイートボタン */
      const twScript = document.createElement('script');
      twScript.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      tweetAreaDivided.appendChild(twScript);
      const tweetButton = document.createElement("a");

      //Date型を"yyyy年mm月dd日"に変更する
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      var tweetText = "@" + userName + "の" + sinceDate.toLocaleDateString(undefined, dateOptions) + "～" + untilDate.toLocaleDateString(undefined, dateOptions) + "までのツイートです！\n" +
        link + "\n\n" +
        "作成サイト:";
      //ツイートボタンの各オプションを設定
      tweetButton.setAttribute("href", "https://twitter.com/share?ref_src=twsrc%5Etfw");
      tweetButton.className = "twitter-share-button";
      tweetButton.setAttribute("data-size", "large");
      tweetButton.setAttribute("data-text", tweetText);
      tweetButton.setAttribute("data-url", "https://corenion.github.io/Archivtter/");
      tweetButton.setAttribute("data-hashtags", "Archivtter");
      tweetButton.setAttribute("data-show-count", "false");
      tweetButton.innerText = "ツイートする";
      tweetAreaDivided.appendChild(tweetButton);
    } else {
      if (link == 1) {
        document.getElementById("sinceDateFeedback").innerText = "検索期間の開始日が終了日の後の日付になっています。\n正しい日付を入力してください。";
        document.getElementById("untilDateFeedback").innerText = "検索期間の開始日が終了日の後の日付になっています。\n正しい日付を入力してください。";
        document.getElementById("sinceDate").classList.add("is-invalid");
        document.getElementById("untilDate").classList.add("is-invalid");
      } else {
        alert("エラーが発生しました。正しい値が入力されているかどうかを確認してください。")
      }
    }
  }
};

//Inputを読み取ってValueを返す関数
function getInputValue() {
  const sinceDateInput = document.getElementById("sinceDate");
  const untilDateInput = document.getElementById("untilDate");
  const userNameInput = document.getElementById("userName");
  const userName = userNameInput.value;
  const sinceDate = new Date(sinceDateInput.value);
  const untilDate = new Date(untilDateInput.value);
  return [userName, sinceDate, untilDate];
}

/**
 * 入力された値をチェックする関数。
 * @param {string} userName ユーザー名
 * @param {Date} sinceDate 検索開始の日付
 * @param {Date} untilDate 検索終了の日付
 */
function isInputError(userName, sinceDate, untilDate) {
  let inputCheck = false;
  //前回の結果を初期化
  document.getElementById("userName").classList.remove("is-invalid");
  document.getElementById("sinceDate").classList.remove("is-invalid");
  document.getElementById("untilDate").classList.remove("is-invalid");
  document.getElementById("inputGroup").classList.remove("was-validated");

  //各種入力された値が空じゃないかのチェック
  if (!userName || isNaN(sinceDate) || isNaN(untilDate)) {
    document.getElementById("inputGroup").classList.add("was-validated");
    inputCheck = true;
  }

  //ユーザー名に空白が含まれていないかチェック
  if (userName.match(/ /) || userName.match(/　/)) {
    document.getElementById("userNameFeedback").innerText = "ユーザー名に空白が含まれています。ユーザー名はTwitterで@から始まる名前ののことです。";
    document.getElementById("userName").classList.add("is-invalid");
    inputCheck = true;
  }

  //ユーザー名に英語以外の文字列が含まれていないかのチェック
  var isEnglish = true;
  for (var i = 0; i < userName.length; i++) {
    if (userName.charCodeAt(i) >= 256) {
      isEnglish = false;
      break;
    }
  }
  if (!isEnglish) {
    document.getElementById("userNameFeedback").innerText = "ユーザー名に英語以外の文字が含まれています。ユーザー名はTwitterで@から始まる名前のことです。";
    document.getElementById("userName").classList.add("is-invalid");
    inputCheck = true;
  }

  return inputCheck
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
