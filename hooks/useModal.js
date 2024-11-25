'use client';

import { useEffect, useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) document.body.classList.add('scroll_hide');
    else document.body.classList.remove('scroll_hide');

    return () => document.body.classList.remove('scroll_hide');
  }, [isOpen]);

  return { isOpen, openModal, closeModal };
};

export default useModal;
