# Bumblebee Deepspeech

Deepspeech service for [Bumblebee](https://github.com/jaxcore/bumblebee).

Although it is not intended for anyone to use this library directly, it can be used as a miniature
version of [Bumblebee](https://github.com/jaxcore/bumblebee) and this is the library upon which
it relies.

## Basic Usage

```
const BumblebeeDeepSpeech = require('bumblebee-deepspeech');

// use bumblebee-hotword-node for microphone recording
const BumbleBee = require('bumblebee-hotword-node');
const bumblebee = new BumbleBee();

// start the service with the location to your DeepSpeech 0.8.0 models
BumblebeeDeepSpeech.start({
	modelName: 'english',
	modelPath: __dirname + '/../../deepspeech-0.8.0-models', // path to deepspeech model,
	silenceThreshold: 200, // delay for this long before processing the audio
	vadMode: 'VERY_AGGRESSIVE', // options are: 'NORMAL', 'LOW_BITRATE', 'AGGRESSIVE', 'VERY_AGGRESSIVE'
	debug: true
})
.then(deepspeech => {

	// receive the speech recognition results
	deepspeech.on('recognize', (text, stats) => {
		console.log('\nrecognize:', text, stats);
	});

	// bumblebee emits a "data" event for every 8192 bytes of audio it records from the microphone
	bumblebee.on('data', function (intData, sampleRate, hotword, float32arr) {
		// stream the data to the deepspeech plugin
		deepspeech.streamData(intData, sampleRate, hotword, float32arr);
	});

	// bumblebee start the microphone
	bumblebee.start();
});
```

## Examples

2 examples are provided:

- [microphone](examples/microphone) - simple microphone recording into DeepSpeech

- [hotword](examples/hotword) - use a hotword to turn DeepSpeech on and off

These examples require that DeepSpeech 0.8.0 models must be downloaded or soft-linked to the root of this project.

```
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.8.0/deepspeech-0.8.0-models.pbmm
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.8.0/deepspeech-0.8.0-models.scorer
```