import { create } from 'zustand';

export const useAgitInfoStore = create((set) => ({
  agitInfoList: null,
  setAgitInfoList: (agitInfo) => set({ agitInfoList: agitInfo }),
}));
