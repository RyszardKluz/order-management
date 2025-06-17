import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('');
  const [toastBody, setShowBody] = useState('');

  const show = (variant: string, body: string) => {
    setShowToast(true);
    setToastVariant(variant);
    setShowBody(body);
  };

  return {
    showToast: show,
    ToastComponent: (
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
          </Toast.Header>
          <Toast.Body>{toastBody}</Toast.Body>
        </Toast>
      </ToastContainer>
    ),
  };
};
