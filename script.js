"use strict";


/* =========================================
   PENGATURAN UTAMA
========================================= */

const correctPIN = "777777";

let enteredPIN = "";

let currentSongIndex = 0;
let currentQuizIndex = 0;
let currentMemoryIndex = 0;

let selectedSongIndex = null;


/* =========================================
   DATA HINT
========================================= */

const hints = [
    {
        number: "01",
        image: "assets/kartu1.png",
        clue: "Angka Favorit akuu..."
    },
    {
        number: "02",
        image: "assets/kartu2.PNG",
        clue: "Angka Favorit kamuu..."
    },
    {
        number: "03",
        image: "assets/kartu3.PNG",
        clue: "Angka Favorit kitaa..."
    },
    {
        number: "04",
        image: "assets/kartu4.PNG",
        clue: "Warna pelangi ada berapaa?"
    },
    {
        number: "05",
        image: "assets/kartu5.png",
        clue: "Seminggu ada berapa harii?"
    },
    {
        number: "06",
        image: "assets/kartu6.PNG",
        clue: "Nada musik ada berapaa?"
    }
];


/* =========================================
   DATA MUSIK
========================================= */

const songs = [
    {
        title: "I Like Me Better",
        artist: "Lauv",
        album: "assets/lagu1.jpeg",
        audio: "assets/lagu1.mp3"
    },
    {
        title: "I Like Me Better Off My Face",
        artist: "Justin Bieber",
        album: "assets/lagu2.jpeg",
        audio: "assets/lagu2.mp3"
    },
    {
        title: "A Thausand Years",
        artist: "Cristina Perry and Steve Kazee",
        album: "assets/lagu3.jpeg",
        audio: "assets/lagu3.mp3"
    }
];


/* =========================================
   DATA KUIS
========================================= */

const quizzes = [
    {
        question: "Haii ciee lagi HBD niii, btw tau aku tidaa?",
        frontImage: "assets/foto1.PNG",
        backImage: "assets/foto1b.PNG",

        answers: [
            "joyaaa",
            "joyaa"
        ],

        backTitle: "Yeayy Aya inget akuuu",

        backMessage:
            "Haii Ayaa, Aku Joyaa, Selamat ulang tahun yaa🥳 Semogaa sehat selaluu, biar bisa ketemu aku teruss wkwk, btw traktir dongg aku suka permenn, kamu main game ku tidaa? mainn dongg biar kita bisa ketemu tiap harii, ketemu sama my bos juga tiap hari gapapaa, hehee",

        solved: false,
userAnswer: ""
    },
    {
        question: "Hehe, Ayaa inget akuu tidaa siapaa?",
        frontImage: "assets/foto2.PNG",
        backImage: "assets/foto2b.PNG",

        answers: [
            "piyooo",
            "piyoo"
        ],

        backTitle: "Yeayy Aya inget akuu jugaa",

        backMessage:
            "Happy Birthdayy yaa, semoga hal-hal yang kamu inginkan dan impikan terkabull🥳 Aku Piyoo, btw mau hadiahh apaa nii?? Eh traktir aku dulu aja sihh, yukk besok beli es krimm. Btw main yukk, main sama my bos juga dehh ku temeninn",

        solved: false,
        userAnswer: ""
    },
    {
        question: "Kalo ini siapa Aya?",
        frontImage: "assets/foto3.PNG",
        backImage: "assets/foto3b.PNG",

        answers: [
            "alif djuni",
            "aliff",
            "junii"
        ],

        backTitle: "Hehe, miann yaa...",

        backMessage:
            "Aku gak pandai buat kata-kata. Happy Birthdayy yaa Alyaamoraaaa....",

        solved: false,
userAnswer: ""
    },
    {
        question: "🎁Hehe, Ini Terakhir Dehh",
        frontImage: "",
        backImage: "",

        answers: [],

        backTitle: "Haiii, semoga belum bosenn yaa",

        backMessage:
            "Aku masih punya sesuatu buat kamu...",

        solved: false,
        finalCard: true
    }
];


