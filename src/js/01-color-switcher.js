const startBtnEl=document.querySelector("[data-start]");
const stopBtnEl=document.querySelector ("[data-stop]");
let colorSwitch;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtnEl.addEventListener("click", onStartBtnClick);
stopBtnEl.addEventListener("click", onStopBtnClick);

function onStartBtnClick(){
    colorSwitch = setInterval(()=>{
        document.body.style.backgroundColor=getRandomHexColor();
    },1000);
    startBtnEl.disabled= true;
    stopBtnEl.disabled= false;    
}
function onStopBtnClick() {
    clearInterval(colorSwitch);
    startBtnEl.disabled= false;
    stopBtnEl.disabled= true; 
  }
    
  stopBtnEl.disabled = true;