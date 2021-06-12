

document.addEventListener('DOMContentLoaded', () => {
  console.log('load form')

  const formFooter = document.getElementById('form__footer')
  const formFooterFix = document.getElementById('form__footer-fix')
  formFooter.addEventListener('submit', formSend)
  formFooterFix.addEventListener('submit', formSend)

  async function formSend(e) {
    e.preventDefault();
    // let error = formValidation(formFooter)
    let error = formValidation(e.target)
    let formData = new FormData(e.target)
    // let formData = new FormData(formFooter)
    if (error===0) {
      let response = await fetch('sendmail.php',{
        method: "POST",
        body: formData
      })
      // if (response.ok) {
      //   let result = await response.json();
      //   alert(result.massage)
      //   formFooter.reset();
      // } else {
      //   alert('error еее',error)
      // }
      // console.log('formData', formData)
      // console.log('formFooter', e.target)
    }
  }

  const formValidation = (form) => {
    let error = 0
    let formReq = form.querySelectorAll('._req')
    // let formReq = document.querySelectorAll('._req')

    for(let i = 0; i< formReq.length; i++) {
      const input = formReq[i]
      formRemoveError(input)
      if (input.classList.contains('maskPhone')) {
        if (phoneTest(input)) {
          formAddError(input)
          error++
        }
      } else {
        if (input.value === '') {
          formAddError(input)
          error++
        }
      }
    }
    return error;
  } 

  function formAddError(input) {
    input.parentElement.classList.add('_error')
    input.classList.add('_error')
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
  }
  // тест на телефон ^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$
  function phoneTest(input) {
    return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value)
  }
})

window.onload = () => {
  console.log("start page");
  
  // const btnReg = document.querySelector(".top_item-btn_grnd");
  const btnReg = document.querySelectorAll(".btn-reg");
  const b = document.querySelector("body");
  const fixC = document.querySelector(".fix_callback");
  const closeModal = document.querySelector(".close_window");
  const pole = document.querySelector(".pole");
  const submit = document.querySelector(".submit_baur");
  const btnGood = document.querySelector(".btn_good-close");
  const items = document.querySelectorAll(".callback-good .callback-item");

  if (window.innerWidth <= 768) {
    document.querySelector(
      ".rating-item-left .title-rating"
    ).innerHTML = document
      .querySelector(".rating-item-left .title-rating")
      .innerHTML.replace("<br>", " ");
    document
      .querySelectorAll(".name-contact")
      .forEach((i) => (i.innerHTML = i.innerHTML.replace("<br>", " ")));
    document
      .querySelector("#contacts")
      .before(document.querySelector("#clients"));
    document
      .querySelectorAll(".shift")
      .forEach((e) => (e.innerHTML = "Оставить заявку"));
  }

  btnReg.forEach(e=>{
    e.addEventListener("click", () => {
      console.log('click')
      console.log(e.innerHTML.indexOf('презентацию') !==-1 )
      
      fixC.classList.add("fix_callback-active");
      b.classList.add("body-hidden");
      if (e.innerHTML.indexOf('презентацию') !==-1 ) {
        document.querySelector('.metka__title').innerText = 'Оставьте заявку на презентацию'
      } else {
        document.querySelector('.metka__title').innerText = 'Оставьте заявку на консультацию'
      }
    },{passive: true})
  })

  // btnReg.addEventListener("click", () => {
  //   fixC.classList.add("fix_callback-active");
  //   b.classList.add("body-hidden");
  // },{passive: true});

  // submit.addEventListener("click", () => {
  //   items.forEach((item) => {
  //     item.classList.add("dn");
  //   });
  //   document.querySelector(".good").classList.add("db");
  //   document.querySelector(".modal-container").classList.add("wa");
  // },{passive: true});

  const btnClose = (e) => {
    e.addEventListener("click", () => {
      fixC.classList.remove("fix_callback-active");
      b.classList.remove("body-hidden");
      if (document.querySelector(".modal-container").classList.contains("wa")) {
        console.log("test");
        return items.forEach((item) => {
          item.classList.remove("dn");
          document.querySelector(".good").classList.remove("db");
          document.querySelector(".modal-container").classList.remove("wa");
        });
      }
    },{passive: true});
  };

  btnClose(closeModal);
  btnClose(pole);
  btnClose(btnGood);

  let tabsPP = document.getElementsByClassName("tab_pp");
  let tabs = document.querySelectorAll(".tab_dop");

  let sectionsPP = document.getElementsByClassName("ppm_bottum-item");
  let sections = document.getElementsByClassName("dfm_bottum-item");

  for (let i = 0; i < tabsPP.length; i++) {
    tabsPP[i].onclick = tabclickPP;
  }
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].onclick = tabclick;
  }

  function tabclickPP(event) {
    let tab = event.target;
    if (event.target.localName === "span") {
      tab = event.target.parentElement;
    }
    let tabId = tab.dataset.id;

    for (let k = 0; k < tabs.length; k++) {
      tabsPP[k].classList.remove("active");
      tabsPP[tabId - 1].classList.add("active");

      sectionsPP[k].classList.remove("active");
      sectionsPP[tabId - 1].classList.add("active");
    }
  }
  function tabclick(event) {
    let tab = event.target;
    if (event.target.localName === "span") {
      tab = event.target.parentElement;
    }
    let tabId = tab.dataset.id;

    for (let k = 0; k < tabs.length; k++) {
      tabs[k].classList.remove("active");
      tabs[tabId - 1].classList.add("active");

      sections[k].classList.remove("active");
      sections[tabId - 1].classList.add("active");
    }
  }

  // if (window.innerWidth <= 992) {
  //   document.querySelector('.admin').after(document.querySelector('.admin-three'))
  // } else {
  //   document.querySelector('.admin').append(document.querySelector('.admin-three'))
  // }

};

