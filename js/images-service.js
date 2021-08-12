'use strict'

var gFilterBy = 'all';

var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['human', 'angry']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['happy', 'animal', 'funny']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['human', 'animal', 'happy']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['animal']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['success', 'human', 'baby']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['weed', 'human', 'funny']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['baby', 'human', 'funny']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['happy', 'human', 'funny']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['happy', 'human', 'baby']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['happy', 'human', 'funny']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['happy', 'human', 'basketball']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['angry', 'human', 'funny']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['happy', 'human', 'funny']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['happy', 'human', 'funny']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['happy', 'human', 'funny']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['happy', 'human', 'funny']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['happy', 'human', 'funny']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['happy', 'toys', 'funny']
    }
]

var gKeywords = [{ key: 'happy', size: getRandomInt(10, 30) },
{ key: 'human', size: getRandomInt(10, 40) },
{ key: 'animal', size: getRandomInt(10, 30) },
{ key: 'angry', size: getRandomInt(10, 30) },
{ key: 'baby', size: getRandomInt(10, 30) },
]

function filterBy(keyword) {
    gFilterBy = keyword;
}

function changeKeywordSize(value) {
    var currKeywordIdx = gKeywords.findIndex( (keyword) => {
        return keyword.key === value
    })
    gKeywords[currKeywordIdx].size += 1
    console.log(gKeywords[currKeywordIdx].size)
    renderKeywords()
}

function getImgsForDisplay() {
    if (gFilterBy === 'all') return gImgs
    return gImgs.filter((img) => {
        return img.keywords.includes(gFilterBy)
    })
}

function getImgById(imgId) {
    var img = gImgs.find((img) => {
        return imgId === img.id
    })
    return img
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}