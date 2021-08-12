'use strict'

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    renderImages()
    renderKeywords()
}

function renderImages() {
    var strHTMLs = ``
    var imgsToRender = getImgsForDisplay()
    strHTMLs = (!imgsToRender || imgsToRender.length === 0) ? `<p>Sorry, No Images match your search</p>` :
    imgsToRender.map((img) => {
        return `
        <div class="img-card"><a href="#"><img src="${img.url}" onclick="onClickImg(${img.id})"></a> </div>
        `
        
    }).join('')
    var memeEditor = document.querySelector('.main')
    memeEditor.style.display = 'none';
    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTMLs;
    elGallery.style.display = 'flex';
    var elFiltering = document.querySelector('.filtering')
    elFiltering.style.display = 'flex';
}

function renderKeywords() {
    var strHTMLs = gKeywords.map( (keyword) => {
        return `
        <p class="keyword" onclick="onSetFilterBy('${keyword.key}')" style="font-size:${keyword.size}px">${keyword.key}</p>
        `
    }).join('')
    var elKeyWords = document.querySelector('.keywords-container')
    elKeyWords.innerHTML = strHTMLs
}

function renderCanvas() {
    load()
    renderImg()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onClickImg(imgId) {
    setImageToRender(imgId)
    renderEditor()
    renderImg()
}

function renderEditor() {
    var elMemeEditor = document.querySelector('.main')
    elMemeEditor.style.display = 'flex';
    var elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none';
    var elFiltering = document.querySelector('.filtering')
    elFiltering.style.display = 'none';
}

function onTextSubmitted() {
    var txt = document.querySelector('[name=text]').value

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
    drawText(txt, gCurrLine)

    document.querySelector('[name=text]').value = '' 
}

function onSetFilterBy(value) {
    filterBy(value)
    renderImages()
    renderKeywords()
    changeKeywordSize(value)
}

function onSaveMeme() {
    saveMeme()
}