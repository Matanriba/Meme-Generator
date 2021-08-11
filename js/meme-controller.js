'use strict'

function init() {
    renderGallery()
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderGallery() {
    var strHTMLs = gImgs.map((img) => {
        return `
        <div class="img-card"><a href="#"><img src="${img.url}" onclick="onClickImg(${img.id})"></a> </div>
        `
    }).join('')
    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTMLs;
}

function onClickImg(imgId) {
    setImageToRender(imgId)
    renderImg()
}

function renderCanvas() {
    load()
    renderImg()
}

function onTextSubmitted() {
    var txt = document.querySelector('[name=top-text]').value

    if (!txt) return
    saveNewText(txt)

    if (!gMeme.lines[1]) {
        gMeme.lines[gCurrLine].x = 20;
        gMeme.lines[gCurrLine].y = 50;
    }
    else if (!gMeme.lines[2]) {
        gMeme.lines[gCurrLine].x = 20;
        gMeme.lines[gCurrLine].y = gElCanvas.height - 50;
    }
    else {
        gMeme.lines[gCurrLine].x = 20;
        gMeme.lines[gCurrLine].y = gElCanvas.height / 2
    }
    // renderLines()
    drawText(txt, gCurrLine)

    document.querySelector('[name=top-text]').value = '' 
}