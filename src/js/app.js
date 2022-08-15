import Swiper, { Navigation, Pagination } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import simpleParallax from "simple-parallax-js";
import intlTelInput from "intl-tel-input";

import topVideo from "./components/top-video";
import open from "./components/burger";
import textReveal from "./components/textReveal";
import revealImage from "./components/revealImage";
import logoAnimation from "../img/logo-animation.mp4";
import aboutSlider from "./components/aboutSlider";
import utils from "./components/utils";

// fetch("https://ipinfo.io/json").then((response) => response.json());

const input = document.querySelector("#phone");
const inputPopup = document.querySelector("#phone-popup");

intlTelInput(inputPopup, {
	initialCountry: "ru",
	onlyCountries: ["us", "gb", "ru", "it"],
	preferredCountries: [],
	separateDialCode: true,
	// placeholderNumberType: "TOLL_FREE",
	autoPlaceholder: "aggressive",
	utilsScript: utils,
	// geoIpLookup: function (callback) {
	// 	fetch("https://ipinfo.io/json", {
	// 		cache: "reload",
	// 	})
	// 		.then((response) => {
	// 			if (response.ok) {
	// 				return response.json();
	// 			}
	// 			throw new Error("Failed: " + response.status);
	// 		})
	// 		.then((ipjson) => {
	// 			callback(ipjson.country);
	// 		})
	// 		.catch((e) => {
	// 			callback("us");
	// 		});
	// },
});

intlTelInput(input, {
	initialCountry: "ru",
	onlyCountries: ["us", "gb", "ru", "it"],
	preferredCountries: [],
	separateDialCode: true,
	// placeholderNumberType: "TOLL_FREE",
	autoPlaceholder: "aggressive",
	utilsScript: utils,
	// geoIpLookup: function (callback) {
	// 	fetch("https://ipinfo.io/json", {
	// 		cache: "reload",
	// 	})
	// 		.then((response) => {
	// 			if (response.ok) {
	// 				return response.json();
	// 			}
	// 			throw new Error("Failed: " + response.status);
	// 		})
	// 		.then((ipjson) => {
	// 			callback(ipjson.country);
	// 		})
	// 		.catch((e) => {
	// 			callback("us");
	// 		});
	// },
});

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

let observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio == 1) {
				logoVideo.play();
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
	modules: [Pagination, Navigation],
	slidesPerView: "auto",
	spaceBetween: 16,
	centeredSlidesBounds: true,
	centeredSlides: true,
	pagination: {
		el: ".catalog-pagination",
		type: "progressbar",
	},
	navigation: {
		nextEl: ".catalog-button-next",
		prevEl: ".catalog-button-prev",
	},
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
		init: (index) => {
			const paginations = Array.from(document.querySelectorAll(".about .about-slider .pagination-border"));
			paginations.forEach((pagination, index) => {
				pagination.style.opacity = 1;
				if (index === 1) pagination.style.opacity = 0.5;
				if (index === 2) pagination.style.opacity = 0.4;
				if (index === 3) pagination.style.opacity = 0.3;
				if (index === 4) pagination.style.opacity = 0.2;
			});
		},
		slideChange: (index) => {
			const paginations = Array.from(document.querySelectorAll(".about .about-slider .pagination-border"));
			paginations.forEach((pagination) => {
				if (index.snapIndex === 4) {
					paginations[index.snapIndex - 4].style.opacity = 0.2;
					paginations[index.snapIndex - 3].style.opacity = 0.3;
					paginations[index.snapIndex - 2].style.opacity = 0.4;
					paginations[index.snapIndex - 1].style.opacity = 0.5;
					paginations[index.snapIndex].style.opacity = 1;
				} else if (index.snapIndex === 5) {
					paginations[index.snapIndex - 5].style.opacity = 1;
					paginations[index.snapIndex - 4].style.opacity = 0.5;
					paginations[index.snapIndex - 3].style.opacity = 0.4;
					paginations[index.snapIndex - 2].style.opacity = 0.3;
					paginations[index.snapIndex - 1].style.opacity = 0.2;
				} else if (index.snapIndex === 6) {
					paginations[index.snapIndex - 6].style.opacity = 0.5;
					paginations[index.snapIndex - 5].style.opacity = 1;
					paginations[index.snapIndex - 4].style.opacity = 0.5;
					paginations[index.snapIndex - 3].style.opacity = 0.4;
					paginations[index.snapIndex - 2].style.opacity = 0.3;
				} else if (index.snapIndex === 7) {
					paginations[index.snapIndex - 7].style.opacity = 0.4;
					paginations[index.snapIndex - 6].style.opacity = 0.5;
					paginations[index.snapIndex - 5].style.opacity = 1;
					paginations[index.snapIndex - 4].style.opacity = 0.5;
					paginations[index.snapIndex - 3].style.opacity = 0.4;
				} else if (index.snapIndex === 8) {
					paginations[index.snapIndex - 8].style.opacity = 0.3;
					paginations[index.snapIndex - 7].style.opacity = 0.4;
					paginations[index.snapIndex - 6].style.opacity = 0.5;
					paginations[index.snapIndex - 5].style.opacity = 1;
					paginations[index.snapIndex - 4].style.opacity = 0.5;
				} else if (index.snapIndex === 9) {
					paginations[index.snapIndex - 9].style.opacity = 0.2;
					paginations[index.snapIndex - 8].style.opacity = 0.3;
					paginations[index.snapIndex - 7].style.opacity = 0.4;
					paginations[index.snapIndex - 6].style.opacity = 0.5;
					paginations[index.snapIndex - 5].style.opacity = 1;
				} else if (index.snapIndex === 10) {
					paginations[index.snapIndex - 10].style.opacity = 1;
					paginations[index.snapIndex - 9].style.opacity = 0.5;
					paginations[index.snapIndex - 8].style.opacity = 0.4;
					paginations[index.snapIndex - 7].style.opacity = 0.3;
					paginations[index.snapIndex - 6].style.opacity = 0.2;
				}
			});
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
		},
	},
});

breakpointDesktop.addEventListener("change", breakpointDesktopChecker);

breakpointDesktopChecker();

const optionsList = Array.from(document.querySelectorAll(".vip-options__list"));
optionsList.forEach((list) => {
	let isClicked = false;
	const options = Array.from(list.querySelectorAll("li.option"));

	options.forEach((option) => {
		option.addEventListener("mouseenter", (e) => {
			if (isClicked === false) {
				const image = e.target.closest(".option").dataset.image;
				const category = e.target.closest(".option").dataset.category;
				options.forEach((item) => item.classList.remove("active"));
				option.classList.add("active");

				if (image !== undefined) {
					const element = document.querySelector(`.builder-pics__item.${category} img`);
					element.src = `../../img/${image}.png`;
				}
			}
		});
		option.addEventListener("click", (e) => {
			isClicked = true;
			const image = e.target.closest(".option").dataset.image;
			const category = e.target.closest(".option").dataset.category;
			options.forEach((item) => item.classList.remove("active"));
			option.classList.add("active");

			if (image !== undefined) {
				const element = document.querySelector(`.builder-pics__item.${category} img`);
				element.src = `../../img/${image}.png`;
			}
		});
	});
});

