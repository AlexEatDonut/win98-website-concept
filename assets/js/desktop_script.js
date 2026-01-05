// All window types for creation later down the line
// Generic window, has an iframe so that you can have the file that does the heavy lifting as another page or just link to another page. Also helps with decoration somewhat
let windowGeneric = `
<div class="title-bar">
  <div class="title-bar-text"></div>
  <div class="title-bar-controls">
    <button aria-label="Minimize"></button>
    <button aria-label="Maximize"></button>
    <button aria-label="Close"></button>
  </div>
</div>
<div class="window-body">
  <iframe
    class="sunken-panel"
  ></iframe>
</div>`;
// Settings windows. Multiple tabs
// TODO : make multiple tabs actually work
let windowSettings = `
<div class="title-bar">
  <div class="title-bar-text">Settings</div>
  <div class="title-bar-controls">
    <button aria-label="Minimize"></button>
    <button aria-label="Maximize"></button>
    <button aria-label="Close"></button>
  </div>
</div>
<div class="window-body">
  <menu role="tablist">
    <li role="tab" aria-selected="true"><a href="#tabs">General</a></li>
    <li role="tab"><a href="#tabs">Devices manager</a></li>
    <li role="tab"><a href="#tabs">Hardware profiles</a></li>
    <li role="tab"><a href="#tabs">Performance</a></li>
  </menu>
  <div class="window" role="tabpanel">
    <div class="window-body">
      <p>the tab content</p>
    </div>
  </div>
</div>`;

// "JSON" table to get what value equals to what window to create.
const window_list_json = [
  {
    index: `1`,
    differenciator: `pageUnknown`,
    wd_src: `./pages/404.html`,
    wd_title: `Page not found`,
  },
  {
    index: `2`,
    differenciator: `blogWindow`,
    wd_src: `./pages/blog.php`,
    wd_title: `AlexEatDonut Blog`,
  },
  {
    index: `3`,
    differenciator: `webBrowser`,
    wd_src: `https://oldgoogle.neocities.org/1998/`,
    wd_title: `Internet Browser`,
  },
  {
    index: `4`,
    differenciator: `webBrowser`,
    wd_src: `https://alexeatdonut.github.io/`,
    wd_title: `Internet Explorer`,
  },
  {
    index: `5`,
    differenciator: `settings`,
    wd_src: ``,
    wd_title: `Paramètres`,
  },
  {
    index: `6`,
    differenciator: `reviews`,
    wd_src: `./pages/reviews.php`,
    wd_title: `AlexEatDonut Reviews`,
  },
];

function openWindow(arrayFinder) {
  let windowType = arrayFinder;
  let windowContent = window_list_json.find((item) => item.index == windowType);
  let windowSrc = windowContent.wd_src;
  let windowTitle = windowContent.wd_title;
  console.log(windowSrc, windowTitle);

  let windowCreate = document.createElement("div");
  windowCreate.className =
    "window window-desktop " + windowContent.differenciator;

  switch (true) {
    case windowContent.index == 1:
    case windowContent.index == 2:
    case windowContent.index == 3:
    case windowContent.index == 4:
    case windowContent.index == 6:
    default:
      windowCreate.innerHTML = windowGeneric;
      windowCreate.querySelector(".title-bar-text").innerText = windowTitle;
      windowCreate.querySelector("iframe").setAttribute("src", windowSrc);
      windowCreate.querySelector("iframe").setAttribute("title", windowTitle);
      // windowGeneric.classList.add("folder" + index);
      // document.querySelector("body").insertBefore(windowCreate, "footer");
      break;
    case windowContent.index == 5:
      windowCreate.innerHTML = windowSettings;
      windowCreate.querySelector(".title-bar-text").innerText = windowTitle;
      break;
  }

  document.querySelector("body").appendChild(windowCreate);
  testForWindows();
  setupCloseWindow();
}

let desktop_icon = document.querySelectorAll(".desktop_icon");

