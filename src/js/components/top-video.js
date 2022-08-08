import bed from "../../img/bed.mp4";
import table from "../../img/table.mp4";
import banket from "../../img/banket.mp4";

const topVideo = function () {
	let videoSource = new Array();

	videoSource[0] = bed;
	videoSource[1] = table;
	videoSource[2] = banket;

	let i = 0;
	const videoCount = videoSource.length;
	const element = document.getElementById("video");

	function videoPlay(videoNum) {
		element.setAttribute("src", videoSource[videoNum]);
		element.removeAttribute("controls");
		element.autoplay = true;
		element.load();
	}

	document.getElementById("video").addEventListener("ended", myHandler, false);

	videoPlay(0); // load the first video
	ensureVideoPlays(); // play the video automatically

	function myHandler() {
		i++;
		if (i == videoCount) {
			i = 0;
			videoPlay(i);
		} else {
			videoPlay(i);
		}
	}

	function ensureVideoPlays() {
		const video = document.getElementById("video");

		if (!video) return;

		const promise = video.play();
		if (promise !== undefined) {
			promise
				.then(() => {
					// Autoplay started
				})
				.catch((error) => {
					// Autoplay was prevented.
					video.muted = true;
					video.play();
				});
		}
	}
};

export default topVideo;
