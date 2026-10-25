(function(){var T=THPT,$=function(i){return document.getElementById(i)},q=new URLSearchParams(location.search);
T.scope(q).then(function(s){
var pool=s.words;$('title').textContent=s.title+' – Quiz';
if(pool.length<4){$('empty').hidden=false;return}
$('app').hidden=false;var qs,idx,score,opts,w,lock,en;
function start(){var n=+$('n').value||pool.length;qs=T.shuffle(pool).slice(0,n);idx=0;score=0;$('res').hidden=true;$('qa').hidden=false;ask()}
function ask(){w=qs[idx];lock=false;en=$('dir').value==='en';opts=T.shuffle([w].concat(T.shuffle(pool.filter(function(x){return x!==w})).slice(0,3)));
 $('qn').textContent=(idx+1)+' / '+qs.length;$('bar').style.width=(idx*100/qs.length)+'%';$('qw').textContent=en?w.word:w.vi;$('fb').textContent='';$('next').hidden=true;
 $('opts').innerHTML=opts.map(function(o,j){return '<button class="btn ghost opt" data-j="'+j+'">'+(j+1)+'. '+T.esc(en?o.vi:o.word)+'</button>'}).join('');if(en)T.speak(w.word)}
function pick(j){if(lock||!opts[j])return;lock=true;var ok=opts[j]===w;T.mark(w,ok);if(ok)score++;
 var b=$('opts').children;b[j].classList.add(ok?'good':'bad');b[opts.indexOf(w)].classList.add('good');
 $('fb').textContent=(ok?'✓ Đúng! ':'✗ Đáp án: '+(en?w.vi:w.word)+'. ')+(w.example||'');$('next').hidden=false;$('next').textContent=idx+1>=qs.length?'Xem kết quả':'Câu tiếp →'}
function next(){if(!lock)return;idx++;if(idx>=qs.length){$('bar').style.width='100%';$('qa').hidden=true;$('res').hidden=false;$('score').textContent='Đúng '+score+' / '+qs.length+' ('+Math.round(score*100/qs.length)+'%)'}else ask()}
$('opts').onclick=function(e){if(e.target.dataset.j)pick(+e.target.dataset.j)};$('next').onclick=next;$('again').onclick=start;$('n').onchange=$('dir').onchange=start;
document.addEventListener('keydown',function(e){if(e.target.tagName==='SELECT')return;if(/^[1-4]$/.test(e.key))pick(+e.key-1);else if(e.key==='Enter'||e.code==='Space'){e.preventDefault();next()}});
start()})})();
