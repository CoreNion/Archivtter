/**
 * Twitterの日付検索用のURLを作成する関数。
 * 
 * 日付の範囲が不正(開始日が終了日の後にある場合)は1を返す。
 * @param {string} account アカウント名
 * @param {Date} since 検索期間の開始日
 * @param {Date} until 検索期間の終了日
 */
 export default function(account,since,until){
    //範囲がおかしくなってないかのチェック
    if(since > until){
        return 1;
    }
    //from:アカウント名 since:yyyy-mm-dd until:yyyy-mm-ddで検索されるような形にする。
    return "https://twitter.com/search?q=from%3A" + account + "%20since%3A" + since.toISOString().split('T')[0] + "%20until%3A" + until.toISOString().split('T')[0];
}
