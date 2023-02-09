https://www.google.co.kr/maps/place/%EC%84%9C%EC%9A%B8%EC%97%AD/data=!4m10!1m2!2m1!1z7ISc7Jq47Jet!3m6!1s0x357ca266e3947003:0xe7be97c172b7af6a!8m2!3d37.555946!4d126.972317!15sCgnshJzsmrjsl61aCyIJ7ISc7Jq47JetkgEOc3Vid2F5X3N0YXRpb26aASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUnhjMDlsWVU5M0VBReABAA!16zL20vMDNubm03?hl=ko


var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
const branch_btns = document.querySelectorAll('.branch li');
const t_on = document.querySelectorAll('.traffic li')[0];
const t_off = document.querySelectorAll('.traffic li')[1];

var options = {
	//지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.555946, 126.972317), //지도의 중심좌표.
	level: 3, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


let markerOptions = [
	{
		title: '본점',
		latlng: new kakao.maps.LatLng(37.555946, 126.972317),
		imgSrc: 'img/subpage/marker1.png',
		imgSize: new kakao.maps.Size(70, 85),
		imgPos: { offset: new kakao.maps.Point(35, 45) },
		button: branch_btns[0],
	},
	{
		title: '지점1',
		latlng: new kakao.maps.LatLng(37.5258975, 126.9284261),
		imgSrc: 'img/subpage/marker2.png',
		imgSize: new kakao.maps.Size(70, 85),
		imgPos: { offset: new kakao.maps.Point(35, 45) },
		button: branch_btns[1],
	}
];
// branch_btns.forEach((el,index)=>{
//   el.addEventListener("click",()=>{})
// })

for (let i = 0; i < markerOptions.length; i++) {
	new kakao.maps.Marker({
		map: map, //앞의 map이라는 key값은 marker생성시 필요한 정보의 key를 뜻하는 내용이고, 뒤에 valuse값인 map은 우리가 위에서 선언한 map이라는 변수
		position: markerOptions[i].latlng, //지도의 위치 위도경도값으로 접근하는 우리가 선언한 배열의 객체안의 latlng으로 정해주는것
		title: markerOptions[i].title,
		image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos),
		//카카오에서 제공하는 MarkerImage라는 메서드를 사용하되, 인수자리에 우리가 선언한 markerOptions안의 key을 불러와서 넣어주는것
	});

	markerOptions[i].button.addEventListener('click', (e) => {
		e.preventDefault();
		for (let k = 0; k < markerOptions.length; k++) {
			markerOptions[k].button.classList.remove('on');
		}
		markerOptions[i].button.classList.add('on');

		//최종적으로 클릭한 인덱스의 위치로 이동해야하므로 moveTo함수 호출
		moveTo(markerOptions[i].latlng);
	});
}
function moveTo(target) {
	//함수가 위치 시킬 값을 인수로 반아서
	// 이동할 위도 경도 위치를 생성합니다
	var moveLatLon = target; //밑에 전달해서 최종 지도를 움직이고

	// 지도 중심을 이동 시킵니다
	map.setCenter(moveLatLon); //지도를 중심으로 해서 이동
}


/*
var imageSrc = 'img/subpage/marker1.png', // 마커이미지의 주소입니다
	imageSize = new kakao.maps.Size(70, 85), // 마커이미지의 크기입니다
	imageOption = { offset: new kakao.maps.Point(35, 43) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
	markerPosition = new kakao.maps.LatLng(37.5116827, 127.0591512); // 마커가 표시될 위치입니다

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
	position: markerPosition,
	image: markerImage, // 마커이미지 설정
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);
*/






t_on.addEventListener('click', (e) => {
	e.preventDefault();
	if (t_on.classList.contains('on')) return;
	// 지도에 교통정보를 표시하도록 지도타입을 추가합니다
	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_on.classList.add('on');
	t_off.classList.remove('on');
});

t_off.addEventListener('click', (e) => {
	e.preventDefault();
	map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_off.classList.add('on');
	t_on.classList.remove('on');
});

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
