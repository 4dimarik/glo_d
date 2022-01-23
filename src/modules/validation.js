const validation = () => {
  const config = {
    phone: {
      required: true,
      pattern: '\\+7 \\(\\d\\d\\d\\) \\d\\d\\d-\\d\\d-\\d\\d',
    },
    privacy: {
      required: true,
    },
  };
  const setConfig = () => {
    Object.keys(config).forEach((fieldName) => {
      const fields = document.querySelectorAll(`*[name=${fieldName}]`);
      fields.forEach((field) => {
        Object.keys(config[fieldName]).forEach((attr) => {
          field.setAttribute(attr, config[fieldName][attr]);
        });
      });
    });
  };
  setConfig();
};

export default validation;
