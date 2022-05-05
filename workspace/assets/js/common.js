
/* swiper */
const swiperVisual = new Swiper('.musinsa-visual', {
  speed: 300,
  loop: true,
  loopAdditionalSlides: 1,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    dynamicMainBullets: 3
  },
});
document.addEventListener('resize', function() {
  swiperVisual.update();
});

const swiperBanner = () => {
  let banners = document.querySelectorAll('.banner-type1, .banner-type2');
  for (let i=0; i < banners.length; i++) {
    banners[i].setAttribute('id', 'swiperBanner'+i);
    let banner = banners[i].getAttribute('id');
    const swiper = new Swiper('#'+banner, {
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 200,
      loop: true,
      loopAdditionalSlides: 1,
      pagination: {
        el: `#${banner} .swiper-pagination`,
      },
    });
  }
}
swiperBanner();

/* a tag preventDefault */
const eventLink = () => {
  let links = document.querySelectorAll('a');
  for(let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event){
      if (links[i].getAttribute('href') == '#none') {
        event.preventDefault();
      }
    }); 
  }
}
eventLink();

/* main Tabs */
const mainTabs = () => {
  let tabs = document.querySelectorAll('.tabs-main li');
  let contents = document.querySelectorAll('.contents');
  const eventTabs = (idx) => {
    for(var j = 0; j < tabs.length; j++){
      tabs[j].removeAttribute('class');
      if(contents[j].classList.contains('show')) contents[j].classList.remove('show');
    }
    contents[idx].classList.add('show');
    tabs[idx].classList.add('active');
  }
  for (let i = 0; i < tabs.length; i++){
    let activeIndex = tabs[i].classList.contains('active');
    if (activeIndex) {
      contents[i].classList.add('show');
      //tabs[i].classList.add('active');
    }
    tabs[i].querySelector('a').addEventListener('click', function () {
      eventTabs(i);
    });
  }
}
mainTabs();

/* sub Tabs */
let winW = (window.innerWidth <= 640) ? window.innerWidth : 640;
const subTabs = () => {
  let tabs = document.querySelectorAll('.tabs-sub');
  const moveTarget = (e) => {
    let $target = e;
    let current = $target.getBoundingClientRect();
    let thisX = parseInt(current.x - (winW/2) + (current.width/2));
    let tabBox = $target.parentNode;
    //let thisX = parseInt(current.x - 25 - ((width/2) - current.width));
    //let prev = $target.previousElementSibling.getBoundingClientRect();
    //let index = [...$target.parentElement.children].indexOf($target);
    let allSiblings = Array.from($target.parentElement.children);
    allSiblings.forEach(sibling => {
      sibling.removeAttribute('class');
    })
    //console.log(current.width, thisX)
    $target.classList.add('active');
    tabBox.scrollBy({
      left: thisX,
      behavior: 'smooth'
    });
  }
  for (let i = 0; i < tabs.length; i++) {
    let tabBox = tabs[i].querySelector('.tabs-inner');
    let tab = tabBox.querySelectorAll('a');
    for (let a = 0; a < tab.length; a++) {
      let activeIndex = tab[a].classList.contains('active');
      if (activeIndex) {
        let active = tab[a].getBoundingClientRect();
        tabBox.scrollBy({
          left: parseInt(active.x - (winW/2) + (active.width/2))
        })
      }
      tab[a].addEventListener('click', function (event) {
        event.preventDefault();
        moveTarget(event.target);
      });
    }
  }
}
subTabs();