if (screen.width < 640) {
    alert("peringatan:\ntidak disarankan untuk menggunakan perangkat ini");
    alert("palingan suatu saat nanti web ini dijadiin web player pasti dibuati untuk mobile :b")
}

const indexList = document.getElementById('index-list');
const auListCol = document.getElementById('audio-list-col');

let indexRow = '';
let audioRow = '';

let fullIndex = 0;
let currentIndex = 0;

window.onload = function() {
    for (let i = 0; i < audioData.nama.length; i++) {
        fullIndex++;
        const audioLiBtn = 
        '<div class="au-li">\n'+
        '    <audio id="audio-source" src="'+audioData.source[i]+'" preload="mediadata"></audio>\n'+
        '    <button><img src="./images/play-btn.png" alt="pause"></button>\n'+
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

    for (let i = 0; i < audioData.nama.length; i++) {
        const volSlider = document.querySelectorAll('#vol-slider')[i].addEventListener('input', function() {
            const volVal = document.querySelectorAll('#vol-val')[i];
            const soundImg = document.querySelectorAll('#sound-img')[i];
        
            volVal.innerHTML = this.value;
            if (this.value <= 0) { soundImg.src = './images/sound-off.png' }
            else { soundImg.src = './images/sound-on.png' }
        });
    }
}

// alert(path.split('\\').pop().split('/').pop());