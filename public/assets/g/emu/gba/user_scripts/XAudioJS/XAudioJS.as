package {
	import flash.media.Sound;
	import flash.events.SampleDataEvent;
	import flash.display.Sprite;
	import flash.external.ExternalInterface;
	public class XAudioJS extends Sprite {
		public var sound:Sound = null;
		public var channelBuffer:Vector.<Number> = new Vector.<Number>(8192, true);
		public var channels:int = 0;
		public var volume:Number = 0;
		public var samplesFound:int = 0;
		public function XAudioJS() {
			ExternalInterface.addCallback('initialize', initialize);
			ExternalInterface.addCallback('changeVolume', changeVolume);
		}
		//Initialization function for the flash backend of XAudioJS:
		public function initialize(channels:Number, newVolume:Number):void {
			//Initialize the new settings:
			this.channels = (int(channels) == 2) ? 2 : 1;
			this.changeVolume(newVolume);
			this.checkForSound();
		}
		//Volume changing function for the flash backend of XAudioJS:
		public function changeVolume(newVolume:Number):void {
			//Set the new volume:
			this.volume = Math.min(Math.max(newVolume, 0), 1);
		}
		//Calls the JavaScript function responsible for the polyfill:
		public function requestSamples():Boolean {
			//Call the javascript callback function:
			var buffer:String = ExternalInterface.call("XAudioJSFlashAudioEvent");
			//If we received an appropriate response:
			if (buffer !== null) {
				if ((buffer.length % this.channels) == 0) {	//Outsmart bad programmers from messing us up. :/
					var channelSample:Number = 0;
					this.samplesFound = Math.min(buffer.length, 4096 * this.channels);
					for (var index:int = 0; index < this.samplesFound; ++index) {
						//Get the unsigned 15-bit encoded sample value at +0x3000 offset:
						channelSample = buffer.charCodeAt(index);
						//Range-check the sample frame value and convert it:
						this.channelBuffer[index] = (channelSample >= 0x3000 && channelSample < 0xAFFF) ? (this.volume * (((channelSample - 0x3000) / 0x3FFF) - 1)) : 0;
					}
					return true;
				}
			}
			return false;
		}
		//Check to make sure the audio stream is enabled:
		public function checkForSound():void {
			if (this.sound == null) {
				this.sound = new Sound(); 
				this.sound.addEventListener(
					SampleDataEvent.SAMPLE_DATA,
					soundCallback
				);
				this.sound.play();
			}
		}
		//Flash Audio Refill Callback
		public function soundCallback(e:SampleDataEvent):void {
			var index:int = 0;
			if (this.requestSamples()) {
				if (this.channels == 2) {
					//Stereo:
					while (index < this.samplesFound) {
						e.data.writeFloat(this.channelBuffer[index++]);
						e.data.writeFloat(this.channelBuffer[index++]);
					}
					index >>= 1;
				}
				else {
					//Mono:
					while (index < this.samplesFound) {
						e.data.writeFloat(this.channelBuffer[index]);
						e.data.writeFloat(this.channelBuffer[index++]);
					}
				}
			}
			//Write some silence if not enough samples are found:
			while (++index <= 2048) {
				e.data.writeFloat(0);
				e.data.writeFloat(0);
			}
		}
	}
}