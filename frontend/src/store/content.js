import { create } from "zustand";

export const usecontentstore = create((set) => ({
  contenttype: "movie",
  setcontenttype: (type) => set({ contenttype: type }),
}));
