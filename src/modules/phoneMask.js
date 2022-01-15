const phoneMask = () => {
  const pattern = '[^\\d]+';

  const inputValidation = (value) => {
    const excludeChar = new RegExp(pattern, 'g');
    return value.replace(excludeChar, '').substring(0, 11);
  };

  document.addEventListener('input', (e) => {
    const { target } = e;
    if (target.matches('input[name="phone"]')) {
      const { value } = target;

      const validValue = inputValidation(value);

      const partNum = (start, end) => validValue.substring(start, end);

      const numOfDigits = validValue.length;
      if (numOfDigits <= 4) {
        target.value = `+7 (${partNum(1, 4)}`;
      } else if (numOfDigits > 4 && numOfDigits <= 7) {
        target.value = `+7 (${partNum(1, 4)}) ${partNum(4, 7)}`;
      } else if (numOfDigits > 7 && numOfDigits <= 9) {
        target.value = `+7 (${partNum(1, 4)}) ${partNum(4, 7)}-${partNum(7, 9)}`;
      } else if (numOfDigits > 9) {
        target.value = `+7 (${partNum(1, 4)}) ${partNum(4, 7)}-${partNum(7, 9)}-${partNum(9, 11)}`;
      }
    }
  });
  document.addEventListener('focusin', (e) => {
    const { target } = e;
    if (target.matches('input[name="phone"]')) {
      if (inputValidation(target.value).length <= 1) {
        target.value = '+7 (';
      }
    }
  });
  document.addEventListener('focusout', (e) => {
    const { target } = e;
    if (target.matches('input[name="phone"]')) {
      if (inputValidation(target.value).length <= 1) {
        target.value = '';
      }
    }
  });
};

export default phoneMask;