/* =========================================
   DATA GALERI
========================================= */

const memories = [
    {
        image: "assets/foto1.jpg",
        caption: "???"
    },
    {
        image: "assets/foto2.jpg",
        caption: "???"
    },
    {
        image: "assets/foto3.jpg",
        caption: "???"
    }
];


/* =========================================
   ELEMEN HALAMAN
========================================= */

const pages =
    document.querySelectorAll(".page");

const musicPlayer =
    document.getElementById("musicPlayer");


/* =========================================
   PINDAH HALAMAN
========================================= */

function showPage(pageId) {
    pages.forEach((page) => {
        page.classList.add("hidden");
        page.classList.remove("active");
    });

    const selectedPage =
        document.getElementById(pageId);

    if (!selectedPage) {
        return;
    }

    selectedPage.classList.remove("hidden");
    selectedPage.classList.add("active");
}


/* =========================================
   HALAMAN PEMBUKA
========================================= */

document
.getElementById("openGift")
.addEventListener("click", () => {

    showPage("loadingPage");

    startLoadingPage();

});


/* =========================================
   SISTEM PIN
========================================= */

const pinBoxes =
    document.querySelectorAll(".pin-box");

const numberKeys =
    document.querySelectorAll(".number-key");

const deleteKey =
    document.getElementById("deleteKey");

const pinWarning =
    document.getElementById("pinWarning");

const pinPopup =
    document.getElementById("pinPopup");

const pinCorrectPopup =
    document.getElementById("pinCorrectPopup");

const pinCorrectCountdown =
    document.getElementById("pinCorrectCountdown");

numberKeys.forEach((key) => {
    key.addEventListener("click", () => {
        const number =
            key.dataset.number;

        if (enteredPIN.length >= 6) {
            return;
        }

        enteredPIN += number;

        updatePINDisplay();

        if (enteredPIN.length === 6) {
            setTimeout(checkPIN, 220);
        }
    });
});


deleteKey.addEventListener("click", () => {
    enteredPIN =
        enteredPIN.slice(0, -1);

    updatePINDisplay();

    pinWarning.textContent = "";
});


function updatePINDisplay() {
    pinBoxes.forEach((box, index) => {
        if (index < enteredPIN.length) {
            box.textContent =
                enteredPIN[index];

            box.classList.add("active");
        } else {
            box.textContent = "";

            box.classList.remove("active");
        }
    });
}


function resetPIN() {
    enteredPIN = "";

    pinWarning.textContent = "";

    updatePINDisplay();
}


function checkPIN() {

    if (enteredPIN === correctPIN) {

        pinWarning.textContent = "";

        pinCorrectPopup.classList.remove("hidden");

        let seconds = 3;

        pinCorrectCountdown.textContent = seconds;

        const timer = setInterval(() => {

            seconds--;

            pinCorrectCountdown.textContent = seconds;

            if(seconds <= 0){

                clearInterval(timer);

                pinCorrectPopup.classList.add("hidden");

                showPage("quizPage");

                renderQuiz();

            }

        },1000);

    } else {

        pinPopup.classList.remove("hidden");

        resetPIN();

    }
}



/* =========================================
   POPUP PIN SALAH
========================================= */

document
    .getElementById("tryAgainBtn")
    .addEventListener("click", () => {
        pinPopup.classList.add("hidden");

        resetPIN();
    });


document
    .getElementById("openHintBtn")
    .addEventListener("click", () => {
        pinPopup.classList.add("hidden");

        showPage("hintPage");
    });

document
.getElementById("backToPinBtn")
.addEventListener("click", () => {

    pinPopup.classList.add("hidden");

    showPage("passcode");

    resetPIN();

});


/* =========================================
   MEMBUAT ENAM KARTU HINT
========================================= */

const hintGrid =
    document.getElementById("hintGrid");


