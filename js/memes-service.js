'use strict'

var gElCanvas;
var gCtx;

const KEY = 'lineDB';
var gUserMemes = [];

var gMeme = {
    selectedImgId: null,
    lines: []
}
var gCurrLine = 0;

function setImageToRender(imgId) {
    gMeme.selectedImgId = imgId
}

function renderImg() {
    var lineNum = 0;
    var currImg = getImgById(gMeme.selectedImgId)
    var myImg = new Image();
    myImg.onload = () => {
        gCtx.drawImage(myImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line) => {
            if (!line || line.length === 0) return
            drawText(line.txt, lineNum)
            if (lineNum < gMeme.lines.length) lineNum++
        })
    }
    myImg.src = currImg.url;
}

function drawText(txt, lineNum) {
    var x = gMeme.lines[lineNum].x
    var y = gMeme.lines[lineNum].y
    gCtx.font = `${gMeme.lines[lineNum].size}px ${gMeme.lines[lineNum].font}`
    gCtx.strokeStyle = gMeme.lines[lineNum].color
    gCtx.fillStyle = 'white'
    gCtx.textAlign = gMeme.lines[lineNum].align;
    if (gCtx.textAlign === 'center') {
        gCtx.fillText(txt, x + (gElCanvas.width / 2 - x), y)
        gCtx.strokeText(txt, x + (gElCanvas.width / 2 - x), y)
    }
    else if (gCtx.textAlign === 'left') {
        gCtx.fillText(txt, x, y)
        gCtx.strokeText(txt, x, y)
    }
    else {
        gCtx.fillText(txt, gElCanvas.width - x, y)
        gCtx.strokeText(txt, gElCanvas.width - x, y)
    }
}

function drawRect(idx) {
    let line = getLineById(idx);
    let lineSize = getLineSizeById(line);
    let lineXStart = line.x - lineSize.width / 2 - 10;
    let lineXEnd = lineSize.width + 20;
    let lineYStart = line.y - line.size - 5;
    let lineYEnd = line.size + 20;
    if (line.align === 'left') {
        lineXStart = 40;
        // lineXEnd += 10; 
    }
    if (line.align === 'center') {
        lineXStart += gElCanvas.width / 2 - 50;
        // lineXEnd += 10;
    }
    if (line.align === 'right') {
        lineXStart = gElCanvas.width - lineSize.width - 60;
        // lineXEnd = (gElCanvas.width - 50);
    }
    gCtx.beginPath()
    gCtx.rect(lineXStart, lineYStart, lineXEnd, lineYEnd)
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
    gCtx.closePath();
}

function getLineById(idx) {
    return gMeme.lines[idx];
}

function getLineSizeById(line) {
    let measurements = gCtx.measureText(line.txt);

    let width = measurements.width;
    let height = line.size;

    return { width, height };
}

// BUTTON FUNCTIONS

function saveNewText(txt) {
    gMeme.lines.push({
        txt,
        size: 30,
        align: 'left',
        color: 'black',
        font: 'Impact',
        x: null,
        y: null,
        isDrag: false
    })
    changeCurrLine()
    _saveTextToStorage()
}

function changeColor(color) {
    gMeme.lines[gCurrLine].color = color
    _saveTextToStorage()
    renderCanvas()
}

function changeFont(font) {
    switch (font) {
        case 'impact':
            gMeme.lines[gCurrLine].font = 'Impact'
            break;
        case 'arial':
            gMeme.lines[gCurrLine].font = 'Arial'
            break;
        case 'Comic-Sans':
            gMeme.lines[gCurrLine].font = 'Comic Sans'
            break;
        default:
            break;
    }
    _saveTextToStorage()
    renderCanvas()
}

function changeFontSize(diff) {
    gMeme.lines[gCurrLine].size += diff;
    _saveTextToStorage()
    renderCanvas()
}

function changeFontLocation(diff) {
    gMeme.lines[gCurrLine].y += diff
    _saveTextToStorage()
    renderCanvas()
}

function changeCurrLine() {
    if (gCurrLine >= gMeme.lines.length - 1) gCurrLine = 0;
    else gCurrLine++;

    setTimeout(drawRect, 50, gCurrLine)
}

function deleteCurrLine() {
    gMeme.lines.splice(gCurrLine, 1)
    if (gCurrLine > 0) gCurrLine--
    _saveTextToStorage()
    renderCanvas()
}

function changeTextAlign(textAlign) {
    switch (textAlign) {
        case 'left':
            gMeme.lines[gCurrLine].align = 'left'
            break;
        case 'center':
            gMeme.lines[gCurrLine].align = 'center'
            break;
        case 'right':
            gMeme.lines[gCurrLine].align = 'right'
            break;
        default:
            break;
    }
    _saveTextToStorage()
    renderCanvas()
}

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function downloadMeme(elLink, idx) {
    var imgContent = gUserMemes[idx]
    elLink.href = imgContent
}

function deleteMeme(idx) {
    gUserMemes.splice(idx, 1)
    onMyMemesClicked()
}

function saveMeme(imgData) {
    gUserMemes.push(imgData);
    saveToStorage('myMemes', gUserMemes);
}

function loadAllMemes() {
    let myMemes = loadFromStorage('myMemes');
    if (!myMemes || myMemes.length === 0) {
        myMemes = [];
        saveToStorage('myMemes', myMemes);
    } else {
        gUserMemes = myMemes;
    }
}


// STORAGE FUNCTIONS

function load() {
    _loadTextFromStorage()
}

function _saveTextToStorage() {
    saveToStorage(KEY, gMeme.lines)
}

function _loadTextFromStorage() {
    loadFromStorage(KEY)
}

// LISTENERS

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchend', onUp)
}