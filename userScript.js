// ==UserScript==
// @name         HLS Test Lite para Tizen TV
// @namespace    http://tu-nombre/
// @version      1.1.0  // ¡Aumenta esto siempre que cambies!
// @description  Optimiza HLS nativo en webview Tizen 5.0
// @author       Camilo + Grok
// @match        https://raw.githubusercontent.com/*/*/main/index.html*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log('HLS Test cargado – aplicando fixes para Tizen 5.0');

    // Spoof User-Agent a versión más reciente posible (Tizen 7 o desktop)
    const spoofUA = 'Mozilla/5.0 (SMART-TV; Linux; Tizen 7.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/7.0 Chrome/108.0.0.0 TV Safari/537.36';
    Object.defineProperty(navigator, 'userAgent', {
        get: () => spoofUA,
        configurable: true
    });

    // Forzar playsinline y muted inicial (evita bloqueos en algunos webviews)
    const video = document.querySelector('video');
    if (video) {
        video.setAttribute('playsinline', '');  // Para mobile-like behavior
        video.muted = true;  // Inicia muted para autoplay
        video.playsInline = true;

        // Intenta play automático con retry
        function tryPlay() {
            video.play().then(() => {
                console.log('Playback iniciado con éxito');
                video.muted = false;  // Quita mute después de empezar
            }).catch(e => {
                console.log('Error en play inicial:', e.message);
                setTimeout(tryPlay, 2000);  // Retry cada 2s
            });
        }

        // Espera a que el video esté listo
        video.addEventListener('loadedmetadata', tryPlay);
        video.addEventListener('error', (e) => {
            console.log('Error en video:', e);
            // Puedes agregar alert o log visible si quieres
        });

        // Forzar fullscreen si es posible
        setInterval(() => {
            if (video && !document.fullscreenElement) {
                video.requestFullscreen().catch(() => {});
            }
        }, 5000);
    }

    console.log('Fixes aplicados – prueba reproducir el HLS test');
})();