function createHintCards() {
    hintGrid.innerHTML = "";

    hints.forEach((hint) => {
        const card =
            document.createElement("div");

        card.className = "hint-item";

        card.innerHTML = `
            <div class="hint-inner">

                <div class="hint-front">

                    <span class="hint-number">
                        ${hint.number}
                    </span>

                    <img
                        src="${hint.image}"
                        alt="Hint ${hint.number}"
                        class="hint-image"
                    >

                    <small>
                        Ketuk kartunya
                    </small>

                </div>

                <div class="hint-back">

                    <strong>
                        CLUE ${hint.number}
                    </strong>

                    <p>
                        ${hint.clue}
                    </p>

                </div>

            </div>
        `;

        card.addEventListener("click", () => {
            card.classList.toggle("open");
        });

        hintGrid.appendChild(card);
    });
}


createHintCards();


/* =========================================
   HALAMAN LOADING
========================================= */

const loadingMenu =
    document.getElementById("loadingMenu");


let loadingTimer = null;


function startLoadingPage() {

    loadingMenu.classList.add("hidden");

    clearTimeout(loadingTimer);


    loadingTimer = setTimeout(() => {

        loadingMenu.classList.remove("hidden");

    },3500);

}


/* =========================================
   POPUP KALAU AYAA BURU-BURU
========================================= */

const rushPopup =
    document.getElementById("rushPopup");

const rushCountdown =
    document.getElementById("rushCountdown");


document
    .getElementById("rushBtn")
    .addEventListener("click", () => {

        let remainingSeconds = 7;

        rushCountdown.textContent =
            remainingSeconds;

        rushPopup.classList.remove("hidden");


        const timer =
            setInterval(() => {

                remainingSeconds--;

                rushCountdown.textContent =
                    remainingSeconds;


                if (remainingSeconds <= 0) {

                    clearInterval(timer);

                    rushPopup.classList.add(
                        "hidden"
                    );

                    showPage("passcode");

                    resetPIN();
                }

            }, 1000);

    });

document
.getElementById("continueBtn")
.addEventListener("click", () => {

    showPage("passcode");

    resetPIN();

});


function openQuizPage() {
    currentQuizIndex = 0;

    showPage("quizPage");

    renderQuiz();
}


/* =========================================
   MODAL MUSIK
========================================= */

const musicModal =
    document.getElementById("musicModal");

const songAlbum =
    document.getElementById("songAlbum");

const songTitle =
    document.getElementById("songTitle");

const songArtist =
    document.getElementById("songArtist");

const songCounter =
    document.getElementById("songCounter");

const playSongBtn =
    document.getElementById("playSongBtn");


document
    .getElementById("chooseMusicBtn")
    .addEventListener("click", openMusicModal);


document
    .getElementById("changeSongBtn")
    .addEventListener("click", openMusicModal);


function openMusicModal() {
    musicModal.classList.remove("hidden");

    renderSong();
}


function renderSong() {
    const song =
        songs[currentSongIndex];

    songAlbum.src = song.album;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    songCounter.textContent =
        `${currentSongIndex + 1} / ${songs.length}`;

    const sameSongPlaying =
        musicPlayer.src.includes(song.audio) &&
        !musicPlayer.paused;

    playSongBtn.textContent =
        sameSongPlaying ? "❚❚" : "▶";
}


document
    .getElementById("previousSongBtn")
    .addEventListener("click", () => {
        stopMusicPreview();

        currentSongIndex =
            (
                currentSongIndex - 1 +
                songs.length
            ) % songs.length;

        renderSong();
    });


document
    .getElementById("nextSongBtn")
    .addEventListener("click", () => {
        stopMusicPreview();

        currentSongIndex =
            (
                currentSongIndex + 1
            ) % songs.length;

        renderSong();
    });


playSongBtn.addEventListener("click", () => {
    const song =
        songs[currentSongIndex];

    const currentSource =
        musicPlayer.getAttribute("src");

    if (currentSource !== song.audio) {
        musicPlayer.src = song.audio;
    }

    if (musicPlayer.paused) {
        musicPlayer
            .play()
            .then(() => {
                playSongBtn.textContent = "❚❚";
            })
            .catch(() => {
                playSongBtn.textContent = "▶";
            });
    } else {
        musicPlayer.pause();

        playSongBtn.textContent = "▶";
    }
});


