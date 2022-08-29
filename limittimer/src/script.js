document.addEventListener('DOMContentLoaded', ()=>{
	
	// 時間が来れば表示される更新時のアナウンステキスト（example:this is limitTimer sys.<br>you can choose function that <br> addClass specific element or <br> view specific sentence like this.）
	const nextModifyInfo = 'this is limitTimer sys.<br>you can choose function that <br> addClass specific element or <br> view specific sentence like this.';
	
  /*
  クラスの引数について：（左から）年,月,日,時,分,アナウンステキスト,付与するclass名,表示対象要素を指定
    |-アナウンステキストとclass付与はどちらか一方のみ適用という使い分けも可能
    |-classはtoggleClassなので、前もって所定のhtml要素にclassを付与しておくことで設定時間に合わせてremoveClassすることも可能
  */
  new kirishimaClass_PresentCloseSys(2022, 8, 26, 10, 30, nextModifyInfo, 'NoTxt_toggleClass', 'body');
});

// 以下はclass（具体的な機能指示）の指定

class kirishimaClass_PresentCloseSys {
  constructor(targetYear, targetMonth, targetDate, targetHours, targetMinutes, targetTxt, NoTxt_toggleClass, targetEl){
		this.targetYear = targetYear;
		this.targetMonth = targetMonth;
    this.targetDate = targetDate;
    this.targetHours = targetHours;
    this.targetMinutes = targetMinutes;
		this.targetTxt = targetTxt;
    this.NoTxt_toggleClass = NoTxt_toggleClass;
    this.targetEl = targetEl;

    const timer = setInterval(()=>{
      let now = new Date();
			let getYear = now.getFullYear();
      let getMonth = now.getMonth()+1;
      let getDays = now.getDate();
      let getHours = now.getHours();
      let getMinutes = now.getMinutes();

      /**
       * デフォルトでは「00が省略（=表示されない）されてしまう」ので（年以外の）桁数を揃える指定を行う
       * String(対象の要素).padStart(2,'0') // 対象の要素を文字列に変換して「必ず2桁数になるよう0で揃える・埋める(=00)」
       */
      let NowDateStr = `${getYear}${String(getMonth).padStart(2,'0')}${String(getDays).padStart(2,'0')}${String(getHours).padStart(2,'0')}${String(getMinutes).padStart(2,'0')}`;
      let targetTimeStr = `${this.targetYear}${String(this.targetMonth).padStart(2,'0')}${String(this.targetDate).padStart(2,'0')}${String(this.targetHours).padStart(2,'0')}${String(this.targetMinutes).padStart(2,'0')}`;

        //（数値の大小で条件分岐させるために）型をstrからintに変換
        let NowDate = Number(NowDateStr);
        this.targetTime = Number(targetTimeStr);
			
        if(NowDate >= this.targetTime){ 
            clearInterval(timer);
          
          if(this.targetTxt === ''){ // アナウンステキストに記入なしの場合
            document.querySelector(this.targetEl).classList.toggle(this.NoTxt_toggleClass);
          } else if(this.NoTxt_toggleClass === ''){  // 付与したいclassがなしの場合
            document.querySelector(this.targetEl).insertAdjacentHTML('beforeend', `<div class="closed"><p>${this.targetTxt}</p></div>`);
          } else if((this.targetTxt && this.NoTxt_toggleClass) !== null) { // 両方nullじゃない（両方記入している）場合
            document.querySelector(this.targetEl).classList.toggle(this.NoTxt_toggleClass);
            document.querySelector(this.targetEl).insertAdjacentHTML('beforeend', `<div class="closed"><p>${this.targetTxt}</p></div>`);
          }
        }
      
        console.log(this.targetTime);
        console.log(NowDate);
    }, 1000);
  }
}