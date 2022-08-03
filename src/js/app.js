import Swiper, { Navigation, Pagination } from "swiper";
import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import topVideo from "./components/top-video";
import open from "./components/burger";
import sliderReveal from "./components/sliderReveal";
import textReveal from "./components/textReveal";
import revealImage from "./components/revealImage";

gsap.registerPlugin(ScrollTrigger);

const revealContainers = document.querySelectorAll(".vip-pic");
const textContainer = document.querySelector(".vip-text");
const sliderContainer = document.querySelector(".vip-slider");
const opener = document.querySelector("#menu-switch");

topVideo();
opener.addEventListener("click", open);

sliderReveal(sliderContainer);
textReveal(textContainer);
revealContainers.forEach(revealImage);

const breakpointTablet = window.matchMedia("(min-width: 768px)");
const breakpointDesktop = window.matchMedia("(min-width: 1360px)");

let mobileSwiper;
let emotionsSwiper;

function breakpointTabletChecker() {
	if (breakpointTablet.matches === false) {
		return enableMobileSwiper();
	} else if (breakpointTablet.matches === true) {
		if (mobileSwiper !== undefined) mobileSwiper.destroy(true, true);
		return;
	}
}

function breakpointDesktopChecker() {
	if (breakpointDesktop.matches === false) {
		return enableEmotionsSwiper();
	} else if (breakpointDesktop.matches === true) {
		if (emotionsSwiper !== undefined) emotionsSwiper.destroy(true, true);
		return;
	}
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

breakpointTablet.addEventListener("change", breakpointTabletChecker);
breakpointDesktop.addEventListener("change", breakpointDesktopChecker);

breakpointTabletChecker();
breakpointDesktopChecker();
