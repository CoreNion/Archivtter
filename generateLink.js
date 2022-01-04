/**
 * 検索用のURLを作成する関数。エラーが発生した場合は1を返します。
 * @param {string} account アカウント名
 * @param {string} since 検索開始する日付 yyyy-mm-ddの形である必要がある。
 * @param {string} until 検索終了する日付 yyyy-mm-ddの形である必要がある。
 */
 export default function(account,since,until){
    var sinceArray = since.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/);
    var untilArray = until.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/);
    //yyyy-mm-ddの形になってるかのチェック
    if(sinceArray == null){
        alert("Error:sinceの値が不正です。値を手入力した場合は、形式が合ってない可能性があります。");
        return 1;
    } else if(untilArray == null){
        alert("Error:untilの値が不正です。値を手入力した場合は、形式が合ってない可能性があります。");
        return 1;
    }
    //範囲がおかしくなってないかのチェック
    if(untilArray[1] - sinceArray[1] <= -1){
        alert("エラー:開始年と終了年が合ってません。");
        return 1;
    //年をまたぐ場合に月/日のチェックをしないようにする
    } else if(untilArray[1] - sinceArray[1] < 1){
        if(untilArray[2] - sinceArray[2] <= -1){
            alert("エラー:開始月と終了月が合ってません。");
            return 1;
        //月をまたぐ場合に日にちのチェックをしないようにする
        } else if(untilArray[2] - sinceArray[2] < 1){
            if(untilArray[3] - sinceArray[3] <= -1){
                alert("エラー:開始日と終了日が合ってません。");
                return 1;
            }
        }
    }
    //from:アカウント名 since:yyyy-mm-dd until:yyyy-mm-ddで検索されるような形にする。
    return "https://twitter.com/search?q=from%3A" + account + "%20since%3A" + since + "%20until%3A" + until;
}
