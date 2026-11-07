var REM_VER="v8-caps";
/* "Sharannya's Short MV" button: loader, film collage, record player and song */
var AUD=null,remT=null;
function polyEdge(){var t=[],b=[],x;for(x=0;x<=100;x+=3)t.push(x+'% '+(10+Math.random()*16)+'%');for(x=100;x>=0;x-=3)b.push(x+'% '+(74+Math.random()*18)+'%');return 'polygon('+t.concat(b).join(',')+')'}
function polyTag(){var l=[],r=[],y;for(y=0;y<=100;y+=4)r.push((97+Math.random()*3)+'% '+y+'%');for(y=100;y>=0;y-=4)l.push((Math.random()*3)+'% '+y+'%');return 'polygon('+r.concat(l).join(',')+')'}
var SP=(function(){var p=[];for(var i=0;i<10;i++){var r=i%2?20:46,a=-Math.PI/2+i*Math.PI/5;p.push((Math.cos(a)*r).toFixed(1)+','+(Math.sin(a)*r).toFixed(1))}return p.join(' ')})();
function star(sz){var C=[['#f6f3ec','#222'],['#a63a3a','#fff'],['#a07a2a','#fff'],['#9a9a9a','#222']],c=C[Math.floor(Math.random()*4)],d='';for(var i=0;i<9;i++){var a=Math.random()*6.28,r=Math.random()*22;d+='<circle cx="'+(Math.cos(a)*r).toFixed(1)+'" cy="'+(Math.sin(a)*r).toFixed(1)+'" r="2.4" fill="'+c[1]+'"/>'}return '<svg width="'+sz+'" height="'+sz+'" viewBox="-50 -50 100 100" style="filter:drop-shadow(0 3px 4px rgba(0,0,0,.45))"><polygon points="'+SP+'" fill="'+c[0]+'" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>'+d+'</svg>'}
function openRem(){
 try{
  if(document.getElementById("remScr"))return;
  showBack(true);
  if(!AUD){AUD=new Audio(ALF);AUD.loop=true}
  var s=document.createElement("div");s.id="remScr";s.style.opacity=1;
  document.body.appendChild(s);
  showFilm();
 }catch(e){
  var d=document.createElement("div");
  d.style.cssText="position:fixed;left:10px;right:10px;bottom:10px;z-index:99;background:#fff;color:#b00020;padding:14px;border-radius:12px;font:14px/1.4 monospace;word-break:break-word";
  d.textContent="Error: "+(e&&e.message)+"  (take a screenshot of this and send it)";
  document.body.appendChild(d);
 }
}
function showFilm(){
 var s=document.getElementById("remScr");if(!s)return;
 s.style.backgroundImage="none";s.style.background="#0e0b0d";
 s.innerHTML='<div class="rw" id="rw"><div class="rs" id="rs"></div><div class="rg"></div><div class="rv"></div><div class="rtw"><div class="rtag" id="rtag" style="font-size:36px">Happy Diwali Sharu ♡</div><i class="tp a"></i><i class="tp b"></i><span class="dw-tw" style="left:-22px;top:46%">✦</span><span class="dw-tw" style="right:-20px;top:20%;animation-delay:.6s">✦</span><span class="dw-tw" style="left:14%;top:-22px;animation-delay:1.1s">✦</span><span class="dw-tw" style="right:12%;bottom:-22px;animation-delay:.3s">✦</span></div><div class="rh" id="rh">tap the record ♪</div><div class="rd" id="rd"><b><u>alfaaz</u></b></div></div>';
 var rw=document.getElementById("rw"),W=rw.clientWidth,PH=Math.round(W*.92),ord=[1,2,9,3,6,0,4,10,5,7,11,8],h='';
 for(var rep=0;rep<2;rep++)for(var i=0;i<ord.length;i++){
  h+='<div class="rp"><img src="'+RP[ord[i]]+'" alt=""><div class="rtw2"><div class="rt" style="clip-path:'+polyEdge()+'"></div></div>';
  for(var k=0;k<2;k++)h+='<span class="st" style="left:'+(Math.random()*78+2)+'%;top:'+(Math.random()*70+8)+'%;transform:rotate('+(Math.random()*50-25)+'deg)">'+star(38+Math.random()*34)+'</span>';
  for(k=0;k<8;k++)h+='<span class="sp" style="left:'+Math.random()*96+'%;top:'+Math.random()*96+'%;font-size:'+(8+Math.random()*10)+'px">✦</span>';
  h+='</div>'}
 var rs=document.getElementById("rs");rs.innerHTML=h;rs.style.animationDuration=(ord.length*PH/46)+'s';
 document.getElementById("rtag").style.clipPath=polyTag();
 diwaliFX(rw);
 startFireworks(rw);
 var rd=document.getElementById("rd"),rh=document.getElementById("rh");
 AUD.currentTime=0;AUD.muted=false;var p=AUD.play();
 if(p&&p.catch)p.catch(function(){rd.classList.add("paused");rh.classList.add("on")});
 rd.onclick=function(){rh.classList.remove("on");if(AUD.paused){AUD.play();rd.classList.remove("paused")}else{AUD.pause();rd.classList.add("paused")}}}
