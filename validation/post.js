const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.rate = !isEmpty(data.rate) ? data.rate : "";
  data.dateFrom = !isEmpty(data.dateFrom) ? data.dateFrom : "";
  data.dateTo = !isEmpty(data.dateTo) ? data.dateTo : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (!Validator.isLength(data.rate, { min: 5, max: 300 })) {
    errors.rate = "Rate must be between 5$ and 300$";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  if (Validator.isEmpty(data.rate)) {
    errors.rate = "Rate field is required";
  }

  if (Validator.isEmpty(data.dateFrom)) {
    errors.dateFrom = "Starting date field is required";
  }

  if (Validator.isEmpty(data.dateTo)) {
    errors.dateTo = "Ending date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
