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
    renderCanvas(imgId)
}

function renderCanvas(imgId) {
    setImageToRender(imgId)
}

function onTextSubmitted() {
    const txt = document.querySelector('[name=top-text]').value

    if (!txt) return
    saveNewText(txt)

    if (!gMeme.lines[1])
    drawText(gMeme.lines[0].txt, 10, 50)
    else if (!gMeme.lines[2])
    drawText(gMeme.lines[0].txt, 10, 500)
}