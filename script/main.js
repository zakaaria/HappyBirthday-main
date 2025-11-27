let audioUrl = "";
let audio = null;
let isPlaying = false;

// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data)
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData])
          } else if (customData === "fonts") {
            data[customData].forEach(font => {
              const link = document.createElement('link')
              link.rel = 'stylesheet'
              link.href = font.path
              document.head.appendChild(link)
              //设置body字体
              document.body.style.fontFamily = font.name
            })
          } else if (customData === "music") {
            audioUrl = data[customData]
            audio = new Audio(audioUrl)
            audio.preload = "auto"
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData]
          }
        }

        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          document.querySelector("#startButton").addEventListener("click", () => {
            document.querySelector(".startSign").style.display = "none"
            animationTimeline()
          })
        }
      })
    })
}



// Animation Timeline
const animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0]
  const hbd = document.getElementsByClassName("wish-hbd")[0]

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span`
  hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span`

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  }

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
    pointerEvents: "none"
  }

  const tl = new TimelineMax()

  tl
    .to(".container", 0.1, { visibility: "visible" })

    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10, pointerEvents: "none" }, "+=2.5")
    .to(".two", 0.7, { opacity: 0, y: 10, pointerEvents: "none" }, "-=1")

    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10, pointerEvents: "none" }, "+=2")

    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })

    .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)

    .to(".fake-btn", 0.1, { backgroundColor: "#8FE3B6" })

    .to(".four", 0.5, {
      scale: 0.2,
      opacity: 0,
      y: -150,
      pointerEvents: "none"
    }, "+=0.7")

    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-5", 0.7, {
      rotationX: 15,
      rotationZ: -10,
      skewY: "-5deg",
      y: 50,
      z: 10,
      opacity: 0
    }, "+=0.5")
    .to(".idea-5 .smiley", 0.7, { rotation: 90, x: 8 }, "+=0.4")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0, pointerEvents: "none" }, "+=2")

    .staggerFrom(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: 15,
      ease: Expo.easeOut
    }, 0.2)
    .staggerTo(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: -15,
      ease: Expo.easeOut,
      pointerEvents: "none"
    }, 0.2, "+=1")

    .staggerFromTo(".baloons img", 2.5,
      { opacity: 0.9, y: 1400 },
      { opacity: 1, y: -1000, pointerEvents: "none" },
      0.2
    )

    .from(".lydia-dp", 0.5, {
      scale: 3.5,
      opacity: 0,
      x: 25,
      y: -25,
      rotationZ: -45
    }, "-=2")
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })

    .staggerFrom(".wish-hbd span", 2.5, {
      opacity: 0,
      y: -50,
      rotation: 150,
      skewX: "30deg",
      ease: Elastic.easeOut.config(1, 0.5)
    }, 0.25)
    .staggerFromTo(".wish-hbd span", 1.5,
      { scale: 1.4, rotationY: 150 },
      { scale: 1, rotationY: 0, color: "#060f35", ease: Expo.easeOut },
      0.15,
      "party"
    )

    .from(".wish h5", 2.8, { 
      opacity: 0, 
      y: 5, 
      skewX: "-15deg",
      ease: Power2.easeOut
    }, "party")

    .to(".wish", 3, {
      textShadow: "0 0 20px #ff69b4, 0 0 35px #ff69b4",
      ease: Power1.easeOut,
      repeat: 1,
      yoyo: true
    })

    // 🎉 Final slow settle before next animation runs
    .to(".wish", 2, {
      opacity: 1,
      filter: "brightness(1.2)",
      y: 0,
      clearProps: "transform"
    })
    
    // Ensure wish h5 is fully visible and reset any transforms
    .to(".wish h5", 0.1, {
      y: 0,
      skewX: 0,
      clearProps: "transform"
    }, "-=0.5")

    .staggerTo(".eight svg", 1.5, {
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 3,
      repeatDelay: 1.4,
      pointerEvents: "none"
    }, 0.3)

    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1", pointerEvents: "none" })

    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)

    .to(".last-smile", 0.5, { rotation: 90 }, "+=1")

    // VERY IMPORTANT: remove all click blockers
    .set(".container *", { pointerEvents: "none" }, "+=0");


  const replyBtn = document.getElementById("replay")
  replyBtn.addEventListener("click", () => {
    tl.restart()
  })
}



