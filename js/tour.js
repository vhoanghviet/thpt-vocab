/* Tutorial 3 lần mở web hiện 1 lần (lần 1, 4, 7...) + nút ❓ xem lại */
(function(){
var L=localStorage,SS=sessionStorage,$=function(s){return document.querySelector(s)};
try{if(!SS.getItem('thpt:v')){SS.setItem('thpt:v',1);var n=(+L.getItem('thpt:visits')||0)+1;L.setItem('thpt:visits',n);if((n-1)%3===0)L.setItem('thpt:tour',1)}}catch(e){}
if(!$('#card'))return;
var S=[
{s:'#card',t:'Thẻ từ vựng',x:'Chạm vào thẻ để <b>lật</b> xem nghĩa, IPA và câu ví dụ.',k:'Space'},
{s:'#speak',t:'Nghe phát âm',x:'Nghe giọng đọc tiếng Anh. Bật “Tự đọc” để từ tự phát âm khi hiện ra.',k:'Ctrl / S'},
{s:'#no',t:'Chưa thuộc',x:'Từ này sẽ quay lại ôn <b>sớm</b> trong lịch lặp lại ngắt quãng.',k:'←'},
{s:'#yes',t:'Đã thuộc',x:'Từ được đẩy lùi lịch ôn: 1 → 3 → 7 → 14 → 30 ngày. Đủ mốc là “thuộc”.',k:'→'},
{s:'.toolbar',t:'Tuỳ chọn học',x:'Xáo trộn thứ tự, chỉ học từ chưa thuộc, bật/tắt tự đọc, hoặc học lại từ đầu.',k:'L: đổi chiều'},
{s:'#dir',t:'💡 Mẹo: Dịch ngược',x:'Chọn <b>Việt → Anh</b>: nhìn nghĩa tiếng Việt, <b>tự nhớ và nói/viết từ tiếng Anh</b> trước khi lật thẻ. Đây là cách nhớ lại chủ động, hiệu quả hơn nhiều so với chỉ đọc lại từ.',tip:1}];
var css=document.createElement('style');css.textContent='.tr-ov{position:fixed;inset:0;z-index:9997}.tr-sp{position:fixed;z-index:9998;border-radius:16px;box-shadow:0 0 0 9999px rgba(28,22,14,.74);transition:all .5s cubic-bezier(.3,.8,.2,1);pointer-events:none}.tr-sp:after{content:"";position:absolute;inset:-5px;border-radius:20px;border:3px solid #ffb703;animation:trp 1.5s ease-out infinite}@keyframes trp{to{transform:scale(1.14);opacity:0}}@keyframes tri{from{opacity:0;transform:translateY(12px) scale(.96)}}.tr-tip{position:fixed;z-index:9999;width:min(340px,calc(100vw - 24px));background:#fffdf6;color:#33302a;border:2px solid #33302a;border-radius:18px;padding:18px 18px 14px;box-shadow:5px 6px 0 rgba(0,0,0,.25);animation:tri .4s cubic-bezier(.3,.8,.2,1);font:15px/1.55 "Be Vietnam Pro",system-ui,sans-serif}.tr-tip.tip{background:linear-gradient(135deg,#fff3d6,#ffe2da)}.tr-tip h3{margin:0 0 6px;font:400 24px "Patrick Hand",cursive}.tr-tip p{margin:0 0 10px}.tr-k{display:inline-block;margin-bottom:10px;padding:1px 9px;border-radius:99px;background:#33302a;color:#fff;font-size:12px}.tr-row{display:flex;align-items:center;gap:6px}.tr-dots{flex:1;display:flex;gap:5px}.tr-dots i{width:8px;height:8px;border-radius:9px;background:#e4d8bb;transition:all .3s}.tr-dots i.on{width:22px;background:#d9573f}.tr-tip button{font:600 13px inherit;font-family:inherit;padding:7px 12px;border-radius:9px;border:2px solid #33302a;background:#33302a;color:#fff;cursor:pointer}.tr-tip button.g{background:none;color:#33302a;border-color:#e4d8bb}.tr-tip button.p{background:#d9573f;border-color:#d9573f}.tr-help{position:fixed;right:16px;bottom:16px;z-index:50;width:44px;height:44px;border-radius:50%;border:2px solid #33302a;background:#ffb703;font:700 20px sans-serif;cursor:pointer;box-shadow:3px 3px 0 rgba(0,0,0,.2)}';document.head.appendChild(css);
var b=document.createElement('button');b.className='tr-help';b.title='Xem hướng dẫn';b.textContent='?';b.onclick=open;document.body.appendChild(b);
var i,ov,sp,tip;
function open(){if(ov||$('#study').hidden)return;ov=document.createElement('div');ov.className='tr-ov';sp=document.createElement('div');sp.className='tr-sp';tip=document.createElement('div');document.body.append(ov,sp,tip);
 document.addEventListener('keydown',key,true);addEventListener('resize',place);tip.onclick=function(e){var a=e.target.dataset.a;if(a==='n')go(i+1);else if(a==='p')go(i-1);else if(a==='x')close();else if(a==='t'){var d=$('#dir');d.value='vi';d.dispatchEvent(new Event('change'));close()}};go(0)}
function close(){[ov,sp,tip].forEach(function(e){e&&e.remove()});ov=null;L.removeItem('thpt:tour');document.removeEventListener('keydown',key,true);removeEventListener('resize',place);window.scrollTo({top:0,behavior:'smooth'})}
function key(e){e.stopPropagation();e.preventDefault();if(e.key==='Escape')close();else if(e.key==='ArrowRight'||e.key==='Enter')go(i+1);else if(e.key==='ArrowLeft')go(i-1)}
function go(k){if(k<0)return;if(k>=S.length)return close();i=k;var s=S[k];$(s.s).scrollIntoView({block:'center',behavior:'smooth'});
 tip.className='tr-tip'+(s.tip?' tip':'');tip.style.animation='none';void tip.offsetWidth;tip.style.animation='';
 tip.innerHTML=(s.k?'<span class="tr-k">⌨ '+s.k+'</span>':'')+'<h3>'+s.t+'</h3><p>'+s.x+'</p><div class="tr-row"><div class="tr-dots">'+S.map(function(_,j){return '<i class="'+(j===i?'on':'')+'"></i>'}).join('')+'</div>'+(i?'<button class="g" data-a="p">←</button>':'<button class="g" data-a="x">Bỏ qua</button>')+(s.tip?'<button class="g" data-a="x">Để sau</button><button class="p" data-a="t">Thử ngay</button>':'<button class="p" data-a="n">Tiếp →</button>')+'</div>';
 place();setTimeout(place,400)}
function place(){if(!ov)return;var r=$(S[i].s).getBoundingClientRect(),p=8,h=tip.offsetHeight,w=tip.offsetWidth;
 sp.style.cssText='left:'+(r.left-p)+'px;top:'+(r.top-p)+'px;width:'+(r.width+2*p)+'px;height:'+(r.height+2*p)+'px';
 var y=innerHeight-r.bottom>h+24?r.bottom+p+14:r.top>h+24?r.top-p-14-h:innerHeight-h-12,x=Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2));tip.style.left=x+'px';tip.style.top=y+'px'}
var t=0,iv=setInterval(function(){if(++t>25)return clearInterval(iv);if(!$('#app').hidden&&!$('#study').hidden){clearInterval(iv);if(L.getItem('thpt:tour'))setTimeout(open,700)}},200);
})();
