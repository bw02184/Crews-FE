'use client';

import { useState } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setToast(true);
  };

  return { toast, setToast, toastMessage, showToast };
};

export default useToast;
