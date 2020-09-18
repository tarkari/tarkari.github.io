"use strict";

(function () {
  var lang = localStorage.getItem("lang") || "np";
  var currentTheme = localStorage.getItem("theme") || "dark";
  var toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  document.documentElement.setAttribute("data-theme", currentTheme);

  toggleSwitch.checked = currentTheme === "dark";

  fetch("/" + lang + ".html")
    .then(function (res) {
      return res.text();
    })
    .then(function (html) {
      document.querySelector("#root").innerHTML = html;
    });

  toggleSwitch.addEventListener("change", function (e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
})();