desktop_icon.forEach((item) =>
  item.addEventListener("click", function (ev) {})
);
desktop_icon.forEach((item) =>
  item.addEventListener("dblclick", function (ev) {
    try {
      let arrayChecker = item.getAttribute("windowToCreate");

      if (arrayChecker == null) {
        arrayChecker = 1;
      }
      openWindow(arrayChecker);
    } catch (error) {}
  })
);

function succesfull_alert() {
  alert("👍");
}

function failed_alert() {
  alert("🖕");
}

function setupCloseWindow() {
  let allWindowCloseButtons = document.querySelectorAll(
    `.window-desktop [aria-label="Close"]`
  );
  allWindowCloseButtons.forEach((windowCloser) => {
    windowCloser.addEventListener("click", (e) => {
      windowCloser.closest(".window-desktop").remove();
    });
  });
}
function closeWindow(element) {
  element.closest(".window-desktop").remove();
}
function removeFocus(element) {
  element.forEach((fW) => {
    fW.classList.remove("window-desktop-focus");
  });
}
function setFocus(element) {
  element.classList.add("window-desktop-focus");
}

function testForWindows() {
  // for each window we find, add these things on click
  document.querySelectorAll(".window-desktop").forEach((mswindow) => {
    mswindow.addEventListener("mousedown", (ev) => {
      // Close window if the target is the close button
      if (ev.target == '<button aria-label="Close">') {
        closeWindow(mswindow);
      }
      // for now we only have close but we will add minimize or full screen later
      // if not clicking any button on the top bar :
      else {
        // Knowing what window is focused
        let focusedWindow = document.querySelectorAll(".window-desktop-focus");
        // if a window is focused → if the target element is focused we remove the focus on the focused window.
        // Does it though ?
        if (focusedWindow != null) {
          if (ev.target.closest(`.window-desktop-focus`) != null) {
            removeFocus(focusedWindow);
          }
        }
        // setup the current window being clicked as focused
        let newFocusedWindow = ev.target.closest(".window-desktop");
        // give it focus
        setFocus(newFocusedWindow);
      }
      // we make sure you can't drag if you are clicking on the buttons on top && we make sure you can only drag if you are clicking on the bar controls area
      // the second part doesn't work and the first part doesn't work after we clicked at least once
      console.log(ev.target);
      console.log(ev.target.closest(".title-bar-controls"));
      console.log(ev.target.closest(".title-bar"));

      switch (false) {
        case ev.target.closest(".title-bar-controls") == null:
          1;
          console.log(ev.target.closest(".title-bar-controls"));
          break;
        case ev.target.closest(".title-bar") == null:
          1;
          console.log(ev.target.closest(".title-bar-controls"));
          dragWindow(mswindow);
          break;
        default:
          break;
      }

      // if (ev.target.closest(".title-bar-controls") != null) {
      // } else {
      //   dragWindow(mswindow);
      // }
    });
  });
}
window.addEventListener("DOMContentLoaded", (ev) => {
  testForWindows();
  setupCloseWindow();
});

function dragWindow(elmnt) {
  // setting up position variables
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // if (document.querySelector(elmnt + " .title-bar")) {
  //   // if present, the header is where you move the DIV from:
  //   document.querySelector(elmnt + " .title-bar").onmousedown = dragMouseDown;
  // } else {
  // otherwise, move the DIV from anywhere inside the DIV:

  // apply function on mouse down
  elmnt.onmousedown = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;
    let allIframes = document.querySelectorAll("iframe");
    allIframes.forEach((iframe) => {
      iframe.classList.add("iframe-locked");
    });

    e.preventDefault();
    testForWindows();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragWindow;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragWindow() {
    // stop moving when mouse button is released:
    let allIframes = document.querySelectorAll("iframe");
    allIframes.forEach((iframe) => {
      iframe.classList.remove("iframe-locked");
    });

    document.onmouseup = null;
    document.onmousemove = null;
  }
}
