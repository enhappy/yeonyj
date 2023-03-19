const base = 'https://www.flickr.com/services/rest/?';
const method = 'flickr.interestingness.getList';
const method2 = 'flickr.photos.search';
const key = '9a7d9833ee775fa36568354172a2f1cd';
const per_page = 8;
const frame = document.querySelector('#list');

const loading = document.querySelector('.loading');
const input = document.querySelector('#search');
const btn = document.querySelector('.btnSearch');
const gal = document.querySelector('#gallery');
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;
const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=furniture&privacy_filter=1`;

//초기 갤러리 화면에 보여지는 데이터를 불러준다
callData(url2);

//이벤트위임으로 각 이미지 클릭시 큰이미지를 호출해서 보여주기
frame.addEventListener('click', (e) => {
	e.preventDefault();

	//클릭한 대상이 #list이면 return하도록
	if (e.target == frame) return;
	//범위를 완전 좁혀서 썸네일을 클릭해야지만 사진을 볼수있도록
	let target = e.target.closest('.item').querySelector('.thumb');

	//사용자가 클릭한 대상이 위에 변수로 잡은 썸네일인지를 묻고 그렇다면 그때 href속성을 가져오도록
	if (e.target == target) {
		//let imgSrc = target.parentElement.getAttribute('href'); //thumb의 부모인 a태그를 찾는 방법
		let imgSrc = target.closest('a').getAttribute('href'); //thumb에서 가장 가까이에 있는 a태그를 찾는 방법
		let pop = document.createElement('aside');
		pop.classList.add('pop');
		let pops = `
		<img src="${imgSrc}">
		<span class="close">Close</span>
	`;
		pop.innerHTML = pops;
		gal.append(pop);
	} else {
		return;
	}
});

//생성되지 않은 미래의 DOM요소를 선택하는게 방법이 사실은 없다. => react에서는 가상돔
gal.addEventListener('click', (e) => {
	//애매하게 aside를 찾는게 아니라 정확하게 pop이라는 클래스를 추적한다
	let pop = gal.querySelector('.pop');
	if (pop != null) {
		//탑이 존재하는지를 정확하게 선후관계를 조건에 넣어주는것
		let close = pop.querySelector('.close');
		if (e.target == close) pop.remove();
	} //pop.length > 0 length는 배열이나 문자열의 길이를 찾는것
	//	let target = e.target.closest('aside');
	//	target.remove();
});

function callData(url) {
	//기존에 있는 html을 모두 제거
	frame.innerHTML = '';
	//로딩 이미지를 off클래스를 제거함으로 다시 출력
	loading.classList.remove('off');
	//플레임 on클래스를 지워서 활성화 모션전으로 되돌림
	frame.classList.remove('on');

	fetch(url)
		.then((data) => {
			return data.json();
		})
		.then((json) => {
			let items = json.photos.photo;
			console.log(items);

			if (items.length > 0) {
				createList(items);
				delayLoading();
			} else {
				alert('검색하신 이미지의 데이터가 없습니다');
			}
		});
}

function createList(items) {
	let htmls = '';

	items.map((el, index) => {
		let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

		let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;

		htmls += `
        <li class="item">
          <div>
            <a href=${imgSrcBig}>
              <img class="thumb" src=${imgSrc}>
            </a>
            <p>${el.title}
            </p>
          </div>
        </li>
      `;
	});
	frame.innerHTML = htmls;
}

function delayLoading() {
	const imgs = frame.querySelectorAll('img');
	const len = imgs.length;

	let count = 0;
	for (let el of imgs) {
		el.addEventListener('load', () => {
			count++;
			if (count == len) isoLayout();
		});
		//만약 img DOM요소에 이미지 소스가 없거나 로드에 에러가나서 엑박이뜨면 1. 단계 아예 이미지 자체를 display : none으로 없애는 방법 2. 단계 src속성에 접근해서 대체이미지로 바꾸는 방법

		el.addEventListener('error', (e) => {
			//e.currentTarget.closest('.item').style.display = 'none';
			e.currentTarget.closest('.item').querySelector('img').setAttribute('src', 'img/noImage.png');
		});
	}
}

function isoLayout() {
	loading.classList.add('off');
	frame.classList.add('on');
	new Isotope('#list', {
		itemSelection: '.item',
		columnWidth: '.item',
		transitionDuration: '0.5s',
	});
}
