const btnCall = document.querySelector('.btnCall');
const mainMenu_mo = document.querySelector('.mainMenu_mo');

btnCall.onclick = function (e) {
	e.preventDefault();

	btnCall.classList.toggle('on');
	mainMenu_mo.classList.toggle('on');
};
