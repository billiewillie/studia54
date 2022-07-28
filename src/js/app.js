import Swiper, { Navigation, Pagination } from "swiper";
import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const menu = document.querySelector('.menu');
const btn = menu.querySelector('.nav-tgl');

btn.addEventListener('click', evt => {
	menu.classList.toggle('active');
})

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
