import { CountUp } from './countUp.js';

window.onload = () => {
	let counterCK = getCookie("counterCK");
	let salaryCK = getCookie("salaryCK");
	
	if (counterCK != null) {
		document.getElementById("counter").textContent = counterCK;
	}
	
	if (salaryCK != null) {
		document.getElementById("salary").value = salaryCK;
	}
	
	salaryBtn.onclick = () => {
		toggleClass(salaryBtn, "active");
		
		if (salaryBtn.className.indexOf("active") > -1) {
			salaryBtn.textContent = "연봉숨김";
			removeClass(salary, "hidden");
			addClass(salary, "show");
		} else {
			salaryBtn.textContent = "연봉입력";
			removeClass(salary, "show");
			addClass(salary, "hidden");
		}
	}
	
	nightBtn.onclick = () => {
		if (salary.value == "") {
			removeClass(salaryWarn, "hidden");
			addClass(salaryWarn, "show");
			salary.focus();
			return;
		}
		
		toggleClass(nightBtn, "active");
		
		if (nightBtn.className.indexOf("active") > -1) {
			nightBtn.textContent = "야근멈춤";
			upFlag.checked = true;
			
			addClass(document.body, "feverBg");
			countDemo.style.color = "white";
			
			if (document.getElementById("multiplyBtn").textContent.indexOf("2") > -1) {
				removeClass(fever, "hidden");
				addClass(fever, "show");
			}
		} else {
			nightBtn.textContent = "야근시작";
			upFlag.checked = false;
			
			removeClass(document.body, "feverBg");
			countDemo.style.color = "#333";
			
			if (fever.className.indexOf("show") > -1) {
				removeClass(fever, "show");
				addClass(fever, "hidden");
			}
		}
	}
	
	upFlag.onclick = () => {
		if (salary.value == "") {
			removeClass(salaryWarn, "hidden");
			addClass(salaryWarn, "show");
			salary.focus();
			upFlag.checked = false;
			return;
		}
		
		toggleClass(nightBtn, "active");
		
		if (nightBtn.className.indexOf("active") > -1) {
			nightBtn.textContent = "야근멈춤";
			
			addClass(document.body, "feverBg");
			countDemo.style.color = "white";
			
			if (document.getElementById("multiplyBtn").textContent.indexOf("2") > -1) {
				removeClass(fever, "hidden");
				addClass(fever, "show");
			}
		} else {
			nightBtn.textContent = "야근시작";
			
			removeClass(document.body, "feverBg");
			countDemo.style.color = "#333";
			
			if (fever.className.indexOf("show") > -1) {
				removeClass(fever, "show");
				addClass(fever, "hidden");
			}
		}
	}
	
	salary.onkeydown = (event) => {
		addClass(salaryWarn, "hidden");
		removeClass(salaryWarn, "show");
		
		if (event.keyCode == 13) {
			event.preventDefault();
			nightBtn.onclick();
		}
	}
	
	multiplyBtn.onclick = () => {
		toggleClass(multiplyBtn, "btn-success");
		toggleClass(multiplyBtn, "btn-warning");
		
		if (multiplyBtn.className.indexOf("btn-success") > -1) {
			multiplyBtn.textContent = "X1.5";
			
			if (fever.className.indexOf("show") > -1) {
				removeClass(fever, "show");
				addClass(fever, "hidden");
			}
		} else {
			multiplyBtn.textContent = "X2.0";
			
			if (nightBtn.className.indexOf("active") > -1) {
				removeClass(fever, "hidden");
				addClass(fever, "show");
			}
		}
	}
	
	resetBtn.onclick = () => {
		deleteCookie("counterCK");
		deleteCookie("salaryCK");
		
		location.reload();
	}
}

// Update the count down every 1 second
let countSalary = setInterval(() => {
	let upFlag = document.getElementById("upFlag").checked;
	let salarySum = document.getElementById("counter").textContent;
	let multiply = document.getElementById("multiplyBtn").textContent;
	
	multiply = parseFloat(multiply.replace(/X/g, ''));
	
	salarySum = parseFloat(salarySum.replace(/,/g, ''));
	
	if (upFlag) {
		// Get salary
		let salary = document.getElementById("salary").value;
		
		// Get todays date and time
		let now = new Date();
		let nowTime = now.getHours() + "" + addZero(now.getMinutes());
		
		const options = {
				startVal: salarySum,
				decimalPlaces: 2
		};
		
//		if ((nowTime >= 1730 && nowTime < 1800) || (nowTime >= 1900 && nowTime < 2200)) {
			salarySum += salary / 209 / 12 * multiply / 3600; 
//		} else if (nowTime >= 2200 && nowTime < 2400) {
//			salarySum += salary / 209 / 12 * 2 / 3600;
//		} else {
//		}
		
		// Output the result in an element with id="demo"
		document.getElementById("counter").textContent = salarySum;
		
		let demo = new CountUp("counter", salarySum, options);
		
		if (!demo.error) {
		  demo.start();
		} else {
		  console.error(demo.error);
		}
		
		setCookie("counterCK", salarySum.toFixed(2), 0.5);
		setCookie("salaryCK", salary, 0.5);
	}
}, 1000);

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  
  return i;
}

function addClass(element, className) { 
	element.className += " " + className; 
}

function removeClass(element, className) { 
	let check = new RegExp("(\\s|^)" + className + "(\\s|$)");
	
	element.className = element.className.replace(check, " ").trim(); 
}

function replaceClass(element, oldClassName, newClassName) {
	removeClass(element, oldClassName);
	addClass(element, newClassName);
}

function toggleClass(element, className) { 
	let check = new RegExp("(\\s|^)" + className + "(\\s|$)"); 
	
	if (check.test(element.className)) { 
		element.className = element.className.replace(check, " ").trim(); 
	} else { 
		element.className += " " + className; 
	} 
}

function setCookie(name, value, day) {
    var date = new Date();
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

function deleteCookie(name) {
    var date = new Date();
    document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
}

// 연봉 : x
// 시간 : t
//
// x / 209 / 12 * 1.5 / 3600 = y
// 카운팅은 초단위
// 1초에 y만큼 누적이 되도록
//
// 조건1. 특정 시간에만 누적이 되야함. (17:30 ~ 18:00, 19:00 ~ 22:00)
// 조건2. 22:00 ~ 24:00 에는 2y 만큼 누적