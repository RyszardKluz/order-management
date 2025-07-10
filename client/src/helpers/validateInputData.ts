const validateInputData = (
  inputData: Record<string, unknown>,
  inputFields: string[],
): void => {
  for (const [key] of Object.entries(inputData)) {
    if (key === 'productPrice' && isNaN(Number(inputData[key]))) {
      throw new Error('Product Price must be a number value!');
    }
  }

  const missingData = inputFields.filter(
    (field) =>
      typeof inputData[field] === 'string' &&
      (!inputData[field] || inputData[field].trim() === ''),
  );

  if (missingData.length > 0) {
    throw new Error(`All fields are required`);
  }
};

export default validateInputData;
