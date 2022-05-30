const playOrStop = document.querySelectorAll(".btn")
const btn_play = document.querySelector(".btn-play")
const timer = document.querySelector(".timer")
const blobs_box = document.querySelector(".blobs")

let allowed_click = false

let second = 0
let mili_second = 0
let counter = 1

let timer_second;
let timer_m_second;

playOrStop.forEach(btn => {
    btn.addEventListener("click", (event) => {
        const record = event.target.classList.contains('btn-record');


        if (record) {
            allowed_click = true;

            blobs_box.innerHTML = ''
            counter = 1


            timer_second = setInterval(second_plus, 1000, btn, event, record)
            timer_m_second = setInterval(mili_second_plus, 10)
            changeStyle(btn, event, record)
        } else {
            changeStyle(btn, event, record);
            clearInterval(timer_m_second)
            clearInterval(timer_second)
            allowed_click = false;
            
            timer.innerHTML = ' '
            second = 0
            mili_second = 0
        }
    })
})

function changeStyle(btn, element, record) {
    btn.classList.toggle("hidden");
    if (record) element.target.nextElementSibling.classList.toggle('hidden');
    else element.target.previousElementSibling.classList.toggle('hidden');
}

function mili_second_plus() {
    mili_second === 60 ? mili_second = 0 : mili_second++
    timer.innerHTML = `<span class="text-slate-200 drop-shadow-xl text-xl">${second}:${mili_second}</span>`
}

function second_plus(btn, event, record) {
    if (second === 60) {
        changeStyle(btn, event, record)

        clearInterval(timer_m_second)
        clearInterval(timer_second)
    } else {
        second++
    }
}

function setPosition() {
    window.addEventListener("click", (event) => {
        const record = event.target.classList.contains('btn-record');
        const stop = event.target.classList.contains('btn-stop');
        if (allowed_click) {
            if (!record && !stop) {
                create_blob(event.pageX , event.pageY)
            }
        }
    })
}

setPosition();

function create_blob(x , y) {
    const classList = ['blob','bg-red-400', 'shadow-2xl' , 'text-white' , 'text-sm' , 'px-[0.9rem]', 'py-2', 'inline-block', 'm-2', 'rounded-full', 'absolute' , 'opacity-0' , 'z-20']
    const blob = document.createElement("span");

    blob.classList.add(...classList)
    blob.innerHTML = counter++
    blob.style.left = `${x}px`
    blob.style.top = `${y}px` 
    blobs_box.appendChild(blob);
}



btn_play.addEventListener("click", () => {
    if (allowed_click == false) show_blobs()
})

function show_blobs () {
    const blobs = document.querySelectorAll('.blob')

    let i = 0

    while (i < blobs.length) {
        add_animation_opacity(i)
        i++
    }

    function add_animation_opacity (i){
        setTimeout(() => {
            blobs[i].classList.add('opacity-100')
            blobs[i].classList.add('opacity-class')
        },500 * i)
    }
}