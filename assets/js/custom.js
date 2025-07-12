const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");

console.log(modal);
console.log(modalImg);

document.querySelectorAll("img").forEach(img => {
img.addEventListener("click", () => {
    modalImg.src = img.src;
    modal.style.display = "flex";
});
});

modal.addEventListener("click", () => {
modal.style.display = "none";
modalImg.src = "";
});
