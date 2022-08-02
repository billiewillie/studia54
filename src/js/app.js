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

const breakpointDesktop = window.matchMedia("(min-width: 768px)");

let mobileSwiper;

function breakpointChecker() {
	if (breakpointDesktop.matches === false) {
		return enableMobileSwiper();
	} else if (breakpointDesktop.matches === true) {
		if (mobileSwiper !== undefined) mobileSwiper.destroy(true, true);
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

new Swiper(".catalog-slider", {
	slidesPerView: "auto",
	spaceBetween: 16,
});

breakpointDesktop.addEventListener("change", breakpointChecker);
breakpointChecker();
