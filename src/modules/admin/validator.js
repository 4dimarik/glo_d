import UserService from './userService';

async function validator(data, config) {
  const userService = new UserService();
  const errors = {};
  let userData;
  async function validate(validateMethod, fieldData, fieldConfig, fieldName) {
    let setStatusValidate;
    let message = '';
    switch (validateMethod) {
      case 'isRequired':
        setStatusValidate = async () => {
          message = fieldConfig.message;
          return fieldData.trim() === '';
        };
        break;
      case 'isExist':
        setStatusValidate = async () => {
          const res = await userService.getUser(fieldData);
          if (!res.ok) {
            message = fieldConfig.message.serverError;
            return false;
          } else {
            userData = res.data;
            message = fieldConfig.message.error;
            return res.data === undefined;
          }
        };
        break;
      case 'isPasswordTrue':
        setStatusValidate = async () => {
          if (userData) {
            message = fieldConfig.message;
            return userData.password !== fieldData;
          } else {
            message = '';
            return true;
          }
        };
        break;
      default:
        break;
    }
    const statusValidate = await setStatusValidate();
    if (statusValidate) return message;
  }

  async function loopOne() {
    for (const fieldName of Object.keys(data)) {
      await loopTwo(fieldName);
    }
    return errors;
  }

  async function loopTwo(fieldName) {
    for (const validateMethod of Object.keys(config[fieldName])) {
      const error = await validate(validateMethod, data[fieldName], config[fieldName][validateMethod], fieldName);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  const waitErrors = await loopOne();
  return waitErrors;
}

export default validator;
