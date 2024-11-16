import { create } from 'zustand';

export const useSessionStatusStore = create((set) => ({
  sessionStatus: false,
  setSessionStatus: (status) =>
    set((state) => {
      if (state.sessionStatus !== status) {
        return { sessionStatus: status };
      }
      return state;
    }),
}));
