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