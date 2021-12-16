let context = null;
let gain = null;

function setup() {
    if (typeof window === 'undefined') return;

    const AudioContext = window.AudioContext || window.webkitAudioContext || false;
    if (AudioContext) {
        context = new AudioContext();
    }
    if (context) {
        gain = context.createGain();
        gain.connect(context.destination);
        gain.gain.value = 0.5;
    } else {
        throw new Error('Web Audio API is not supported by your browser. Try Google Chrome or Mozilla Firefox');
    }
}

function getOsc(freq, time = false) {
    if (context === null) return null;
    const oscillator = context.createOscillator();
    oscillator.type = 'triangle';
    oscillator.connect(gain);
    oscillator.frequency.value = freq;

    if (time) {
        const now = context.currentTime;
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    } else {
        oscillator.start();
    }
    return oscillator;
}

export { setup, getOsc };
