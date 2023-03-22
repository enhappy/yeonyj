const gallery = document.querySelector('#galleryTop');

const img = gallery.querySelector('.showBox img');
const btnsTop = gallery.querySelectorAll('.btnsTop li');
const hOne = gallery.querySelector('h1');
const str = gallery.querySelector('strong');
const span = gallery.querySelector('span');

let total = btnsTop.length;
console.log(total);
span.innerText = total;

for (let i = 0; i < btnsTop.length; i++) {
	btnsTop[i].addEventListener('click', (e) => {
		e.preventDefault();

		str.innerText = i + 1;

		let clickA = btnsTop[i].querySelector('a');
		// 		//그 a태그 안의 href 속성의 값을 get해서 변수에 넣고
		let imgSrc = clickA.getAttribute('href');
		img.setAttribute('src', imgSrc);

		let title = clickA.innerText;
		hOne.innerText = title;

		for (let k = 0; k < btnsTop.length; k++) {
			btnsTop[k].classList.remove('on');
		}
		btnsTop[i].classList.add('on');
	});
}
