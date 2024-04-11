document.addEventListener('DOMContentLoaded', function () {
    const outputText = document.getElementById('outputText');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const copyBtn = document.getElementById('copyBtn');

    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    startBtn.addEventListener('click', function () {
        recognition.start();
        startBtn.classList.add('d-none');
        stopBtn.classList.remove('d-none');
    });

    stopBtn.addEventListener('click', function () {
        recognition.stop();
        startBtn.classList.remove('d-none');
        stopBtn.classList.add('d-none');
    });
    copyBtn.addEventListener('click', function () {
        outputText.select();
        document.execCommand('copy');
    });

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        outputText.value += transcript + ' ';
    };

    recognition.onspeechend = function () {
        recognition.stop();
        startBtn.classList.remove('d-none');
        stopBtn.classList.add('d-none');
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
        recognition.stop();
        startBtn.classList.remove('d-none');
        stopBtn.classList.add('d-none');
    };
});

function speak() {
    var text = document.getElementById('text-to-speak').value;
    if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
    } else {
        alert('Sorry, your browser does not support text to speech!');
    }
}
