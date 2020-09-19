"use strict";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(() => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

(function () {
  var lang = localStorage.getItem("lang") || "np";
  var currency = { np: "रू", en: "Rs" };
  var currentTheme = localStorage.getItem("theme") || "dark";
  var themeSwitch = document.querySelector('.theme input[type="checkbox"]');
  var langSwitch = document.querySelector('.lang input[type="checkbox"]');
  var min = { en: "Min", np: "न्यूनतम" };
  var max = { en: "Max", np: "अधिकतम" };

  document.documentElement.setAttribute("data-theme", currentTheme);
  fetchData();

  themeSwitch.checked = currentTheme === "dark";
  langSwitch.checked = lang === "np";

  document
    .querySelector(".dropbtn")
    .addEventListener("click", function myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    });

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdownEls = document.getElementsByClassName("dropdown-content");

      for (var i = 0; i < dropdownEls.length; i++) {
        var openDropdown = dropdownEls[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  themeSwitch.addEventListener("change", function (e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });

  langSwitch.addEventListener("change", function (e) {
    lang = e.target.checked ? "np" : "en";
    localStorage.setItem("lang", lang);
    fetchData();
  });

  function fetchData() {
    fetch("/" + lang + ".html")
      .then(function (res) {
        return res.text();
      })
      .then(function (html) {
        const rootEl = document.querySelector("#root");
        var tempDom = Object.assign(document.createElement("div"), {
          innerHTML: html,
        });
        var headerData = tempDom.querySelectorAll('td[colspan="5"]');
        setTitles(
          headerData[0].textContent.trim(),
          headerData[1].textContent.trim()
        );
        rootEl.innerHTML = "";
        for (var row of tempDom.querySelectorAll('[class*="row"]')) {
          var data = {
            name: row.children[0].textContent.trim(),
            unit: row.children[1].textContent.trim(),
            min: row.children[2].textContent.trim(),
            max: row.children[3].textContent.trim(),
            avg: row.children[4].textContent.trim(),
          };
          rootEl.innerHTML += /*html*/ `<div class="card">
      <h3>${data.name}</h3> 
      <div>
          <div>
              <span class="price">${currency[lang]} ${data.avg}</span>
              <small class="unit">/${data.unit}</small>
          </div>
          <div class="min-max">
              <span title="${min[lang]}"><span class="min" ></span> <span class="text">${currency[lang]} ${data.min}</span></span>
              <span title="${max[lang]}"><span class="max"></span> <span class="text">${currency[lang]} ${data.max}</span></span>
          </div>
      </div>
    </div>`;
        }
      });
  }

  function setTitles(subtitle, date) {
    const title = lang === "np" ? "तरकारी" : "Tarkari";
    date = date.replace("-", ", ");
    document.title = `${title} - ${subtitle} (${date})`;
    document.querySelector(".title").innerHTML = title;
    document.querySelector(
      ".subtitle"
    ).innerHTML = `${subtitle} <span class="date">(${date})</span>`;
  }
})();
