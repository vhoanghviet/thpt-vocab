// Quét data/decks/*.js -> ghi data/manifest.js. Chạy: node tools/build-manifest.js
const fs=require('fs'),vm=require('vm'),path=require('path');
const dir=path.join(__dirname,'..','data','decks'),out=[];
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.js')).sort()){
  let d;try{vm.runInNewContext(fs.readFileSync(path.join(dir,f),'utf8'),{THPT:{add:x=>d=x}})}catch(e){console.error('Lỗi file',f,e.message);continue}
  if(!d||!Array.isArray(d.words)){console.error('Bỏ qua',f);continue}
  const id=f.replace(/\.js$/,'');
  out.push({id,topic:d.topic||'Khác',title:d.title||id,date:d.date||(id.match(/^\d{4}-\d{2}-\d{2}/)||[''])[0],words:d.words.map(w=>String(w.word).toLowerCase())});
}
fs.writeFileSync(path.join(__dirname,'..','data','manifest.js'),'window.THPT_MANIFEST='+JSON.stringify(out)+';\n');
console.log('Manifest:',out.length,'bộ thẻ');
