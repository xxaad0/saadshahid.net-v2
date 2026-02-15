


document.addEventListener('DOMContentLoaded',()=>{
    const bubbleUser=document.querySelector('.interactive');
    if(!bubbleUser){
        throw new Error(".interactive element does not exist")
    }
    let currentX=window.innerWidth/2;
    let currentY=window.innerHeight/2;
    let tgX=currentX;
    let tgY=currentY;

      window.addEventListener("mousemove",(event)=>{
            tgX=event.clientX;
            tgY=event.clientY;
            console.log(tgX,tgY);
        });

    function move(){
        currentX+=(tgX-currentX)/20;
        currentY+=(tgY-currentY)/20;
        const wid=bubbleUser.offsetWidth;
        const hei=bubbleUser.offsetHeight;

        bubbleUser.style.transform=
        `translate(${Math.round(currentX - wid /2)}px,${Math.round(currentY - hei /2)}px)`;
        requestAnimationFrame(move);
    }


    move();

      
});


const sb= document.getElementById("sidebar");
const sbbtn= document.getElementById("sidebar-btn");
const sbpanel= document.getElementById("sidebar-panel");

function menuOpen(){
    sb.classList.add('open');
}

function menuClose(){
    sb.classList.remove('open');
}

sbbtn.addEventListener("click",()=>{
    if (sb.classList.contains('open'))menuClose();
    else menuOpen();
});

document.addEventListener("click",(event)=>{
    if(!sb.contains(event.target)) menuClose();
});

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape")menuClose();
});

