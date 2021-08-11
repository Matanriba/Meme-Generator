'use strict'

var gElCanvas;
var gCtx;

const KEY = 'lineDB';

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

function drawRect(x, y, width) {
    gCtx.beginPath()
    gCtx.rect(x - 10, y - gMeme.lines[gCurrLine].size, width + 20, gMeme.lines[gCurrLine].size + 10)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
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
        y: null
    })
    changeCurrLine()
    _saveTextToStorage()
    console.log(gCurrLine)
    console.log(gMeme.lines)
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
    // drawText(gMeme.lines[gCurrLine].txt)
}

function changeFontLocation(diff) {
    gMeme.lines[gCurrLine].y += diff
    _saveTextToStorage()
    renderCanvas()
    // drawText(gMeme.lines[gCurrLine].txt)
}

function changeCurrLine() {
    if (gCurrLine >= gMeme.lines.length - 1) gCurrLine = 0;
    else gCurrLine++;

    var txtWidth = gCtx.measureText(txt).width
    drawRect(x, y, txtWidth)
}

function deleteCurrLine() {
    gMeme.lines.splice(gCurrLine, 1)
    if (gCurrLine > 0) gCurrLine--
    _saveTextToStorage()
    renderCanvas()
    // renderLines()
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