// Run fetch and animation in sequence
fetchData()

const playPauseButton = document.getElementById('playPauseButton')

document.getElementById('startButton').addEventListener('click', () => {
  if (audio) togglePlay(true)
})

playPauseButton.addEventListener('click', () => {
  if (audio) togglePlay(!isPlaying)
})

function togglePlay(play) {
  if (!audio) return
  isPlaying = play
  play ? audio.play() : audio.pause()
  playPauseButton.classList.toggle('playing', play)
}



// MY OWN CODE FOR QUOTE GENERATOR

const quotes = [
  "Count your life by smiles, not tears.",
  "May your day be filled with sunshine and joy.",
  "Happiness is not something ready-made. It comes from your actions.",
  "Believe you can and you're halfway there.",
  "Do something today that your future self will thank you for.",
  "Each day is a new beginning. Take a deep breath and start again.",
  "The best is yet to come.",
  "Be the reason someone smiles today.",
  "Small steps every day lead to big results."
];

function generateQuote() {
  const quoteElement = document.getElementById("quoteText");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
}

// Generate a random quote on page load
window.onload = generateQuote;



//music play button in image section

document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playMusicBtn");
  const music = document.getElementById("friendsMusic");
  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (!isPlaying) {
      music.play().then(() => {
        isPlaying = true;
        playBtn.textContent = "🔊 Music Playing";
      }).catch(err => {
        console.log("Playback failed: ", err);
      });
    } else {
      music.pause();
      isPlaying = false;
      playBtn.textContent = "🎵 Play Music for vibes";
    }
  });
});


// --- COUNTDOWN TIMER (ISOLATED) ---
// --- IMPROVED COUNTDOWN TIMER ---
(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    targetDate: new Date("January 24, 2026 00:00:00").getTime(),
    updateInterval: 1000,
    elements: {
      countdown: null,
      finalMessage: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    }
  };
  
  // Cache DOM elements
  function initElements() {
    CONFIG.elements.countdown = document.getElementById("countdown");
    CONFIG.elements.finalMessage = document.getElementById("finalMessage");
    CONFIG.elements.days = document.getElementById("days");
    CONFIG.elements.hours = document.getElementById("hours");
    CONFIG.elements.minutes = document.getElementById("minutes");
    CONFIG.elements.seconds = document.getElementById("seconds");
    
    // Validate elements exist
    const allElementsExist = Object.values(CONFIG.elements).every(el => el !== null);
    if (!allElementsExist) {
      console.error("Countdown: Required DOM elements not found");
      return false;
    }
    return true;
  }
  
  // Calculate time remaining
  function calculateTimeRemaining(targetTime) {
    const now = Date.now();
    const diff = targetTime - now;
    
    if (diff <= 0) {
      return null;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  }
  
  // Format number with leading zero
  function padNumber(num) {
    return num.toString().padStart(2, "0");
  }
  
  // Update display
  function updateDisplay(timeData) {
    CONFIG.elements.days.textContent = padNumber(timeData.days);
    CONFIG.elements.hours.textContent = padNumber(timeData.hours);
    CONFIG.elements.minutes.textContent = padNumber(timeData.minutes);
    CONFIG.elements.seconds.textContent = padNumber(timeData.seconds);
  }
  
  // Show final message
  function showFinalMessage() {
    if (CONFIG.elements.countdown) {
      CONFIG.elements.countdown.style.display = "none";
    }
    if (CONFIG.elements.finalMessage) {
      CONFIG.elements.finalMessage.classList.add("show");
    }
  }
  
  // Main countdown function
  function updateCountdown() {
    const timeRemaining = calculateTimeRemaining(CONFIG.targetDate);
    
    if (timeRemaining === null) {
      showFinalMessage();
      return false; // Stop countdown
    }
    
    updateDisplay(timeRemaining);
    return true; // Continue countdown
  }
  
  // Initialize countdown
  function initCountdown() {
    if (!initElements()) {
      return;
    }
    
    // Initial update
    if (!updateCountdown()) {
      return;
    }
    
    // Set interval for updates
    const intervalId = setInterval(() => {
      if (!updateCountdown()) {
        clearInterval(intervalId);
      }
    }, CONFIG.updateInterval);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      clearInterval(intervalId);
    });
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
  } else {
    initCountdown();
  }
})();

