const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const songs = ["music1", "music2", "music3"];

// Keep track of songs

let songIndex = 1;

//load song details into DOM

loadSongs(songs[songIndex]);

// Update song details

function loadSongs(song) {
  title.innerHTML = song;
  audio.src = `./musics/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.innerHTML = '<ion-icon name="pause"></ion-icon>';
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.innerHTML = '<ion-icon name="play-circle"></ion-icon>';
  audio.pause();
}

// Previous Song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSongs(songs[songIndex]);
  playSong();
}
// Next Song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSongs(songs[songIndex]);
  playSong();
}

//Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  console.log(progressPercent);
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Time/Song update
audio.addEventListener("timeupdate", updateProgress);
//Click on progress bar
progressContainer.addEventListener("click", setProgress);
//Song ends
audio.addEventListener("ended", nextSong);
