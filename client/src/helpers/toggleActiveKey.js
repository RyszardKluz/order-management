const toggleActiveKey = (keyNumber, activeKey, setActiveKey) => {
  if (activeKey === keyNumber) {
    setActiveKey(null);
    return;
  }
  setActiveKey(keyNumber);
};

export default toggleActiveKey;
