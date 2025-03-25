const validateInputData = (inputData, inputFields) => {


  for (const [key] of Object.entries(inputData)) {
    if (key === 'productPrice' && isNaN(Number(inputData[key]))
    ) { throw new Error('Product Price must be a number value!') }
  }

  const missingData = inputFields.filter(
    (field) => !inputData[field] || inputData[field].trim() === '',
  );

  if (missingData.length > 0) {
    throw new Error(`All fields are required`);
  }
};

export default validateInputData;
