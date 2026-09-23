const gate=document.getElementById('musicGate');
const site=document.getElementById('site');
const audio=document.getElementById('song');
const play=document.getElementById('playSong');
const enter=document.getElementById('enterAnyway');
const progress=document.getElementById('progressWrap');
const bar=document.getElementById('bar');
const state=document.getElementById('audioState');
const time=document.getElementById('audioTime');
let unlocked=false;
function fmt(s){if(!Number.isFinite(s))return '0:00';const m=Math.floor(s/60),sec=String(Math.floor(s%60)).padStart(2,'0');return `${m}:${sec}`}
function unlock(){if(unlocked)return;unlocked=true;gate.classList.add('hide');setTimeout(()=>{gate.style.display='none';site.classList.add('show');document.body.classList.remove('locked');window.scrollTo({top:0,behavior:'instant'});},700)}
play.addEventListener('click',async()=>{progress.classList.add('show');try{if(audio.paused){await audio.play();play.querySelector('span').textContent='❚❚';play.querySelector('b').textContent='Playing “Puwede Ka Ba?”';state.textContent='playing'}else{audio.pause();play.querySelector('span').textContent='▶';play.querySelector('b').textContent='Resume “Puwede Ka Ba?”';state.textContent='paused'}}catch(e){state.textContent='audio file needed';play.querySelector('b').textContent='Add assets/puwede-ka-ba.mp3';}});
audio.addEventListener('timeupdate',()=>{time.textContent=fmt(audio.currentTime);if(audio.duration)bar.style.width=`${audio.currentTime/audio.duration*100}%`});
audio.addEventListener('ended',unlock);enter.addEventListener('click',()=>{audio.pause();unlock()});
