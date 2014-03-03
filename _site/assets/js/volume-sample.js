//--------------------------------------------------------

function VolumeSample(context){
  // Gain node needs to be mutated by volume control.
  this.gainNode = null;
  this.context = context;

}


VolumeSample.prototype.play = function() {
  
  

  if (!context.createGain)
    this.context.createGain = context.createGainNode;
  this.gainNode = this.context.createGain();


  var source = this.context.createBufferSource();
  source.buffer = BUFFERS.a440;
  


  // Connect source to a gain node
  source.connect(this.gainNode);
  // Connect gain node to destination
  this.gainNode.connect(context.destination);
  // Start playback in a loop
  source.loop = true;
  if (!source.start)
    source.start = source.noteOn;
  source.start(0);
  this.source = source;
};


VolumeSample.prototype.changeVolume = function(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  this.gainNode.gain.value = fraction * fraction;
};


VolumeSample.prototype.stop = function() {
  if (!this.source.stop)
    this.source.stop = source.noteOff;
  this.source.stop(0);
};


VolumeSample.prototype.toggle = function() {
  this.playing ? this.stop() : this.play();
  this.playing = !this.playing;
};