function stopMusicPreview() {
    musicPlayer.pause();

    playSongBtn.textContent = "▶";
}


/* =========================================
   MEMILIH MUSIK
========================================= */

document
    .getElementById("selectSongBtn")
    .addEventListener("click", () => {
        selectedSongIndex =
            currentSongIndex;

        const selectedSong =
            songs[selectedSongIndex];

        musicPlayer.src =
            selectedSong.audio;

        musicPlayer
            .play()
            .catch(() => {
                /*
                Browser kadang memblokir audio.
                Pengguna tetap bisa menekan tombol play.
                */
            });

        document
            .getElementById("miniAlbum")
            .src = selectedSong.album;

        document
            .getElementById("selectedSong")
            .textContent = selectedSong.title;

        document
            .getElementById("selectedArtist")
            .textContent = selectedSong.artist;

        document
            .getElementById("miniPlayer")
            .classList.remove("hidden");

        document
            .getElementById("musicMessage")
            .classList.remove("hidden");

        document
            .getElementById("continueBtn")
            .classList.remove("hidden");

        document
        .getElementById("rushBtn")
        .classList.add("hidden");

        document
        .getElementById("chooseMusicBtn")
        .classList.add("hidden");

        musicModal.classList.add("hidden");
    });


/* =========================================
   SISTEM KUIS
========================================= */

const quizCard =
    document.getElementById("quizCard");

const quizWrapper =
    document.querySelector(".quiz-wrapper");

let didSwipe = false;
let quizIsAnimating = false;


const quizImage =
    document.getElementById("quizImage");

const quizQuestion =
    document.getElementById("quizQuestion");

const quizAnswer =
    document.getElementById("quizAnswer");

const checkAnswerBtn =
    document.getElementById("checkAnswerBtn");

const quizFeedback =
    document.getElementById("quizFeedback");

const flipQuizBtn =
    document.getElementById("flipQuizBtn");

const quizBackImage =
    document.getElementById("quizBackImage");

const quizBackTitle =
    document.getElementById("quizBackTitle");

const quizBackMessage =
    document.getElementById("quizBackMessage");

const openLetterBtn =
    document.getElementById("openLetterBtn");

const quizCounter =
    document.getElementById("quizCounter");


function renderQuiz() {
    const quiz =
        quizzes[currentQuizIndex];

    quizCard.classList.remove("flipped");

    if (quizCounter) {
    quizCounter.textContent =
        `${currentQuizIndex + 1} / ${quizzes.length}`;
}

    quizFeedback.textContent = "";

quizFeedback.classList.remove(
    "correct-feedback"
);

flipQuizBtn.classList.add("hidden");
openLetterBtn.classList.add("hidden");

quizImage.classList.remove("hidden");
quizAnswer.classList.remove("hidden");


// reset hanya kalau belum pernah benar

if (!quiz.solved) {

    quizAnswer.value = "";

    quizAnswer.readOnly = false;

    checkAnswerBtn.classList.remove(
        "hidden"
    );

} else {

    quizAnswer.value = quiz.userAnswer;

    quizAnswer.readOnly = true;

    checkAnswerBtn.classList.add(
        "hidden"
    );

}

    quizBackImage.classList.remove("hidden");

    quizQuestion.textContent =
        quiz.question;

    quizBackTitle.textContent =
        quiz.backTitle;

    quizBackMessage.textContent =
        quiz.backMessage;

    if (quiz.finalCard) {
        renderFinalQuizCard();

        return;
    }

    quizImage.src =
        quiz.frontImage;

    quizBackImage.src =
        quiz.backImage;


        /* kartu benar jawaban */
        if (quiz.solved) {
    checkAnswerBtn.classList.add("hidden");

    quizAnswer.readOnly = true;

    quizFeedback.textContent =
        "Yeayyy, Benerrrr!! 🎉";

    quizFeedback.style.color =
        "#66a96d";

    quizFeedback.classList.add(
        "correct-feedback"
    );

    flipQuizBtn.textContent =
        "✨ Ketuk Kartunya ✨";

    flipQuizBtn.classList.remove("hidden");
    }
}

