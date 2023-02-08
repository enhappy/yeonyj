const vidList = document.querySelector('.vidList');
const key = 'AIzaSyA-9yF7B8KxaGqsXYdIvdb5YX5dPdKRwek';
const playlistId = 'PLtAZmg231hd_17GPUq7JQNh14KhbR3NRT';
const num = 7;
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
			if (title.length >17) {
				title = title.substr(0, 17) + '...';
			}
			let con = el.snippet.description;
			if (con.length > 80) {
				con = con.substr(0, 80) + '...';
			}
			let date = el.snippet.publishedAt;
			date = date.split('T')[0];

			result += `
        <article>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.medium.url}">
          </a>
          <div class="con">
            <h2>${title}</h2>
            <p>${con}</p>
            <span>${date}</span>
          </div>
        </article>
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

/*
1. 썸네일을 클릭하면
클릭 이벤트는 vidlist에 걸려있으므로 1,2번의 이벤트가 모두 호출된다
2. 그러나 2번은 pop이 아직 존재하지 않으므로 무시되고, 1번이 구현되어 팝업이 뜬다
3. 클로즈 버튼을 클릭하면
클릭 이벤트는 vidlist에 걸려있으므로 1,2번의 이벤트가 모두 호출된다
4. 일단은 2번에 pop이 존재하기 때문에 2번 이벤트가 진행되서 pop자체가 remove된다
그리고 1번의 클릭이벤트가 진행되는데 getAttribute에 와서는 2번이벤트 결과로 사자진 a태그의 href를 찾아야 하므로 없으니까? 찾을수없다는 콘솔에러가 발생

5. 해결책
따라서 우리는 1번 이벤트에도 특정 대상으로 한정할 필요가 있다.
if (!e.target.closest('a')) return; 으로 1번 이벤트 발생시 a태그가 아니면 reture으로 막아서 해결
*/

//close버튼을 구현 - : 1. 그냥 close를 구체적을 잡아서 구현
//2. 이벤트 위임을 적용하고 -> 문제점을 해결해서 구현

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
