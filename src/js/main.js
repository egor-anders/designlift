var acc = document.getElementsByClassName("faq__accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("faq__accordion--active");
    this.parentElement.classList.toggle("faq__item--active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

const tels = document.querySelectorAll('input[type="tel"]');

tels.forEach((element) => {
  const maskOptions = {
    mask: "+{7} (000) 000-00-00",
  };
  const mask = IMask(element, maskOptions);
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.getElementById("back-to-top");

  // Показать/скрыть кнопку при прокрутке страницы
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  // Плавная прокрутка при клике на кнопку
  backToTop.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

AOS.init({
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 800, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  anchorPlacement: "top-bottom",
});

const forms = document.querySelectorAll("form");
const thanks = document.querySelectorAll(".thanks");

forms.forEach((form, index) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();


    let formData = new FormData(e.target);
    const object = {};

    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const json = JSON.stringify(object);
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Sent");
        }
      }
    };

    if (index == 0) {
      xhr.open("POST", "/mail-first.php", true);
      thanks[0].classList.add("active");
    }

    else {
      xhr.open("POST", "/mail-second.php", true);
      thanks[1].classList.add("active");
    }

    xhr.send(json);
    e.target.reset();
  });
});
