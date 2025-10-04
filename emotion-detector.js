// Emotion Detection Break Reminder App
// Uses face-api.js for facial expression recognition

let video, overlay, canvas;
let isDetecting = false;
let detectionInterval;
let sessionStartTime;
let timerInterval;

// Emotion tracking
let emotionHistory = {
    happy: 0,
    neutral: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    disgusted: 0,
    fearful: 0
};

let consecutiveUnhappyTime = 0;
let lastUnhappyCheckTime = Date.now();
let hasShownBreakNotification = false;

// Settings
let unhappyThreshold = 2; // minutes
let soundEnabled = true;

// Break reminder tips
const breakTips = [
    "Take a 5-minute walk to refresh your mind and body.",
    "Try the 20-20-20 rule: Look at something 20 feet away for 20 seconds.",
    "Do some simple stretches at your desk to relieve tension.",
    "Close your eyes and take 10 deep breaths to reduce stress.",
    "Stand up and do some shoulder rolls and neck stretches.",
    "Drink a glass of water and give your eyes a rest from the screen.",
    "Step outside for some fresh air if possible.",
    "Do some quick eye exercises: look up, down, left, and right slowly.",
    "Massage your temples gently to relieve eye strain.",
    "Practice the palm technique: rub your hands together and place them over your closed eyes."
];

// Initialize the app
async function init() {
    video = document.getElementById('video');
    overlay = document.getElementById('overlay');
    canvas = overlay.getContext('2d');

    // Load face-api models
    await loadModels();
    
    // Setup event listeners
    setupEventListeners();
    
    updateStatus('Ready to start', false);
}

async function loadModels() {
    updateStatus('Loading AI models...', false);
    
    try {
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model/';
        
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
        
        console.log('Models loaded successfully');
    } catch (error) {
        console.error('Error loading models:', error);
        updateStatus('Error loading models. Please refresh the page.', false);
    }
}

function setupEventListeners() {
    document.getElementById('startBtn').addEventListener('click', startDetection);
    document.getElementById('stopBtn').addEventListener('click', stopDetection);
    document.getElementById('dismissBtn').addEventListener('click', dismissNotification);
    
    // Settings
    const thresholdSlider = document.getElementById('threshold');
    thresholdSlider.addEventListener('input', (e) => {
        unhappyThreshold = parseInt(e.target.value);
        document.getElementById('thresholdValue').textContent = unhappyThreshold;
    });
    
    document.getElementById('soundEnabled').addEventListener('change', (e) => {
        soundEnabled = e.target.checked;
    });
}

async function startDetection() {
    try {
        // Request webcam access
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 640 },
                height: { ideal: 480 }
            } 
        });
        
        video.srcObject = stream;
        
        // Wait for video to be ready
        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                resolve();
            };
        });
        
        // Set canvas dimensions to match video
        overlay.width = video.videoWidth;
        overlay.height = video.videoHeight;
        
        isDetecting = true;
        sessionStartTime = Date.now();
        consecutiveUnhappyTime = 0;
        lastUnhappyCheckTime = Date.now();
        hasShownBreakNotification = false;
        
        // Reset emotion counters
        Object.keys(emotionHistory).forEach(key => emotionHistory[key] = 0);
        updateEmotionStats();
        
        // Update UI
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        updateStatus('Detecting emotions...', true);
        
        // Start detection loop
        detectEmotions();
        
        // Start session timer
        timerInterval = setInterval(updateSessionTimer, 1000);
        
    } catch (error) {
        console.error('Error accessing webcam:', error);
        alert('Unable to access webcam. Please ensure you have granted camera permissions.');
        updateStatus('Error: Camera access denied', false);
    }
}

function stopDetection() {
    isDetecting = false;
    
    // Stop webcam
    const stream = video.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
    
    // Clear intervals
    if (detectionInterval) {
        clearInterval(detectionInterval);
    }
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Clear canvas
    canvas.clearRect(0, 0, overlay.width, overlay.height);
    
    // Update UI
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    updateStatus('Detection stopped', false);
}

