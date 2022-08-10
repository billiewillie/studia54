import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const aboutSliderText = () => {
	gsap.set(".about-slide-text", { x: "-130%", autoAlpha: 0 });
	gsap.set(".about-slide-picture", { y: "100%" });

	let currentStep = 0;
	const totalSlides = document.querySelectorAll(".about-slide-text").length;
	const wrapper = gsap.utils.wrap(0, totalSlides);

	gsap.to("#about", {
		scrollTrigger: {
			trigger: "#about",
			start: "top 60%",
			onEnter: () => createTimelineIn("next", currentStep),
		},
	});

	function createTimelineIn(direction, index) {
		const goPrev = direction === "prev";
		const slideText = document.querySelector(`.slide-text-${index}`);
		const slidePicture = document.querySelector(`.slide-picture-${index}`);

		const title = slideText.querySelector("h2.title");
		const text = slideText.querySelector("p.text");
		const picBig = slidePicture.querySelector(".pic");
		const picSmall = slidePicture.querySelector(".pic-small");

		const tlIn = gsap.timeline({
			id: "tlIn",
			defaults: {
				modifiers: {
					x: gsap.utils.unitize(function (x) {
						return goPrev ? x : Math.abs(x);
					}),
				},
			},
		});

		tlIn
			.fromTo(
				slideText,
				{
					autoAlpha: 0,
					x: -200,
				},
				{
					duration: 1,
					x: 0,
					autoAlpha: 1,
				}
			)
			.fromTo(
				slidePicture,
				{
					autoAlpha: 0,
					y: 400,
				},
				{
					duration: 1,
					y: 0,
					autoAlpha: 1,
				},
				"-=0.6"
			)
			.fromTo([title, text], { x: -200, autoAlpha: 0 }, { duration: 1, x: 0, autoAlpha: 1, stagger: 0.1 }, "-=1")
			.fromTo([picBig, picSmall], { y: 400, autoAlpha: 0 }, { duration: 1, y: 0, autoAlpha: 1, stagger: 0.1 }, "-=1");

		return tlIn;
	}

	function createTimelineOut(direction, index) {
		const goPrev = direction === "prev";

		const slideText = document.querySelector(`.slide-text-${index}`);
		const slidePicture = document.querySelector(`.slide-picture-${index}`);
		const title = slideText.querySelector("h2.title");
		const text = slideText.querySelector("p.text");
		const picBig = slidePicture.querySelector(".pic");
		const picSmall = slidePicture.querySelector(".pic-small");

		const tlOut = gsap.timeline({
			id: "tlIn",
			defaults: {
				modifiers: {
					x: gsap.utils.unitize(function (x) {
						return goPrev ? x : -x;
					}),
				},
			},
		});

		tlOut
			.to(
				slideText,
				{
					x: 200,
					autoAlpha: 0,
				},
				"-=0.5"
			)
			.to(
				slidePicture,
				{
					duration: 1,
					y: 400,
					autoAlpha: 0,
				},
				"-=1"
			)
			.to([title, text], { duration: 1, x: 200, autoAlpha: 0, stagger: 0.1 }, "-=2")
			.to([picBig, picSmall], { duration: 1, y: 400, autoAlpha: 0, stagger: 0.1 }, "-=2");

		return tlOut;
	}

	function updateCurrentStep(goToIndex) {
		currentStep = goToIndex;

		document.querySelectorAll(".dot").forEach(function (element, index) {
			element.setAttribute("class", "dot");
			if (index === currentStep) {
				element.classList.add("active");
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 1)";
			} else if (index === currentStep - 1 || index === currentStep + 1) {
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 0.5)";
			} else if (index === currentStep - 2 || index === currentStep + 2) {
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 0.4)";
			} else if (index === currentStep - 3 || index === currentStep + 3) {
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 0.3)";
			} else if (index === currentStep - 4 || index === currentStep + 4) {
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 0.2)";
			}
		});
	}

	function transition(direction, toIndex) {
		const tlTransition = gsap.timeline({
			onStart: function () {
				updateCurrentStep(toIndex);
			},
		});

		const tlOut = createTimelineOut(direction, currentStep);
		const tlIn = createTimelineIn(direction, toIndex);

		tlTransition.add(tlOut).add(tlIn, ">-2");

		return tlTransition;
	}

	function isTweening() {
		return gsap.isTweening(".about-slide-text");
	}

	document.querySelector(".button-next").addEventListener("click", function (e) {
		e.preventDefault();

		const nextStep = wrapper(currentStep + 1);

		!isTweening() && transition("next", nextStep);
	});

	document.querySelector(".button-prev").addEventListener("click", function (e) {
		e.preventDefault();

		const prevStep = wrapper(currentStep - 1);

		!isTweening() && transition("prev", prevStep);
	});

	function createNavigation() {
		const dates = ["2018 - 2019", "2019 - 2020", "2020 - 2021", "2021 - 2022", "май 2022"];

		// create dots container
		const newDiv = document.createElement("div");
		newDiv.setAttribute("class", "dots");

		// add active spot
		const spot = document.createElement("div");
		spot.setAttribute("class", "spot");

		// create a dot for each slide
		for (let index = 0; index < totalSlides; index++) {
			const element = document.createElement("div");
			const text = document.createTextNode(dates[index]);
			element.appendChild(text);
			element.setAttribute("class", "dot");
			if (currentStep === index) {
				element.classList.add("active");
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 1)";
			} else if (index === currentStep - 1 || index === currentStep + 1) {
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 0.5)";
			} else if (index === currentStep - 2 || index === currentStep + 2) {
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 0.4)";
			} else if (index === currentStep - 3 || index === currentStep + 3) {
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 0.3)";
			} else if (index === currentStep - 4 || index === currentStep + 4) {
				element.style.borderBottom = "2px solid rgba(224, 192, 160, 0.2)";
			}

			element.addEventListener("click", function () {
				if (!isTweening() && currentStep !== index) {
					const direction = index > currentStep ? "next" : "prev";
					transition(direction, index);
				}
			});

			newDiv.appendChild(element);
		}

		newDiv.appendChild(spot);
		document.querySelector(".about-slider-lg").appendChild(newDiv);
	}

	createNavigation();
};

export default aboutSliderText;
