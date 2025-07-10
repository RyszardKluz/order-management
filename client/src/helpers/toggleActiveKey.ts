import { Dispatch, SetStateAction } from 'react';

const toggleActiveKey = (
  keyNumber: string,
  activeKey: string,
  setActiveKey: Dispatch<SetStateAction<string | null>>,
) => {
  if (activeKey === keyNumber) {
    setActiveKey(null);
    return;
  }
  setActiveKey(keyNumber);
  return;
};

export default toggleActiveKey;
