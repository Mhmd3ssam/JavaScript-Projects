const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

next.addEventListener('click',()=>{
    currentActive++;

    if(currentActive > circles.length ){
        currentActive = circles.length; 
    }
    
    ubdate();

})

prev.addEventListener('click',()=>{
    currentActive--;

    if(currentActive < 1 ){
        currentActive = 1; 
    }

    ubdate();

})

function ubdate(){
    circles.forEach((circle, indx)=>{
        if(indx < currentActive){
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    })
}