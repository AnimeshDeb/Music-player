let videoReferences = ["z-diRlyLGzo", "K3B8-klo5xc", "YxWlaYCA8MU"]; //stores youtube references to three songs that are used
console.log(videoReferences[1]);
let videoIdRef = videoReferences[0];
console.log(videoReferences[0]);
console.log(videoReferences[videoIdRef]);
let autoLoad = true;
let vidID;
let trackCount = 0; //reference to music that's playing
let currentSong = 1;
const progressBar = document.querySelector(".progress");
let isSeeking = false;
const outputElement = document.querySelector(".songName");
//Below code ensures that the credits display when the credits button is clicked and it closes when the close button is
//clicked.
const audio = document.querySelector(".audio1");
const playBtn = document.querySelector(".plbtn");

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
  //autoLoad used to stop autoplay of song once app loads. It is initially set to true,
  // and so the onPlayerReady function runs when page loads. If autoLoad is true
  // we pause the video. Then when the user clicks the play button (this is right after app
  //loads), autoLoad gets set to false at the bottom (only for the onBtn since we only
  // need to consider the user pressing the play button to start the music). Now
  // if autoLoad gets set to false, the music starts playing. This works because, when
  // you click next or previous button, we create a YT player object responsible for
  //playing of the music and onPlayerReady also gets called each time. We put autoLoad=true
  // for offBtn because we want the music to stop when the play btn shows. Again,
  // if autoLoad is set to false, then we pause the music by referring to onPlayerReady. This
  // works because when we create new YT player objects by clicking next and prev and also
  // originally, the events onready and onStateChange also accompany it. One of the
  // specified events is the onPlayerReady.
  if (autoLoad === true) {
    event.target.pauseVideo();
  } else if (autoLoad === false) {
    event.target.playVideo();
  }

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
  //below code makes it so that next song plays (playNext()) when current song ends (event.data===YT.PlayerState.ENDED)
  if (event.data === YT.PlayerState.ENDED) {
    playNext();
  }
}
function stopVideo() {
  player.stopVideo();
}

//play/pause button code below:

function checkBtnState() {
  const isPlaying = playBtn.classList.contains("playing");

  if (isPlaying) {
    offBtn();
  } else {
    onBtn();
  }
}
function onBtn() {
  autoLoad = false;
  playBtn.classList.add("playing");
  playBtn.classList.remove("fa-play");
  playBtn.classList.add("fa-pause");
  player.playVideo();
}

function offBtn() {
  autoLoad = true;
  playBtn.classList.remove("playing");
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  player.pauseVideo();
}
//Function to play next song when user clicks next button.
function playNext() {
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
function playPrevious() {
  trackCount--; //traverses array of songs
  currentSong--; //used to refer to song name
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
