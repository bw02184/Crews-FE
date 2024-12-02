import { create } from 'zustand';

export const useAgitInfoStore = create((set) => ({
  agitInfoList: null,
  setAgitInfoList: (agitInfo) => set({ agitInfoList: agitInfo }),
}));

export const useSignupStore = create((set) => ({
  user: {
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    profileImage: '',
    addressDo: '',
    addressSi: '',
    addressGuGun: '',
    addressDong: '',
    pinNumber: '',
  },
  setUserField: (field, value) =>
    set((state) => ({
      user: { ...state.user, [field]: value },
    })),
}));
