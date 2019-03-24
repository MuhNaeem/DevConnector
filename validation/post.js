const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.rate = !isEmpty(data.rate) ? data.rate : "";
  data.days = !isEmpty(data.days) ? data.days : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  // if (!Validator.isLength(data.rate, { min: 5, max: 300 })) {
  //   errors.rate = "Rate must be between 5$ and 300$";
  // }

  if (data.rate <= 5 && data.rate > 300) {
    errors.rate = "Rate must be between 5$ and 300$";
  }

  // if (!Validator.isLength(data.days, { min: 1, max: 300 })) {
  //   errors.days = "Days can no longer be more than 300";
  // }

  if (data.days <= 1 && data.days > 300) {
    errors.days = "Days can no longer be more than 300";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  // if (Validator.isEmpty(data.rate)) {
  //   errors.rate = "Rate field is required";
  // }

  if (data.rate.length === 0) {
    errors.rate = "Rate field is required";
  }

  // if (Validator.isEmpty(data.days)) {
  //   errors.days = "Days are required required";
  // }

  if (data.days.length === 0) {
    errors.days = "Days are required required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
