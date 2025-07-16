const welcome = document.querySelector('form');
const content = document.querySelector('main');
const curChord = document.querySelector('h2');
const nextChord = document.querySelector('h3');

const noteButton = [
    document.querySelector('#one'),
    document.querySelector('#two'),
    document.querySelector('#three'),
    document.querySelector('#four'),
    document.querySelector('#five'),
    document.querySelector('#six'),
    document.querySelector('#seven'),
];
const flatButton = document.querySelector('#flat');
const sharpButton = document.querySelector('#sharp');
const dominantSeventh = document.querySelector('#dominantSeventh');
const majorSeventh = document.querySelector('#majorSeventh');
const minorSeventh = document.querySelector('#minorSeventh');
const tempo = document.querySelector('#tempo');
const chordName = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

let chordList = [];
let chordQueue = [];
let curIntervalID = 0;

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
})

function welcomeButton() {
    chordList = [];
    for (let i = 0; i < 7; i++) {
        if (!noteButton[i].checked) {
            continue;
        }
        addChord(chordName[i]);
        if (flatButton.checked) {
            addChord(chordName[i] + 'b');
        }
        if (sharpButton.checked) {
            addChord(chordName[i] + '#');
        }
    }
    if (chordList.length < 2) {
        alert('Please select at least two chord!');
        return;
    }
    welcome.style.display = 'none';
    content.style.display = 'flex';
    
    // init queue
    chordQueue= [];
    chordQueue.push(getNextChord());
    chordQueue.push(getNextChord());
    updateQueue();

    curIntervalID = setInterval(updateQueue, 60 * 1000 / tempo.value);
}

function contentButton() {
    clearInterval(curIntervalID);
    welcome.style.display = 'flex';
    content.style.display = 'none';
}

function addChord(note) {
    chordList.push(note);
    if (dominantSeventh.checked) {
        chordList.push(note + '7');
    }
    if (majorSeventh.checked) {
        chordList.push(note + 'M7');
    }
    if (minorSeventh.checked) {
        chordList.push(note + 'm7');
    }
}


function updateQueue() {
    chordQueue.push(getNextChord());
    chordQueue.shift();
    curChord.innerText = chordQueue[0];
    nextChord.innerText = chordQueue[1];
}

function getNextChord() {
    let nextChord = chordList[parseInt(Math.random() * chordList.length)];
    while (chordQueue.length > 0 && chordQueue[chordQueue.length - 1] == nextChord) {
        nextChord = chordList[parseInt(Math.random() * chordList.length)];
    }
    return nextChord;
}