const validate = (data, schema) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    const { message } = error.details[0];
    return { isError: true, ErrorMessage: message };
  }

  return { isError: false, ErrorMessage: null };
};

export default validate;
