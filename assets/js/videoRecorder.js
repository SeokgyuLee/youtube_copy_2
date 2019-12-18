const recorderContainer = document.getElementById("jsRecordView");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideopreview");

let streamObject;
let videoRecorder;
const handleVideoData = event => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  recordBtn.removeEventListener("click", stopRecording);
  videoRecorder.stop();
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
};

const startRecording = () => {
  recordBtn.removeEventListener("click", startRecording);
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  // console.log(videoRecorder);
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  // setTimeout(() => videoRecorder.stop(), 5000);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    streamObject = stream;
    videoPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    startRecording();
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = "😞 can't record a video";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};
const init = () => {
  recordBtn.addEventListener("click", getVideo);
};

if (recorderContainer) {
  init();
}