function remFit(){var rs=document.getElementById("rs"),rw=document.getElementById("rw");if(rs&&rw)rs.style.animationDuration=(12*rw.clientWidth*.92/46)+"s"}window.addEventListener("resize",remFit);
document.getElementById("surp").onclick=openRem;

/* Diwali effects and fireworks */
function diwaliFX(rw){
 if(!document.getElementById("dwcss")){
  var st=document.createElement("style");st.id="dwcss";
  st.textContent=[
  ".dw-fx{position:absolute;inset:0;pointer-events:none;z-index:7;overflow:hidden}",
  ".dw-glow{position:absolute;inset:0;mix-blend-mode:screen;background:radial-gradient(ellipse at 50% 108%,rgba(255,160,50,.45),transparent 58%),radial-gradient(ellipse at 50% -8%,rgba(255,110,40,.22),transparent 55%);animation:dwg 4.5s ease-in-out infinite}",
  "@keyframes dwg{50%{opacity:.6}}",
  ".dw-ln{position:absolute;bottom:-90px;animation:dwup linear infinite}",
  "@keyframes dwup{to{transform:translateY(-125vh)}}",
  ".dw-ln i{display:block;border-radius:30% 30% 40% 40%;background:linear-gradient(#ffe9a8,#ffb347 55%,#ff7a3d);box-shadow:0 0 22px 8px rgba(255,170,70,.55);animation:dwsw 4s ease-in-out infinite alternate}",
  "@keyframes dwsw{from{transform:translateX(-12px) rotate(-5deg)}to{transform:translateX(12px) rotate(5deg)}}",
  ".dw-pt{position:absolute;top:-24px;animation:dwfall linear infinite;opacity:.92}",
  "@keyframes dwfall{to{transform:translate3d(var(--dx),115vh,0) rotate(var(--rt))}}",
  ".dw-b{animation:dwb 1.6s ease-in-out infinite}@keyframes dwb{0%,100%{opacity:1}50%{opacity:.3}}",
  ".dw-dy{position:absolute;bottom:calc(16px + env(safe-area-inset-bottom,0px));width:15%;max-width:64px}",
  ".dw-fl{transform-origin:30px 24px;animation:dwf .8s ease-in-out infinite alternate}",
  "@keyframes dwf{from{transform:scale(1,1) rotate(-3deg)}to{transform:scale(.92,1.14) rotate(3deg)}}",
  ".dw-gl{animation:dwgl 1.1s ease-in-out infinite alternate}@keyframes dwgl{from{opacity:.5}to{opacity:1}}",
  ".rtag{position:relative;overflow:hidden;color:#5e170d;animation:dwpop 1.3s cubic-bezier(.2,1.4,.4,1) .3s both,dwpl 4s ease-in-out 1.8s infinite}",
  "@keyframes dwpop{from{transform:scale(.3) rotate(-8deg);opacity:0}}@keyframes dwpl{50%{transform:scale(1.035)}}",
  ".rtag::after{content:'';position:absolute;top:0;bottom:0;width:55%;left:-80%;background:linear-gradient(100deg,transparent,rgba(255,205,110,.6),transparent);animation:dwsh 4.5s ease-in-out 2s infinite}",
  "@keyframes dwsh{to{left:130%}}",
  ".dw-tw{position:absolute;color:#ffd27a;text-shadow:0 0 8px #ff9a3c;font-size:18px;animation:dwt 1.8s ease-in-out infinite}",
  ".dw-fr{position:absolute;inset:0;border:34px solid rgba(28,10,12,.55);box-shadow:inset 0 0 0 2px rgba(255,214,140,.8),inset 0 0 20px rgba(255,170,60,.4)}",
  ".dw-fr::before{content:'';position:absolute;inset:3px;border:1px solid rgba(255,214,140,.55)}",
  ".dw-bd{position:absolute;overflow:hidden;color:#ffe9b8;font:700 21px/34px 'Caveat','Segoe Script',cursive;text-shadow:0 0 8px rgba(255,170,60,.9)}",
  ".dw-t{top:0;left:34px;right:34px;height:34px}.dw-b{bottom:0;left:34px;right:34px;height:34px}",
  ".dw-r{right:0;top:34px;bottom:34px;width:34px}.dw-l{left:0;top:34px;bottom:34px;width:34px;transform:rotate(180deg)}",
  ".dw-tk{display:flex;white-space:nowrap}.dw-tk span{padding-inline:14px;letter-spacing:.08em}",
  ".dw-hz{width:max-content;height:34px;animation:dwmh 40s linear infinite}.dw-b .dw-hz{animation-direction:reverse}",
  ".dw-vt{writing-mode:vertical-rl;width:34px;height:max-content;animation:dwmv 40s linear infinite}",
  "@keyframes dwmh{from{transform:translateX(-50%)}to{transform:translateX(0)}}@keyframes dwmv{from{transform:translateY(-50%)}to{transform:translateY(0)}}",
  ".dw-cn{position:absolute;width:34px;height:34px;display:flex;align-items:center;justify-content:center;color:#ffd27a;font-size:20px;text-shadow:0 0 10px #ff9a3c;animation:dwt 2s ease-in-out infinite}",
  ".rd{right:46px;bottom:calc(46px + env(safe-area-inset-bottom,0px))}.rh{right:30px;bottom:152px}",
  "@keyframes dwt{0%,100%{opacity:.2;transform:scale(.6)}50%{opacity:1;transform:scale(1.25)}}"
  ].join("\n");
  document.head.appendChild(st)}
 var W=rw.clientWidth||390,h='',i,r=Math.random;
 h+='<div class="dw-glow"></div>';
 for(i=0;i<7;i++){var sz=26+r()*22;h+='<div class="dw-ln" style="left:'+(r()*88)+'%;animation-duration:'+(16+r()*12)+'s;animation-delay:-'+(r()*20)+'s;opacity:'+(.55+r()*.4)+'"><i style="width:'+sz+'px;height:'+sz*1.25+'px;animation-delay:-'+(r()*4)+'s"></i></div>'}
 var pc=['#ffb703','#fb8500','#ff5d3a','#ffd166','#ff8fab'];
 for(i=0;i<20;i++){var ps=9+r()*9;h+='<i class="dw-pt" style="left:'+(r()*100)+'%;width:'+ps+'px;height:'+ps*1.3+'px;background:'+pc[i%5]+';border-radius:60% 0 60% 0;--dx:'+(r()*120-60)+'px;--rt:'+(r()*720-360)+'deg;animation-duration:'+(7+r()*8)+'s;animation-delay:-'+(r()*14)+'s"></i>'}
 var lc=['#ffd166','#ff8c42','#ff6b9d','#fff3b0','#ff5d3a'],sw=4,bulbs='',wire='';
 for(var s=0;s<sw;s++){var x0=W*s/sw,x1=W*(s+1)/sw,cx=(x0+x1)/2;wire+='M'+x0+' 4Q'+cx+' 62 '+x1+' 4 ';
  for(var k=1;k<=4;k++){var t=k/5,bx=(1-t)*(1-t)*x0+2*(1-t)*t*cx+t*t*x1,by=(1-t)*(1-t)*4+2*(1-t)*t*62+t*t*4,c=lc[(s*4+k)%5];
   bulbs+='<circle class="dw-b" cx="'+bx.toFixed(1)+'" cy="'+(by+5).toFixed(1)+'" r="5" fill="'+c+'" style="filter:drop-shadow(0 0 5px '+c+');animation-delay:'+((s*4+k)*.23%1.6).toFixed(2)+'s"/>'}}
 h+='<svg style="position:absolute;left:0;top:34px;width:100%;height:80px" viewBox="0 0 '+W+' 80"><path d="'+wire+'" fill="none" stroke="#4a3626" stroke-width="1.6"/>'+bulbs+'</svg>';
 h+='<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="dwb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9743a"/><stop offset="1" stop-color="#7a2c10"/></linearGradient><linearGradient id="dwf" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff7a18"/><stop offset=".6" stop-color="#ffc13b"/><stop offset="1" stop-color="#fff2a8"/></linearGradient><radialGradient id="dwgl"><stop offset="0" stop-color="#ffcf66" stop-opacity=".85"/><stop offset="1" stop-color="#ff8a1f" stop-opacity="0"/></radialGradient></defs></svg>';
 var ph='<span>I LOVE YOU ☆</span>',row='';for(i=0;i<16;i++)row+=ph;row+=row;
 h+='<div class="dw-fr"></div><div class="dw-bd dw-t"><div class="dw-tk dw-hz">'+row+'</div></div><div class="dw-bd dw-b"><div class="dw-tk dw-hz">'+row+'</div></div><div class="dw-bd dw-r"><div class="dw-tk dw-vt">'+row+'</div></div><div class="dw-bd dw-l"><div class="dw-tk dw-vt">'+row+'</div></div>';
 h+='<i class="dw-cn" style="left:0;top:0">☆</i><i class="dw-cn" style="right:0;top:0;animation-delay:.5s">☆</i><i class="dw-cn" style="left:0;bottom:0;animation-delay:1s">☆</i><i class="dw-cn" style="right:0;bottom:0;animation-delay:1.5s">☆</i>';
 var box=document.createElement("div");box.className="dw-fx";box.innerHTML=h;rw.appendChild(box)}

