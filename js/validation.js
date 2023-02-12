const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	// 조건문으로 해당 input의 유효성검사를 한 후 거짓이면?? => e.preventDefault();
	// if(!유효성 검사함수) e.preventDefault();

	if (!isTxt('userid')) e.preventDefault();
	if (!isTxt('comments', 20)) e.preventDefault();

	if (!isEmail('email')) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();

	if (!isSelect('edu')) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault();
});



//1. type이 text인 form요소의 인증함수 (유효성검사)
function isTxt(el, len) {
	if (len === undefined) len = 5;
	let input = form.querySelector(`[name=${el}]`);
	//name값이 매개변수로 넣은 이름인 input을 찾아서
	let txt = input.value;
	//해당 input에 사용자가 작성한 값(value)을 txt라는 변수에 담는것

	if (txt.length >= len) {
		// 참인경우에 추가적으로 들어갈 코드
		// 참이면 에러메시지가 필요없으므로 p를 찾아서 지우는 방법
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		//1 에러메세지를 일단 지운뒤 아래에서 다시 작성하게 하는 방법
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		//2 이미 적혀진 에러메세지가 있는지 확인한 후 아래의 새로 생성하는 p태그의 코드를 만나지 않고 바로 false를 반환하도록 하는 방법
		// const errMsgs = input.closest('td').querySelectorAll('p');
		// if (errMsgs.len > 0) return false;
		//return을 이용하여 에러머시지가 존재하면 구문을 중단시킴으로 하단 구문(p태그 생성코드)를 실행하지 않고 false를 반환시키게 함

		/*
    return???
    1. 구역 밖으로 이후에 적힌 값을 반환하는 용도 <== 반환의 목적
    2. 리턴구문을 만나면 더이상 아래의 코드가 진행되지 않고 멈춘뒤 이후 적힌 값을 반환해버린다 <== 멈추는 용도
    */

		//거짓인경우에 추가적으로 들어갈 코드 = > 경고문구를 작성해서 안내를 해줘야한다
		//하지만 이와 같이 하게되면 에러메세지가 반복적으로 계속 출력되는 문제가 있다  해결은 => 윗줄
		let errMessage = document.createElement('p');
		errMessage.append(`입력항목을 ${len}글자 이상 입력하셔야 합니다.`);
		input.closest('td').append(errMessage);
		return false;
		//오류가 날때마다 계속적으로 p태그를 만들어서 작성하는 문제가 발생
	}
}

//2. email인증함수
function isEmail(el) {
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	//@가 있는지 없는지??
	if (/@/.test(txt)) {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('p');
		errMessage.append('@를 포함한 전체 이메일 주소를 입력하세요.');
		input.closest('td').append(errMessage);
		return false;
	}
}
//3. check인증함수
function isCheck(el) {
	let inputs = form.querySelectorAll(`[name=${el}]`);
	let isCheck = false;

	//inputs배열을 반복을 돌면서 체크가 되어있는지를 살피고 체크가 되어있다면 false를 true로 변경
	for (let el of inputs) {
		if (el.checked) isCheck = true;
	}

	if (isCheck) {
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) inputs[0].closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) inputs.closest('td').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append('필수 입력 항목을 체크해 주세요');
		inputs[0].closest('td').append(errMessage);
		return false;
	}
}

//4. selcet인증함수
function isSelect(el) {
	let sel = form.querySelector(`[name=${el}]`);

	let sel_index = sel.options.selectedIndex;
	//select요소에 접근해서 자식 요소인 option들 중에 선택되어진 index를 찾아서 해당 인덱스를 가지고 온다 (number)
	let value = sel[sel_index].value;

	// if(sel_index !== 0)
	//value값이 비어있는지? 아닌지가 중요함
	if (value !== '') {
		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) sel.closest('td').querySelector('p').remove();
		return true;
	} else {
		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) sel.closest('td').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append('항목을 선택해 주세요');
		sel.closest('td').append(errMessage);
		return false;
	}
}

//5 password 인증함수
function isPwd(el1, el2, len) {
	let pwd1 = form.querySelector(`[name=${el1}]`);
	let pwd2 = form.querySelector(`[name=${el2}]`);
	let pwd1_value = pwd1.value;
	let pwd2_value = pwd2.value;

	//보통 패스워드는 숫자, 문자, 특수문자 조건을 정규표현식으로 변수로 저장
	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[~!@#$%^&*()_+?<>]/;


	if (
		pwd1_value === pwd2_value &&
		pwd1_value.length >= len &&
		num.test(pwd1_value) &&
		eng.test(pwd1_value) &&
		spc.test(pwd1_value)
	) {
		const errMsgs = pwd1.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) pwd1.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = pwd1.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('p');
		errMessage.append(`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요`);
		pwd1.closest('td').append(errMessage);
		return false;
	}
}

