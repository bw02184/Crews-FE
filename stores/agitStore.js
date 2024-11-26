import { create } from 'zustand';

// Zustand 스토어 생성
export const useAccountStore = create((set) => ({
  accountData: {
    accountId: null,
    fintecUseNum: null,
  },
  setAccountData: (newData) =>
    set((state) => ({
      accountData: {
        ...state.accountData,
        ...newData,
      },
    })),
}));
