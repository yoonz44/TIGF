import { CountUp } from './countUp.js';


// Update the count down every 1 second
let countSalary = setInterval(() => {
	let upFlag = document.getElementById("upFlag").checked;
	let salarySum = document.getElementById("counter").textContent;
	
	salarySum = Number(salarySum.replace(/,/g, ''));
	
	if (upFlag) {
		// Get salary
		let salary = document.getElementById("salary").value;
		
		// Get todays date and time
		let now = new Date();
		let nowTime = now.getHours() + "" + addZero(now.getMinutes());
		
		const options = {
				startVal: salarySum,
		};
		
//		if ((nowTime >= 1730 && nowTime < 1800) || (nowTime >= 1900 && nowTime < 2200)) {
			salarySum += salary / 209 / 12 * 1.5 / 3600; 
//		} else if (nowTime >= 2200 && nowTime < 2400) {
//			salarySum += salary / 209 / 12 * 2 / 3600;
//		}
		
		// Output the result in an element with id="demo"
		document.getElementById("counter").textContent = salarySum;
		
		let demo = new CountUp("counter", salarySum, options);
		
		if (!demo.error) {
		  demo.start();
		} else {
		  console.error(demo.error);
		}
	}
}, 1000);

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  
  return i;
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