const validateInputData = (inputData, inputFields) => {
  const missingData = inputFields.filter(
    (field) => !inputData[field] || inputData[field].trim() === '',
  );

  if (missingData.length > 0) {
    throw new Error(`All fields are required`);
  }
};

export default validateInputData;