async function detectEmotions() {
    if (!isDetecting) return;
    
    try {
        // Detect faces with expressions
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions()
            .withFaceLandmarks();
        
        // Clear canvas
        canvas.clearRect(0, 0, overlay.width, overlay.height);
        
        if (detections && detections.length > 0) {
            // Draw detections
            const resizedDetections = faceapi.resizeResults(detections, {
                width: overlay.width,
                height: overlay.height
            });
            
            // Draw bounding boxes and expressions
            resizedDetections.forEach(detection => {
                const box = detection.detection.box;
                const expressions = detection.expressions;
                
                // Draw bounding box
                canvas.strokeStyle = '#6366f1';
                canvas.lineWidth = 3;
                canvas.strokeRect(box.x, box.y, box.width, box.height);
                
                // Get dominant emotion
                const dominantEmotion = getDominantEmotion(expressions);
                
                // Draw emotion label
                canvas.fillStyle = '#6366f1';
                canvas.fillRect(box.x, box.y - 30, box.width, 30);
                canvas.fillStyle = '#ffffff';
                canvas.font = '16px Arial';
                canvas.fillText(
                    `${dominantEmotion.emotion} ${Math.round(dominantEmotion.value * 100)}%`,
                    box.x + 5,
                    box.y - 10
                );
                
                // Track emotions
                trackEmotions(expressions);
            });
            
            // Check if break is needed
            checkBreakReminder();
        }
        
    } catch (error) {
        console.error('Detection error:', error);
    }
    
    // Continue detection loop
    setTimeout(() => detectEmotions(), 100);
}

function getDominantEmotion(expressions) {
    let maxEmotion = { emotion: 'neutral', value: 0 };
    
    Object.entries(expressions).forEach(([emotion, value]) => {
        if (value > maxEmotion.value) {
            maxEmotion = { emotion, value };
        }
    });
    
    return maxEmotion;
}

function trackEmotions(expressions) {
    // Map face-api emotions to our categories
    const happy = expressions.happy;
    const neutral = expressions.neutral;
    const sad = expressions.sad + expressions.angry + expressions.disgusted + expressions.fearful;
    
    // Update counters
    if (happy > 0.5) {
        emotionHistory.happy++;
    } else if (sad > 0.3) {
        emotionHistory.sad++;
        
        // Track consecutive unhappy time
        const now = Date.now();
        const timeSinceLastCheck = (now - lastUnhappyCheckTime) / 1000; // seconds
        consecutiveUnhappyTime += timeSinceLastCheck;
        lastUnhappyCheckTime = now;
    } else {
        emotionHistory.neutral++;
        // Reset consecutive unhappy time if emotion is neutral or happy
        consecutiveUnhappyTime = 0;
        lastUnhappyCheckTime = Date.now();
    }
    
    updateEmotionStats();
}

function updateEmotionStats() {
    document.getElementById('happyCount').textContent = emotionHistory.happy;
    document.getElementById('neutralCount').textContent = emotionHistory.neutral;
    document.getElementById('sadCount').textContent = emotionHistory.sad;
}

function checkBreakReminder() {
    const unhappyMinutes = consecutiveUnhappyTime / 60;
    
    if (unhappyMinutes >= unhappyThreshold && !hasShownBreakNotification) {
        showBreakNotification();
        hasShownBreakNotification = true;
        
        // Reset after showing notification
        setTimeout(() => {
            hasShownBreakNotification = false;
            consecutiveUnhappyTime = 0;
        }, 60000); // Can show again after 1 minute
    }
}

function showBreakNotification() {
    const notification = document.getElementById('notification');
    const randomTip = breakTips[Math.floor(Math.random() * breakTips.length)];
    
    document.getElementById('notificationTitle').textContent = '⏰ Time for a Break!';
    document.getElementById('notificationMessage').textContent = 
        `You've been looking stressed or tired. ${randomTip}`;
    
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Play notification sound if enabled
    if (soundEnabled) {
        playNotificationSound();
    }
}

function dismissNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 300);
}

function playNotificationSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

function updateSessionTimer() {
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('sessionTime').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateStatus(text, active) {
    document.getElementById('statusText').textContent = text;
    const statusElement = document.querySelector('.status');
    if (active) {
        statusElement.classList.add('active');
    } else {
        statusElement.classList.remove('active');
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
