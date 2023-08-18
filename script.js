let videoReferences = ["z-diRlyLGzo", "K3B8-klo5xc", "YxWlaYCA8MU"];
console.log(videoReferences[1]);
let videoIdRef = videoReferences[0];
console.log(videoReferences[0]);
console.log(videoReferences[videoIdRef]);
let vidID;
let trackCount = 0; //reference to music that's playing
let currentSong = 1;
const progressBar = document.querySelector(".progress");
let isSeeking = false;
const outputElement = document.querySelector(".songName");
//Below code ensures that the credits display when the credits button is clicked and it closes when the close button is 
//clicked.
document.addEventListener("DOMContentLoaded", () => {
  const openPopupButton = document.getElementById("openPopup");
  const closePopupButton = document.getElementById("closePopup");
  const popup = document.getElementById("popup");

  openPopupButton.addEventListener("click", () => {
    popup.style.display = "block";
  });

  closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
  });
});

// This code loads the IFrame Player API code asynchronously
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
let videoId;
function onYouTubeIframeAPIReady() {
  outputElement.innerText = "Song Number: " + currentSong;
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "z-diRlyLGzo",
    playerVars: {
      playersinline: 1,
      autoplay: 0,
      control: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

//The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  progressBar.addEventListener("click", function (event) {
    if (player && !isSeeking) {
      isSeeking = true;

      const progressBarRect = progressBar.getBoundingClientRect();
      const clickX = event.clientX - progressBarRect.left;
      const progressBarWidth = progressBarRect.width;
      const seekToTime = (clickX / progressBarWidth) * player.getDuration();

      player.seekTo(seekToTime, true); // Seek to the clicked time

      // Update the progress bar value
      progressBar.value = (seekToTime / player.getDuration()) * 100;

      // Allow seeking again after a short delay
      setTimeout(() => {
        isSeeking = false;
      }, 10);
    }
  });
}

//The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

//play/pause button code below:

const audio = document.querySelector(".audio1");
const sound1 = document.querySelector(".firstSong");
const playBtn = document.querySelector(".plbtn");
function checkBtnState() {
  const isPlaying = playBtn.classList.contains("playing");

  if (isPlaying) {
    offBtn();
  } else {
    onBtn();
  }
}
function onBtn() {
  playBtn.classList.add("playing");
  playBtn.classList.remove("fa-play");
  playBtn.classList.add("fa-pause");
  player.playVideo();
}

function offBtn() {
  playBtn.classList.remove("playing");
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  player.pauseVideo();
}
//Function to play next song when user clicks next button.
function playNext(vidID) {
  trackCount++;
  currentSong++;
  if (currentSong > videoReferences.length) {
    currentSong = 1;
  }
  outputElement.innerText = "Song Number: " + currentSong;
  if (trackCount > videoReferences.length - 1) {
    trackCount = 0;
  }
  if (player) {
    player.destroy();
  }

  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: videoReferences[trackCount],
    playerVars: {
      playersinline: 1,
      autoplay: 0,
      control: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}
//Function to play previous songs when user clicks the previous button
function playPrevious(vidID) {
  trackCount--;
  currentSong--;
  if (currentSong < 1) {
    currentSong = videoReferences.length;
  }
  outputElement.innerText = "Song Number: " + currentSong;
  if (trackCount < 0) {
    trackCount = videoReferences.length - 1;
  }
  if (player) {
    player.destroy();
  }

  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: videoReferences[trackCount],
    playerVars: {
      playersinline: 1,
      autoplay: 0,
      control: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

//progress bar

function updateProgressBar() {
  if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;
  }
}
setInterval(updateProgressBar, 1000);
