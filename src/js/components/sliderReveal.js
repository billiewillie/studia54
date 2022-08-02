import { gsap, Power2 } from "gsap";

const sliderReveal = (sliderContainer) => {
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
};

export default sliderReveal;
