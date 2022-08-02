import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const revealImage = (container) => {
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
};

export default revealImage;