/* =========================================
   GANTI KUIS DENGAN ANIMASI SWIPE
========================================= */

function changeQuiz(direction) {

    if (quizIsAnimating) {
        return;
    }

    quizIsAnimating = true;

    const goingNext =
        direction === "next";

    const exitClass =
        goingNext
            ? "quiz-exit-left"
            : "quiz-exit-right";

    const enterClass =
        goingNext
            ? "quiz-enter-right"
            : "quiz-enter-left";


    quizWrapper.classList.remove(
        "quiz-exit-left",
        "quiz-exit-right",
        "quiz-enter-left",
        "quiz-enter-right"
    );


    quizCard.classList.remove("flipped");

    quizWrapper.classList.add(
        exitClass
    );


    /*
    Tunggu kartu lama selesai keluar.
    */

    setTimeout(() => {

        if (goingNext) {

            currentQuizIndex =
                (
                    currentQuizIndex + 1
                ) % quizzes.length;

            quizCard.classList.remove("flipped");

        } else {

            currentQuizIndex =
                (
                    currentQuizIndex - 1 +
                    quizzes.length
                ) % quizzes.length;
        }

        quizCard.classList.remove("flipped");

        renderQuiz();

        quizWrapper.classList.remove(
            exitClass
        );


        /*
        Memaksa browser memulai animasi baru.
        */

        void quizWrapper.offsetWidth;


        quizWrapper.classList.add(
            enterClass
        );


        /*
        Bersihkan class setelah kartu masuk.
        */

        setTimeout(() => {

            quizWrapper.classList.remove(
                enterClass
            );

            quizIsAnimating = false;

        }, 300);

    }, 220);
}

function renderFinalQuizCard() {
    const allSolved =
        quizzes
            .slice(0, 3)
            .every((quiz) => quiz.solved);

    quizImage.classList.add("hidden");
    quizAnswer.classList.add("hidden");
    checkAnswerBtn.classList.add("hidden");

    quizBackImage.classList.add("hidden");

    if (allSolved) {
        quizFeedback.textContent =
            "🎉 Semua pertanyaan selesai!";

        quizFeedback.style.color =
            "#66a96d";

        flipQuizBtn.textContent =
            "✨ Buka hadiah terakhir ✨";

        flipQuizBtn.classList.remove("hidden");

        openLetterBtn.classList.remove("hidden");
    } else {
        quizFeedback.textContent =
            "🔒 Selesaikan tiga kartu sebelumnya dulu yaa.";

        quizFeedback.style.color =
            "#df679b";

        flipQuizBtn.classList.add("hidden");
    }
}


/* =========================================
   PERIKSA JAWABAN
========================================= */

checkAnswerBtn.addEventListener("click", checkQuizAnswer);


quizAnswer.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkQuizAnswer();
    }
});


function checkQuizAnswer() {
    const quiz =
        quizzes[currentQuizIndex];

    if (quiz.finalCard) {
        return;
    }

    const answer =
        quizAnswer.value
            .trim()
            .toLowerCase();

    if (answer === "") {
        quizFeedback.classList.remove(
            "correct-feedback"
        );
        quizFeedback.textContent =
            "🥺 Isi dulu jawabannya yaa.";

        quizFeedback.style.color =
            "#df679b";

        return;
    }

    const correct =
        quiz.answers.some((item) => {
            return item.toLowerCase() === answer;
        });


        /* Jawaban kartu bener */
    if (correct) {

    quiz.solved = true;

    quiz.userAnswer = answer;

    checkAnswerBtn.classList.add("hidden");

    quizAnswer.readOnly = true;

    quizFeedback.textContent =
        "Yeayyy, Benerrrr!! 🎉";

    quizFeedback.style.color =
        "#66a96d";

    quizFeedback.classList.add(
        "correct-feedback"
    );

    flipQuizBtn.textContent =
        "✨ Ketuk Kartunya ✨";

    flipQuizBtn.classList.remove("hidden");
} else {
    quizFeedback.classList.remove(
        "correct-feedback"
    );

    quizFeedback.textContent =
        "🤭 Yahh salah, coba lagi yaa.";

    quizFeedback.style.color =
        "#df679b";
    }
}


