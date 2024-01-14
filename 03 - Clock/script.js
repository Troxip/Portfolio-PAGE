"use strict";

// const hourEl = document.querySelector(".hour");
// const minuteEl = document.querySelector(".minute");
// const secondEl = document.querySelector(".second");
// const timeEl = document.querySelector(".time");
// const dateEl = document.querySelector(".date");
// const toggleBtn = document.querySelector(".toggle");

// toggleBtn.addEventListener("click", (e) => {
//     const html = document.querySelector("html");

//     if (html.classList.contains("dark")) {
//       html.classList.remove("dark");
//       e.target.innerHTML = "Dark Mode";
//     } else {
//       html.classList.add("dark");
//       e.target.innerHTML = "Light Mode";
//     }
//   });

const elements = {
  hour: document.querySelector(".hour"),
  minute: document.querySelector(".minute"),
  second: document.querySelector(".second"),
  time: document.querySelector(".time"),
  date: document.querySelector(".date"),
  toggleBtn: document.querySelector(".toggle"),
  html: document.querySelector("html"),
};

function toggleDarkMode() {
  elements.html.classList.toggle("dark");
  const isDarkMode = elements.html.classList.contains("dark");
  elements.toggleBtn.innerHTML = isDarkMode ? "Light Mode" : "Dark Mode";
}

elements.toggleBtn.addEventListener("click", toggleDarkMode);

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthsAbbreviated = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function setTime() {
  const time = new Date();
  const month = time.getMonth(); // Fixed the variable name here
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const minute = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  elements.hour.style.transform = `translate(-50%, -100%) rotate(${scale(
    hoursForClock,
    0,
    12,
    0,
    360
  )}deg)`;
  elements.minute.style.transform = `translate(-50%, -100%) rotate(${scale(
    minute,
    0,
    60,
    0,
    360
  )}deg)`;
  elements.second.style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    60,
    0,
    360
  )}deg)`;

  elements.time.innerHTML = `${hoursForClock}:${
    minute < 10 ? `0${minute}` : minute
  }${ampm}`;

  elements.date.innerHTML = `${days[day]}, ${monthsAbbreviated[month]} <span class="circle">${date}</span>`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

setTime();
setInterval(setTime, 1000);
