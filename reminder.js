/* "Sharannya's Short MV" button: loader, film collage, record player and song */
var AUD=null,remT=null;
function polyEdge(){var t=[],b=[],x;for(x=0;x<=100;x+=3)t.push(x+'% '+(10+Math.random()*16)+'%');for(x=100;x>=0;x-=3)b.push(x+'% '+(74+Math.random()*18)+'%');return 'polygon('+t.concat(b).join(',')+')'}
function polyTag(){var l=[],r=[],y;for(y=0;y<=100;y+=4)r.push((97+Math.random()*3)+'% '+y+'%');for(y=100;y>=0;y-=4)l.push((Math.random()*3)+'% '+y+'%');return 'polygon('+r.concat(l).join(',')+')'}
var SP=(function(){var p=[];for(var i=0;i<10;i++){var r=i%2?20:46,a=-Math.PI/2+i*Math.PI/5;p.push((Math.cos(a)*r).toFixed(1)+','+(Math.sin(a)*r).toFixed(1))}return p.join(' ')})();
function star(sz){var C=[['#f6f3ec','#222'],['#a63a3a','#fff'],['#a07a2a','#fff'],['#9a9a9a','#222']],c=C[Math.floor(Math.random()*4)],d='';for(var i=0;i<9;i++){var a=Math.random()*6.28,r=Math.random()*22;d+='<circle cx="'+(Math.cos(a)*r).toFixed(1)+'" cy="'+(Math.sin(a)*r).toFixed(1)+'" r="2.4" fill="'+c[1]+'"/>'}return '<svg width="'+sz+'" height="'+sz+'" viewBox="-50 -50 100 100" style="filter:drop-shadow(0 3px 4px rgba(0,0,0,.45))"><polygon points="'+SP+'" fill="'+c[0]+'" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>'+d+'</svg>'}
function openRem(){
 if(document.getElementById("remScr"))return;showBack(true);
 if(!AUD){AUD=new Audio(ALF);AUD.loop=true}
 var s=document.createElement("div");s.id="remScr";
 document.body.appendChild(s);
 showFilm();
 requestAnimationFrame(function(){requestAnimationFrame(function(){s.style.opacity=1})});
}
function showFilm(){
 var s=document.getElementById("remScr");if(!s)return;
 s.style.backgroundImage="none";s.style.background="#0e0b0d";
 s.innerHTML='<div class="rw" id="rw"><div class="rs" id="rs"></div><div class="rg"></div><div class="rv"></div><div class="rtw"><div class="rtag" id="rtag" style="font-size:36px">Happy Diwali Sharu ♡</div><i class="tp a"></i><i class="tp b"></i></div><div class="rh" id="rh">tap the record ♪</div><div class="rd" id="rd"><b><u>alfaaz</u></b></div></div>';
 var rw=document.getElementById("rw"),W=rw.clientWidth,PH=Math.round(W*.92),ord=[1,2,9,3,6,0,4,10,5,7,11,8],h='';
 for(var rep=0;rep<2;rep++)for(var i=0;i<ord.length;i++){
  h+='<div class="rp"><img src="'+RP[ord[i]]+'" alt=""><div class="rtw2"><div class="rt" style="clip-path:'+polyEdge()+'"></div></div>';
  for(var k=0;k<2;k++)h+='<span class="st" style="left:'+(Math.random()*78+2)+'%;top:'+(Math.random()*70+8)+'%;transform:rotate('+(Math.random()*50-25)+'deg)">'+star(38+Math.random()*34)+'</span>';
  for(k=0;k<8;k++)h+='<span class="sp" style="left:'+Math.random()*96+'%;top:'+Math.random()*96+'%;font-size:'+(8+Math.random()*10)+'px">✦</span>';
  h+='</div>'}
 var rs=document.getElementById("rs");rs.innerHTML=h;rs.style.animationDuration=(ord.length*PH/46)+'s';
 document.getElementById("rtag").style.clipPath=polyTag();
 startFireworks(rw);
 var rd=document.getElementById("rd"),rh=document.getElementById("rh");
 AUD.currentTime=0;AUD.muted=false;var p=AUD.play();
 if(p&&p.catch)p.catch(function(){rd.classList.add("paused");rh.classList.add("on")});
 rd.onclick=function(){rh.classList.remove("on");if(AUD.paused){AUD.play();rd.classList.remove("paused")}else{AUD.pause();rd.classList.add("paused")}}}
function remFit(){var rs=document.getElementById("rs"),rw=document.getElementById("rw");if(rs&&rw)rs.style.animationDuration=(12*rw.clientWidth*.92/46)+"s"}window.addEventListener("resize",remFit);
document.getElementById("surp").onclick=openRem;
