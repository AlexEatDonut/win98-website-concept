let isMenuOn = false;
let startBtn = document.querySelector(".tb_startbtn");
startBtn.addEventListener("click", function () {
  startmenu_test();
});

document.addEventListener("click", function (ev) {
  if (ev.target.closest(".start_menu") || ev.target.closest(".tb_startbtn")) {
    return;
  } else {
    if (isMenuOn == true) {
      startmenu_test();
    }
  }
});
desktop_icon.forEach((item) =>
  item.addEventListener("click", (ev) => {
    let selected = document.querySelector(".selected");
    if (selected != null) {
      selected.classList.remove("selected");
    }
    item.classList.add("selected");
  })
);

function startmenu_test() {
  if (isMenuOn == false) {
    document.querySelector(".start_menu").classList.remove("start_menu-off");
    document.querySelector(".start_menu").classList.add("start_menu-on");
    console.log(isMenuOn);
    isMenuOn = true;
  } else {
    document.querySelector(".start_menu").classList.remove("start_menu-on");
    document.querySelector(".start_menu").classList.add("start_menu-off");
    console.log(isMenuOn);
    isMenuOn = false;
  }
}
