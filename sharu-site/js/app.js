/* Main page logic: landing, code screen, lily bloom, home page, back button */
var entered="",busy=false;
var pad=document.getElementById("pad"),dots=document.querySelectorAll(".dot"),dwrap=document.getElementById("dots");
var keys=["1","2","3","4","5","6","7","8","9","","0","⌫"];
keys.forEach(function(k){var b=document.createElement("button");b.className="key"+(k===""?" ghost":"");b.textContent=k;if(k)b.onclick=function(){press(k)};pad.appendChild(b)});
document.addEventListener("keydown",function(e){if(!document.getElementById("login").classList.contains("out")&&document.getElementById("landing").classList.contains("out")){if(/^\d$/.test(e.key))press(e.key);if(e.key==="Backspace")press("⌫")}});
function render(){dots.forEach(function(d,i){d.classList.toggle("on",i<entered.length)})}
function press(k){
  if(busy)return;
  if(k==="⌫"){entered=entered.slice(0,-1);render();return}
  if(entered.length>=3)return;
  entered+=k;render();
  if(entered.length===3){busy=true;setTimeout(check,260)}
}
function check(){
  if(entered===PASSCODE){bloom()}
  else{dwrap.classList.add("shake");if(navigator.vibrate)navigator.vibrate(200);
    setTimeout(function(){dwrap.classList.remove("shake");entered="";render();busy=false},550)}
}

function lily(size){var i=new Image();i.src=CROPS[Math.floor(Math.random()*CROPS.length)];i.width=size;i.height=size;i.draggable=false;return i}
function bloom(){showBack(false);
  document.getElementById("login").classList.add("out");
  var B=document.getElementById("bloom");B.style.display="flex";B.innerHTML="";
  var W=innerWidth,H=innerHeight,cx=W/2,cy=H/2,maxD=Math.hypot(cx,cy);
  var g=document.createElement("div");g.className="glow";B.appendChild(g);var h=lily(260);h.className="bl hero";h.style.left=cx+"px";h.style.top=cy+"px";B.appendChild(h);
  var list=[];
  for(var i=0;i<70;i++){list.push({x:Math.random()*W,y:Math.random()*H})}
  // also a ring grid so the screen fills fully
  var step=Math.max(W,H)/6;
  for(var x=0;x<=W+step;x+=step)for(var y=0;y<=H+step;y+=step)list.push({x:x+(Math.random()-.5)*step*.5,y:y+(Math.random()-.5)*step*.5});
  list.forEach(function(p){
    var d=Math.hypot(p.x-cx,p.y-cy),size=90+Math.random()*130,e=lily(size);
    e.className="bl";e.style.left=p.x+"px";e.style.top=p.y+"px";
    e.style.setProperty("--r",(Math.random()*120-60)+"deg");
    e.style.animationDelay=(1.2+(d/maxD)*1.8+Math.random()*.2)+"s";
    B.appendChild(e)});
  var t=document.createElement("div");t.className="ily script";t.style.fontSize="0";B.appendChild(t);
  setTimeout(function(){B.classList.add("veil")},2600);
  setTimeout(function(){
    document.getElementById("login").style.display="none";
    var H=document.getElementById("home");H.classList.add("show");startHome();showBack(true);
    B.classList.add("fade");setTimeout(function(){B.style.display="none"},1000)},3700);
}
(function(){var P="M0 0C-9-6-20-20-16-33C-13-42-4-47 0-52C4-47 13-42 16-33C20-20 9-6 0 0Z";
function pet(r,s){var sp="";for(var i=0;i<18;i++){var y=-(8+Math.random()*28),w=Math.abs(y)*.3,x=(Math.random()*2-1)*Math.min(11,w);sp+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(.5+Math.random()*.9).toFixed(1)+'"/>'}
return '<g transform="rotate('+r+') scale('+s+')"><path d="'+P+'" fill="url(#rpg)"/><path d="M0-3C-4-15-3.5-36 0-48C3.5-36 4-15 0-3Z" fill="url(#rst)"/><path d="M0-6V-44" stroke="#fff" stroke-opacity=".45" stroke-width=".7"/><g fill="#7d0b47" fill-opacity=".72">'+sp+'</g><path d="'+P+'" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.1"/></g>'}
var st="";for(var k=0;k<6;k++){var a=k*60+15,r=a*Math.PI/180,ex=Math.sin(r)*30,ey=-Math.cos(r)*30,cx=Math.sin(r)*14,cy=-Math.cos(r)*14-3;
st+='<path d="M0 0Q'+cx.toFixed(1)+' '+cy.toFixed(1)+' '+ex.toFixed(1)+' '+ey.toFixed(1)+'" stroke="#f3ecc3" stroke-width="1.3" fill="none"/><g transform="rotate('+(a-90)+' '+ex.toFixed(1)+' '+ey.toFixed(1)+')"><ellipse cx="'+ex.toFixed(1)+'" cy="'+ey.toFixed(1)+'" rx="4.2" ry="1.7" fill="#7a3510"/><ellipse cx="'+ex.toFixed(1)+'" cy="'+(ey-.5).toFixed(1)+'" rx="3" ry=".7" fill="#e08a2e" fill-opacity=".8"/></g>'}
var g='<linearGradient id="rpg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#b9d35a"/><stop offset=".09" stop-color="#fff0a6"/><stop offset=".25" stop-color="#ff4d9a"/><stop offset=".6" stop-color="#ff86b8"/><stop offset="1" stop-color="#ffe3ee"/></linearGradient><linearGradient id="rst" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#b3125f" stop-opacity=".85"/><stop offset="1" stop-color="#ff4d9a" stop-opacity="0"/></linearGradient><radialGradient id="rth"><stop offset="0" stop-color="#eef585"/><stop offset="1" stop-color="#b9d35a" stop-opacity="0"/></radialGradient>';
document.querySelector("svg defs").insertAdjacentHTML("beforeend",g+'<symbol id="rlily" viewBox="-60 -60 120 120">'+pet(0,1)+pet(120,1)+pet(240,1)+pet(60,.92)+pet(180,.92)+pet(300,.92)+'<circle r="8" fill="url(#rth)"/>'+st+'<path d="M0 0Q2-20 5-38" stroke="#e4efb0" stroke-width="1.6" fill="none"/><circle cx="5" cy="-38" r="2.6" fill="#c9e060"/></symbol>')})();
// drifting lilies in background
var dr=document.getElementById("drift");
for(var i=0;i<16;i++){var d=lily(24+Math.random()*40);d.setAttribute("class","drift");
  d.style.left=Math.random()*100+"%";d.style.setProperty("--dx",(Math.random()*160-80)+"px");d.style.setProperty("--rot",(Math.random()*360)+"deg");
  d.style.animationDuration=(12+Math.random()*14)+"s";d.style.animationDelay=(-Math.random()*20)+"s";dr.appendChild(d)}
