// ===================================
// CONFIGURATION
// ===================================

// Login credentials (change these to your answers)
const correctUsername = 'oursong';
const correctPassword = 'oursymbol';

// Video configuration
// Place your videos in the 'videos' folder and name them exactly as shown below
const videos = {
    video1: {
        title: 'Our First Date 💕',
        file: 'videos/video1.mp4'
    },
    video2: {
        title: 'Special Moments ✨',
        file: 'videos/video2.mp4'
    },
    video3: {
        title: 'Our Adventures 🌍',
        file: 'videos/video3.mp4'
    },
    video4: {
        title: 'Love Notes 💌',
        file: 'videos/video4.mp4'
    }
};

// Captcha images configuration
// Place your images in the 'images' folder
// Use photos of yourself (correct) and other images (distractors)
const captchaImages = [
    { src: 'images/captcha1.jpg', isCorrect: true },   // Your photo
    { src: 'images/captcha2.jpg', isCorrect: false },  // Distractor (flower/scenery)
    { src: 'images/captcha3.jpg', isCorrect: true },   // Your photo
    { src: 'images/captcha4.jpg', isCorrect: false },  // Distractor
    { src: 'images/captcha5.jpg', isCorrect: true },   // Your photo
    { src: 'images/captcha6.jpg', isCorrect: false },  // Distractor
    { src: 'images/captcha7.jpg', isCorrect: true },   // Your photo
    { src: 'images/captcha8.jpg', isCorrect: false },  // Distractor
    { src: 'images/captcha9.jpg', isCorrect: true }    // Your photo
];

// ===================================
// APPLICATION LOGIC
// ===================================

let selectedCaptcha = [];

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.toLowerCase().trim();
    const password = document.getElementById('password').value.toLowerCase().trim();
    
    if (username === correctUsername && password === correctPassword) {
        showPage('captchaPage');
        initializeCaptcha();
    } else {
        document.getElementById('loginError').classList.add('show');
        setTimeout(() => {
            document.getElementById('loginError').classList.remove('show');
        }, 3000);
    }
});

// Initialize captcha grid
function initializeCaptcha() {
    const grid = document.getElementById('captchaGrid');
    grid.innerHTML = '';
    selectedCaptcha = [];
    
    // Shuffle images randomly
    const shuffled = [...captchaImages].sort(() => Math.random() - 0.5);
    
    shuffled.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'captcha-item';
        div.dataset.index = index;
        div.dataset.correct = item.isCorrect;
        
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = 'Captcha image';
        div.appendChild(img);
        
        div.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index);
            
            if (selectedCaptcha.includes(idx)) {
                selectedCaptcha = selectedCaptcha.filter(i => i !== idx);
                this.classList.remove('selected');
            } else {
                selectedCaptcha.push(idx);
                this.classList.add('selected');
            }
        });
        
        grid.appendChild(div);
    });
}

// Verify captcha
document.getElementById('verifyCaptcha').addEventListener('click', function() {
    const allCorrect = document.querySelectorAll('.captcha-item[data-correct="true"]');
    const allSelected = document.querySelectorAll('.captcha-item.selected');
    
    let isValid = true;
    
    // Check if all correct images are selected
    allCorrect.forEach(item => {
        if (!item.classList.contains('selected')) {
            isValid = false;
        }
    });
    
    // Check if no wrong images are selected
    allSelected.forEach(item => {
        if (item.dataset.correct !== 'true') {
            isValid = false;
        }
    });
    
    if (isValid && allCorrect.length === allSelected.length) {
        showPage('videosPage');
    } else {
        document.getElementById('captchaError').classList.add('show');
        setTimeout(() => {
            document.getElementById('captchaError').classList.remove('show');
        }, 3000);
    }
});

// Video card click handlers
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', function() {
        const videoId = this.dataset.video;
        openVideo(videoId);
    });
});

// Open video in modal
function openVideo(videoId) {
    const video = videos[videoId];
    document.getElementById('modalTitle').textContent = video.title;
    document.getElementById('videoPlayer').innerHTML = 
        `<video controls autoplay>
            <source src="${video.file}" type="video/mp4">
            Your browser does not support the video tag.
         </video>`;
    document.getElementById('videoModal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('videoModal').classList.remove('active');
    document.getElementById('videoPlayer').innerHTML = '';
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Close modal when clicking outside
document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});