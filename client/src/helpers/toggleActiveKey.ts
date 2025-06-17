const toggleActiveKey = (
  keyNumber: string,
  activeKey: string,
  setActiveKey: (keyNumber: string | null) => void,
) => {
  if (activeKey === keyNumber) {
    setActiveKey(null);
    return;
  }
  setActiveKey(keyNumber);
};

export default toggleActiveKey;