// --- NOTEBOOK SECTION ---
// Isolated notebook functionality with auto-save to localStorage
(function() {
  'use strict';
  
  // ============================================
  // LOCALSTORAGE KEYS
  // ============================================
  const STORAGE_KEY_TEXT = 'abrareNote';      // Key for saving text notes
  const STORAGE_KEY_DRAWING = 'abrareDrawing'; // Key for saving canvas drawings
  
  // ============================================
  // STATE VARIABLES
  // ============================================
  let isDrawing = false;
  let isDrawingMode = false;
  let canvas, ctx, textarea, clearBtn, toggleBtn, saveBtn;
  let autoSaveTimeout = null; // Debounce timer for auto-saving drawings
  
  // ============================================
  // AUTO-SAVE FUNCTIONS
  // ============================================
  
  /**
   * Auto-save text content to localStorage
   * Called every time user types in the textarea
   */
  function autoSaveText() {
    const textValue = textarea.value;
    localStorage.setItem(STORAGE_KEY_TEXT, textValue);
  }
  
  /**
   * Auto-save canvas drawing to localStorage as base64
   * Called after every drawing stroke completes
   */
  function autoSaveDrawing() {
    // Convert canvas to base64 data URL
    const dataURL = canvas.toDataURL();
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY_DRAWING, dataURL);
  }
  
  // ============================================
  // LOAD SAVED CONTENT FUNCTIONS
  // ============================================
  
  /**
   * Load saved text from localStorage and insert into textarea
   * Called on page load
   */
  function loadSavedText() {
    const savedText = localStorage.getItem(STORAGE_KEY_TEXT);
    if (savedText !== null) {
      textarea.value = savedText;
    }
  }
  
  /**
   * Load saved drawing from localStorage and render on canvas
   * Called on page load after canvas is initialized
   */
  function loadSavedDrawing() {
    const savedDrawing = localStorage.getItem(STORAGE_KEY_DRAWING);
    if (savedDrawing) {
      const img = new Image();
      img.onload = () => {
        // Get device pixel ratio to scale image correctly
        const dpr = window.devicePixelRatio || 1;
        // Draw the saved image onto canvas
        ctx.drawImage(img, 0, 0, canvas.width / dpr, canvas.height / dpr);
      };
      img.src = savedDrawing;
    }
  }
  
  // ============================================
  // INITIALIZATION
  // ============================================
  
  function initNotebook() {
    // Get DOM elements
    canvas = document.getElementById('drawingCanvas');
    textarea = document.getElementById('notesTextarea');
    clearBtn = document.getElementById('clearBtn');
    toggleBtn = document.getElementById('toggleModeBtn');
    saveBtn = document.getElementById('saveBtn');
    
    if (!canvas || !textarea || !clearBtn || !toggleBtn || !saveBtn) {
      console.error('Notebook: Required elements not found');
      return;
    }
    
    // ============================================
    // CANVAS SETUP
    // ============================================
    const paper = canvas.parentElement;
    
    /**
     * Resize canvas to match paper container dimensions
     * Handles high-DPI displays for crisp drawing
     */
    const resizeCanvas = () => {
      const rect = paper.getBoundingClientRect();
      
      // Get device pixel ratio for crisp drawing on high-DPI displays
      const dpr = window.devicePixelRatio || 1;
      
      // Set the canvas display size (CSS pixels)
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      // Set the canvas internal size (actual pixels)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      if (ctx) {
        // Scale the context to match device pixel ratio
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };
    
    // Initialize canvas context
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // ============================================
    // LOAD SAVED CONTENT ON PAGE LOAD
    // ============================================
    // Load saved text immediately
    loadSavedText();
    
    // Load saved drawing after canvas is ready
    // Use setTimeout to ensure canvas is fully initialized
    setTimeout(() => {
      loadSavedDrawing();
    }, 100);
    
    // ============================================
    // DRAWING FUNCTIONALITY
    // ============================================
    let lastX = 0;
    let lastY = 0;
    
    /**
     * Start drawing - called on mousedown/touchstart
     */
    function startDrawing(e) {
      if (!isDrawingMode) return;
      e.preventDefault();
      e.stopPropagation();
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      lastY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    }
    
    /**
     * Draw stroke - called on mousemove/touchmove
     * Auto-saves drawing after each stroke
     */
    function draw(e) {
      if (!isDrawing || !isDrawingMode) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = canvas.getBoundingClientRect();
      const currentX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const currentY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
      
      // Draw the line
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      
      lastX = currentX;
      lastY = currentY;
      
      // Auto-save drawing after each stroke
      // Use debounce to avoid saving too frequently
      clearTimeout(autoSaveTimeout);
      autoSaveTimeout = setTimeout(() => {
        autoSaveDrawing();
      }, 100);
    }
    
    /**
     * Stop drawing - called on mouseup/touchend
     * Final auto-save when stroke completes
     */
    function stopDrawing() {
      isDrawing = false;
      // Final save when stroke ends
      autoSaveDrawing();
    }
    
    // ============================================
    // EVENT LISTENERS - DRAWING
    // ============================================
    
    // Mouse events for desktop
    canvas.addEventListener('mousedown', startDrawing, { passive: false });
    canvas.addEventListener('mousemove', draw, { passive: false });
    canvas.addEventListener('mouseup', stopDrawing, { passive: false });
    canvas.addEventListener('mouseleave', stopDrawing, { passive: false });
    
    // Touch events for mobile devices
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDrawingMode) return;
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      lastX = touch.clientX - rect.left;
      lastY = touch.clientY - rect.top;
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDrawing || !isDrawingMode) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const currentX = touch.clientX - rect.left;
      const currentY = touch.clientY - rect.top;
      
      // Draw the line
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      
      lastX = currentX;
      lastY = currentY;
      
      // Auto-save drawing after each stroke (mobile)
      clearTimeout(autoSaveTimeout);
      autoSaveTimeout = setTimeout(() => {
        autoSaveDrawing();
      }, 100);
    }, { passive: false });
    
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      stopDrawing();
    }, { passive: false });
    
    canvas.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      stopDrawing();
    }, { passive: false });
    
    // ============================================
    // EVENT LISTENERS - BUTTONS
    // ============================================
    
    /**
     * Clear button - clears current content and saves empty state
     */
    clearBtn.addEventListener('click', () => {
      if (isDrawingMode) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Save empty state
        autoSaveDrawing();
      } else {
        // Clear textarea
        textarea.value = '';
        // Save empty state
        autoSaveText();
      }
    });
    
    /**
     * Toggle mode button - switches between writing and drawing modes
     */
    toggleBtn.addEventListener('click', () => {
      isDrawingMode = !isDrawingMode;
      
      if (isDrawingMode) {
        // Switch to drawing mode
        canvas.classList.add('active');
        textarea.classList.add('hidden');
        textarea.style.pointerEvents = 'none';
        toggleBtn.textContent = '✍️ Switch to Writing';
        canvas.style.pointerEvents = 'auto';
        canvas.style.cursor = 'crosshair';
        // Reinitialize canvas context settings
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      } else {
        // Switch to writing mode
        canvas.classList.remove('active');
        textarea.classList.remove('hidden');
        textarea.style.pointerEvents = 'auto';
        toggleBtn.textContent = '✏️ Switch to Drawing';
        canvas.style.cursor = 'default';
      }
    });
    
    /**
     * Save button - exports content as downloadable file
     * Text exports as: AbrareNote.text
     * Drawing exports as: Abrare-drawing.png
     */
    saveBtn.addEventListener('click', () => {
      if (isDrawingMode) {
        // Export canvas drawing as PNG file
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Abrare-drawing.png'; // Export filename
          a.click();
          URL.revokeObjectURL(url);
        });
      } else {
        // Export text as file
        const text = textarea.value;
        if (text.trim()) {
          const blob = new Blob([text], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'AbrareNote.text'; // Export filename
          a.click();
          URL.revokeObjectURL(url);
        } else {
          alert('Nothing to save! Write something first.');
        }
      }
    });
    

    textarea.addEventListener('input', () => {
      autoSaveText();
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotebook);
  } else {
    initNotebook();
  }
})();