$(document).ready(function(){

  $('.header__burger').click(()=>{
    $('.header__burger').toggleClass('active_burger');
  })
  if (window.innerWidth <= 992) {
    document.querySelector('.admin').after(document.querySelector('.admin-three'))
  } else {
    document.querySelector('.admin').append(document.querySelector('.admin-three'))
  }

  console.log("start page2");
  if (window.innerWidth <= 480) {
    console.log("start page3");

    document.querySelectorAll('.item_slider').forEach(e=>e.style.width = "220px")
    $(".slider").addClass("owl-carousel")
    $(".owl-carousel").owlCarousel({
      center: true,
      autoWidth: true,
      items: 1,
      dotsEach: true,
      margin: 30
    });
  } else {
    console.log("start page5");
    $(".slider").removeClass("owl-carousel")
  }
  if (window.innerWidth <= 768) {
    console.log("start page4");

    document.querySelectorAll('.function_item').forEach(e=>e.style.width = "210px")
    $(".function_items").addClass("owl-carousel")
    $(".owl-carousel").owlCarousel({
      center: true,
      autoWidth: true,
      items: 1,
      dotsEach: true,
      margin: 30
    });
    document.querySelector('#function_items .wrapper').append(document.querySelector('.function_items .owl-dots'))
  } else {
    $(".function_items").removeClass("owl-carousel")
  }

  $(".maskPhone").mask("+7 (999) 999-99-99");

  baurWave(idWaveCTW, colorStartCTW, colorEndCTW, 440, 100);
  baurWave(idWaveCBW, colorStartCBW, colorEndCBW, 600, 200);
  baurWave(idWaveC, colorStartC, colorEndC, 360, 80);
  baurWave(idDesignWave, colorStartDW, colorEndDW, 700, 300);
  baurWave(idOrderW, colorStartOW, colorEndOW, 500, 200);
});

window.onresize = () => {
  if (window.innerWidth <= 992) {
    document.querySelector('.admin').after(document.querySelector('.admin-three'))
  } else {
    document.querySelector('.admin').append(document.querySelector('.admin-three'))
  }
}

