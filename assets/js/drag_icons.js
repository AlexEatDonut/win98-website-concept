document.addEventListener("DOMContentLoaded", function () {
  let mousedown = false;
  let start = true;

  document
    .querySelectorAll(".desktop_container .desktop_icon")
    .forEach(function (item) {
      item.addEventListener("mousedown", startIconDrag);
    });

  document.addEventListener("mouseup", endIconDrag);
  document.addEventListener("mousemove", mouseIconMove);

  function startIconDrag(e) {
    e.preventDefault();
    mousedown = true;
    let clone = e.target.cloneNode(true);
    e.target.classList.add("dragorig");
    clone.classList.add("dragging");
    clone.style.left = e.clientX + "px";
    clone.style.top = e.clientY + "px";
    document.body.appendChild(clone);
  } 

  function endIconDrag(e) {
    let dragging = document.querySelector(".dragging");
    if (dragging) {
      dragging.remove();
    }
    let dragorig = document.querySelector(".dragorig");
    if (dragorig) {
      dragorig.classList.remove("dragorig");
    }
    mousedown = false;
    start = true;
  }

  function mouseIconMove(e) {
    if (mousedown) {
      let dragging = document.querySelector(".dragging");
      if (dragging) {
        dragging.style.left = e.clientX + "px";
        dragging.style.top = e.clientY + "px"; 
        let target = e.target;
        if (
          target.classList.contains("item") &&
          !target.classList.contains("dragorig")
        ) {
          if (e.offsetX > 100) {
            let clone = document.querySelector(".dragorig").cloneNode(true);
            document.querySelector(".dragorig").remove();
            target.insertAdjacentElement("afterend", clone);
          } else {
            let clone = document.querySelector(".dragorig").cloneNode(true);
            document.querySelector(".dragorig").remove();
            target.insertAdjacentElement("beforebegin", clone);
          }
        }
      }
    }
  }
});
