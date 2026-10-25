(function(){var T=THPT,M=window.THPT_MANIFEST||[],$=function(i){return document.getElementById(i)},D=864e5,cur='';
var keys={};M.forEach(function(m){m.words.forEach(function(k){keys[k]=1})});keys=Object.keys(keys);
var ma=keys.filter(T.isMastered).length,nw=keys.filter(T.isNew).length,due=keys.filter(T.isDue).length;
function cd(){var d=T.get('thpt:exam',THPT_CFG.examDate),n=Math.ceil((new Date(d)-new Date())/D);$('days').textContent=n>0?n:0;$('exam').textContent='ngày thi: '+d}
$('cdBox').onclick=function(){var v=prompt('Ngày thi (YYYY-MM-DD):',T.get('thpt:exam',THPT_CFG.examDate));if(v&&!isNaN(new Date(v))){T.set('thpt:exam',v);cd()}};cd();
[['Tổng từ',keys.length],['Đã thuộc',ma],['Đang học',keys.length-ma-nw],['Chưa học',nw],['Hôm nay',T.today()],['🔥 Streak',T.streak()]].forEach(function(s){$('stats').innerHTML+='<div class="stat"><b>'+s[1]+'</b><span>'+s[0]+'</span></div>'});
$('review').textContent='Ôn tập hôm nay ('+due+' từ đến hạn)';
var topics=[];M.forEach(function(m){if(topics.indexOf(m.topic)<0)topics.push(m.topic)});
function render(){$('chips').innerHTML=['Tất cả'].concat(topics).map(function(t){return '<button class="chip'+((t==='Tất cả'?'':t)===cur?' on':'')+'" data-t="'+T.esc(t==='Tất cả'?'':t)+'">'+T.esc(t)+'</button>'}).join('');
 $('list').innerHTML=topics.filter(function(t){return!cur||t===cur}).map(function(t){var ds=M.filter(function(m){return m.topic===t}).sort(function(a,b){return(b.date||'')>(a.date||'')?1:-1}),e=encodeURIComponent(t);
 return '<section style="--c:'+T.hue(t)+'"><h2>'+T.esc(t)+' <a href="study.html?topic='+e+'">Học cả chủ đề</a> <a href="quiz.html?topic='+e+'">Quiz</a></h2><div class="grid">'+ds.map(function(m){var d=m.words.filter(T.isMastered).length,p=Math.round(d*100/m.words.length),i=encodeURIComponent(m.id);
 return '<div class="deck"><b>'+T.esc(m.title)+'</b><small>'+T.esc(m.date||'')+' · '+m.words.length+' từ · thuộc '+d+'</small><div class="bar"><i style="width:'+p+'%"></i></div><p><a class="btn" href="study.html?deck='+i+'">Học</a> <a class="btn ghost" href="quiz.html?deck='+i+'">Quiz</a></p></div>'}).join('')+'</div></section>'}).join('')||'<p class="mut">Chưa có bộ thẻ nào. Upload file .js vào data/decks/.</p>'}
$('chips').onclick=function(e){if(e.target.dataset.t!==undefined){cur=e.target.dataset.t;render()}};render();
})();
