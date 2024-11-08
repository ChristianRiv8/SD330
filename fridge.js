// Get DOM elements
const onOffButton = document.getElementById('onOffButton');
const displaySection = document.getElementById('displaySection');
const buttonSection = document.getElementById('buttonSection');
const fridgeModule = document.getElementById('fridgeModule');
const fridgeImage = document.getElementById('fridgeImage');
const tvModule = document.getElementById('tvModule');
const browserModule = document.getElementById('browserModule');
const temperatureModule = document.getElementById('temperatureModule');
const timeDisplay = document.getElementById('timeDisplay');
const clock = document.getElementById('currentTime');
const timeToggleButton = document.getElementById('timeToggleButton');
const weatherModule = document.getElementById('weatherModule');  // Weather module element

let isOn = false;  // Track the on/off state
let is24Hour = true;  // Default to 24-hour format
let temperature = 20;  // Default temperature (Celsius)
let temperatureUnit = 'C';  // Default to Celsius
let fridgeOpen = false;  // Track fridge open/close state
let clockInterval;  // To store interval for updating the clock

// Function to update the clock in 12/24 hour format
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = '';

    if (!is24Hour) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
    }

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    clock.textContent = timeString.trim();
}

// Toggle between 12-hour and 24-hour format
function toggleTimeFormat() {
    is24Hour = !is24Hour;
    updateClock();  
}

// Function to toggle fridge view
function toggleFridgeView() {
    hideAllModules();  
    fridgeModule.style.display = 'flex';
    if (fridgeOpen) {
        fridgeImage.src = "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5728/5728818_sd.jpg"; 
    } else {
        fridgeImage.src = "https://wilshirerefrigeration.com/wp-content/uploads/2020/07/Open-Refrigerator-With-Food-Inside-scaled.jpg"; 
    }
    fridgeOpen = !fridgeOpen;  
}

// Function to show selected module (TV, Browser, Weather, etc.)
function showModule(module) {
    hideAllModules();
    if (module === 'tv') {
        tvModule.style.display = 'flex';
    } else if (module === 'browser') {
        browserModule.style.display = 'flex';
    } else if (module === 'temperature') {
        temperatureModule.style.display = 'flex';
    } else if (module === 'time') {
        timeDisplay.style.display = 'flex';
    } else if (module === 'weather') {
        weatherModule.style.display = 'flex';
      }
}

// Function to show weather module
function showWeather() {
    hideAllModules();  
    weatherModule.style.display = 'flex';  
}

// Hide all modules
function hideAllModules() {
    fridgeModule.style.display = 'none';
    tvModule.style.display = 'none';
    browserModule.style.display = 'none';
    temperatureModule.style.display = 'none';
    timeDisplay.style.display = 'none';  
    weatherModule.style.display = 'none';  
    shoppingListModule.style.display = 'none';
    hideTimer();
}

// Function to toggle display on and off
function toggleDisplay() {
    isOn = !isOn;
    if (isOn) {
        displaySection.classList.remove('hidden');
        timeDisplay.classList.remove('hidden'); 
        onOffButton.textContent = 'Turn Off';
        onOffButton.classList.remove('off');
        buttonSection.style.display = 'flex';  
        clockInterval = setInterval(updateClock, 1000);  
    } else {
        displaySection.classList.add('hidden');
        timeDisplay.classList.add('hidden'); 
        onOffButton.textContent = 'Turn On';
        onOffButton.classList.add('off');
        buttonSection.style.display = 'none';  
        hideAllModules();  
        clearInterval(clockInterval);  
    }
}

// Event Listeners
onOffButton.addEventListener('click', toggleDisplay);
timeToggleButton.addEventListener('click', toggleTimeFormat);

// Temperature Functions
function updateTemperature() {
    const tempDisplay = document.getElementById('tempValue');
    tempDisplay.textContent = `${temperature}°${temperatureUnit}`;
}

// Increase temperature
function increaseTemperature() {
    if (temperatureUnit === 'C') {
        temperature += 1;  
    } else if (temperatureUnit === 'F') {
        temperature += 1.8;  
    }
    updateTemperature();
}

// Decrease temperature
function decreaseTemperature() {
    if (temperatureUnit === 'C') {
        temperature -= 1;  
    } else if (temperatureUnit === 'F') {
        temperature -= 1.8;  
    }
    updateTemperature();
}

// Toggle between Celsius and Fahrenheit
function toggleTemperatureUnit() {
    if (temperatureUnit === 'C') {
        temperatureUnit = 'F';
        temperature = (temperature * 9/5) + 32;  
    } else {
        temperatureUnit = 'C';
        temperature = (temperature - 32) * 5/9;  
    }
    updateTemperature();
}
let timerInterval; 
let timerSeconds = 60; 

