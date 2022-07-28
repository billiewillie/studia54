import Flickity from "flickity";
import { query } from "./query";
const services = query(".services-list");

const slider = new Flickity(services, {
	draggable: true,
	freeScroll: true,
	contain: true,
	watchCSS: true,
	cellAlign: "left",
	pageDots: false,
	prevNextButtons: false,
});

export default slider;
