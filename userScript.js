// ==UserScript==
// @name         Vidking Lite para Tizen TV
// @version      1.1
// @match        https://raw.githubusercontent.com/*/*/main/index.html*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    console.log('Vidking Lite cargado – modo ligero activado');

    // Spoof User-Agent para evitar bloqueos
    Object.defineProperty(navigator, 'userAgent', {
        get: () => 'Mozilla/5.0 (SMART-TV; Linux; Tizen 7.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/7.0 Chrome/108.0.0.0 TV Safari/537.36'
    });

    // Forzar fullscreen automático
    setInterval(() => {
        const iframe = document.querySelector('iframe');
        if (iframe && !document.fullscreenElement) {
            iframe.requestFullscreen().catch(() => {});
        }
    }, 3000);
})();
