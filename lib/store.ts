import { create } from 'zustand';

interface UIState {
  activeSection: string;
  isScrollingTo: boolean;
  setActiveSection: (id: string) => void;
  setIsScrollingTo: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: 'hero',
  isScrollingTo: false,
  setActiveSection: (id) => set({ activeSection: id }),
  setIsScrollingTo: (v) => set({ isScrollingTo: v }),
}));
