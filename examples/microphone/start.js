const BumblebeeDeepSpeech = require('../../');
const BumbleBee = require('bumblebee-hotword-node');

const bumblebee = new BumbleBee();
bumblebee.addHotword('bumblebee');

BumblebeeDeepSpeech.start({
	modelName: 'english',
	modelPath: __dirname + '/../../deepspeech-0.7.4-models', // path to deepspeech model,
	silenceThreshold: 200, // delay for this long before processing the audio
	vadMode: 'VERY_AGGRESSIVE', // options are: 'NORMAL', 'LOW_BITRATE', 'AGGRESSIVE', 'VERY_AGGRESSIVE'
	debug: true,
	debugProcess: true
})
.then(deepspeech => {
	// receive the speech recognition results
	deepspeech.on('recognize', (text, stats) => {
		console.log('\nrecognize:', text, stats);
	});
	
	bumblebee.on('hotword', function (hotword) {
		console.log('Hotword Detected:', hotword);
	});
	
	// bumblebee emits a "data" event for every 8192 bytes of audio it records from the microphone
	bumblebee.on('data', function (intData, sampleRate, hotword, float32arr) {
		// stream the data to the deepspeech plugin
		deepspeech.streamData(intData, sampleRate, hotword, float32arr);
	});

	// bumblebee start the microphone
	bumblebee.start();
})
.catch(console.error);