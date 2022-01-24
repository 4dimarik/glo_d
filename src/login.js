import validator from './modules/admin/validator';

const login = async () => {
  const validatorConfigFirst = {
    login: {
      isRequired: { message: 'Логин обязателен для заполнения' },
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
    },
  };

  const validatorConfigSecond = {
    login: {
      isExist: { message: { serverError: 'Ошибка соединения с сервером', error: 'Данное имя не зарегистрировано' } },
    },
    password: {
      isPasswordTrue: { message: 'Не верный пароль' },
    },
  };

  const renderError = (form, errors) => {
    const errorBlocks = form.querySelectorAll('.text-warning');
    errorBlocks.forEach((block) => {
      const { name } = block.dataset;
      block.textContent = errors[name] || '';
    });
  };
  const loginForm = document.querySelector('.main-form form');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target.closest('form');
    let formData = new FormData(form);
    const data = {};
    formData.forEach((val, key) => {
      data[key] = val;
    });

    const errorsFirst = await validator(data, validatorConfigFirst);
    if (Object.keys(errorsFirst).length === 0) {
      const errorsSecond = await validator(data, validatorConfigSecond);
      if (Object.keys(errorsSecond).length === 0) {
        renderError(form, errorsSecond);
        document.cookie = `isAuthorized=true`;
        window.location.replace('./table.html');
        console.log('sendForm');
      } else {
        renderError(form, errorsSecond);
      }
    } else {
      renderError(form, errorsFirst);
    }
  });
};

login();
