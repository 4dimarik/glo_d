const slider = ({ body, counter, activeSlideClass, ...selectors }) => {
  const sliderElements = {};

  Object.keys(selectors).forEach((name) => {
    sliderElements[name] = body.querySelector(selectors[name]);
  });

  const allSlide = sliderElements.slider.querySelectorAll(selectors.slide);
  const slideCount = allSlide.length;

  const { prevSlide: _prevSlide, currentSlide: _currentSlide } = sliderElements.slider.dataset;

  if (!_prevSlide) {
    sliderElements.slider.dataset.prevSlide = null;
  }
  if (!_currentSlide) {
    sliderElements.slider.dataset.currentSlide = '1';
  }
  sliderElements.slider.dataset.totalSlide = slideCount.toString();

  let sliderProps = {};
  const setSliderProps = () => {
    const { prevSlide, currentSlide, totalSlide } = sliderElements.slider.dataset;
    sliderProps = {
      prev: prevSlide ? +prevSlide : null,
      current: currentSlide ? +currentSlide : null,
      total: +totalSlide,
    };
  };

  setSliderProps();

  allSlide[sliderProps.current - 1].classList.add(activeSlideClass);

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
      const nextSlide = sliderProps.current + 1;
      if (nextSlide > sliderProps.total) {
        sliderElements.slider.dataset.currentSlide = '1';
      } else {
        sliderElements.slider.dataset.currentSlide = nextSlide.toString();
      }
      sliderElements.slider.dataset.prevSlide = sliderProps.current.toString();
    }
    if (target.closest(selectors.prevBtn)) {
      const nextSlide = sliderProps.current - 1;
      if (nextSlide < 1) {
        sliderElements.slider.dataset.currentSlide = sliderProps.total.toString();
      } else {
        sliderElements.slider.dataset.currentSlide = nextSlide.toString();
      }
      sliderElements.slider.dataset.prevSlide = sliderProps.current.toString();
    }
    setSliderProps();
    changeSlide();
  });
};

export default slider;
