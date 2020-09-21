$("#flowers").attr("viewBox", `120 25 ${window.innerWidth / 1.5} ${window.innerHeight}`)

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

const branchesRandomOrder = $('[id^=BranchGroup]').toArray().sort(function(){return 0.5-Math.random()});
const branchesRandomOrderLeft = $('[id^=BranchGroup-left]').toArray().sort(function(){return 0.5-Math.random()});
const branchesRandomOrderRight = $('[id^=BranchGroup-right]').toArray().sort(function(){return 0.5-Math.random()});
const branchesRandomOrderBottom = $('[id^=BranchGroup-bottom]').toArray().sort(function(){return 0.5-Math.random()});

// MASTER TIMELINE
const master = new TimelineMax();
master
.add(mainSetUp)
.add(branchMaster);


function mainSetUp() {
  const tl = new TimelineMax();
  tl
  .set('[id^=petal-]', { fill: "#e5d081" })
  .set(['[id^=flower-]', '[id^=bud-]', '[id^=bloom-]'], {scale: 0,  transformOrigin: 'center center'})
  .set(branchesRandomOrderLeft, {transformOrigin: 'bottom left'})
  .set(branchesRandomOrderRight, {transformOrigin: 'bottom right'})
  .set(branchesRandomOrderBottom, {transformOrigin: 'bottom center'})
  .set('#BranchGroup-left-1', {transformOrigin: '0% 20%'})
  .set('#BranchGroup-right-16', {transformOrigin: '100% 20%'})
  .set(branchesRandomOrder, {scale: 0})
  .set(".container", {autoAlpha: 1});
  
  return tl;
}

function branchMaster() {
  const tl = new TimelineMax();
  tl
    .add(wholeBranchGrowIn)
    .add(smallBranchesSway);
  
  return tl;
}

function wholeBranchGrowIn() {
  const tl = new TimelineMax();
  tl.staggerTo(branchesRandomOrder, 3, {scale: 1, ease: Power1.easeOut, onStart: flowersBloom, onComplete: currentBranchSwaying }, 0.25);
 
  return tl;
}

function flowersBloom() {
  const tl = new TimelineMax({delay: 0.5});
  const currentBranch = $(this._targets);
  const petals = currentBranch.find('[id^=petal-]');
  const flowers = currentBranch.find('[id^=flower-]');
  const buds = currentBranch.find('[id^=bud-]');
  const blooms = currentBranch.find('[id^=bloom-]');

  tl
    .staggerTo([flowers, buds, blooms], 2,{ scale: 1, ease: Back.easeOut.config(2) }, 0.2, 0)
    .to(flowers, 2, { rotation: 45, ease: Sine.easeOut }, 0)
    .to(petals, 1, { fill: "#fff" }, 0)

  return tl;
}

function currentBranchSwaying() {
  const tl = new TimelineMax({yoyo: true, repeat: -1});
  const currentBranch = $(this._targets);
  var currentBranchRotation = (currentBranch.data('position') === "left") ? -10 : 
  (currentBranch.data('position') === "right") ? 5 : 10;
  
  tl.staggerTo(currentBranch, 2 + Math.random(), {rotation: currentBranchRotation, ease: Sine.easeInOut}, Math.random() / 1.2);

  return tl;  
}


function smallBranchesSway() {
  const smallBranches = $('[id^=smallbranch-group]').toArray();
  const tl = new TimelineMax({yoyo: true, repeat: -1});
  
  tl
  .staggerTo(smallBranches, 2 + Math.random(), { rotation: 5, ease: Sine.easeInOut}, Math.random() / 1.2, 'smallBranchSway')
  .to('#smallbranch-group-3-B, #smallbranch-group-8-A', 1 + Math.random(), {rotation: -5, transformOrigin: '100% 50%'}, 'smallBranchSway')
  .to('#smallbranch-group-5-A', 2 + Math.random(), {rotation: -5, transformOrigin: '50% 100%'}, 'smallBranchSway')
  .to('#smallbranch-group-2-C, #smallbranch-group-A, #smallbranch-group-12-A', 2 + Math.random(), {rotation: -5, transformOrigin: '100% 100%'}, 'smallBranchSway');
  
  return tl;
}