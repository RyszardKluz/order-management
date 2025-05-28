const uniqueById = (array) => {
  const filteredResourceList = new Set();

  return array.filter((item) => {
    if (!filteredResourceList.has(item.productId)) {
      filteredResourceList.add(item.productId);
      return true;
    }
    return false;
  });
};

export default uniqueById;
