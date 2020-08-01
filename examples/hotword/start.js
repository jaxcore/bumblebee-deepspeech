const Jaxcore = require('jaxcore');
const jaxcore = new Jaxcore();

const BumblebeeDeepSpeech = require('bumblebee-deepspeech');
jaxcore.addPlugin(BumblebeeDeepSpeech);

const BumbleBee = require('bumblebee-hotword-node');
const bumblebee = new BumbleBee();
bumblebee.addHotword('bumblebee');

const playSoundFile = require('play-sound-file');

let speechRecognitionActive = false;

jaxcore.startService('deepspeech', {
	modelName: 'english',
	modelPath: __dirname + '/../../deepspeech-0.8.0-models', // path to deepspeech model,
	silenceThreshold: 200, // how many milliseconds of silence before processing the audio
	vadMode: 'VERY_AGGRESSIVE', // options are: 'NORMAL', 'LOW_BITRATE', 'AGGRESSIVE', 'VERY_AGGRESSIVE'
	debug: true
}, function(err, deepspeech) {
	
	deepspeech.on('recognize', (text, stats) => {
		console.log('Speech Recognition Result:', text);
	});
	
	bumblebee.on('hotword', function(hotword) {
		if (speechRecognitionActive) {
			console.log('\nSPEECH RECOGNITION OFF');
			console.log('\nStart speech recognition by saying:', 'BUMBLEBEE');
			playSoundFile(__dirname + '/bumblebee-off.wav');
			speechRecognitionActive = false;
		}
		else if (!speechRecognitionActive) {
			console.log('\nSPEECH RECOGNITION ON');
			console.log('Stop speech recognition by saying:', 'BUMBLEBEE');
			playSoundFile(__dirname + '/bumblebee-on.wav');
			speechRecognitionActive = true;
		}
		deepspeech.streamReset();
	});
	
	bumblebee.on('data', function (intData, sampleRate, hotword, float32arr) {
		if (speechRecognitionActive) {
			deepspeech.streamData(intData, sampleRate, hotword, float32arr);
		}
	});
	
	bumblebee.start();
	
	console.log('\nStart speech recognition by saying:', 'BUMBLEBEE');
});