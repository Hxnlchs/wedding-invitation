// Countdown
simplyCountdown(".simply-countdown", {
  year: 2024, // required
  month: 12, // required
  day: 25, // required
  hours: 18, // Default is 0 [0-23] integer
  words: {
    //words displayed into the countdown
    days: { singular: "day", plural: "days" },
    hours: { singular: "hour", plural: "hours" },
    minutes: { singular: "minute", plural: "minutes" },
    seconds: { singular: "second", plural: "seconds" },
  },
});

const stickyTop = document.querySelector(".sticky-top");
const offcanvas = document.querySelector(".offcanvas");

offcanvas.addEventListener("show.bs.offcanvas", function () {
  stickyTop.style.overflow = "visible";
});

offcanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

// Disable Scroll
const rootElement = document.querySelector(":root");
const heroSection = document.getElementById("#hero"); // Sesuaikan dengan ID atau class hero section Anda
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
let isPlaying = false;
const song = document.querySelector("#song");

function saveScrollPosition() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  localStorage.setItem("scrollPosition", scrollTop);
}

function disableScroll() {
  saveScrollPosition(); // Simpan posisi scroll sebelum menonaktifkan scroll

  window.onscroll = function () {
    window.scrollTo(0, 0); // Posisi scroll selalu diatur ke (0, 0)
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  localStorage.removeItem("scrollPosition"); // Hapus posisi scroll yang telah disimpan
  playAudio();
}

function playAudio() {
  song.volume = 0.3;
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isPlaying = !isPlaying;
};

function restoreScrollPosition() {
  const savedPosition = localStorage.getItem("scrollPosition");

  if (savedPosition !== null) {
    window.scrollTo(0, savedPosition);
  }
}
window.addEventListener("load", restoreScrollPosition);
disableScroll();

// Form Submit
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Data Kehadiran Berhasil Dikonfirmasi!");
    });
  });
});

//Animation top/left/scale

const elementsToAnimate = document.querySelectorAll(".fade-in, .animate-from-top, .animate-from-left, animate-from-right, .animate-scale");

function checkScroll() {
  elementsToAnimate.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight) {
      setTimeout(() => {
        element.classList.add("visible");
      }, 200);
    }
  });
}

function handleScroll() {
  window.addEventListener("scroll", () => {
    checkScroll();
  });
}

// Panggil fungsi handleScroll untuk memulai mendeteksi scroll dan animasi
handleScroll();