const baurWave = (id, colorStart, colorEnd, heightWave, AM) => {
  let c = document.getElementById(id),
    ctx = c.getContext("2d"),
    cw = (c.width = window.innerWidth),
    grdline = ctx.createLinearGradient(0, 0, cw, 0);
  grdline.addColorStop(0, colorStart);
  grdline.addColorStop(1, colorEnd);
  // ch = c.height = window.innerHeight,
  (ch = c.height = window.innerWidth <= 375 ? 500 : heightWave),
    (points = []),
    (tick = 0),
    (opt = {
      count: window.innerWidth <= 375 ? 2 : 5,
      range: {
        x: 10,
        y: AM,
      },
      duration: {
        min: 700,
        max: 700,
      },
      thickness: 1,
      strokeColor: grdline,
      level: .5,
      curved: true,
    }),
    (rand = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }),
    (ease = function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    });

  ctx.lineJoin = "round";
  ctx.lineWidth = opt.thickness;
  ctx.strokeStyle = opt.strokeColor;

  let Point = function (config) {
    this.anchorX = config.x;
    this.anchorY = config.y;
    this.x = config.x;
    this.y = config.y;
    this.setTarget();
  };

  Point.prototype.setTarget = function () {
    this.initialX = this.x;
    this.initialY = this.y;
    this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
    this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
    this.tick = 0;
    this.duration = rand(opt.duration.min, opt.duration.max);
  };

  Point.prototype.update = function () {
    let dx = this.targetX - this.x;
    let dy = this.targetY - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (Math.abs(dist) <= 0) {
      this.setTarget();
    } else {
      let t = this.tick;
      let b = this.initialY;
      let c = this.targetY - this.initialY;
      let d = this.duration;
      this.y = ease(t, b, c, d);

      b = this.initialX;
      c = this.targetX - this.initialX;
      d = this.duration;
      this.x = ease(t, b, c, d);

      this.tick++;
    }
  };

  Point.prototype.render = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = "#000";
    ctx.fill();
  };

  let updatePoints = function () {
    let i = points.length;
    while (i--) {
      points[i].update();
    }
  };

  let renderPoints = function () {
    let i = points.length;
    while (i--) {
      points[i].render();
    }
  };

  let renderShape = function () {
    ctx.beginPath();
    let pointCount = points.length;
    ctx.moveTo(points[0].x, points[0].y);
    let i;
    for (i = 0; i < pointCount - 1; i++) {
      let c = (points[i].x + points[i + 1].x) / 2;
      let d = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    }
    ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
    ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
    ctx.closePath();
    let grd = ctx.createLinearGradient(0, 0, cw, 0);
    grd.addColorStop(0, colorStart);
    grd.addColorStop(1, colorEnd);

    ctx.fillStyle = grd;
    // ctx.fillStyle = 'hsl('+(tick/2)+', 80%, 60%)';
    // ctx.fillRect(20,20,150,100);
    ctx.fill();
    ctx.stroke();
  };

  let clear = function () {
    ctx.clearRect(0, 0, cw, ch);
  };

  let loop = function () {
    window.requestAnimFrame(loop, c);
    tick++;
    clear();
    updatePoints();
    renderShape();
    //renderPoints();
  };

  let i = opt.count + 2;
  let spacing = (cw + opt.range.x * 2) / (opt.count - 1);
  while (i--) {
    points.push(
      new Point({
        x: spacing * (i - 1) - opt.range.x,
        y: ch - ch * opt.level,
      })
    );
  }

  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (a) {
        window.setTimeout(a, 1e3 / 60);
      }
    );
  })();

  loop();
};

const idWaveCTW = "canvas_top_wave",
colorStartCTW = "#F3E7E7",
colorEndCTW = "#FFFCE3";

const idWaveCBW = "canvas_bottum_wave",
colorStartCBW = '#F3E7E7',
colorEndCBW = "#FFFCE3";

const idWaveC = "c",
colorStartC = "#F3E7E9",
colorEndC = "#E3EEFF";

const idDesignWave = "design_wave",
colorStartDW = '#EEF8ED',
colorEndDW = '#EAF4EB';

const idOrderW = "order_wave",
colorStartOW = '#EEF8ED',
colorEndOW = '#EAF4EB';

// baurWave(idWaveCTW, colorStartCTW, colorEndCTW, 440, 100);
// baurWave(idWaveCBW, colorStartCBW, colorEndCBW, 600, 200);
// baurWave(idWaveC, colorStartC, colorEndC, 360, 80);
// baurWave(idDesignWave, colorStartDW, colorEndDW, 700, 300);
// baurWave(idOrderW, colorStartOW, colorEndOW, 500, 200);

// count — количество точек в волне, на которых будут происходить колебания;
// range — амплитуды колебаний по оси x и y;
// duration — скорость колебаний;
// thickness — толщина верхней линии волны;
// strokeColor — цвет верхней линии волны;
// level — насколько волна заполнит собой высоту блока;
// строка ctx.fillStyle = ‘hsl(‘+(tick/2)+’, 80%, 60%)’; — задает изменение цвета в цветовой модели HSL. Чтобы цвет не менялся, измените строку например на такую — ctx.fillStyle = ‘hsl(0, 80%, 60%)’, тогда волна будет всегда красного цвета.
