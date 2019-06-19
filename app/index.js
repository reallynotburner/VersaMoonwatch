import document from "document";
import { hoursToAngle, minutesToAngle, secondsToAngle } from '../common/utils.js';
import { vibration } from "haptics";
import { display } from "display";
import { readFileSync, writeFileSync } from "fs";

const dayWatch = document.getElementById("dayWatch");
const mainDial = document.getElementById("mainDial");
const nightMinutes = document.getElementById("nightMinutes");
const nightHours = document.getElementById("nightHours");
const hourHand = document.getElementById("hours");
const minHand = document.getElementById("minutes");
const secHand = document.getElementById("seconds");
const nightChronoSecondsHand = document.getElementById("nightChronoSeconds");
const chronoSecondsHand = document.getElementById("chronoSecondsExternalTranformGroup");
const chronoMinutesHand = document.getElementById("chronoMinutes");
const chronoHoursHand = document.getElementById("chronoHours");
const stopStartButton = document.getElementById("stopStart");
const resetButton = document.getElementById("reset");
const backlightButton = document.getElementById("backlight");

// This represents the entirety of the app state
const state = {};// see if there's a prior state to restore
function restoreState () {
  try {
    const {
      accumulatedTime,
      priorUpdateTime,
      running,
      backlight,
      minutes,
      seconds,
      hours,
      milliseconds,
      chronoSeconds,
      chronoMinutes,
      chronoHours
    } = readFileSync("state.json", "json");

    state = {
      accumulatedTime,
      priorUpdateTime,
      running,
      backlight,
      minutes,
      seconds,
      milliseconds,
      hours,
      chronoSeconds,
      chronoMinutes,
      chronoHours
    }
  } catch (e) {
    console.error(e);
    state.accumulatedTime = 0;
    state.priorUpdateTime = 0;
    state.running = false;
    state.backlight = false;
    state.milliseconds = 0;
    state.minutes = 0;
    state.seconds = 0;
    state.hours = 0;
    state.chronoSeconds = 0;
    state.chronoMinutes = 0;
    state.chronoHours = 0
  }
}

function saveState(state) {
  writeFileSync('state.json', state, "json");
}

function startStopHandler() {
  vibration.start("bump");
  state.running = !state.running;
  state.priorUpdateTime = Date.now();
  saveState(state);
}

function resetHandler() {
  state.accumulatedTime = 0;
  vibration.start("nudge");
  saveState(state);
}

function backLightHandler() {
  state.backlight = !state.backlight;
  saveState(state);
}

function updateClockState(state) {
  let today = new Date();

  state.minutes = today.getMinutes();
  state.hours =  today.getHours();
  state.seconds = today.getSeconds();
  state.milliseconds = today.getMilliseconds();
  
  return state;
}

function renderClock(state) {
  const { milliseconds, seconds, minutes, hours } = state;
  const minuteAngle =  minutesToAngle(minutes, seconds);
  const hoursAngle =  hoursToAngle(hours, minutes);
  const secondsAngle = secondsToAngle(seconds, milliseconds);
  
  hourHand.groupTransform.rotate.angle = hoursAngle;
  minHand.groupTransform.rotate.angle = minuteAngle;
  nightMinutes.groupTransform.rotate.angle = minuteAngle;
  nightHours.groupTransform.rotate.angle = hoursAngle;
  secHand.groupTransform.rotate.angle = secondsAngle;
}

function renderChronograph(state) {
  const {
    chronoSeconds,
    chronoMinutes,
    chronoHours
  } = state;
  
  nightChronoSecondsHand.groupTransform.rotate.angle = chronoSeconds * 6;
  chronoSecondsHand.groupTransform.rotate.angle = chronoSeconds * 6;
  chronoMinutesHand.groupTransform.rotate.angle = chronoMinutes * 12;
  chronoHoursHand.groupTransform.rotate.angle = chronoMinutes * 0.5;
}

function updateChronographState(state) {
  const { priorUpdateTime, running } = state;
  let { accumulatedTime } = state;
  let chronoSeconds, chronoMinutes, chronoHours;
  const chronographDeltaTime = Date.now() - priorUpdateTime;

  if (running) {
    accumulatedTime += chronographDeltaTime;
  }
  chronoSeconds = accumulatedTime / 1000;
  chronoMinutes = chronoSeconds / 60;
  chronoHours = chronoMinutes / 60;
  
  state.chronoSeconds = chronoSeconds;
  state.chronoMinutes = chronoMinutes;
  state.chronoHours = chronoHours;
  state.accumulatedTime = accumulatedTime;
  state.priorUpdateTime = Date.now();
  
  return state;
}

function updateDisplayBacklightMode() {
  if (state.backlight) {
    dayWatch.style.opacity = 0.0;
  } else {
    dayWatch.style.opacity = 1.0;
  }
}

function handleButtons(event) {
  switch(event.key) {
    case 'up':
      startStopHandler();
      break;
    case 'down':
      resetHandler();
      break;
    default:
      break;
  }
}

function render () {
  state = updateClockState(state);
  renderClock(state);
  state = updateChronographState(state);
  renderChronograph(state);
  updateDisplayBacklightMode();
  requestAnimationFrame(render);
}

restoreState();
document.onkeypress = handleButtons;
stopStartButton.onclick = startStopHandler;
resetButton.onclick = resetHandler;
backlightButton.onclick = backLightHandler;
requestAnimationFrame(render);
