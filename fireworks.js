/* Fireworks that play over the film screen. Tap anywhere on the screen to launch one. */
function startFireworks(host){
 var cv=document.createElement("canvas");
 cv.style.cssText="position:absolute;inset:0;width:100%;height:100%;z-index:7;pointer-events:none";
 host.appendChild(cv);
 var cx=cv.getContext("2d"),W=0,H=0,D=Math.min(window.devicePixelRatio||1,2),rockets=[],sparks=[],next=0;
 function fit(){W=host.clientWidth;H=host.clientHeight;cv.width=W*D;cv.height=H*D;cx.setTransform(D,0,0,D,0,0)}
 fit();window.addEventListener("resize",fit);
 var HUES=[8,22,38,48,330,350,190,280];
 function launch(x,ty){rockets.push({x:x,y:H,ty:ty,vy:7+Math.random()*1.5,vx:(Math.random()-.5)*.4,h:HUES[Math.floor(Math.random()*HUES.length)]})}
 function boom(x,y,h){
  var n=70+Math.floor(Math.random()*50),h2=(h+40+Math.random()*60)%360,ring=Math.random()<.35;
  for(var i=0;i<n;i++){
   var a=Math.random()*6.283,s=ring?3.6:Math.random()*4.4+.8;
   sparks.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,dec:.009+Math.random()*.012,r:1.2+Math.random()*1.6,h:i%4?h:h2})}}
 function tick(t){
  if(!cv.isConnected){window.removeEventListener("resize",fit);return}
  cx.globalCompositeOperation="destination-out";cx.fillStyle="rgba(0,0,0,.2)";cx.fillRect(0,0,W,H);
  cx.globalCompositeOperation="lighter";
  if(t>next){launch(W*(.15+Math.random()*.7),H*(.1+Math.random()*.35));if(Math.random()<.35)launch(W*(.15+Math.random()*.7),H*(.1+Math.random()*.35));next=t+700+Math.random()*900}
  for(var i=rockets.length-1;i>=0;i--){
   var r=rockets[i];r.y-=r.vy;r.x+=r.vx;
   cx.fillStyle="hsl("+r.h+",100%,75%)";cx.beginPath();cx.arc(r.x,r.y,2,0,6.283);cx.fill();
   if(r.y<=r.ty){boom(r.x,r.y,r.h);rockets.splice(i,1)}}
  for(i=sparks.length-1;i>=0;i--){
   var p=sparks[i];p.vx*=.985;p.vy=p.vy*.985+.045;p.x+=p.vx;p.y+=p.vy;p.life-=p.dec;
   if(p.life<=0){sparks.splice(i,1);continue}
   cx.globalAlpha=p.life;cx.fillStyle="hsl("+p.h+",100%,"+(55+p.life*20)+"%)";cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill()}
  cx.globalAlpha=1;requestAnimationFrame(tick)}
 host.addEventListener("pointerdown",function(e){
  if(e.target.closest&&e.target.closest(".rd"))return;
  var b=host.getBoundingClientRect();launch(e.clientX-b.left,e.clientY-b.top)});
 requestAnimationFrame(tick)}
