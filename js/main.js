// ! get all Elements
// music list
const playMusic = document.querySelector(".play-music"),
  playImg = playMusic.querySelector(".music-img img"),
  musicName = playMusic.querySelector(" .music-details .name"),
  musicArtist = playMusic.querySelector(" .music-details .artist"),
  musicAudio = playMusic.querySelector("#main-song"),
  backbtn = playMusic.querySelector("#back"),
  nextbtn = playMusic.querySelector("#next"),
  iconList = playMusic.querySelector("#icon-list"),
  musicList = playMusic.querySelector(".music-list"),
  closeList = playMusic.querySelector(".close");
// music number in list
let musicIndex = Math.floor(Math.random() * allMusic.length + 1);
// to update window
window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingNow();
});
// edit music name
function loadMusic(indexNum) {
  musicName.innerText = allMusic[indexNum - 1].name;
  musicArtist.innerText = allMusic[indexNum - 1].artist;
  playImg.src = `images/${allMusic[indexNum - 1].img}.jpg `;
  musicAudio.src = `audio/${allMusic[indexNum - 1].src}.mp3 `;
}
//!play And pause get elements
let song = document.getElementById("main-song");
let playIcon = document.getElementById("play-icon");
let play_pause = document.querySelector(".play");
let progressMain = document.getElementById("prog-main");
let progress = document.getElementById("progress-bar");

//! play And pause music

play_pause.addEventListener("click", () => {
  if (playIcon.classList.contains("fa-pause")) {
    play();
  } else {
    pause();
  }
});
function play() {
  song.pause();
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
}
function pause() {
  song.play();
  playingNow();
  playIcon.classList.add("fa-pause");
  playIcon.classList.remove("fa-play");
}

//  !call func back and next
// Back music
function backsong() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  pause();
  playingNow();
}
// next music
function nextsong() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  pause();
  playingNow();
}
// back and next ptn
backbtn.addEventListener("click", () => {
  backsong();
});
nextbtn.addEventListener("click", () => {
  nextsong();
});

//! progress Update
song.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;

  let progressWidth = (currentTime / duration) * 100;
  progress.style.width = `${progressWidth}%`;

  let musicCurrentTime = playMusic.querySelector(".current"),
    musicDuration = playMusic.querySelector(".duration");
  // ! update Timer
  song.addEventListener("loadeddata", () => {
    // updat total time
    let audioDuration = song.duration;
    let tMin = Math.floor(audioDuration / 60);
    let tSec = Math.floor(audioDuration % 60);
    if (tSec < 10) {
      tSec = `0${tSec}`;
    }
    musicDuration.innerText = `${tMin}:${tSec}`;
  });
  // updat current timme
  // let audioCurrentTime = song.currentTime;
  let totalMin = Math.floor(currentTime / 60);
  let totalSec = Math.floor(currentTime % 60);
  if (totalSec < 10) {
    totalSec = `0${totalSec}`;
  }
  musicCurrentTime.innerText = `${totalMin}:${totalSec}`;

  // update prrogress with click
  progressMain.addEventListener("click", (e) => {
    let progressWidthVal = progressMain.clientWidth;
    let clickOffsetX = e.offsetX;
    let songDuration = song.duration;

    song.currentTime = (clickOffsetX / progressWidthVal) * songDuration;
    pause();
    playingNow();
  });
});

// ! icon Repeat
let control = document.querySelector(".controls"),
  iconArea = control.querySelector(".icon-repeat"),
  repeatArea = control.querySelector("#repeat-area");

iconArea.addEventListener("click", () => {
  changeText = repeatArea.innerHTML;
  switch (changeText) {
    case "repeat":
      repeatArea.innerHTML = "repeat_one";
      repeatArea.setAttribute("title", "song looped");
      break;
    case "repeat_one":
      repeatArea.innerHTML = "shuffle";
      repeatArea.setAttribute("title", "play back shuffle");
      break;
    case "shuffle":
      repeatArea.innerHTML = "repeat";
      repeatArea.setAttribute("title", "play list looped");
      break;
  }
  playingNow();
});
musicAudio.addEventListener("ended", () => {
  changeText = repeatArea.innerHTML;
  switch (changeText) {
    case "repeat":
      nextsong();
      break;
    case "repeat_one":
      musicAudio.currentTime = 0;
      loadMusic(musicIndex);
      pause();
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * allMusic.length + 1);
      do {
        randIndex = Math.floor(Math.random() * allMusic.length + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      pause();
      break;
  }
  playingNow();
});
// !music List
iconList.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
closeList.addEventListener("click", () => {
  iconList.click();
});

// music list ul

let ulList = playMusic.querySelector("ul");

for (let index = 0; index < allMusic.length; index++) {
  let liList =
   `<li li-index="${index + 1}">
      <div class="list">
        <span>${allMusic[index].name}</span>
        <p>${allMusic[index].artist}</p>
      </div>
      <audio class="${allMusic[index].src}" src= "audio/${
    allMusic[index].src
  }.mp3"></audio>
                  <span id="${
                    allMusic[index].src
                  }" class="audio-duration">3:20</span>
                </li>`;
  ulList.insertAdjacentHTML("beforeend", liList);

  let liDuration = playMusic.querySelector(`#${allMusic[index].src}`);
  let liAudio = playMusic.querySelector(`.${allMusic[index].src}`);

  liAudio.addEventListener("loadeddata", () => {
    // updat total time
    let audioDuration = liAudio.duration;
    let tMin = Math.floor(audioDuration / 60);
    let tSec = Math.floor(audioDuration % 60);
    if (tSec < 10) {
      tSec = `0${tSec}`;
    }
    liDuration.innerText = `${tMin}:${tSec}`;
    liDuration.setAttribute("t-duration", `${tMin}:${tSec}`);
  });
}
//  play song when click it in list
const allLiTag = ulList.querySelectorAll("li");

function playingNow() {
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTage = allLiTag[j].querySelector(".audio-duration");

    if (allLiTag[j].classList.contains("playing")) {
      allLiTag[j].classList.remove("playing");

      let adDuration = audioTage.getAttribute("t-duration");
      audioTage.innerText = adDuration;
    }
    if (allLiTag[j].getAttribute("li-index") == musicIndex) {
      allLiTag[j].classList.add("playing");
      audioTage.innerText = "Playing";
    }
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}
function clicked(e) {
  const getLiIndex = e.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  pause();
  playingNow();
}

// ! social Links

const socialLinks = document.querySelector(".social-links");
  let circleSlide = document.getElementById("circl-area");
  let linksList = document.getElementById("links-list");


document.addEventListener("click",  (e)=>{
  let isClickInside = circleSlide.contains(e.target);

  if (isClickInside) {
    linksList.style.left = "-10px";
  } else {
    linksList.style.left = "-300px";
  }
});
// !.............End............... */



