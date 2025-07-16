const welcome = document.querySelector('form');
const content = document.querySelector('main');
const curChord = document.querySelector('h2');

const chordButton = [
    document.querySelector('#one'),
    document.querySelector('#two'),
    document.querySelector('#three'),
    document.querySelector('#four'),
    document.querySelector('#five'),
    document.querySelector('#six'),
    document.querySelector('#seven'),
];
const dominantSeventh = document.querySelector("#dominantSeventh");
const majorSeventh = document.querySelector("#majorSeventh");
const minorSeventh = document.querySelector("#minorSeventh");
const chordName = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

let chordList = [];
let curIntervalID = 0;

function welcomeButton() {
    chordList = [];
    for (let i = 0; i < 7; i++) {
        if (!chordButton[i].checked) {
            continue;
        }
        chordList.push(chordName[i]);
        if (dominantSeventh.checked) {
            chordList.push(chordName[i] + '7');
        }
        if (majorSeventh.checked) {
            chordList.push(chordName[i] + 'M7');
        }
        if (minorSeventh.checked) {
            chordList.push(chordName[i] + 'm7');
        }
    }
    if (chordList.length < 2) {
        alert('Please select at least two chord!');
        return;
    }
    welcome.style.display = 'none';
    content.style.display = 'flex';
    updateChord();
    curIntervalID = setInterval(updateChord, 1000);
}

function contentButton() {
    clearInterval(curIntervalID);
    welcome.style.display = 'flex';
    content.style.display = 'none';
}

function updateChord() {
    let nextChord = chordList[parseInt(Math.random() * chordList.length)];
    while (curChord.innerText == nextChord) {
        nextChord = chordList[parseInt(Math.random() * chordList.length)];
    }
    curChord.innerText = nextChord;
}