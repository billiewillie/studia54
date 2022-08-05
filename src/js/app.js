import Swiper, { Navigation, Pagination } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import simpleParallax from "simple-parallax-js";

import topVideo from "./components/top-video";
import open from "./components/burger";
import textReveal from "./components/textReveal";
import revealImage from "./components/revealImage";
import logoAnimation from "../img/logo-animation.mp4";

gsap.registerPlugin(ScrollTrigger);

const revealContainers = document.querySelectorAll(".vip-pic");
const textContainer = document.querySelector(".vip-text");
const sliderContainer = document.querySelector(".vip-slider");
const opener = document.querySelector("#menu-switch");
const logoVideo = document.querySelector(".logo-video video");
const productionPicBg = document.querySelector(".production-pic__bg");
const selectItem = document.querySelector(".selectItem");

new simpleParallax(productionPicBg, {
	orientation: "right",
	scale: 1.12,
});

logoVideo.setAttribute("src", logoAnimation);

let isPaused = false;
let observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio != 1) {
				logoVideo.pause();
				isPaused = true;
			} else if (isPaused) {
				logoVideo.play();
				isPaused = false;
			}
		});
	},
	{
		threshold: 1,
	}
);

observer.observe(logoVideo);

topVideo();
opener.addEventListener("click", open);

textReveal(textContainer);
revealContainers.forEach(revealImage);

const breakpointDesktop = window.matchMedia("(min-width: 1360px)");

let emotionsSwiper;

function breakpointDesktopChecker() {
	if (breakpointDesktop.matches === false) {
		return enableEmotionsSwiper();
	} else if (breakpointDesktop.matches === true) {
		if (emotionsSwiper !== undefined) emotionsSwiper.destroy(true, true);
		return;
	}
}

function enableEmotionsSwiper() {
	emotionsSwiper = new Swiper(".emotions-slider", {
		loop: true,
		slidesPerView: "auto",
		centeredSlides: true,
		spaceBetween: 16,

		breakpoints: {
			768: {
				spaceBetween: 57,
			},
		},
	});
}

new Swiper(".catalog-slider", {
	slidesPerView: "auto",
	spaceBetween: 16,
	centeredSlidesBounds: true,
	centeredSlides: true,

	breakpoints: {
		768: {
			spaceBetween: 32,
		},
		1360: {
			spaceBetween: 40,
		},
		1920: {
			spaceBetween: 33,
		},
	},
});

new Swiper(".production-slider", {
	modules: [Navigation],
	slidesPerView: "auto",
	centeredSlides: true,
	centeredSlidesBounds: true,
	spaceBetween: 24,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		768: {
			spaceBetween: 56,
		},
		1360: {
			spaceBetween: 0,
			slidesPerView: 1,
		},
	},
});

const aboutData = ["2018-2019", "2019-2020", "2020-2021", "2020-2021", "май 2022"];

new Swiper(".about-slider", {
	modules: [Navigation, Pagination],
	loop: true,
	slidesPerView: "auto",
	spaceBetween: 16,
	centeredSlides: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			const text = aboutData[index];
			return `
				<div class="${className}">
					<span class="pagination-text">${text}</span>
					<span class="pagination-border"></span>
				</div>`;
		},
	},
	on: {
		init: function () {
			console.log("swiper initialized");
		},
	},

	breakpoints: {
		768: {
			centeredSlides: false,
			loop: false,
			spaceBetween: 56,
		},
		1360: {
			slidesPerView: 1,
			loop: false,
			spaceBetween: 0,
			centeredSlides: false,
			noSwiping: true,
			noSwipingClass: ".swiper-slide",
			speed: 1,
		},
	},
});

breakpointDesktop.addEventListener("change", breakpointDesktopChecker);

breakpointDesktopChecker();

// const woodstockElements = ["woodstock_eben", "woodstock_eben-2", "woodstock_evkalipt", "woodstock_evkalipt", "woodstock_orex"];

// const setActiveEl = (category, arr) => {
// 	const getActiveEl = document.querySelectorAll(`[data-class="${category}]`);
// 	console.log(getActiveEl);
// };

// selectItem.addEventListener("click", (e) => {
// 	const image = document.querySelector(`.${e.target.dataset.target} img`);
// 	console.log(image);
// 	image.src = "../../img/woodstock_eben-2.png";
// 	// setActiveEl("woodstock", woodstockElements);
// });

const options = Array.from(document.querySelectorAll("li.option"));

options.forEach((option) => {
	option.addEventListener("click", (e) => {
		const image = e.target.closest(".option").dataset.image;
		const category = e.target.closest(".option").dataset.category;
		if (image !== undefined) {
			const element = document.querySelector(`.builder-pics__item.${category} img`);
			element.src = `../../img/${image}.png`;
			// console.log(element);
		}
	});
});

// const setDetail = () => {};
