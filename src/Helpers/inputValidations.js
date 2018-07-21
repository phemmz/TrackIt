export function validatePfiForm(formData) {
  const { quantity, cost, hsCode, itemsDetails, type } = formData;
  const errors = {};

  if (!quantity.trim()) {
    errors.quantity = 'This field is required';
  }

  if (!cost.trim()) {
    errors.password = 'Please fill in your Password';
  }

  if (!formData.username.trim()) {
    errors.username = 'Please fill in your Username';
  }

  if (!formData.password.trim()) {
    errors.password = 'Please fill in your Password';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
}
