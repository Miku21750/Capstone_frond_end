// src/components/Camera.js
export default class Camera {
  #currentStream;
  #streaming = false;
  #width = 640;
  #height = 0;

  #videoElement;
  #selectCameraElement;
  #canvasElement;
  #takePictureButton;

  static addNewStream(stream) {
    if (!Array.isArray(window.currentStreams)) {
      window.currentStreams = [stream];
      return;
    }
    window.currentStreams = [...window.currentStreams, stream];
  }

  static stopAllStreams() {
    if (!Array.isArray(window.currentStreams)) {
      window.currentStreams = [];
      return;
    }

    window.currentStreams.forEach((stream) => {
      if (stream.active) {
        stream.getTracks().forEach((track) => track.stop());
      }
    });
  }

  constructor({ video, cameraSelect, canvas }) {
    this.#videoElement = video;
    this.#selectCameraElement = cameraSelect;
    this.#canvasElement = canvas;

    this.#initialListener();
  }

  #initialListener() {
    this.#videoElement.oncanplay = () => {
      if (this.#streaming) return;

      this.#height = (this.#videoElement.videoHeight * this.#width) / this.#videoElement.videoWidth;
      this.#canvasElement.setAttribute('width', this.#width);
      this.#canvasElement.setAttribute('height', this.#height);
      this.#streaming = true;
    };

    this.#selectCameraElement.onchange = async () => {
      await this.stop();
      await this.launch();
    };
  }

  async #populateDeviceList(stream) {
    try {
      const { deviceId } = stream.getVideoTracks()[0].getSettings();
      const devices = await navigator.mediaDevices.enumerateDevices();
      const list = devices.filter((d) => d.kind === 'videoinput');

      const html = list
        .map(
          (device, i) => `
        <option value="${device.deviceId}" ${device.deviceId === deviceId ? 'selected' : ''}>
          ${device.label || `Camera ${i + 1}`}
        </option>
      `
        )
        .join('');

      this.#selectCameraElement.innerHTML = html;
    } catch (e) {
      console.error(e);
    }
  }

  async #getStream() {
    try {
      const deviceId = this.#selectCameraElement.value ? { exact: this.#selectCameraElement.value } : undefined;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { aspectRatio: 4 / 3, deviceId },
      });

      await this.#populateDeviceList(stream);
      return stream;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async launch() {
    this.#currentStream = await this.#getStream();
    if (this.#currentStream) {
      Camera.addNewStream(this.#currentStream);
      this.#videoElement.srcObject = this.#currentStream;
      this.#videoElement.play();
      this.#clearCanvas();
    }
  }

  stop() {
    if (this.#videoElement) {
      this.#videoElement.srcObject = null;
      this.#streaming = false;
    }

    if (this.#currentStream instanceof MediaStream) {
      this.#currentStream.getTracks().forEach((track) => track.stop());
    }

    this.#clearCanvas();
  }

  #clearCanvas() {
    const ctx = this.#canvasElement.getContext('2d');
    ctx.fillStyle = '#AAAAAA';
    ctx.fillRect(0, 0, this.#canvasElement.width, this.#canvasElement.height);
  }

  async takePicture() {
    if (!(this.#width && this.#height)) return null;

    const context = this.#canvasElement.getContext('2d');
    context.drawImage(this.#videoElement, 0, 0, this.#width, this.#height);

    return await new Promise((resolve) => {
      this.#canvasElement.toBlob((blob) => resolve(blob), 'image/jpeg');
    });
  }

  addCheeseButtonListener(selector, callback) {
    this.#takePictureButton = document.querySelector(selector);
    this.#takePictureButton.onclick = callback;
  }
}
