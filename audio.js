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

let selectedIndex = currentIndex;

let isPaused = [];
let isMuted = [];
let audioVol = [];

function audioSolect(imdek) {
	selectedIndex = currentIndex = imdek;
    document.querySelector('.au-pilih').innerHTML = (selectedIndex+1) + '. ' + audioData.nama[imdek];

    for (let i = 0; i < audioData.nama.length; i++) {
        if (i == imdek) {
            warnainKuning(imdek);
        }
        else {
            if (isPaused[imdek] == false) {
                stopWhere(i);
            }
            else {
                stopWhere(i);
                playWhere(selectedIndex, 'nope');
                playWhere(selectedIndex, 'origin');
            }
        }
    }
}

function warnainKuning(imdek) {
    const indexBorder = document.querySelectorAll('.index-btn')[imdek];

    const listBorder = document.querySelectorAll('.au-li')[imdek];
    const listBg = document.querySelectorAll('.au-list-index-num')[imdek];
    
    listBorder.style.borderColor = listBg.style.backgroundColor = indexBorder.style.backgroundColor = indexBorder.style.borderColor = 'rgb(200, 200, 0)';
}

function playWhere(imdek, tipe) {
    if (tipe == 'origin') {
        const listBorder = document.querySelectorAll('.au-li')[imdek];
        const indexBg = document.querySelectorAll('.au-list-index-num')[imdek];

        indexBg.style.backgroundColor = listBorder.style.borderColor = "rgb(0, 180, 0)";
    }
    else {
        const listBorder = document.querySelectorAll('.index-btn')[imdek];

        listBorder.style.borderColor = listBorder.style.backgroundColor = "rgb(0, 180, 0)";
    }
}

function stopWhere(imdek) {
    const listBorder = document.querySelectorAll('.au-li')[imdek];
    const listBg = document.querySelectorAll('.au-list-index-num')[imdek];

    const indexBorder = document.querySelectorAll('.index-btn')[imdek];

    listBorder.style.borderColor = indexBorder.style.borderColor = listBg.style.backgroundColor = 'white';
    indexBorder.style.backgroundColor = 'transparent';
}

function audioEnd(audioIndex) {
    const soundSrc = document.querySelectorAll('#audio-source')[audioIndex];

    soundSrc.addEventListener('ended', () => {
        document.querySelectorAll('#au-play-img')[audioIndex].src = playImg;

        isPaused[audioIndex] = false;
    })
}

function audioMute(imdex) {
    const volSlider = document.querySelectorAll('#vol-slider')[imdex];
    const volVal = document.querySelectorAll('#vol-val')[imdex];
    const soundSrc = document.querySelectorAll('#audio-source')[imdex];

    if (isMuted[imdex] == false) {
        volSlider.value = volVal.innerHTML = 0;
        soundSrc.volume = volSlider.value;

        isMuted[imdex] = true;
    }
    else if (isMuted[imdex] = true) {
        volSlider.value = volVal.innerHTML = audioVol[imdex];
        soundSrc.volume = audioVol[imdex] / 100;

        isMuted[imdex] = false;
    }
}

function resetAudio(imdex) {
    const soundSrc = document.querySelectorAll('#audio-source')[imdex];

    selectedIndex = currentIndex = imdex;
    
    if (soundSrc.currentTime > 0) {
        soundSrc.currentTime = 0;

        if (isPaused[imdex] == true) {
            soundSrc.pause();
            document.querySelectorAll('#au-play-img')[imdex].src = playImg;

            isPaused[imdex] = false;
        }
    }
}

