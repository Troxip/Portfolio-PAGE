// Set up an interval to update the clock every second
function updateTime() {
  document.querySelector(".top").style.display = "none";
  document.querySelector(".h1").innerHTML = "Current";
  document.querySelector(".h2").innerHTML = "Time";
  document.querySelector(".h3").style.display = "none";
  document.getElementById("ampm").innerHTML = "Coding Time";
  // Get elements for hours, minutes, seconds, and AM/PM
  let month = document.getElementById("month");
  let days = document.getElementById("days");
  let hours = document.getElementById("hours");
  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");
  let ampm = document.getElementById("ampm");

  // Get elements for clock hands (hour, minute, second)
  let mmonth = document.getElementById("mmonth");
  let dd = document.getElementById("dd");
  let hh = document.getElementById("hh");
  let mm = document.getElementById("mm");
  let ss = document.getElementById("ss");

  // Get elements for clock dots
  let mmonth_dot = document.querySelector(".month_dot");
  let dd_dot = document.querySelector(".day_dot");
  let hr_dot = document.querySelector(".hr_dot");
  let min_dot = document.querySelector(".min_dot");
  let sec_dot = document.querySelector(".sec_dot");

  //Get number of days in current month
  const numDaysCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  // Get current time

  let mmmonth = new Date().getMonth() + 1;
  let d = new Date().getDate();
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();

  // Add leading zero to numbers under 10
  d = d < 10 ? `0${d}` : d;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  // Update the displayed time
  month.innerHTML = mmmonth + "<br><span>Months</span>";
  days.innerHTML = d + "<br><span>Days</span>";
  hours.innerHTML = h + "<br><span>Hours</span>";
  minutes.innerHTML = m + "<br><span>Minutes</span>";
  seconds.innerHTML = s + "<br><span>Seconds</span>";

  // Update the clock hands' stroke dash offset for animation
  mmonth.style.strokeDashoffset = 440 - (440 * mmmonth) / 12;
  dd.style.strokeDashoffset = 440 - (440 * d) / numDaysCurrentMonth;
  hh.style.strokeDashoffset = 440 - (440 * h) / 24;
  mm.style.strokeDashoffset = 440 - (440 * m) / 60;
  ss.style.strokeDashoffset = 440 - (440 * s) / 60;

  // Rotate clock dots based on the current time
  mmonth_dot.style.transform = `rotate(${mmmonth * 30}deg)`;
  //360 / Number of Months in a Year

  dd_dot.style.transform = `rotate(${d * (360 / numDaysCurrentMonth)}deg)`;
  //360 / Number of days in current Month

  hr_dot.style.transform = `rotate(${h * 15}deg)`;
  // 360 / 24(number of hours in a day) = 30

  min_dot.style.transform = `rotate(${m * 6}deg)`;
  // 360 / 60(Number of Minutes in One Hours) = 6

  sec_dot.style.transform = `rotate(${s * 6}deg)`;
  // 360 / 60(Number of Seconds in One Minute) = 6
}

//Updates Times Every Second

function fromStartDate() {
  //Display 2 more clocks
  document.querySelector(".top").style.display = "flex";
  document.querySelector(".h1").innerHTML = "Coding";
  document.querySelector(".h2").innerHTML = "Odyssey";
  document.querySelector(".h3").style.display = "block";
  document.getElementById("ampm").innerHTML = "Clock";

  const startDate = new Date("2023-11-01T12:30:00");
  // Get the current date and time
  const currentDate = new Date();
  const timeDifference = currentDate - startDate;
  let s = Math.floor(timeDifference / 1000) % 60;
  let m = Math.floor(timeDifference / (1000 * 60)) % 60;
  let h = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  let d = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) % 30; //
  let mmmonth = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));

  // Get elements for hours, minutes, seconds, and AM/PM
  let month = document.getElementById("month");
  let days = document.getElementById("days");
  let hours = document.getElementById("hours");
  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");

  // Get elements for clock hands (hour, minute, second)
  let mmonth = document.getElementById("mmonth");
  let dd = document.getElementById("dd");
  let hh = document.getElementById("hh");
  let mm = document.getElementById("mm");
  let ss = document.getElementById("ss");

  // Get elements for clock dots
  let mmonth_dot = document.querySelector(".month_dot");
  let dd_dot = document.querySelector(".day_dot");
  let hr_dot = document.querySelector(".hr_dot");
  let min_dot = document.querySelector(".min_dot");
  let sec_dot = document.querySelector(".sec_dot");

  //Get number of days in current month
  const numDaysCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  // Get current time

  // Add leading zero to numbers under 10
  d = d < 10 ? `0${d}` : d;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  // Update the displayed time
  month.innerHTML = mmmonth + "<br><span>Months</span>";
  days.innerHTML = d + "<br><span>Days</span>";
  hours.innerHTML = h + "<br><span>Hours</span>";
  minutes.innerHTML = m + "<br><span>Minutes</span>";
  seconds.innerHTML = s + "<br><span>Seconds</span>";

  // Update the clock hands' stroke dash offset for animation
  mmonth.style.strokeDashoffset = 440 - (440 * mmmonth) / 12;
  dd.style.strokeDashoffset = 440 - (440 * d) / numDaysCurrentMonth;
  hh.style.strokeDashoffset = 440 - (440 * h) / 24;
  mm.style.strokeDashoffset = 440 - (440 * m) / 60;
  ss.style.strokeDashoffset = 440 - (440 * s) / 60;

  // Rotate clock dots based on the current time
  mmonth_dot.style.transform = `rotate(${mmmonth * 30}deg)`;
  //360 / Number of Months in a Year
  dd_dot.style.transform = `rotate(${d * (360 / numDaysCurrentMonth)}deg)`;
  //360 / Number of days in current Month
  hr_dot.style.transform = `rotate(${h * 15}deg)`;
  // 360 / 24(number of hours in a day) = 30
  min_dot.style.transform = `rotate(${m * 6}deg)`;
  // 360 / 60(Number of Minutes in One Hours) = 6
  sec_dot.style.transform = `rotate(${s * 6}deg)`;
  // 360 / 60(Number of Seconds in One Minute) = 6
}
let current = fromStartDate;
setInterval(() => current());

const switchBtn = document.getElementById("ampm");
switchBtn.addEventListener("click", () => {
  current = current === fromStartDate ? updateTime : fromStartDate;
});
