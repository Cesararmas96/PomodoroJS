const setting = document.getElementById("setting");
// const settingOpen = document.getElementById("setting-open");
// const settingClosed = document.getElementById("setting-closed");

const settingColor = document.getElementById("setting-color");
const body = document.getElementById("body");

// settingOpen.addEventListener("click", () => {
// 	setting.classList.add("block");
// });

// settingClosed.addEventListener("click", () => {
// 	setting.classList.remove("block");
// });

	settingColor.addEventListener("click", () => {
	// Con el metodo toggle() nos permite intercambiar entre 2 clases

	body.classList.toggle("seconds-background");
});

