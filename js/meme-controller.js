'use strict'

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderImages()
    renderKeywords()
    loadAllMemes()
}

function renderImages() {
    var strHTMLs = ``
    var imgsToRender = getImgsForDisplay()
    strHTMLs = (!imgsToRender || imgsToRender.length === 0) ? `<p>Sorry, No Images match your search</p>` :
        imgsToRender.map((img) => {
            return `
        <div class="img-card"><a href="#"><img class="gallery-img" src="${img.url}" onclick="onClickImg(${img.id})"></a> </div>
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
    var strHTMLs = gKeywords.map((keyword) => {
        return `
        <p class="keyword" onclick="onSetFilterBy('${keyword.key}')" style="font-size:${keyword.size}px">${keyword.key}</p>
        `
    }).join('')
    var elKeyWords = document.querySelector('.keywords-container')
    elKeyWords.innerHTML = strHTMLs
}

function onMyMemesClicked() {
    let elMyMemes = document.querySelector('.gallery')

    let strHtmls = gUserMemes.map((image, idx) => {
        return `<div class="saved-meme-card flex flex-wrap">
        <a href="#"><img class="meme-img" src="${image}" onclick="onSavedImageClick(${idx})"></a>
        <div class="meme-btn-container flex center">
        <a href="#" onclick="onDownloadMeme(this, ${idx})" download="my-meme.jpg"><img class="download-btn" src="img/ICONS/download.png" title="Download Meme"></a>
        <button onclick="onDeleteMeme(${idx})"><img class="delete-btn" src="img/ICONS/trash.png" title="Delete Meme"></button>
        </div>
        </div>`
    }).join('');

    elMyMemes.innerHTML = (!gUserMemes || gUserMemes.length === 0) ? 'No Saved Memes' : strHtmls;

    let elMemeEditor = document.querySelector('.main')
    elMemeEditor.style.display = 'none';
    let elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'flex';
    let elFiltering = document.querySelector('.filtering')
    elFiltering.style.display = 'flex';
}

function renderCanvas() {
    load()
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

function onClickImg(imgId) {
    setImageToRender(imgId)
    renderEditor()
    renderImg()
}


function onTextSubmitted() {
    var txt = document.querySelector('[name=text]').value
    
    if (!txt) return
    saveNewText(txt)
    
    if (!gMeme.lines[1]) {
        gMeme.lines[gCurrLine].x = 50;
        gMeme.lines[gCurrLine].y = 50;
    }
    else if (!gMeme.lines[2]) {
        gMeme.lines[gCurrLine].x = 50;
        gMeme.lines[gCurrLine].y = gElCanvas.height - 50;
    }
    else {
        gMeme.lines[gCurrLine].x = 50;
        gMeme.lines[gCurrLine].y = gElCanvas.height / 2
    }
    drawText(txt, gCurrLine)
    
    document.querySelector('[name=text]').value = ''
}

function onChangeCurrLine() {
    changeCurrLine();
    
    renderCanvas();
    
    setTimeout(drawRect, 50, gCurrLine)
}

function onSetFilterBy(value) {
    filterBy(value)
    renderImages()
    renderKeywords()
    changeKeywordSize(value)
}

function onSaveMeme() {
    const data = gElCanvas.toDataURL().replace('image/png', 'image/jpeg');
    saveMeme(data);
}

function onSavedImageClick(idx) {
    console.log(idx)
}

function onDownloadMeme(img, idx) {
    downloadMeme(img, idx)
}

function onDeleteMeme(idx) {
    deleteMeme(idx)
}