const videoContainer = document.getElementById("jsVideoPlayer");
// let videoPlayer;
const playBtn = document.getElementById("jsPlayButton");
const volumenBtn = document.getElementById("jsVolumeBtn");
const expandBtn = document.getElementById("jsExpandBtn");
// let 대신에
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

// 로 해도 된다.
function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}
function handleMute() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumenBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
}
function exitFullscreen() {
  expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
  expandBtn.addEventListener("click", goFullscreen);
  videoPlayer.addEventListener("dblclick", goFullscreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
function goFullscreen() {
  expandBtn.innerHTML = '<i class="fas fa-compress"></i>';
  expandBtn.removeEventListener("click", goFullscreen);
  expandBtn.addEventListener("click", exitFullscreen);
  videoPlayer.removeEventListener("dblclick", goFullscreen);
  videoPlayer.addEventListener("dblclick", exitFullscreen);

  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
}
const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};
function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}
function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}
function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}
function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.7) {
    volumenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.1) {
    volumenBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumenBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}
function init() {
  // videoPlayer = videoContainer.querySelector("video");
  videoPlayer.volume = 0.5;
  videoPlayer.addEventListener("click", handlePlayClick);
  videoPlayer.addEventListener("dblclick", goFullscreen);
  volumenBtn.addEventListener("click", handleMute);
  expandBtn.addEventListener("click", goFullscreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  console.log("확인!");
  init();
} else {
  console.log("확인2");
}
