import { queryAll } from "./query";
const items = queryAll(".first-screen-item");

const setActive = (items) => {
	items.forEach((item) => {
		item.addEventListener("click", (e) => {
			if (item.classList.contains("active")) return;
			items.forEach((item) => item.classList.remove("active"));
			item.classList.add("active");
		});
	});
};

setActive(items);

export default setActive;
