import Swiper, { Navigation, Pagination } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import simpleParallax from "simple-parallax-js";

import topVideo from "./components/top-video";
import open from "./components/burger";
import textReveal from "./components/textReveal";
import revealImage from "./components/revealImage";
import logoAnimation from "../img/logo-animation.mp4";
import aboutSlider from "./components/aboutSlider";

gsap.registerPlugin(ScrollTrigger);

const revealContainers = document.querySelectorAll(".vip-pic");
const textContainer = document.querySelector(".vip-text");
const opener = document.querySelector("#menu-switch");
const logoVideo = document.querySelector(".logo-video video");
const productionPicBg = document.querySelector(".production-pic__bg");

new simpleParallax(productionPicBg, {
	orientation: "right",
	scale: 1.12,
});

logoVideo.setAttribute("src", logoAnimation);
logoVideo.removeAttribute("controls");

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
			// speed: 5,
		},
	},
});

breakpointDesktop.addEventListener("change", breakpointDesktopChecker);

breakpointDesktopChecker();

const options = Array.from(document.querySelectorAll("li.option"));

options.forEach((option) => {
	option.addEventListener("click", (e) => {
		const image = e.target.closest(".option").dataset.image;
		const option = e.target.closest(".option");
		const category = e.target.closest(".option").dataset.category;
		const list = Array.from(e.target.closest(".vip-options__list").children);
		list.forEach((item) => item.classList.remove("active"));
		option.classList.add("active");

		if (image !== undefined) {
			const element = document.querySelector(`.builder-pics__item.${category} img`);
			element.src = `../../img/${image}.png`;
		}
	});
});

const changeTableButtons = document.querySelectorAll(".changeTable");

const optionsTop = [
	"../../img/woodstock_eben.png",
	"../../img/woodstock_eben-2.png",
	"../../img/woodstock_evkalipt.png",
	"../../img/woodstock_koto.png",
	"../../img/woodstock_orex.png",
];

const optionsAida = ["../../img/aida_black.png", "../../img/aida_blackberry.png", "../../img/aida_grey.png", "../../img/aida_spruce.png"];

const optionsInside = [
	"../../img/aida_saddle_inside.png",
	"../../img/aida_grey_inside.png",
	"../../img/aida_ash_inside.png",
	"../../img/aida_sand_inside.png",
];

const setImagePart = (data) => {
	if (data === "woodstock") {
		const element = document.querySelector(`.builder-pics__item.woodstock img`);
		let src = element.getAttribute("src");
		let index = optionsTop.indexOf(src);
		if (index < optionsTop.length - 1) {
			element.setAttribute("src", optionsTop[index + 1]);
		} else {
			element.setAttribute("src", optionsTop[0]);
		}
	} else if (data === "aida") {
		const element = document.querySelector(`.builder-pics__item.aida img`);
		let src = element.getAttribute("src");
		let index = optionsAida.indexOf(src);
		if (index < optionsAida.length - 1) {
			element.setAttribute("src", optionsAida[index + 1]);
		} else {
			element.setAttribute("src", optionsAida[0]);
		}
	} else if (data === "inside") {
		const element = document.querySelector(`.builder-pics__item.inside img`);
		let src = element.getAttribute("src");
		let index = optionsInside.indexOf(src);
		if (index < optionsInside.length - 1) {
			element.setAttribute("src", optionsInside[index + 1]);
		} else {
			element.setAttribute("src", optionsInside[0]);
		}
	}
};

changeTableButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		const data = e.target.dataset.image;
		setImagePart(data);
	});
});

window.addEventListener("load", () => {
	let sectionHeadersTitle = gsap.utils.toArray(".section-header .title");
	let sectionHeadersSpecial = gsap.utils.toArray(".section-header .special");
	let sectionHeadersBorder = gsap.utils.toArray(".section-header .border");
	let collectionPicBig = document.querySelector(".collection-pic");
	let collectionFooterPic = document.querySelector(".collection-footer__pic");
	let collectionContent = document.querySelector(".collection-content");
	let collectionRotatedText = document.querySelector(".collection .rotated");

	sectionHeadersTitle.forEach(function (item) {
		gsap.fromTo(
			item,
			{
				x: -100,
				autoAlpha: 0,
			},
			{
				x: 0,
				autoAlpha: 1,
				duration: 1,
				scrollTrigger: {
					trigger: item,
					start: "top 60%",
				},
			}
		);
	});

	sectionHeadersSpecial.forEach(function (item) {
		gsap.fromTo(
			item,
			{
				x: 100,
				autoAlpha: 0,
			},
			{
				x: 0,
				autoAlpha: 1,
				duration: 1,
				scrollTrigger: {
					trigger: item,
					start: "top 60%",
				},
			}
		);
	});

	sectionHeadersBorder.forEach(function (item) {
		gsap.fromTo(
			item,
			{
				background: "linear-gradient(270deg, rgba(224, 192, 160, 0.5) 0%, rgba(255, 255, 255, 0) 0%)",
			},
			{
				background: "linear-gradient(270deg, rgba(224, 192, 160, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
				duration: 2,
				scrollTrigger: {
					trigger: item,
					start: "top 60%",
				},
			}
		);
	});

	gsap.fromTo(
		collectionPicBig,
		{
			y: 100,
			autoAlpha: 0,
		},
		{
			y: 0,
			autoAlpha: 1,
			duration: 1,
			scrollTrigger: {
				trigger: collectionPicBig,
				start: "top 60%",
			},
		}
	);

	gsap.fromTo(
		collectionFooterPic,
		{
			y: 100,
			autoAlpha: 0,
		},
		{
			y: 0,
			autoAlpha: 1,
			duration: 1,
			scrollTrigger: {
				trigger: collectionFooterPic,
				start: "top 80%",
			},
		}
	);

	gsap.fromTo(
		collectionContent,
		{
			x: -100,
			autoAlpha: 0,
		},
		{
			x: 0,
			autoAlpha: 1,
			duration: 1,
			scrollTrigger: {
				trigger: collectionContent,
				start: "top 100%",
			},
		}
	);

	gsap.fromTo(
		collectionRotatedText,
		{
			autoAlpha: 0,
		},
		{
			autoAlpha: 1,
			duration: 1,
			scrollTrigger: {
				trigger: collectionRotatedText,
				start: "top 60%",
			},
		}
	);
});

document.querySelectorAll("img").forEach((img) => {
	if (img.complete) {
		ScrollTrigger.refresh();
	} else {
		img.addEventListener("load", (imgLoaded) => ScrollTrigger.refresh());
	}
});

const links = document.querySelectorAll(".burger .menu__link");
links.forEach((link) => {
	link.addEventListener("click", (e) => {
		const block = e.target.dataset.href;
		opener.click();
		location.href = block;
	});
});

aboutSlider();
