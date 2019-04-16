import { CountUp } from './countUp.js';

window.onload = () => {
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
			if (salaryWarn.className.indexOf("hidden") > -1) {
				removeClass(salaryWarn, "hidden");
				addClass(salaryWarn, "show");
			}
			
			if (salaryBtn.className.indexOf("active") == -1) {
				salaryBtn.click();
			}
			
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
			deleteCookie("timeCK");
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
			if (salaryWarn.className.indexOf("hidden") > -1) {
				removeClass(salaryWarn, "hidden");
				addClass(salaryWarn, "show");
			}
			
			if (salaryBtn.className.indexOf("active") == -1) {
				salaryBtn.click();
			}
			
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
			deleteCookie("timeCK");
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
		if (salary.value == "") {
			if (salaryWarn.className.indexOf("show") > -1) {
				addClass(salaryWarn, "hidden");
				removeClass(salaryWarn, "show");
			}
		}
		
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
		deleteCookie("salaryCK");
		
		location.reload();
	}
	
	saveBtn.onclick = () => {
		let salaryStats = new Object();
		let now = new Date();
		
		let nowTime = now.getFullYear() + "" + addZero(now.getDate());
		
		salaryStats.salaryTime = nowTime; 
		salaryStats.member = {"id": document.getElementById("userId").textContent};
		salaryStats.salary = document.getElementById("salary").value;
		
		fetch("/main/salary", {
		  method: "POST",
		  body: salaryStats
		})
	}
	
	let salaryCK = getCookie("salaryCK");
	
	if (salaryCK != null) {
		let tempStr = salaryCK.split("|");
		
		document.getElementById("counter").textContent = tempStr[0];
		document.getElementById("salary").value = tempStr[1];
	}
	
	if (document.getElementById("upFlag").checked) {
		document.getElementById("upFlag").checked = false;
		
		if (salaryCK != null) {
			let salarySum = salaryCK.split("|")[0];
			let salary = salaryCK.split("|")[1];
			let multiply = salaryCK.split("|")[2];
			let time = salaryCK.split("|")[3];
			let now = new Date();
			let tempTime = (now.getTime() - time) / 1000
			
			setCookie("salaryCK", salaryCalculator(parseFloat(salarySum), salary, multiply, tempTime) + "|" + salary + "|" + multiply + "|" + now.getTime(), 0.5);
		}
		
		nightBtn.click();
	}
}

// Update the count down every 1 second
let countSalary = setInterval(() => {
	let upFlag = document.getElementById("upFlag").checked;
	
	if (upFlag) {
		// Get salary
		let salary = document.getElementById("salary").value;
		let salarySum = 0.00;
		let salaryCK = getCookie("salaryCK");
		
		if (salaryCK != null) {
			salarySum = parseFloat(salaryCK.split("|")[0]);
		}
		
		// countup.js option
		const options = {
				startVal: salarySum,
				decimalPlaces: 2
		};
		
		let now = new Date();
		
		let multiply = document.getElementById("multiplyBtn").textContent;
		
		multiply = parseFloat(multiply.replace(/X/g, ''));
		
		salarySum = salaryCalculator(salarySum, salary, multiply, 1);
		
		// Output the result in an element with id="demo"
		document.getElementById("counter").textContent = salarySum;
		
		let demo = new CountUp("counter", salarySum, options);
		
		if (!demo.error) {
		  demo.start();
		} else {
		  console.error(demo.error);
		}
		
		setCookie("salaryCK", salarySum + "|" + salary + "|" + multiply + "|" + now.getTime(), 0.5);
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

function salaryCalculator(salarySum, salary, multiply, time) {
	salarySum += salary / 209 / 12 * multiply / 3600 * time;
	
	return salarySum.toFixed(2);
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
