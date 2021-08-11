'use strict'

var gElCanvas;
var gCtx;

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
}

function setImageToRender(imgId) {
    gMeme.selectedImgId = imgId
    var currImg = getImgById(imgId)
    var myImg = new Image();
    myImg.onload = () => {
        gCtx.drawImage(myImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    myImg.src = `${currImg.url}`;
}

function drawText(txt, x, y) {
    gCtx.font = `${gMeme.lines[0].size}px impact`
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function saveNewText(txt) {
    gMeme.lines.unshift({
        txt: txt,
        size: 30,
        align: 'left',
        color: 'red'
    })
}