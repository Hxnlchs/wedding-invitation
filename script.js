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

// Nama Undangan
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || "";
const pronoun = urlParams.get("p") || "All";
const namaContainer = document.querySelector(".hero h3 span");
namaContainer.innerText = `${pronoun} ${nama}`;

document.querySelector("#name").value = nama;

// Daftar Ucapan
// Fungsi untuk mendapatkan daftar ucapan dari penyimpanan lokal
function getGuestListFromStorage() {
  const storedGuestList = localStorage.getItem("guestList");
  return storedGuestList ? JSON.parse(storedGuestList) : [];
}

// Fungsi untuk menambahkan ucapan ke daftar dan menyimpannya di penyimpanan lokal
function addGuest() {
  const name = document.getElementById("guestName").value;
  const ucapan = document.getElementById("guestWish").value;

  if (name.trim() === "" || ucapan.trim() === "") {
    alert("Silakan isi nama dan ucapan.");
    return;
  }

  // Membuat elemen <li> baru untuk nama
  const nameItem = document.createElement("li");
  nameItem.innerHTML = "<strong>" + name + "</strong>";

  // Membuat elemen <li> baru untuk ucapan
  const ucapanItem = document.createElement("li");
  ucapanItem.innerHTML = ucapan;

  // Menambahkan elemen <li> nama dan ucapan sebagai anak-anak dari <ul>
  const guestListElement = document.getElementById("guestList");
  guestListElement.appendChild(nameItem);
  guestListElement.appendChild(ucapanItem);

  // Mendapatkan daftar ucapan dari penyimpanan lokal
  const guestList = getGuestListFromStorage();

  // Menambahkan ucapan baru ke daftar
  guestList.push({ name: name, ucapan: ucapan });

  // Menyimpan daftar ucapan kembali ke penyimpanan lokal
  localStorage.setItem("guestList", JSON.stringify(guestList));

  document.getElementById("guestName").value = "";
  document.getElementById("guestWish").value = "";
}

// Fungsi untuk menampilkan daftar ucapan dari penyimpanan lokal saat halaman dimuat
function displayGuestList() {
  const guestList = getGuestListFromStorage();
  const guestListElement = document.getElementById("guestList");

  guestList.forEach((guest) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = "<strong>" + guest.name + "</strong> " + guest.ucapan;
    guestListElement.appendChild(listItem);
  });
}

// Memanggil fungsi untuk menampilkan daftar ucapan saat halaman dimuat
window.onload = displayGuestList;

// Fungsi untuk menghitung selisih waktu dan mengembalikan teks "time ago"
function timeAgo(timestamp) {
  const currentTime = new Date();
  const messageTime = new Date(timestamp);
  const timeDifference = currentTime - messageTime;

  // Konversi waktu dalam milidetik ke detik
  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return seconds + " seconds ago";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return minutes + (minutes > 1 ? " minutes ago" : " minute ago");
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return hours + (hours > 1 ? " hours ago" : " hour ago");
  } else {
    const days = Math.floor(seconds / 86400);
    return days + (days > 1 ? " days ago" : " day ago");
  }
}

// Untuk Menhapus Ucapan
// Fungsi untuk menampilkan daftar ucapan dari penyimpanan lokal saat halaman dimuat
// function displayGuestList() {
//   const guestList = getGuestListFromStorage();
//   const guestListElement = document.getElementById("guestList");

//   guestList.forEach((guest, index) => {
//     const listItem = document.createElement("li");
//     listItem.innerHTML = "<strong>" + guest.name + ":</strong> " + guest.ucapan;

//     // Membuat tombol penghapusan
//     const deleteButton = document.createElement("button");
//     deleteButton.innerHTML = "Hapus";
//     deleteButton.onclick = function() {
//       deleteGuest(index);
//     };

//     // Menambahkan tombol penghapusan ke dalam elemen <li>
//     listItem.appendChild(deleteButton);

//     // Menambahkan elemen <li> ke dalam daftar
//     guestListElement.appendChild(listItem);
//   });
// }

// // Fungsi untuk menghapus ucapan dari daftar dan penyimpanan lokal
// function deleteGuest(index) {
//   const guestList = getGuestListFromStorage();

//   // Hapus ucapan dari daftar berdasarkan index
//   const deletedGuest = guestList.splice(index, 1);

//   // Simpan daftar ucapan yang telah diubah kembali ke penyimpanan lokal
//   localStorage.setItem("guestList", JSON.stringify(guestList));

//   // Perbarui tampilan daftar ucapan
//   displayGuestList();
// }
