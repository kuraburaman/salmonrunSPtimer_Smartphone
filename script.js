async function requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('通知の許可が得られました。');
      }
    }
  }
  
  function showNotification() {
    if (Notification.permission === 'granted') {
      const options = {
        body: 'タイマー通知',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        icon: 'icon.png',
        badge: 'icon.png'
      };
      new Notification('100秒タイマー', options);
    }
  }
  
  function vibrateViaNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
      showNotification();
    }
  }
  

const timerDisplay1 = document.getElementById("timer-1");
const timerDisplay2 = document.getElementById("timer-2");
const startButton1 = document.getElementById("start-1");
const startButton2 = document.getElementById("start-2");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const buttonIds = ["button-1", "button-2", "button-3", "button-4", "button-5", "button-6", "button-7", "button-8", "button-9", "button-10"];
const check70 = document.getElementById("check-70");
const check50 = document.getElementById("check-50");
const check30 = document.getElementById("check-30");
const check15 = document.getElementById("check-15");

let count1 = 12;
let count2 = 100;
let interval1;
let interval2;

const audioElements = document.querySelectorAll("audio");
audioElements.forEach((audio) => {
  audio.volume = 0;
});

const audioFiles = {
    start1: "sound/chakuchi.mp3",
    start2: "sound/start.mp3",
    stop: "sound/stop.mp3",
    reset: "sound/reset.mp3",
    check70: "sound/audio1.mp3",
    check50: "sound/audio2.mp3",
    check30: "sound/audio3.mp3",
    check15: "sound/audio4.mp3",
    btn1: "sound/1.mp3",
    btn2: "sound/2.mp3",
    btn3: "sound/3.mp3",
    btn4: "sound/4.mp3",
    btn5: "sound/5.mp3",
    btn6: "sound/6.mp3",
    btn7: "sound/7.mp3",
    btn8: "sound/8.mp3",
    btn9: "sound/9.mp3",
    btn10: "sound/10.mp3",
  };
  
  function playAudio(name) {
    const audio = new Audio(audioFiles[name]);
    audio.play();
  }
  
  const checkVibrate = document.getElementById("check-vibrate");

  function vibrateIfNeeded() {
    if (window.navigator.vibrate) {
      window.navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
    } else {
      vibrateViaNotification();
    }
  }

  window.addEventListener('load', requestNotificationPermission);
  
  function showAlertIfNeeded() {
    if (check70.checked && count2 === 70) {
      playAudio("check70");
    }
    if (check50.checked && count2 === 50) {
      playAudio("check50");
    }
    if (check30.checked && count2 === 30) {
      playAudio("check30");
    }
    if (check15.checked && count2 === 15) {
      playAudio("check15");
    }
    vibrateIfNeeded(); // この行を showAlertIfNeeded 関数の最後に移動します
  }
  
  
  let isPaused = false;

  function startTimer1() {
    isPaused = false;
    stopButton.textContent = "ストップ";
    clearInterval(interval1);
    count1 = 12;
    timerDisplay1.textContent = count1;
  
    interval1 = setInterval(() => {
      if (!isPaused) {
        count1--;
        timerDisplay1.textContent = count1;
        if (count1 > 0) {
          playAudio(`btn${count1}`);
        } else if (count1 <= 0) {
          clearInterval(interval1);
          startTimer2();
          playAudio("start2");
        }
      }
    }, 1000);
  
    playAudio("start1");
  }
  
  
  function startTimer2() {
    isPaused = false;
    stopButton.textContent = "ストップ";
    clearInterval(interval1);
    count1 = 0;
    timerDisplay1.textContent = count1;
    playAudio("start2");
  
    clearInterval(interval2);
    count2 = 100;
    timerDisplay2.textContent = count2;
  
    interval2 = setInterval(() => {
      if (!isPaused) {
        count2--;
        timerDisplay2.textContent = count2;
        showAlertIfNeeded();
        if (count2 <= 0) {
          clearInterval(interval2);
        }
      }
    }, 1000);
  }
  
  function togglePause() {
    isPaused = !isPaused;
    stopButton.textContent = isPaused ? "再開" : "ストップ";
    if (isPaused) {
      playAudio("stop");
    } else {
      playAudio("start2");
    }
  }
  
  startButton2.addEventListener("click", startTimer2);

function stopTimers() {
    clearInterval(interval1);
    clearInterval(interval2);
    playAudio("stop");
}

function resetTimers() {
    isPaused = false;
    stopButton.textContent = "ストップ";
    clearInterval(interval1);
    clearInterval(interval2);
    count1 = 12;
    count2 = 100;
    timerDisplay1.textContent = count1;
    timerDisplay2.textContent = count2;
    playAudio("reset");
  }

startButton1.addEventListener("click", startTimer1);
startButton2.addEventListener("click", startTimer2);
stopButton.addEventListener("click", togglePause);
resetButton.addEventListener("click", resetTimers);


function startTimerFrom(seconds) {
    isPaused = false;
    stopButton.textContent = "ストップ";
    clearInterval(interval1);
    clearInterval(interval2);
    count1 = seconds;
    timerDisplay1.textContent = count1;
  
    count2 = 100;
    timerDisplay2.textContent = count2;
  
    interval1 = setInterval(() => {
      if (!isPaused) {
        count1--;
        timerDisplay1.textContent = count1;
        if (count1 > 0) {
          playAudio(`btn${count1}`);
        } else if (count1 <= 0) {
          clearInterval(interval1);
          startTimer2();
        }
      }
    }, 1000);
  }

  
  buttonIds.forEach((buttonId, index) => {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", () => {
      startTimerFrom(index + 1);
      playAudio(`btn${index + 1}`);
    });
  });
  
  
