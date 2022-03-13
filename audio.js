/*
if (screen.width < 640) {
    alert("peringatan:\ntidak disarankan untuk menggunakan perangkat ini");
    alert("palingan suatu saat nanti web ini dijadiin web player pasti dibuati untuk mobile :b")
}
*/

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

function playWhere(imdek, tipe, imd) {
    if (tipe == 'origin') {
        const listBorder = document.querySelectorAll('.au-li')[imdek];
        const indexBg = document.querySelectorAll('.au-list-index-num')[imdek];

        for (let i = 0; i < audioData.nama.length; i++) {
            const listBorderPre = document.querySelectorAll('.au-li')[i];
            const indexBgPre = document.querySelectorAll('.au-list-index-num')[i];

            listBorderPre.style.borderColor = indexBgPre.style.backgroundColor = "white";
        }

        indexBg.style.backgroundColor = listBorder.style.borderColor = "rgb(50, 255, 50)";
    }
    else {
        const listBorder = document.querySelectorAll('.index-btn')[imdek];
        
        for (let i = 0; i < audioData.nama.length; i++) {
            document.querySelectorAll('.index-btn')[i].style.borderColor = "white";
            document.querySelectorAll('.index-btn')[i].style.backgroundColor = "transparent";
        }

        listBorder.style.borderColor = listBorder.style.backgroundColor = "rgb(50, 255, 50)";
    }
}

function audioEnd(audioIndex) {
    const soundSrc = document.querySelectorAll('#audio-source')[audioIndex];

    if (isPaused[audioIndex] == true) {
        const auEnd = setInterval(() => {
            if (soundSrc.ended) {
                document.querySelectorAll('#au-play-img')[audioIndex].src = playImg;
                clearInterval(auEnd);
            }
        }, soundSrc.duration * 10000);
    }
}

function playAudio(audioIndex) {
    const soundSrc = document.querySelectorAll('#audio-source')[audioIndex];

    currentIndex = audioIndex;

    playWhere(currentIndex, 'nope');
    playWhere(currentIndex, 'origin');

    if (isPaused[audioIndex] == false) {
        document.querySelectorAll('#au-play-img')[audioIndex].src = pauseImg;

        soundSrc.volume = audioVol[audioIndex] / 100;
        soundSrc.play();
        isPaused[audioIndex] = true;
    }
    else if (isPaused[audioIndex] == true) {
        let nearVol = audioVol[audioIndex];
        document.querySelectorAll('#au-play-img')[audioIndex].src = playImg;

        const volFade = setInterval(function() {
            if (nearVol <= 0) {
                soundSrc.pause();
                isPaused[audioIndex] = false;
                soundSrc.volume = audioVol[audioIndex] / 100;

                clearInterval(volFade);
            }
            else {
                nearVol--;
                soundSrc.volume = nearVol / 100;
            }
        }, 1);
    }
}

function audioList() {
    for (let i = 0; i < audioData.nama.length; i++) {
        const volSlider = document.querySelectorAll('#vol-slider')[i].addEventListener('input', function() {
            const volVal = document.querySelectorAll('#vol-val')[i];
            const soundImg = document.querySelectorAll('#sound-img')[i];
            
            audioVol[i] = Math.floor(this.value);
            volVal.innerHTML = this.value;

            console.log(audioVol);

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
        '    <div class="au-list-index-num"><div>'+(i+1)+'</div></div>\n'+
        '    <button id="au-play-btn" onclick="playAudio('+i+');"><img src="./images/play-btn.png" alt="pause" id="au-play-img"></button>\n'+
        '    <div class="audio-name"><span>'+audioData.nama[i]+'</span></div>\n'+
        '    <div class="volume-col">\n'+
        '        <div id="vol-val">100</div>\n'+
        '        <input type="range" id="vol-slider" max="100" value="100">\n'+
        '        <button><img src="./images/sound-on.png" alt="vol" id="sound-img"></button>\n'+
        '    </div>\n'+
        '</div>\n';

        indexRow += '<button class="index-btn" onclick="playAudio('+i+')">'+(i+1)+'</button>';
        audioRow += audioLiBtn;
        indexList.innerHTML = indexRow;
        auListCol.innerHTML = audioRow;
    }

    const volSlider = document.querySelectorAll('#vol-slider')[currentIndex].addEventListener('input', function() {
        const soundSrc = document.querySelectorAll('#audio-source')[currentIndex];
        audioVol[currentIndex] = Math.floor(this.value) / 100;

        soundSrc.volume = audioVol[currentIndex];
    });

    audioList();
}


// alert(path.split('\\').pop().split('/').pop());