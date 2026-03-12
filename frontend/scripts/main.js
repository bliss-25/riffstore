const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {

panel.addEventListener("mouseenter", () => {

panels.forEach(p => p.classList.remove("expand"));

panel.classList.add("expand");

});

panel.addEventListener("mouseleave", () => {

panel.classList.remove("expand");

});

});
// VIDEO SWITCH

const video = document.getElementById("riffVideo");

if(video){

const source = video.querySelector("source");

const videos = [
"../assets/video/musicvid1.mp4",
"../assets/video/musicvid2.mp4"
];

let index = 0;

setInterval(() => {

video.classList.add("fade");   // start fade out

setTimeout(() => {

index = (index + 1) % videos.length;

source.src = videos[index];
video.load();

video.classList.remove("fade");  // fade back in

},1200); // fade duration

},12000); // time before switching video

}