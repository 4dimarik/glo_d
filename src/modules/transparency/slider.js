const slider = ({ body, counter, activeSlideClass, ...selectors }) => {
  const sliderElements = {};

  Object.keys(selectors).forEach((name) => {
    sliderElements[name] = body.querySelector(selectors[name]);
  });

  const allSlide = sliderElements.slider.querySelectorAll(selectors.slide);
  const slideCount = allSlide.length;

  let sliderProps = { prev: null, current: null, total: slideCount };

  const setSliderProps = (props = {}) => {
    props.prev = props.current !== sliderProps.current ? sliderProps.current : null;
    sliderProps = { ...sliderProps, ...props };
  };

  setSliderProps();

  const renderCounter = () => {
    if (counter) {
      sliderElements.counterTotal.textContent = sliderProps.total;
      sliderElements.counterCurrent.textContent = sliderProps.current;
    }
  };

  renderCounter();

  const changeSlide = () => {
    const currentSlideIndex = sliderProps.current - 1;
    allSlide[currentSlideIndex].classList.add(activeSlideClass);
    if (sliderProps.prev) {
      const prevSlideIndex = sliderProps.prev - 1;
      allSlide[prevSlideIndex].classList.remove(activeSlideClass);
    }
    if (counter) {
      renderCounter();
    }
  };

  sliderElements.wrapper.addEventListener('click', ({ target }) => {
    if (target.closest(selectors.nextBtn)) {
      sliderProps.prev = sliderProps.current;
      const nextSlide = sliderProps.current + 1;
      if (nextSlide > sliderProps.total) {
        sliderProps.current = 1;
      } else {
        sliderProps.current = nextSlide;
      }
    }
    if (target.closest(selectors.prevBtn)) {
      sliderProps.prev = sliderProps.current;
      const nextSlide = sliderProps.current - 1;
      if (nextSlide < 1) {
        sliderProps.current = sliderProps.total;
      } else {
        sliderProps.current = nextSlide;
      }
    }
    changeSlide();
  });

  return { sliderProps, changeSlide, setSliderProps };
};

export default slider;
