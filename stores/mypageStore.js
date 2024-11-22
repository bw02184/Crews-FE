import { create } from 'zustand';

export const useNicknameStore = create((set) => ({
  nickname: '',
  setNickname: (newNickname) => set({ nickname: newNickname }),
}));