/* =========================================
   BALIK KARTU KUIS
========================================= */

quizCard.addEventListener("click", () => {

    if (quizIsAnimating) {
        return;
    }

    const quiz =
        quizzes[currentQuizIndex];

    const finalUnlocked =
        quizzes
        .slice(0,3)
        .every((item)=>item.solved);


    if (
        quiz.solved ||
        (quiz.finalCard && finalUnlocked)
    ) {
        quizCard.classList.toggle("flipped");
    }

});

quizAnswer.addEventListener("click", e=>{
    e.stopPropagation();
});

checkAnswerBtn.addEventListener("click", e=>{
    e.stopPropagation();
});

/* =========================================
   NAVIGASI KUIS
========================================= */

document
    .getElementById("previousQuizBtn")
    ?.addEventListener("click", () => {
        changeQuiz("previous");
    });


document
    .getElementById("nextQuizBtn")
    ?.addEventListener("click", () => {
        changeQuiz("next");
    });


/* =========================================
   HALAMAN SURAT
========================================= */

openLetterBtn.addEventListener("click", () => {
    showPage("letterPage");
});


document
    .getElementById("openMemoryBtn")
    .addEventListener("click", () => {
        currentMemoryIndex = 0;

        showPage("memoryPage");

        renderMemory();
    });


/* =========================================
   GALERI KENANGAN
========================================= */

const memoryImage =
    document.getElementById("memoryImage");

const memoryCaption =
    document.getElementById("memoryCaption");

const memoryCounter =
    document.getElementById("memoryCounter");


function renderMemory() {
    const memory =
        memories[currentMemoryIndex];

    memoryImage.src =
        memory.image;

    memoryCaption.textContent =
        memory.caption;

    memoryCounter.textContent =
        `${currentMemoryIndex + 1} / ${memories.length}`;
}


document
    .getElementById("previousMemoryBtn")
    .addEventListener("click", () => {
        currentMemoryIndex =
            (
                currentMemoryIndex - 1 +
                memories.length
            ) % memories.length;

        renderMemory();
    });


document
    .getElementById("nextMemoryBtn")
    .addEventListener("click", () => {
        currentMemoryIndex =
            (
                currentMemoryIndex + 1
            ) % memories.length;

        renderMemory();
    });


document
    .getElementById("finishBtn")
    .addEventListener("click", () => {
        showPage("closingPage");
    });


/* =========================================
   SWIPE DENGAN JARI DAN DRAG MOUSE
========================================= */

function addSwipeGesture(
    element,
    swipeLeft,
    swipeRight
) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;


    element.addEventListener(
        "pointerdown",
        (event) => {

            const clickedElement =
                event.target;

            /*
            Jangan mulai swipe saat sedang
            menekan tombol atau mengisi input.
            */

            if (
                clickedElement.closest("button") ||
                clickedElement.closest("input") ||
                clickedElement.closest("textarea")
            ) {
                return;
            }

            startX = event.clientX;
            startY = event.clientY;

            isDragging = true;

            isDragging = true;

            element.setPointerCapture?.(
                event.pointerId
            );
        }
    );


    element.addEventListener(
        "pointerup",
        (event) => {

            if (!isDragging) {
                return;
            }

            isDragging = false;

            const distanceX =
                event.clientX - startX;

            const distanceY =
                event.clientY - startY;

            const horizontalDistance =
                Math.abs(distanceX);

            const verticalDistance =
                Math.abs(distanceY);

            /*
            Gerakan harus dominan ke samping
            dan lebih dari 55 piksel.
            */
            
            didSwipe = true;
            if (
                horizontalDistance < 55 ||
                horizontalDistance <= verticalDistance
            ) {
                return;
            }

            /*
            Geser ke kiri:
            pertanyaan berikutnya.
            */

            if (distanceX < 0) {
                swipeLeft();
            }

            /*
            Geser ke kanan:
            pertanyaan sebelumnya.
            */

            if (distanceX > 0) {
                swipeRight();
            }
        }
    );


    element.addEventListener(
        "pointercancel",
        () => {
            isDragging = false;
        }
    );
}