// Function to show the timer and countdown button
function showTimer() {
    // Show the timer display and countdown button
    document.getElementById('timerDisplay').classList.remove('hidden');
    
    // Disable the "Show Timer" button after it's clicked
    document.querySelector('button[onclick="showTimer()"]').disabled = true;
}

// Function to start the countdown
function startCountdown() {
    // Disable the "Start Countdown" button to prevent multiple clicks
    document.querySelector('button[onclick="startCountdown()"]').disabled = true;

    // Start the countdown
    timerInterval = setInterval(function() {
        timerSeconds--;

        // Update the timer display
        updateTimerDisplay();

        // When the timer reaches 0, trigger the alarm
        if (timerSeconds <= 0) {
            clearInterval(timerInterval); 
            playAlarm(); 
            resetTimer(); 
        }
    }, 1000); 
}

// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('timerText').textContent = formattedTime;
}

// Function to play the alarm sound
function playAlarm() {
    const alarmSound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3"); 
    alarmSound.play();
}

// Function to reset the timer back to 1 minute after the alarm
function resetTimer() {
    // Wait for the alarm to finish before resetting the timer
    setTimeout(function() {
        timerSeconds = 60; 
        updateTimerDisplay(); 
        // Re-enable the "Start Countdown" button after reset
        document.querySelector('button[onclick="startCountdown()"]').disabled = false;
    }, 3000); 
}

function hideTimer() {
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.classList.add('hidden'); 
    const startButton = timerDisplay.querySelector('button');
    startButton.disabled = false; 
    clearInterval(timerInterval); 
    timerSeconds = 60; 
    updateTimerDisplay(); 
}

// Get DOM elements
const showShoppingListButton = document.getElementById('showShoppingListButton');
const shoppingListModule = document.getElementById('shoppingListModule');
const shoppingList = document.getElementById('shoppingList');
const addItemButton = document.getElementById('addItemButton');
const newItemInput = document.getElementById('newItem');

// Function to show the shopping list
function showShoppingList() {
    hideAllModules(); 
    shoppingListModule.style.display = 'block'; 
}

// Function to add a new item to the shopping list
function addItemToList() {
    const newItem = newItemInput.value.trim(); 
    if (newItem) {
        const li = document.createElement('li'); 
        li.textContent = newItem; 
        shoppingList.appendChild(li); 
        newItemInput.value = ''; 
    }
}

function showShoppingList() {
    hideAllModules(); 
    shoppingListModule.style.display = 'block'; 
}

// Event listeners
showShoppingListButton.addEventListener('click', showShoppingList); 
addItemButton.addEventListener('click', addItemToList); 

// Function to handle hiding the button
function hideButton() {
    this.style.display = 'none'; 
}

// Event listeners for the show shopping list and add item buttons
showShoppingListButton.addEventListener('click', function() {
    showShoppingList(); 
    hideButton.call(this); 
});

addItemButton.addEventListener('click', function() {
    addItemToList(); 
    hideButton.call(this); 
});

// Function to play TV audio, show TV image, and display the TV module
function playTVAudio() {
    // Play the TV audio
    const tvAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/24/audio_f60571df5d.mp3?filename=old-tv-button-102956.mp3');  
    tvAudio.play();  

    // Show the TV module and image
    showModule('tv'); 
    const tvImage = document.getElementById('tvImage'); 
    tvImage.src = 'https://th.bing.com/th/id/R.f0e4b29abd348bcdb3175be60e353739?rik=zOtV%2frhPZe1o%2bw&riu=http%3a%2f%2fchannelatv.org%2fwp-content%2fuploads%2f2012%2f12%2fChannel-A-TV-News.jpg&ehk=xBYpprrnEFkbjTR%2bc%2bBpL5T6YWS%2fd4H7slGIjlAnGXU%3d&risl=&pid=ImgRaw&r=0'; 
    tvImage.style.display = 'block';  
}

const showMusicPlayerButton = document.getElementById('showMusicPlayerButton');
const musicPlayerModule = document.getElementById('musicPlayerModule');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');

// Function to show the music player
function showMusicPlayer() {
    hideAllModules(); 
    musicPlayerModule.style.display = 'block'; 
}

// Function to toggle play/pause
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play(); // Play the audio
        playPauseButton.textContent = 'Pause'; 
    } else {
        audioPlayer.pause(); // Pause the audio
        playPauseButton.textContent = 'Play';
    }
}

// Event listener for showing the music player
showMusicPlayerButton.addEventListener('click', showMusicPlayer);

// Event listener for toggling play/pause
playPauseButton.addEventListener('click', togglePlayPause);

