// let select = document.getElementById("times");
// times.addEventListener("change", function() {
//   var selectedOption = this.options[select.selectedIndex];
//   console.log(selectedOption.value);
//

// Obtener el id del campo a mostrar el contador
const CLOCK = document.querySelector("#clock");

//Acciones sobre el contador
const STOPBREAKBUTTON = document.querySelector("#stop");
const PAUSEDBUTTON = document.querySelector("#paused");

//Tipos de contadores a utilizar
const WORKBUTTON = document.querySelector("#work");
const LONGBREAKBUTTON = document.querySelector("#longBreak");
const SHORTBREAKBUTTON = document.querySelector("#shortBreak");

let currentTaskLabel = document.querySelector("#pomodoro-clock-task");

// Tiempo de Duracion del contador
// In seconds = 25min
let currentTimeLeftInSession = 1500;
let workSessionDuration = 1500;

// let currentBreakTimeLeftInSession = 300;
let breakSessionDuration = 300;

let isRunning = false;
let isLongBreak = false;

let type = "Work";
let timeSpendInCurrentSession = 0;

let updateWorkSessionDuration;
let updateBreakSessionDuration;

let workDurationInput = document.querySelector("#input-work-duration");
let breakDurationInput = document.querySelector("#input-break-long-duration");

workDurationInput.value = "25";
breakDurationInput.value = "5";

let isClockStopped = true;

workDurationInput.addEventListener("input", () => {
	updateWorkSessionDuration = minuteToSeconds(workDurationInput.value);
});

breakDurationInput.addEventListener("input", () => {
	updateBreakSessionDuration = minuteToSeconds(breakDurationInput.value);
});

const minuteToSeconds = mins => {
	return mins * 60;
};

// const setUpdatedTimers = () => {
// 	if (type === "Work") {
// 		currentTimeLeftInSession = updateWorkSessionDuration
// 			? updateWorkSessionDuration
// 			: workSessionDuration;
// 		workSessionDuration = currentTimeLeftInSession;
// 	} else {
// 		currentTimeLeftInSession = updateBreakSessionDuration
// 			? updateBreakSessionDuration
// 			: breakSessionDuration;
// 		breakSessionDuration = currentTimeLeftInSession;
// 	}
// };

const setUpdatedTimers = () => {
	if (type === "Work") {
		currentTimeLeftInSession = updateWorkSessionDuration
			? updateWorkSessionDuration
			: workSessionDuration;
		workSessionDuration = currentTimeLeftInSession;
	} else {
		currentTimeLeftInSession = updateBreakSessionDuration
			? updateBreakSessionDuration
			: breakSessionDuration;
		breakSessionDuration = currentTimeLeftInSession;
	}
};

// Evento de comenzar el contador work
WORKBUTTON.addEventListener("click", () => {
	console.log("work");
	toogleClock();
});

// Pausar el contador
PAUSEDBUTTON.addEventListener("click", () => {
	toogleClock();
});

STOPBREAKBUTTON.addEventListener("click", () => {
	toogleClock(true);
	clearInterval(clockTimer);
});

// Evento de comenzar el contador long break
LONGBREAKBUTTON.addEventListener("click", () => {
	console.log("long");
});

// Evento de comenzar el contador short break
SHORTBREAKBUTTON.addEventListener("click", () => {
	console.log("short");
	toogleClock();
});

const toogleClock = reset => {
	if (reset) {
		stopClock();
	} else {
		if (isClockStopped) {
			setUpdatedTimers();
			isClockStopped = false;
		}
		if (isRunning === true) {
			// pause the timer
			clearInterval(clockTimer);
			isRunning = false;
		} else {
			//start the timer
			clockTimer = setInterval(() => {
				stepDown();
				displayCurrentTimeLeftInSession();
			}, 1000);
			isRunning = true;
		}
	}
};

// let timersCount = 0;
// var count = "";

// function clockTimer() {
// 	contador = 5;
// 	var counter = setInterval(timer, 1000);

// 	function timer() {
// 		contador = contador - 1;
// 		stepDown();
// 		displayCurrentTimeLeftInSession();
// 		if (contador < 0) {
// 			clearInterval(counter);
// 			currentTimeLeftInSession;
// 		}
// 		count = contador;
// 		isRunning = true;
// 	}
// }

// const stopClock = () => {
//   // new
//   displaySessionLog(type);
//   clearInterval(clockTimer);
//   isClockRunning = false;
//   currentTimeLeftInSession = workSessionDuration;
//   displayCurrentTimeLeftInSession();
//   // new
//   type = 'Work';
// }

const stopClock = () => {
	setUpdatedTimers();
	displaySessionLog(type);
	clearInterval(clockTimer);
	isClockStopped = true;
	isRunning = false;
	currentTimeLeftInSession = workSessionDuration;
	displayCurrentTimeLeftInSession();
	type = "Work";
	// type = type === "Work" ? "Break" : "Work";
	timeSpendInCurrentSession = 0;
};

const stepDown = () => {
	if (currentTimeLeftInSession > 0) {
		currentTimeLeftInSession--;
		timeSpendInCurrentSession++;
	} else if (currentTimeLeftInSession === 0) {
		timeSpendInCurrentSession = 0;
		if (type === "Work") {
			currentTimeLeftInSession = breakSessionDuration;
			displaySessionLog("Work");
			type = "Break";
			setUpdatedTimers();
			currentTaskLabel.value = "Break";
			currentTaskLabel.disabled = true;
		} else {
			currentTimeLeftInSession = workSessionDuration;
			type = "Work";
			setUpdatedTimers();

			if (currentTimeLeftInSession === "Break") {
				currentTaskLabel.value = workSessionLabel;
			}
			currentTaskLabel.disabled = false;
			displaySessionLog("Break");
		}
	}
	displayCurrentTimeLeftInSession();
};

const displaySessionLog = type => {
	const sessionsList = document.querySelector("#pomodoro-sessions");
	const li = document.createElement("li");

	if (type === "Work") {
		sessionLabel = currentTaskLabel.value ? currentTaskLabel.value : "Work";
		workSessionLabel = sessionLabel;
	} else {
		sessionLabel = "Break";
	}

	let elapsedTime = parseInt(timeSpendInCurrentSession / 60);
	elapsedTime = elapsedTime > 0 ? elapsedTime : "< 1";

	const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`);

	li.appendChild(text);
	sessionsList.appendChild(li);
};

const displayCurrentTimeLeftInSession = () => {
	const secondsLeft = currentTimeLeftInSession;
	let result = "";
	const seconds = parseInt(secondsLeft % 60);
	const minutes = parseInt((secondsLeft / 60) % 60);
	let hours = parseInt(secondsLeft / 3600);

	function addLeadingZeroes(time) {
		return time < 10 ? `0${time}` : time;
	}

	if (hours > 0) result += `${hours}:`;
	result += addLeadingZeroes(minutes) + ":" + addLeadingZeroes(seconds);
	CLOCK.innerText = result;
};
