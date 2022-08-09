import { gsap } from "gsap";

const aboutSliderText = () => {
	gsap.set(".about-slide-text", { x: "-100%" });
	gsap.set(".about-slide-picture", { y: "100%" });

	let currentStep = 0;
	const totalSlides = document.querySelectorAll(".about-slide-text").length;
	const wrapper = gsap.utils.wrap(0, totalSlides);

	createTimelineIn("next", currentStep);

	function createTimelineIn(direction, index) {
		const goPrev = direction === "prev";
		const slideText = document.querySelector(`.slide-text-${index}`);
		const slidePicture = document.querySelector(`.slide-picture-${index}`);

		const title = slideText.querySelector("h2.title");
		const text = slideText.querySelector("p.text");

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
					x: -300,
				},
				{
					duration: 0.6,
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
					duration: 0.6,
					y: 0,
					autoAlpha: 1,
				},
				"-=0.6"
			)
			.from([title, text], { duration: 0.6, x: -100, autoAlpha: 0, stagger: 0.1 }, "-=0.6");

		return tlIn;
	}

	function createTimelineOut(direction, index) {
		const goPrev = direction === "prev";

		const slideText = document.querySelector(`.slide-text-${index}`);
		const slidePicture = document.querySelector(`.slide-picture-${index}`);
		const title = slideText.querySelector("h2.title");
		const text = slideText.querySelector("p.text");

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
			.to(slideText, {
				x: 300,
				autoAlpha: 0,
			})
			.to(
				slidePicture,
				{
					duration: 0.6,
					y: 400,
					autoAlpha: 0,
				},
				"-=0.7"
			);

		return tlOut;
	}

	function updateCurrentStep(goToIndex) {
		currentStep = goToIndex;

		document.querySelectorAll(".dot").forEach(function (element, index) {
			element.setAttribute("class", "dot");
			if (index === currentStep) {
				element.classList.add("active");
			}
		});

		positionDot();
	}

	function transition(direction, toIndex) {
		const tlTransition = gsap.timeline({
			onStart: function () {
				updateCurrentStep(toIndex);
			},
		});

		const tlOut = createTimelineOut(direction, currentStep);
		const tlIn = createTimelineIn(direction, toIndex);

		tlTransition.add(tlOut).add(tlIn, ">-0.5");

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
		// create dots container
		const newDiv = document.createElement("div");
		newDiv.setAttribute("class", "dots");

		// add active spot
		const spot = document.createElement("div");
		spot.setAttribute("class", "spot");

		// create a dot for each slide
		for (let index = 0; index < totalSlides; index++) {
			const element = document.createElement("button");
			const text = document.createTextNode(index);
			element.appendChild(text);
			element.setAttribute("class", "dot");
			if (currentStep === index) {
				element.classList.add("active");
			}

			element.addEventListener("click", function () {
				if (!isTweening() && currentStep !== index) {
					const direction = index > currentStep ? "next" : "prev";
					transition(direction, index);
				}
			});

			newDiv.appendChild(element);
		}

		// add dots to the projects container
		newDiv.appendChild(spot);
		document.querySelector(".about-slider-lg").appendChild(newDiv);
		positionDot();
	}

	function positionDot() {
		const activeDotX = document.querySelector(".dot.active").offsetLeft;
		const spot = document.querySelector(".spot");
		const spotX = spot.offsetLeft;
		const destinationX = Math.round(activeDotX - spotX + 5);

		const dotTl = gsap.timeline();
		dotTl
			.to(spot, {
				duration: 0.4,
				x: destinationX,
				scale: 2.5,
			})
			.to(spot, {
				duration: 0.2,
				scale: 1,
			});
	}

	createNavigation();
};

export default aboutSliderText;
