'use strict';

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function saveImgToStorage(key, val) {
    localStorage.setItem(key, val)
}

function loadImgFromStorage(key, val) {
    localStorage.getItem(key, val)
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}