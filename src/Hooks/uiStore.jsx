import { create } from "zustand";

export const useLinks = create(()=>{
    const Links = [
        { name: "HOME", url: "/" },
        { name: "SHOPPING", url: "/shopping" },
        { name: "ABOUT", url: "/about" },
        { name: "CONTACT", url: "/contact" },
    ]
    return { Links };
})


export const useSideHeader = create((set) => ({
    index: false,
    openSideHeader: () => set(() => ({ index: true })),
    closeSideHeader: () => set(() => ({ index: false })),
  }));
  
  export const useSearchStore = create((set) => ({
    search: "",
    showSearch: false,
  
    setSearch: (value) => set({ search: value }),
    openSearch: () => set({ showSearch: true }),
    closeSearch: () => set({ showSearch: false , search: ""  }),
  }));