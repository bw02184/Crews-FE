'use client';

import { useState } from 'react';

export default function useToast() {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setToast(true);
  };

  return { toast, setToast, toastMessage, showToast };
}
