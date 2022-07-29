import Swiper, { Navigation, Pagination } from "swiper";
import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let videoSource = new Array();

videoSource[0] = "../img/bed.mp4";
videoSource[1] = "../img/table.mp4";
videoSource[2] = "../img/banket.mp4";

let i = 0;
const videoCount = videoSource.length;
const element = document.getElementById("video");

function videoPlay(videoNum) {
	element.setAttribute("src", videoSource[videoNum]);
	element.autoplay = true;
	element.load();
}

document.getElementById("video").addEventListener("ended", myHandler, false);

videoPlay(0); // load the first video
ensureVideoPlays(); // play the video automatically

function myHandler() {
	i++;
	if (i == videoCount) {
		i = 0;
		videoPlay(i);
	} else {
		videoPlay(i);
	}
}

function ensureVideoPlays() {
	const video = document.getElementById("video");

	if (!video) return;

	const promise = video.play();
	if (promise !== undefined) {
		promise
			.then(() => {
				// Autoplay started
			})
			.catch((error) => {
				// Autoplay was prevented.
				video.muted = true;
				video.play();
			});
	}
}

gsap.registerPlugin(ScrollTrigger);

const revealContainers = document.querySelectorAll(".vip-pic");
const textContainer = document.querySelector(".vip-text");
const sliderContainer = document.querySelector(".vip-slider");

function sliderReveal(sliderContainer) {
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: sliderContainer,
			toggleActions: "play none none reset",
		},
	});

	tl.from(sliderContainer, 1, {
		xPercent: 10,
		autoAlpha: 0,
		delay: -1,
		ease: Power2.out,
	});
}

sliderReveal(sliderContainer);

function textReveal(textContainer) {
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: textContainer,
			toggleActions: "play none none reset",
		},
	});

	tl.from(textContainer, 1, {
		xPercent: -10,
		autoAlpha: 0,
		delay: -1,
		ease: Power2.out,
	});
}

textReveal(textContainer);

revealContainers.forEach((container) => {
	let image = container.querySelector("img");
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: container,
			toggleActions: "play none none reset",
		},
	});

	tl.set(container, { autoAlpha: 1 });

	tl.from(container, 1.5, {
		xPercent: -100,
		ease: Power2.out,
	});

	tl.from(image, 1.5, {
		xPercent: 150,
		scale: 1.3,
		delay: -1.5,
		ease: Power2.out,
	});
});

const button = document.querySelector(".button");

function getActiveTable() {
	const activeTable = document.querySelector(".swiper-slide-active");
	const getObject = tables.find((t) => t.id === activeTable.dataset.id);
	alert(`Вы выбрали стол ${getObject.title}, материал ${getObject.description}`);
}

button.addEventListener("click", getActiveTable);

const tables = [
	{
		id: "table1",
		color: "#7B4634",
		title: "Эбен 5",
		description: "Натуральный шпон",
	},
	{
		id: "table2",
		color: "#333",
		title: "KOTO",
		description: "Натуральный шпон",
	},
];

const breakpointDesktop = window.matchMedia("(min-width: 768px)");

let desktopSwiper;
let mobileSwiper;

function breakpointChecker() {
	if (breakpointDesktop.matches === false) {
		if (desktopSwiper !== undefined) desktopSwiper.destroy(true, true);
		return enableMobileSwiper();
	} else if (breakpointDesktop.matches === true) {
		if (mobileSwiper !== undefined) mobileSwiper.destroy(true, true);
		return enableDesktopSwiper();
	}
}

function enableDesktopSwiper() {
	desktopSwiper = new Swiper(".vip-slider", {
		modules: [Navigation, Pagination],
		slidesPerView: 1,
		speed: 700,

		pagination: {
			el: ".vip-options__list",
			clickable: true,
			renderBullet: function (index, className) {
				return `<li class="option ${className}">
                  <div class="option-pic" style="background-color: ${tables[index]?.color}"></div>
                  <div class="option-about">
                    <p class="option-about__title">${tables[index]?.title}</p>
                    <p class="option-about__description">${tables[index]?.description}</p>
                  </div>
                </li>`;
			},
		},
	});
}

function enableMobileSwiper() {
	mobileSwiper = new Swiper(".vip-slider", {
		modules: [Navigation, Pagination],
		slidesPerView: 1,
		speed: 500,

		pagination: {
			el: ".swiper-pagination",
			type: "progressbar",
		},
	});
}

breakpointDesktop.addEventListener("change", breakpointChecker);
breakpointChecker();

const opener = document.querySelector("#menu-switch");
const menu = document.querySelector("#navigation");
const navigationContent = document.querySelector(".navigation__content");

opener.addEventListener("click", open);

function open() {
	if (opener.checked) {
		menu.classList.add("is-open");
		navigationContent.classList.add("is-open");
	} else if (menu.classList.contains("is-open") && opener.checked === false) {
		menu.classList.add("is-closing");
		navigationContent.classList.add("is-closing");

		let timerId = setTimeout(close, 500);

		function close() {
			menu.classList.remove("is-open");
			menu.classList.remove("is-closing");

			navigationContent.classList.remove("is-open");
			navigationContent.classList.remove("is-closing");
		}
	}
}

// menu.addEventListener("animationend", function close() {
// 	menu.removeEventListener("animationend", close);
// });
