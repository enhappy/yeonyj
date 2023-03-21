const vidList = document.querySelector('.vidList');
const key = 'AIzaSyA-9yF7B8KxaGqsXYdIvdb5YX5dPdKRwek';
const playlistId = 'PLtAZmg231hd_17GPUq7JQNh14KhbR3NRT';
const num = 8;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;
const btnClose = document.querySelector('.btnClose');

fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		let items = json.items;

		let result = '';

		items.map((el) => {
			let title = el.snippet.title;
			if (title.length > 30) {
				title = title.substr(0, 30) + '...';
			}
			let con = el.snippet.description;
			if (con.length > 70) {
				con = con.substr(0, 70) + '...';
			}
			let date = el.snippet.publishedAt;
			date = date.split('T')[0];

			result += `
        <li>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.medium.url}">
          </a>
          <div class="con">
            <h2>${title}</h2>
            <p>${con}</p>
            <span>${date}</span>
          </div>
        </li>
      `;
		});

		vidList.innerHTML = result;
	});
//섬네일 클릭시 해당 영상이 팝업 전체화면으로 보여지는 코드 => 이벤트위임
vidList.addEventListener('click', (e) => {
	e.preventDefault();

	if (!e.target.closest('a')) return;
	//이벤트 위임의 단점이 존재한다 => vidList전체에 클릭이벤트가 부여되면서 필요하지 않는 부분에서도 이벤트가 발생하여 예기치 않은 팝업이 생성되거나 이벤트가 발생한다.

	const vidId = e.target.closest('a').getAttribute('href');

	//동적으로 pop을 생성

	let pop = document.createElement('figure');
	pop.classList.add('pop');
	pop.innerHTML = `
  <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
  <span class="btnClose">close</span>
  `;

	vidList.append(pop);
});

//이 부분은 미래시, pop이라는 figure태그가 존재 하는경우에만 적용되는 코드

//이벤트가 특정되지 않는 현상이 있기때문에
vidList.addEventListener('click', (e) => {
	const pop = vidList.querySelector('.pop');
	if (pop) {
		const close = pop.querySelector('span');
		//이벤트를 조건문으로 특정close대상으로 한정해주는 것
		if (e.target == close) pop.remove();
	}
});
