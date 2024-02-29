import { create } from "zustand";

const useLoadingStore = create((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
  
}));

export default useLoadingStore;