for(var j=0;j<40;j++){var s=document.createElement("i");s.className="tw";s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";s.style.animationDelay=(Math.random()*3)+"s";s.style.animationDuration=(2+Math.random()*3)+"s";dr.appendChild(s)}

function startHome(){var nm=document.getElementById("nm");nm.innerHTML="";var n=0;
  "I lovee youuu, Sharu".split(" ").forEach(function(w){var W=document.createElement("span");W.className="w";
    Array.from(w).forEach(function(c){var s=document.createElement("span");s.textContent=c;s.style.animationDelay=(1.3+n*.09)+"s";n++;W.appendChild(s)});
    nm.appendChild(W);nm.appendChild(document.createTextNode(" "))});
  var mq=document.getElementById("mq");if(mq.children.length)return;
  for(var r=0;r<3;r++){var row=document.createElement("div");row.className="row";var tr=document.createElement("div");tr.className="track";tr.style.animationDuration=(55+r*12)+"s";if(r==1)tr.style.animationDirection="reverse";
    for(var i=0;i<12;i++){var im=new Image();im.src=GAL[(r*12+i)%GAL.length];im.alt="lily";im.draggable=false;tr.appendChild(im)}
    Array.from(tr.children).forEach(function(c){tr.appendChild(c.cloneNode())});row.appendChild(tr);mq.appendChild(row)}
}
document.getElementById("lb").onclick=function(e){
  for(var i=0;i<18;i++){(function(i){setTimeout(function(){
    var h=document.createElement("div");h.className="fh";h.textContent=["💗","💖","🌸","💕","🤍"][i%5];
    h.style.left=(e.clientX+(Math.random()*80-40))+"px";h.style.top=e.clientY+"px";
    h.style.setProperty("--hx",(Math.random()*240-120)+"px");h.style.setProperty("--hr",(Math.random()*80-40)+"deg");
    document.body.appendChild(h);setTimeout(function(){h.remove()},1900)},i*60)})(i)}
};
(function(){var el=document.getElementById("hello"),n=0;
"Hello, Sharannya ♡".split(" ").forEach(function(w){var W=document.createElement("span");W.className="w";
Array.from(w).forEach(function(c){var s=document.createElement("span");s.textContent=c;s.style.animationDelay=(.4+n*.08)+"s";n++;W.appendChild(s)});
el.appendChild(W);el.appendChild(document.createTextNode(" "))});
document.getElementById("goLily").onclick=function(){showBack(true);var L=document.getElementById("landing");L.classList.add("out");setTimeout(function(){L.style.display="none"},950)};
document.getElementById("which").onclick=function(){if(document.getElementById("whichFrame"))return;showBack(true);var f=document.createElement("iframe");f.id="whichFrame";f.title="Which one is it?";f.style.cssText="position:fixed;inset:0;width:100%;height:100%;border:0;z-index:8;opacity:0;transition:opacity .7s;background:#3b1a5a";f.src="which.html";document.body.appendChild(f);requestAnimationFrame(function(){requestAnimationFrame(function(){f.style.opacity=1})})};
})();
function fitHello(){var e=document.getElementById("hello"),c=e.parentNode;if(!c.clientWidth)return;var cs=getComputedStyle(c),av=c.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);e.style.fontSize="54px";var w=e.offsetWidth;if(w>av)e.style.fontSize=Math.floor(54*av/w*.97)+"px"}
fitHello();window.addEventListener("resize",fitHello);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitHello);
(function(){var L=document.getElementById("landing"),g=["♡","✦","♥","✧"];for(var i=0;i<16;i++){var s=document.createElement("span");s.className="lh";s.textContent=g[i%4];s.style.left=(Math.random()*96)+"%";s.style.fontSize=(12+Math.random()*20)+"px";s.style.animationDuration=(9+Math.random()*9)+"s";s.style.animationDelay=(-Math.random()*14)+"s";L.insertBefore(s,L.firstChild)}})();

function showBack(on){document.getElementById("back").classList.toggle("on",on)}
document.getElementById("back").onclick=function(){
["whichFrame","remScr"].forEach(function(k){var f=document.getElementById(k);if(f)f.remove()});clearTimeout(remT);if(AUD){AUD.pause();AUD.currentTime=0}
var B=document.getElementById("bloom");B.style.display="none";B.classList.remove("fade","veil");B.innerHTML="";
document.getElementById("home").classList.remove("show");
entered="";busy=false;render();
var Lg=document.getElementById("login");Lg.style.display="";Lg.classList.remove("out");
var L=document.getElementById("landing");L.style.display="";void L.offsetWidth;L.classList.remove("out");
showBack(false)};
