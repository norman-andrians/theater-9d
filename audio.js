if (screen.width < 640) {
    alert("peringatan:\ntidak disarankan untuk menggunakan perangkat ini");
    alert("palingan suatu saat nanti web ini dijadiin web player pasti dibuati untuk mobile :b")
}

const indexList = document.getElementById('index-list');
const auListCol = document.getElementById('audio-list-col');

const playImg = "./images/play-btn.png";
const pauseImg = "./images/pause-btn.png";

let indexRow = '';
let audioRow = '';

let fullIndex = 0;
let currentIndex = 0;

let isPaused = [];
let audioVol = [];

function playAudio(audioIndex) {
    const soundSrc = document.querySelectorAll('#audio-source')[audioIndex];

    currentIndex = audioIndex;

    soundSrc.src = audioData.source[audioIndex];
    soundSrc.volume = audioVol[audioIndex] / 100;

    if (isPaused[audioIndex] == false) {
        document.querySelectorAll('#au-play-img')[audioIndex].src = pauseImg;
        soundSrc.play();
        isPaused[audioIndex] == true;
    }
    else if (isPaused[audioIndex] == true) {
        document.querySelectorAll('#au-play-img')[audioIndex].src = playImg;
        soundSrc.pause();
        isPaused[audioIndex] == false;
    }
}

function audioList() {
    for (let i = 0; i < audioData.nama.length; i++) {
        const volSlider = document.querySelectorAll('#vol-slider')[i].addEventListener('input', function() {
            const volVal = document.querySelectorAll('#vol-val')[i];
            const soundImg = document.querySelectorAll('#sound-img')[i];
            
            audioVol[i] = Math.floor(this.value);
            volVal.innerHTML = this.value;
            if (this.value <= 0) { soundImg.src = './images/sound-off.png' }
            else { soundImg.src = './images/sound-on.png' }
        });
    }
}

window.onload = function() {
    for (let i = 0; i < audioData.nama.length; i++) {
        isPaused[i] = false;
        audioVol[i] = 100;

        fullIndex++;
        const audioLiBtn = 
        '<div class="au-li">\n'+
        '    <audio id="audio-source" src="'+audioData.source[i]+'" preload="mediadata"></audio>\n'+
        '    <button id="au-play-btn" onclick="playAudio('+i+');"><img src="./images/play-btn.png" alt="pause" id="au-play-img"></button>\n'+
        '    <div class="audio-name"><span>'+audioData.nama[i]+'</span></div>\n'+
        '    <div class="volume-col">\n'+
        '        <div id="vol-val">100</div>\n'+
        '        <input type="range" id="vol-slider" max="100" value="100">\n'+
        '        <button><img src="./images/sound-on.png" alt="vol" id="sound-img"></button>\n'+
        '    </div>\n'+
        '</div>\n';

        indexRow += '<button>'+(i+1)+'</button>';
        audioRow += audioLiBtn;
        indexList.innerHTML = indexRow;
        auListCol.innerHTML = audioRow;
    }

    audioList();
}

// alert(path.split('\\').pop().split('/').pop());