function startFireworks(host){
 var cv=document.createElement("canvas");
 cv.style.cssText="position:absolute;inset:0;width:100%;height:100%;z-index:7;pointer-events:none";
 host.appendChild(cv);
 var cx=cv.getContext("2d"),W=0,H=0,D=Math.min(window.devicePixelRatio||1,2),rockets=[],sparks=[],next=0,finale=0;
 function fit(){W=host.clientWidth;H=host.clientHeight;cv.width=W*D;cv.height=H*D;cx.setTransform(D,0,0,D,0,0)}
 fit();window.addEventListener("resize",fit);
 var HUES=[8,22,38,48,330,350,190,280,120];
 function launch(x,ty,type){rockets.push({x:x,y:H,ty:ty,type:type,vy:7+Math.random()*1.5,vx:(Math.random()-.5)*.4,h:HUES[Math.floor(Math.random()*HUES.length)]})}
 function rnd(){var r=Math.random();return r<.42?"s":r<.58?"r":r<.78?"h":"w"}
 function boom(x,y,h,type){
  type=type||rnd();var i,a,s,n;
  if(type=="h"){for(i=0;i<72;i++){a=i/72*6.283;sparks.push({x:x,y:y,vx:16*Math.pow(Math.sin(a),3)*.17,vy:-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))*.17,life:1,dec:.011,r:2,h:335+Math.random()*25,g:.012})}return}
  if(type=="w"){for(i=0;i<100;i++){a=Math.random()*6.283;s=Math.random()*3.8+.6;sparks.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,dec:.004+Math.random()*.004,r:1.2,h:40+Math.random()*8,g:.065})}return}
  n=70+Math.floor(Math.random()*50);var h2=(h+40+Math.random()*60)%360,ring=type=="r";
  for(i=0;i<n;i++){a=Math.random()*6.283;s=ring?3.6:Math.random()*4.4+.8;sparks.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,dec:.009+Math.random()*.012,r:1.2+Math.random()*1.6,h:i%4?h:h2,g:.045})}}
 function tick(t){
  if(!cv.isConnected){window.removeEventListener("resize",fit);return}
  cx.globalCompositeOperation="destination-out";cx.fillStyle="rgba(0,0,0,.2)";cx.fillRect(0,0,W,H);
  cx.globalCompositeOperation="lighter";
  if(!finale)finale=t+8000;
  if(t>finale){for(var k=0;k<7;k++)(function(k){setTimeout(function(){launch(W*(.1+k*.13),H*(.1+Math.random()*.3),k%2?"h":null)},k*220)})(k);finale=t+14000}
  if(t>next){launch(W*(.15+Math.random()*.7),H*(.1+Math.random()*.35));if(Math.random()<.4)launch(W*(.15+Math.random()*.7),H*(.1+Math.random()*.35));next=t+650+Math.random()*800}
  var i;
  for(i=rockets.length-1;i>=0;i--){
   var r=rockets[i];r.y-=r.vy;r.x+=r.vx;
   cx.fillStyle="hsl("+r.h+",100%,75%)";cx.beginPath();cx.arc(r.x,r.y,2,0,6.283);cx.fill();
   if(r.y<=r.ty){boom(r.x,r.y,r.h,r.type);rockets.splice(i,1)}}
  for(i=sparks.length-1;i>=0;i--){
   var p=sparks[i];p.vx*=.985;p.vy=p.vy*.985+p.g;p.x+=p.vx;p.y+=p.vy;p.life-=p.dec;
   if(p.life<=0){sparks.splice(i,1);continue}
   cx.globalAlpha=p.life;cx.fillStyle="hsl("+p.h+",100%,"+(55+p.life*20)+"%)";cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill()}
  cx.globalAlpha=1;requestAnimationFrame(tick)}
 host.addEventListener("pointerdown",function(e){
  if(e.target.closest&&e.target.closest(".rd"))return;
  var b=host.getBoundingClientRect();launch(e.clientX-b.left,e.clientY-b.top)});
 setTimeout(function(){launch(W*.3,H*.25,"h");launch(W*.7,H*.22,"h")},500);
 requestAnimationFrame(tick)}
