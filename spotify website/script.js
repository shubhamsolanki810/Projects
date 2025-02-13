// ==============================[ Search Bar ]=================================

const searchBar = document.querySelector(".center-right");
let currentSong = new Audio();

searchBar.addEventListener('click', function (event) {
  searchBar.classList.add('active');
  event.stopPropagation();
})

document.addEventListener('click', function () {
  searchBar.classList.remove('active');
})

// ===============================[ Motion Floating Particles ]============================

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let particlesArray = [];

class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = 'rgba(255, 255, 255, 0.8)';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wall bounce
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.speedX *= -1;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.speedY *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = 'rgba(255, 255, 255, 1)';
    ctx.shadowBlur = 0;
    ctx.fill();
    ctx.closePath();
  }
}

function initParticles() {
  particlesArray = [];
  let numberOfParticles = 50;

  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 1 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speedX = Math.random() * 1 - 0.5;
    let speedY = Math.random() * 1 - 0.5;

    particlesArray.push(new Particle(x, y, size, speedX, speedY));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// ===================================[ Songs Working mechanism ]==============================

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
  let fetchSongs = await fetch("/songs/");
  let response = await fetchSongs.text();

  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");

  let songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

let controlerBox = document.querySelector(".controlerBox");
controlerBox.style.opacity = "0";

let info = document.querySelector(".songinfo");
info.style.display = "none";

const playMusic = (track, pause = false) => {
  currentSong.src = "/songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "resources/pause.svg"
  }

  info.innerHTML = `<img src="resources/songicon.svg" alt="">` + track.replaceAll(".mp3", "");
  info.style.display = "flex";
  controlerBox.style.opacity = "100%";
  controlerBox.style.transform = "translateY(0)"
  controlerBox.style.transition = "all 1s";


  document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {

  // get the list of all the songs
  let songs = await getSongs();

  // Show all the songs in the playlist
  let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]

  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        style="fill: rgb(255, 255, 255);transform: ;msFilter:;">
        <path
          d="m19.684 5.821-9-3.272A1.998 1.998 0 0 0 8 4.428v6.129A3.953 3.953 0 0 0 6 10c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4V4.428L19 7.7v6.856A3.962 3.962 0 0 0 17 14c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4V7.7c0-.838-.529-1.594-1.316-1.879zM6 16c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm11 4c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z">
        </path>
      </svg>

      <div class="info">
        <div>${song.replaceAll("%20", " ")}</div>
        <div>Shubham</div>
      </div>

      <div class="playnow">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"
          style="fill: rgb(255, 255, 255);">
          <path
            d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z">
          </path>
          <path d="m9 17 8-5-8-5z"></path>
        </svg>
      </div>
    </li>`
  }

  Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    })
  })

  // Attach and event listener to play, next and previous. 
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play()
      play.src = "resources/pause.svg"
    }
    else {
      currentSong.pause();
      play.src = "resources/play.svg"
    }
  })

  // Listen for timeupdate event 
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
  })

  // Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent) / 100
  })

  // Add an event listener to previous
  previous.addEventListener("click", () => {
    currentSong.pause()
    console.log("Previous clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index - 1) >= 0) {
      playMusic(songs[index - 1].replaceAll("%20", " "))
    }
  })

  // Add an event listener to next
  next.addEventListener("click", () => {
    currentSong.pause()
    console.log("Next clicked")

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index + 1) < songs.length) {
      playMusic(songs[index + 1].replaceAll("%20", " "))
    }
  })

}

main()

// ================ Hamburgur ====================


var menuBar = document.querySelector("#menu");
var leftGrid = document.querySelector(".grid-left");
let cross = document.querySelector("#cross");

menuBar.addEventListener("click", function () {
  leftGrid.classList.toggle("slider");
})

cross.addEventListener("click", function () {
  leftGrid.classList.remove("slider");
})
