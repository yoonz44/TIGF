var sum = 0;

// Update the count down every 1 second
var x = setInterval(function() {
	var upFlag = document.getElementById("upFlag").checked;
	
	if (upFlag) {
		// Get salary
		var salary = document.getElementById("salary").value;
		
		// Get todays date and time
		var now = new Date();
		var nowTime = now.getHours() + "" + now.getMinutes();
		
		if ((nowTime >= 1730 && nowTime < 1800) || (nowTime >= 1900 && nowTime < 2200)) {
			sum += salary / 209 / 12 * 1.5 / 3600; 
		} else if (nowTime >= 2200 && nowTime < 2400) {
			sum += salary / 209 / 12 * 2 / 3600;
		}
		
		// Output the result in an element with id="demo"
		document.getElementById("counter").textContent = sum.toFixed(0) + " kw";
	}
}, 1000);


//연봉 : x
//시간 : t
//
//x / 209 / 12 * 1.5 / 3600 = y
//카운팅은 초단위
//1초에 y만큼 누적이 되도록
//
//조건1. 특정 시간에만 누적이 되야함. (17:30 ~ 18:00, 19:00 ~ 22:00)
//조건2. 22:00 ~ 24:00 에는 2y 만큼 누적