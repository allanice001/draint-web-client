export function validUrl(url) {
    let b = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/gi.test(url);
    return b;

}

export function validTypeImage (image) {
    return /(\.(jpg)|\.(png)|\.(jpeg))/gi.test(image);
}

export function base64ToBrowser (buffer) {
    return window.btoa([].slice.call(new Uint8Array(buffer)).map(function(bin) { return String.fromCharCode(bin) }).join(""));
}

export function base64ToNode (buffer) {
    return buffer.toString("base64");
}

export function readFileAndConvert (fileName) {
    let fileSystem = require("fs");
    let path = require("path");

    if (fileSystem.statSync(fileName).isFile()) {
        return base64ToNode(fileSystem.readFileSync(path.resolve(fileName)).toString("base64"));
    }
    return null;
}

export function isImage (urlOrImage) {
    if (validTypeImage(urlOrImage)) {
        return Promise.resolve(readFileAndConvert(urlOrImage));
    } else {
        return Promise.reject("[*] Occurent some error... [validTypeImage] == false");
    }
}

export function isBrowser (urlOrImage, param) {
    if (!("fetch" in window && "Promise" in window)) {
        return Promise.reject("[*] It's image2base64 not compatible with your browser.");
    }
    return fetch(urlOrImage, param || {}).then(function(response){
        return response.arrayBuffer()
    }).then(base64ToBrowser);
}

export function isNodeJs (urlOrImage) {
    if (validUrl(urlOrImage)) {
        var fetch = require("node-fetch");
        return fetch(urlOrImage).then(function(response){
            return response.buffer()
        }).then(base64ToNode);
    } else {
        return isImage(urlOrImage);
    }
}

export function imageToBase64(urlOrImage, param) {
    if (typeof window !== "undefined" && ("document" in window && "navigator" in window)) {
        return isBrowser(urlOrImage, param);
    } else {
        return isNodeJs(urlOrImage);
    }
}
