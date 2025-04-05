import {create} from "zustand"

interface storeState {
  isSearchOpen: boolean;
  setSearchOpen: (value: boolean) => void;
}

const useStore = create<storeState>((set) => ({
  isSearchOpen: false,
  setSearchOpen: (value: boolean) => set({ isSearchOpen: value }),
}));

export default useStore;