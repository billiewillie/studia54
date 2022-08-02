import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const textReveal = (textContainer) => {
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
};

export default textReveal;
