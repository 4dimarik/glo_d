// export default class Slider2 {
//   constructor({ wrapper, slider, activeClass = null, navigation, counters }) {
//     if (wrapper) {
//       this.wrapper = {
//         selector: wrapper,
//         el: document.querySelector(wrapper),
//       };
//
//       this.activeClass = activeClass;
//
//       if (slider) {
//         this.slider = {
//           selector: slider,
//           el: this.wrapper.el.querySelector(slider),
//         };
//         this.slides = this.slider.el.querySelectorAll(':scope > *');
//       } else {
//         console.error(`Некорректно указан селектор slider: ${slider}`);
//       }
//
//       if (navigation) {
//         this.navigation = {
//           next: {
//             selector: navigation.next,
//             el: this.wrapper.el.querySelector(navigation.next),
//           },
//           prev: {
//             selector: navigation.prev,
//             el: this.wrapper.el.querySelector(navigation.prev),
//           },
//         };
//       } else {
//         console.error(`Некорректно указан селектор navigation: ${navigation}`);
//       }
//       if (counters) {
//         this.counters = {
//           current: {
//             selector: counters.current,
//             el: this.wrapper.el.querySelector(counters.current),
//           },
//           total: {
//             selector: counters.total,
//             el: this.wrapper.el.querySelector(counters.total),
//           },
//         };
//       }
//     } else {
//       console.error(`Некорректно указан селектор wrapper: ${wrapper}`);
//     }
//   }
//
//   init(section) {
//     if (!this.activated) {
//       this.activated = true;
//       this.state = { prev: null, current: 1, total: 0 };
//       this.section = section;
//
//       this.state.total = this.slides.length; // Set Total Slides
//       this.slides.forEach((slide, index) => {
//         slide.dataset.slide = index + 1;
//       });
//       this.slider.el.dataset.translateX = '0';
//
//       //
//       this.props = {};
//       // Set EventListener
//       this.wrapper.el.addEventListener('click', this.eventListener.bind(this));
//
//       switch (section) {
//         case 'formula': {
//           this.slider.el.classList.add('formula-slider-active');
//           this.props.slideWidth = parseInt(getComputedStyle(this.slides[0]).getPropertyValue('width'), 10);
//
//           this.setState({ prev: this.state.total, current: 1 });
//           this.rearrangeSlide('prepend', 1);
//           // this.slider.el.style.cssText = `transition-duration: 0ms; transform: translateX(-250px);`;
//           this.slider.el.dataset.translateX = '0';
//
//           // this.slider.el.style.cssText = `transition-duration: 0ms; transform: translateX(-${this.props.slideWidth}px);`;
//           this.toggleActiveClass();
//           break;
//         }
//         case 'transparency':
//           // Hidden Slides
//           this.toggleVisibilitySlides(true);
//           break;
//         default:
//           break;
//       }
//     }
//     return this;
//   }
//
//   toggleVisibilitySlides(hidden) {
//     if (hidden) {
//       [...this.slides].forEach((slide, index) => {
//         slide.style.display = index !== this.state.current - 1 ? 'none' : null;
//       });
//     } else {
//       [...this.slides].forEach((slide) => {
//         slide.style.display = null;
//       });
//     }
//     return this;
//   }
//
//   setState(props = {}) {
//     this.state.prev = props.current !== this.state.current ? this.state.current : null;
//     this.state = { ...this.state, ...props };
//     return this;
//   }
//
//   rearrangeSlide(type, n) {
//     const translateX = +this.slider.el.dataset.translateX;
//     for (let i = 0; i < n; i++) {
//       if (type === 'append') {
//         this.slider.el.append(this.slides[0]);
//       } else if (type === 'prepend') {
//         this.slider.el.prepend(this.slides[this.state.total - 1]);
//         // this.slider.el.style.cssText = `transition-duration: 0ms; transform: translateX(${
//         //   translateX - this.props.slideWidth * (n - 1)
//         // }px);`;
//         // this.slider.el.dataset.translateX = (translateX - this.props.slideWidth * (n - 1)).toString();
//       }
//       this.slides = this.slider.el.querySelectorAll(':scope > *');
//     }
//   }
//
//   // moveSlide(direction, n) {
//   //   const translateX = +this.slider.el.dataset.translateX;
//   //   for (let i = 0; i < n; i++) {
//   //     if (direction > 0) {
//   //
//   //     } else {
//   //       this.slider.el.prepend(this.slides[this.state.total - 1]);
//   //       console.log(translateX - this.props.slideWidth * (n - 1));
//   //       this.slider.el.style.cssText = `transition-duration: 0ms; transform: translateX(${
//   //         translateX - this.props.slideWidth * (n - 1)
//   //       }px);`;
//   //       this.slider.el.dataset.translateX = (translateX - this.props.slideWidth * (n - 1)).toString();
//   //     }
//   //
//   //     this.slides = this.slider.el.querySelectorAll(':scope > *');
//   //   }
//   // }
//
//   eventListener({ target }) {
//     let direction = null;
//     if (target.closest(this.navigation.next.selector)) {
//       direction = 1;
//     } else if (target.closest(this.navigation.prev.selector)) {
//       direction = -1;
//     }
//     if (direction) {
//       this.state.prev = this.state.current;
//       const nextSlide = this.state.current + direction;
//
//       if (direction > 0) {
//         this.state.current = nextSlide > this.state.total ? 1 : nextSlide;
//       }
//
//       if (direction < 0) {
//         this.state.current = nextSlide < 1 ? this.state.total : nextSlide;
//       }
//     }
//
//     this.changeSlide(direction);
//   }
//
//   changeSlide(direction) {
//     switch (this.section) {
//       case 'formula': {
//         this.toggleActiveClass();
//         let newTranslateX;
//         let currentTranslateX = +this.slider.el.dataset.translateX;
//         // console.log('currentTranslateX-1', currentTranslateX);
//
//         if (direction > 0) {
//           // currentTranslateX = -250;
//           // this.slider.el.style.cssText = `transition-duration: 0ms; transform: translateX(${currentTranslateX}px);`;
//           // this.slider.el.dataset.translateX = currentTranslateX.toString();
//
//           newTranslateX = currentTranslateX - this.props.slideWidth;
//           this.slider.el.style.cssText = `transition-duration: 500ms; transform: translateX(${newTranslateX}px);`;
//
//           if (this.state.current === 5) {
//             this.rearrangeSlide('append', 3);
//             this.slider.el.style.cssText = `transition-duration: null; transform: null;`;
//             this.slider.el.dataset.translateX = '0';
//             currentTranslateX = 0;
//           }
//         }
//         if (direction < 0) {
//           // this.slider.el.prepend(this.slides[this.state.total - 1]);
//           // this.slides = this.slider.el.querySelectorAll(':scope > *');
//           // this.slider.el.style.cssText = `transition-duration: 500ms; transform: translateX(${translate}px);`;
//         }
//
//         // console.log();
//         // console.log(this.slider.el.style.getPropertyValue('transform'));
//         this.slider.el.dataset.translateX = newTranslateX;
//         break;
//       }
//       case 'transparency': {
//         // const currentSlideIndex = this.state.current - 1;
//         // this.slides[currentSlideIndex].style.display = null;
//         // if (this.state.prev) {
//         //   const prevSlideIndex = this.state.prev - 1;
//         //   this.slides[prevSlideIndex].style.display = 'none';
//         // }
//         // // Add/Remove class active slide
//         // if (this.activeClass) {
//         //   this.toggleActiveClass();
//         // }
//         break;
//       }
//
//       default:
//         break;
//     }
//   }
//
//   getSlide(num) {
//     return [...this.slides].filter((slide) => +slide.dataset.slide === num)[0];
//   }
//
//   toggleActiveClass() {
//     console.log(this.state);
//     if (this.state.prev) {
//       // const prevSlide = [...this.slides].filter((slide) => +slide.dataset.slide === this.state.prev)[0];
//       const prevSlide = this.getSlide(this.state.prev);
//       prevSlide.classList.remove(this.activeClass);
//     }
//     if (this.state.current) {
//       // const currentSlide = [...this.slides].filter((slide) => +slide.dataset.slide === this.state.current)[0];
//       const currentSlide = this.getSlide(this.state.current);
//       currentSlide.classList.add(this.activeClass);
//     }
//     return this;
//   }
//
//   afterChangeSlide(direction) {
//     switch (this.section) {
//       case 'formula':
//         if (direction > 0) {
//           this.slider.el.append(this.slides[0]);
//         }
//         this.slides = this.slider.el.querySelectorAll(':scope > *');
//         break;
//       case 'transparency':
//         break;
//       default:
//         break;
//     }
//   }
//
//   destroy() {
//     this.activated = false;
//     this.toggleVisibilitySlides(false);
//     return this;
//   }
// }