function playAudio(audioIndex) {
    const soundSrc = document.querySelectorAll('#audio-source')[audioIndex];

    selectedIndex = currentIndex = audioIndex;


    if (isPaused[audioIndex] == false) {
        document.querySelectorAll('#au-play-img')[audioIndex].src = pauseImg;
        playWhere(selectedIndex, 'nope');
        playWhere(selectedIndex, 'origin');

        soundSrc.volume = audioVol[audioIndex] / 100;
        soundSrc.play();
        isPaused[audioIndex] = true;
    }
    else if (isPaused[audioIndex] == true) {
        let nearVol = audioVol[audioIndex];
        warnainKuning(audioIndex);
        document.querySelectorAll('#au-play-img')[audioIndex].src = playImg;

        const volFade = setInterval(() => {
            if (nearVol <= 0) {
                soundSrc.pause();
                soundSrc.volume = audioVol[audioIndex] / 100;
                isPaused[audioIndex] = false;

                clearInterval(volFade);
            }
            else {
                nearVol--;
                soundSrc.volume = nearVol / 100;
            }
        }, 1);
    }

    audioEnd(audioIndex);
    document.querySelector('.au-pilih').innerHTML = (selectedIndex+1) + '. ' + audioData.nama[selectedIndex];
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
        isMuted[i] = false;

        if (volPreset[i] == null) { audioVol[i] = 100; }
        else { audioVol[i] = volPreset[i]; }

        fullIndex++;
        const audioLiBtn = 
        '<div class="au-li">\n'+
        '    <audio id="audio-source" src="'+audioData.source[i]+'" preload="mediadata"></audio>\n'+
        '    <div class="au-list-index-num"><div>'+(i+1)+'</div></div>\n'+
        '    <button id="au-play-btn" onclick="playAudio('+i+');"><img src="./images/play-btn.png" alt="pause" id="au-play-img"></button>\n'+
        '    <button id="au-reset-btn" onclick="resetAudio('+i+');"><img src="./images/reset.png" alt="reset" id="au-reset-img"></button>\n'+
        '    <div class="audio-name"><span>'+audioData.nama[i]+'</span></div>\n'+
        '    <div class="volume-col">\n'+
        '        <div id="vol-val">'+audioVol[i]+'</div>\n'+
        '        <input type="range" id="vol-slider" max="100" value="'+audioVol[i]+'">\n'+
        '        <button onclick="audioMute('+i+');"><img src="./images/sound-on.png" alt="vol" id="sound-img"></button>\n'+
        '    </div>\n'+
        '</div>\n';

        indexRow += '<button class="index-btn" onclick="audioSolect('+i+')" title="'+audioData.nama[i]+'">'+(i+1)+'</button>';
        audioRow += audioLiBtn;
        indexList.innerHTML = indexRow;
        auListCol.innerHTML = audioRow;
    }

    const volSlider = document.querySelectorAll('#vol-slider')[currentIndex];

    document.querySelector('.au-pilih').innerHTML = (selectedIndex+1) + '. ' + audioData.nama[selectedIndex];

    const keyAudioIndex = document.querySelector('html').addEventListener('keyup', (event) => {
        const soundSrc = document.querySelectorAll('#audio-source');
        for (let i = 0; i < audioData.nama.length; i++) {
            if (event.keyCode == i+49 || event.keyCode == i + 97) {
                event.preventDefault();
                currentIndex = selectedIndex = i;
                audioSolect(currentIndex);
            }
        }

        if (event.keyCode == 38 && currentIndex > 0) {
            event.preventDefault();
            currentIndex--;
            selectedIndex = currentIndex;
            audioSolect(selectedIndex);
        }
        else if (event.keyCode == 40 && currentIndex < audioData.nama.length - 1) {
            event.preventDefault();
            currentIndex++;
            selectedIndex = currentIndex;
            audioSolect(selectedIndex);
        }

        if (event.keyCode == 13) {
            event.preventDefault();
            playAudio(selectedIndex);
        }

        /*
        if (event.keyCode == 88) {
            event.preventDefault();

            for (let i = 0; i < audioData.nama.length; i++) {
                if (isPaused[i] == true) {
                    playAudio(i);
                }
            }
        }
        */

        if (event.keyCode == 82) {
        	event.preventDefault();
        	resetAudio(currentIndex);
        }

        document.querySelector('.au-pilih').innerHTML = (selectedIndex+1) + '. ' + audioData.nama[selectedIndex];
    });

    audioList();
    audioSolect(currentIndex);
}


// alert(path.split('\\').pop().split('/').pop());

