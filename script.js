let open = gsap.timeline({ paused: true, reversed: true });
let opacity = gsap.timeline({ paused: true, reversed: true });
let zoom = gsap.timeline({ paused: true, reversed: true });
let $top = $(".top");
let $close = $(".close");
$top.click(() => {
  open.play();
  zoom.play();
  gsap.delayedCall(0.5, () => {
    opacity.play();
  });
});

$close.click(() => {
  opacity.reverse();
  zoom.reverse();
  gsap.delayedCall(1, () => {
    open.reverse();
  });
});

open
  .to(
    ".top-cover",
    {
      duration: 0.5,
      ease: "power1.out",
      transformOrigin: "top",
      boxShadow: 0,
      rotateX: 180,
    },

    0
  )
  .to(
    ".top",
    {
      zIndex: 1,
    },

    0.05
  )
  .to(
    ".top",
    {
      filter: "drop-shadow(0px 2px 3px rgba(50, 0, 50, 0)",
    },

    0
  );

zoom
  .to(".paper", { height: "240px" }, 0.5)
  .to(".paper", { zIndex: 1 }, 0.3)
  .to(".paper", { duration: 0.5, y: -120, zIndex: 2 }, 0.5)
  .to(
    ".paper",
    { duration: 0.5, y: 0, scale: 2, zIndex: 3, ease: "power1.out" },
    1
  )
  .to(".paper", { width: "120%" }, 0.5)

opacity  
  .to(".paper .message", { opacity: 1 }, 0.5);


const guests = $('#guests');
const pronouns = $('.pronoun');
const he = getParameterByName('he');
const she = getParameterByName('she');

if (he && !she) {
  guests.text(`Дорогой ${he}!`);
  pronouns.text('тебя')
}
if (she && !he) {
  guests.text(`Дорогая ${she}!`);
  pronouns.text('тебя')
}
if (he && she) {
  guests.text(`Дорогие ${he} и ${she}!`);
  pronouns.text('вас')
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}