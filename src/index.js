import "./styles.css";

const coll = document.querySelectorAll(".collapsible");

coll.forEach((button, index) => {
  button.addEventListener("click", function() {
    this.classList.toggle("active");

    const content = document.getElementById(`details-content-${index}`);
    
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});
