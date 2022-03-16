// ==================================
// cape-cape koding cuma buat thater
// ==================================


if (screen.width < 640) {
    setTimeout(() => {
        alert("peringatan:\ntidak disarankan untuk pengguna mobile");
    }, 5500);
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

function audioSolect(imdek) {
    const indexBorder = document.querySelectorAll('.index-btn')[imdek];

    const listBorder = document.querySelectorAll('.au-li')[imdek];
    const listBg = document.querySelectorAll('.au-list-index-num')[imdek];

    for (let i = 0; i < audioData.nama.length; i++) {
        const listBorderAll = document.querySelectorAll('.au-li')[i];
        const listBgAll = document.querySelectorAll('.au-list-index-num')[i];

        document.querySelectorAll('.index-btn')[i].style.borderColor = "white";
        document.querySelectorAll('.index-btn')[i].style.backgroundColor = "transparent";
        listBorderAll.style.borderColor = listBgAll.style.backgroundColor = 'white';
    }

    listBorder.style.borderColor = listBg.style.backgroundColor = indexBorder.style.backgroundColor = indexBorder.style.borderColor = 'rgb(200, 200, 0)';
}

function playWhere(imdek, tipe) {
    if (tipe == 'origin') {
        const listBorder = document.querySelectorAll('.au-li')[imdek];
        const indexBg = document.querySelectorAll('.au-list-index-num')[imdek];

        for (let i = 0; i < audioData.nama.length; i++) {
            const listBorderPre = document.querySelectorAll('.au-li')[i];
            const indexBgPre = document.querySelectorAll('.au-list-index-num')[i];

            listBorderPre.style.borderColor = indexBgPre.style.backgroundColor = "white";
        }

        indexBg.style.backgroundColor = listBorder.style.borderColor = "rgb(0, 180, 0)";
    }
    else {
        const listBorder = document.querySelectorAll('.index-btn')[imdek];
        
        for (let i = 0; i < audioData.nama.length; i++) {
            document.querySelectorAll('.index-btn')[i].style.borderColor = "white";
            document.querySelectorAll('.index-btn')[i].style.backgroundColor = "transparent";
        }

        listBorder.style.borderColor = listBorder.style.backgroundColor = "rgb(0, 180, 0)";
    }
}

function audioEnd(audioIndex) {
    const soundSrc = document.querySelectorAll('#audio-source')[audioIndex];

    soundSrc.addEventListener('ended', () => {
        document.querySelectorAll('#au-play-img')[audioIndex].src = playImg;
        audioSolect(audioIndex);
        isPaused[audioIndex] = false;
    })
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

        const volFade = setInterval(() => {
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

    audioEnd(audioIndex);
}

function audioList() {
    for (let i = 0; i < audioData.nama.length; i++) {
        const volVal = document.querySelectorAll('#vol-val')[i];
        const volSlider = document.querySelectorAll('#vol-slider')[i];
        const soundImg = document.querySelectorAll('#sound-img')[i];

        volSlider.addEventListener('input', function() {
            const volVal = document.querySelectorAll('#vol-val')[i];
            const soundSrc = document.querySelectorAll('#audio-source')[i];
            
            audioVol[i] = Math.floor(this.value);
            volVal.innerHTML = this.value;

            soundSrc.volume = audioVol[i] / 100;

            if (this.value <= 0) { soundImg.src = './images/sound-off.png' }
            else { soundImg.src = './images/sound-on.png' }
        });
        const keyAudioIndex = document.querySelector('html').addEventListener('keyup', (event) => {
            const soundSrc = document.querySelectorAll('#audio-source');
            if (event.keyCode == 37) {
                event.preventDefault();
                volSlider.value -= 10;
                volVal.innerHTML = volSlider.value;
                audioVol[i] = Math.floor(volSlider.value);
    
                soundSrc[i].volume = audioVol[i] / 100;
            }
            if (event.keyCode == 39) {
                event.preventDefault();
                for (let k = 0; k < 10; k++) {
                    volSlider.value++;
                }
                volVal.innerHTML = volSlider.value;
                audioVol[i] = Math.floor(volSlider.value);
        
                soundSrc[i].volume = audioVol[i] / 100;
            }

            if (volSlider.value <= 0) { soundImg.src = './images/sound-off.png' }
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

        indexRow += '<button class="index-btn" onclick="audioSolect('+i+')">'+(i+1)+'</button>';
        audioRow += audioLiBtn;
        indexList.innerHTML = indexRow;
        auListCol.innerHTML = audioRow;
    }

    const volSlider = document.querySelectorAll('#vol-slider')[currentIndex];

    const keyAudioIndex = document.querySelector('html').addEventListener('keyup', (event) => {
        const soundSrc = document.querySelectorAll('#audio-source');
        for (let i = 0; i < audioData.nama.length; i++) {
            if (event.keyCode == i+49 || event.keyCode == i + 97) {
                event.preventDefault();
                currentIndex = i;
                audioSolect(currentIndex);
            }
        }

        if (event.keyCode == 38 && currentIndex > 0) {
            event.preventDefault();
            currentIndex--;
            audioSolect(currentIndex);
        }
        else if (event.keyCode == 40 && currentIndex < audioData.nama.length - 1) {
            event.preventDefault();
            currentIndex++;
            audioSolect(currentIndex);
        }

        if (event.keyCode == 13) {
            event.preventDefault();
            playAudio(currentIndex);
        }

    });

    audioList();
    audioSolect(currentIndex);
}


// alert(path.split('\\').pop().split('/').pop());