window.addEventListener("load", () => {
	let sectionHeadersTitle = gsap.utils.toArray(".section-header .title");
	let aboutSlider = document.querySelector(".about-slider");
	let productionSlider = document.querySelector(".production-slider");
	let emotionsSlider = document.querySelector(".emotions-slider");
	let sectionHeadersSpecial = gsap.utils.toArray(".section-header .special");
	let sectionHeadersBorder = gsap.utils.toArray(".section-header .border");
	let emotionsPics = gsap.utils.toArray(".emotions .pic");
	let emotionsTexts = gsap.utils.toArray(".emotions .text");
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

	if (window.matchMedia("(max-width: 1359px)").matches) {
		gsap.fromTo(
			aboutSlider,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				duration: 1,
				scrollTrigger: {
					trigger: aboutSlider,
					start: "top 95%",
				},
			}
		);

		gsap.fromTo(
			emotionsSlider,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				duration: 1,
				scrollTrigger: {
					trigger: emotionsSlider,
					start: "top 95%",
				},
			}
		);

		gsap.fromTo(
			productionSlider,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				duration: 1,
				scrollTrigger: {
					trigger: productionSlider,
					start: "top 95%",
				},
			}
		);
	}

	if (window.matchMedia("(min-width: 1360px)").matches) {
		emotionsPics.forEach(function (item) {
			gsap.fromTo(
				item,
				{
					y: 100,
					autoAlpha: 0,
				},
				{
					y: 0,
					autoAlpha: 1,
					duration: 1,
					scrollTrigger: {
						trigger: item,
						start: "top 60%",
					},
				}
			);
		});

		emotionsTexts.forEach(function (item) {
			gsap.fromTo(
				item,
				{
					y: -50,
					autoAlpha: 0,
				},
				{
					y: 0,
					autoAlpha: 1,
					duration: 1,
					scrollTrigger: {
						trigger: item,
						start: "top 60%",
					},
				}
			);
		});
	}

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

	gsap.fromTo(
		".emotions-faded--top",
		{
			x: 100,
			autoAlpha: 0,
		},
		{
			x: 0,
			autoAlpha: 1,
			duration: 1,
			scrollTrigger: {
				trigger: ".emotions-faded--top",
				start: "top 80%",
			},
		}
	);

	gsap.fromTo(
		".emotions-faded--bottom",
		{
			x: -100,
			autoAlpha: 0,
		},
		{
			x: 0,
			autoAlpha: 1,
			duration: 1,
			scrollTrigger: {
				trigger: ".emotions-faded--bottom",
				start: "top 80%",
			},
		}
	);

	gsap.fromTo(
		".blossom-text .faded",
		{
			x: 100,
			autoAlpha: 0,
		},
		{
			x: 0,
			autoAlpha: 1,
			duration: 1,
			scrollTrigger: {
				trigger: ".blossom-text .faded",
				start: "top 80%",
			},
		}
	);

	gsap.fromTo(
		".collection-footer__content .faded",
		{
			x: -100,
			autoAlpha: 0,
		},
		{
			x: 0,
			autoAlpha: 1,
			duration: 1,
			scrollTrigger: {
				trigger: ".collection-footer__content .faded",
				start: "top 80%",
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

const links = document.querySelectorAll(".menu__link");
const linksFirstScreen = document.querySelectorAll("a.button, a.button-black");

links.forEach((link) => {
	link.addEventListener("click", (e) => {
		const block = e.target.dataset.href;
		const elem = document.querySelector(block);
		if (opener.checked === true) {
			opener.click();
		}
		window.scrollTo(0, elem.offsetTop);
	});
});

linksFirstScreen.forEach((link) => {
	link.addEventListener("click", (e) => {
		const block = e.target.getAttribute("to");
		const elem = document.querySelector(block);
		if (opener.checked === true) {
			opener.click();
		}
		window.scrollTo(0, elem.offsetTop);
	});
});

aboutSlider();

const popup = document.querySelector("#popup");
const popupClose = document.querySelector("#popup .close");
const popupOverlay = document.querySelector("#popup .popup-overlay");
const popupContent = document.querySelector("#popup .popup-content");
const openPopup = document.querySelector("#popup-open");

openPopup.addEventListener("click", (e) => {
	popup.classList.add("show");
	popupOverlay.classList.add("show");
	popupContent.classList.add("show");
});

popupClose.addEventListener("click", (e) => {
	popupOverlay.classList.add("hide");
	popupContent.classList.add("hide");

	setTimeout(() => {
		popupOverlay.classList.remove("hide", "show");
		popupContent.classList.remove("hide", "show");

		popup.classList.remove("show");
	}, 300);
});

popupOverlay.addEventListener("click", (e) => {
	popupOverlay.classList.add("hide");
	popupContent.classList.add("hide");

	setTimeout(() => {
		popupOverlay.classList.remove("hide", "show");
		popupContent.classList.remove("hide", "show");

		popup.classList.remove("show");
	}, 300);
});

const wrapper = document.querySelector(".wrapper");
