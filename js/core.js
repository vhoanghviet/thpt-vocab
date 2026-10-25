(function(){
var D=864e5,L=localStorage,IV=[0,1,3,7,14,30],cache={};
function get(k,d){try{var v=L.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function set(k,v){try{L.setItem(k,JSON.stringify(v))}catch(e){}}
function fmt(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
var srs=get('thpt:srs',{});
var T=window.THPT={get:get,set:set,
add:function(d){d.id=document.currentScript.src.match(/([^\/]+)\.js/)[1];cache[d.id]=d},
key:function(w){return w.word.toLowerCase()},
isMastered:function(k){return !!srs[k]&&srs[k].box>=3},
isDue:function(k){return !!srs[k]&&srs[k].due<=Date.now()},
isNew:function(k){return !srs[k]},
mark:function(w,ok){var k=T.key(w),s=srs[k]||{box:0};s.box=ok?Math.min(5,s.box+1):0;s.due=ok?Date.now()+IV[s.box]*D:Date.now();srs[k]=s;set('thpt:srs',srs);
 var l=get('thpt:log',{}),t=fmt(new Date());l[t]=(l[t]||0)+1;set('thpt:log',l)},
today:function(){return get('thpt:log',{})[fmt(new Date())]||0},
streak:function(){var l=get('thpt:log',{}),d=new Date(),n=0;if(!l[fmt(d)])d.setDate(d.getDate()-1);while(l[fmt(d)]){n++;d.setDate(d.getDate()-1)}return n},
shuffle:function(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a},
esc:function(s){return String(s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})},
hue:function(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%360;return h},
speak:function(t){if(!window.speechSynthesis)return;speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.9;speechSynthesis.speak(u)},
load:function(ids){return Promise.all(ids.map(function(id){return cache[id]?cache[id]:new Promise(function(res){var s=document.createElement('script');s.src='data/decks/'+encodeURIComponent(id)+'.js?v='+Date.now();s.onload=function(){res(cache[id]||{id:id,words:[]})};s.onerror=function(){res({id:id,words:[]})};document.head.appendChild(s)})}))},
scope:function(q){var M=window.THPT_MANIFEST||[],ids,title,dk=q.get('deck'),tp=q.get('topic');
 if(dk){ids=[dk];var m=M.find(function(x){return x.id==dk});title=m?m.title:dk}
 else if(tp){ids=M.filter(function(x){return x.topic==tp}).map(function(x){return x.id});title='Chủ đề: '+tp}
 else{ids=M.filter(function(x){return x.words.some(T.isDue)}).map(function(x){return x.id});title='Ôn tập hôm nay'}
 return T.load(ids).then(function(ds){var seen={},w=[];ds.forEach(function(d){(d.words||[]).forEach(function(x){var k=T.key(x);if(seen[k])return;seen[k]=1;if(!dk&&!tp&&!T.isDue(k))return;w.push(Object.assign({deck:d.id,topic:d.topic},x))})});return{title:title,words:w}})},
fmt:fmt};
})();
