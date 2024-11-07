import { create } from 'zustand';

// 하단 네비게이션 바 on/off
export const useNavStore = create((set) => ({
  navVisible: true,
  setNavVisible: (visible) => set({ navVisible: visible }),
}));