/* Aktifkan swipe pada halaman kuis */

addSwipeGesture(
    document.getElementById("quizCard"),

    () => {
        changeQuiz("next");
    },

    () => {
        changeQuiz("previous");
    }
);

/* =========================================
   TOMBOL KEYBOARD LAPTOP
========================================= */

document.addEventListener("keydown", (event) => {
    const passcodeVisible =
        !document
            .getElementById("passcode")
            .classList
            .contains("hidden");

    if (passcodeVisible) {
        if (
            /^[0-9]$/.test(event.key) &&
            enteredPIN.length < 6
        ) {
            enteredPIN += event.key;

            updatePINDisplay();

            if (enteredPIN.length === 6) {
                setTimeout(checkPIN, 220);
            }
        }

        if (event.key === "Backspace") {
            enteredPIN =
                enteredPIN.slice(0, -1);

            updatePINDisplay();
        }
    }
});


/* =========================================
   NAVIGASI KUIS DENGAN KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        const quizPageVisible =
            !document
                .getElementById("quizPage")
                .classList
                .contains("hidden");


        if (
            !quizPageVisible ||
            quizIsAnimating
        ) {
            return;
        }


        /*
        Panah kanan:
        kartu berikutnya.
        */

        if (event.key === "ArrowRight") {

            event.preventDefault();

            changeQuiz("next");
        }


        /*
        Panah kiri:
        kartu sebelumnya.
        */

        if (event.key === "ArrowLeft") {

            event.preventDefault();

            changeQuiz("previous");
        }
    }
);


/* =========================================
   SWIPE HORIZONTAL DENGAN TRACKPAD
========================================= */

const quizPageForTrackpad =
    document.getElementById("quizPage");


quizPageForTrackpad.addEventListener(
    "wheel",
    (event) => {

        const horizontalMovement =
            Math.abs(event.deltaX);

        const verticalMovement =
            Math.abs(event.deltaY);


        /*
        Abaikan scroll vertikal dan
        gerakan trackpad yang terlalu kecil.
        */

        if (
            horizontalMovement < 25 ||
            horizontalMovement <= verticalMovement ||
            quizIsAnimating
        ) {
            return;
        }


        event.preventDefault();


        if (event.deltaX > 0) {

            changeQuiz("next");

        } else {

            changeQuiz("previous");
        }
    },
    {
        passive: false
    }
);


/* =========================================
   FOTO ES KRIM TERBANG
========================================= */

function createFlyingIceCream() {
    const iceCream =
        document.createElement("img");

    iceCream.src =
        "assets/eskrim.PNG";

    iceCream.alt = "";

    iceCream.className =
        "floating-icecream";

    iceCream.style.left =
        Math.random() * 95 + "vw";

    const size =
        28 + Math.random() * 20;

    iceCream.style.width =
        size + "px";

    iceCream.style.height =
        size + "px";

    const duration =
        5 + Math.random() * 3;

    iceCream.style.animationDuration =
        duration + "s";

    document.body.appendChild(iceCream);

    setTimeout(() => {
        iceCream.remove();
    }, duration * 1000);
}


setInterval(
    createFlyingIceCream,
    900
);


/* =========================================
   KONDISI AWAL WEBSITE
========================================= */

showPage("opening");

updatePINDisplay();

renderSong();

renderQuiz();

renderMemory();


