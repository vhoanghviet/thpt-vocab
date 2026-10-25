(function(){var T=THPT,$=function(i){return document.getElementById(i)},q=new URLSearchParams(location.search);
T.scope(q).then(function(s){
if(!s.words.length){$('empty').hidden=false;return}
var all=s.words,deck,i,missed,yes,last=0;$('title').textContent=s.title+' – '+all.length+' từ';$('app').hidden=false;
function side(w,en){return en?'<b class="w">'+T.esc(w.word)+'</b><small>'+T.esc((w.pos||'')+' '+(w.ipa||''))+'</small>':'<b>'+T.esc(w.vi)+'</b>'+(w.example?'<em>'+T.esc(w.example)+'</em>':'')}
function paint(){var w=deck[i],en=$('dir').value==='en';$('front').innerHTML=side(w,en);$('back').innerHTML=side(w,!en)+(en&&w.example?'<em>'+T.esc(w.example)+'</em>':'')}
function say(){if(deck[i])T.speak(deck[i].word)}
function show(){var c=$('card');c.classList.add('noanim');c.classList.remove('flipped');paint();void c.offsetWidth;c.classList.remove('noanim');$('counter').textContent=(i+1)+' / '+deck.length;$('bar').style.width=(i*100/deck.length)+'%';if($('auto').checked&&$('dir').value==='en')say()}
function start(l){deck=l||all.slice();if(!l&&$('only').checked)deck=deck.filter(function(w){return!T.isMastered(T.key(w))});if($('shuf').checked)deck=T.shuffle(deck);i=0;missed=[];yes=0;$('result').hidden=true;
 if(!deck.length){$('study').hidden=true;$('summary').textContent='Bạn đã thuộc hết! Bỏ chọn "Chỉ từ chưa thuộc" để học lại.';$('missBtn').hidden=true;$('result').hidden=false;return}
 $('study').hidden=false;show()}
function flip(){$('card').classList.toggle('flipped');if($('card').classList.contains('flipped')&&$('dir').value==='vi'&&$('auto').checked)say()}
function mark(ok){if($('study').hidden)return;var w=deck[i];T.mark(w,ok);if(ok)yes++;else missed.push(w);i++;if(i>=deck.length){$('bar').style.width='100%';$('study').hidden=true;$('summary').textContent='Đã thuộc '+yes+' · Chưa thuộc '+missed.length+' (trên '+deck.length+' từ).';$('missBtn').hidden=!missed.length;$('result').hidden=false}else show()}
$('card').onclick=flip;$('yes').onclick=function(){mark(1)};$('no').onclick=function(){mark(0)};$('speak').onclick=say;
$('restart').onclick=$('again').onclick=function(){start()};$('missBtn').onclick=function(){start(missed.slice())};
$('dir').onchange=function(){if(!$('study').hidden){$('card').classList.remove('flipped');paint()}};
['shuf','only'].forEach(function(id){$(id).onchange=function(){start()}});
document.addEventListener('keydown',function(e){var a=document.activeElement;if(a&&a.tagName==='BUTTON')a.blur();
 if(e.code==='KeyL'){$('dir').value=$('dir').value==='en'?'vi':'en';$('dir').onchange();return}
 if(e.code==='Space'&&$('study').hidden&&!$('result').hidden){e.preventDefault();var n=Date.now();if(n-last<400&&missed.length){start(missed.slice());last=0}else last=n;return}
 if($('study').hidden)return;
 if(e.key==='Control'||e.code==='KeyS'){e.preventDefault();say()}
 else if(e.code==='Space'){e.preventDefault();flip()}
 else if(e.key==='ArrowLeft'){e.preventDefault();mark(0)}
 else if(e.key==='ArrowRight'){e.preventDefault();mark(1)}});
start()})})();
