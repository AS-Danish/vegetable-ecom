export const Icon = ({name,size=20}:{name:string;size?:number}) => {
  const paths:Record<string,React.ReactNode>={
    search:<><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
    basket:<><path d="M5 9h14l-1.2 10H6.2L5 9Z"/><path d="m8 9 4-5 4 5"/></>,
    heart:<path d="M12 20s-7-4.2-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.8-7 10-7 10Z"/>,
    user:<><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-4 3-6 7-6s6.4 2 7 6"/></>,
    arrow:<path d="m5 12 14 0m-5-5 5 5-5 5"/>,
    close:<path d="m6 6 12 12M18 6 6 18"/>,
    plus:<path d="M12 5v14M5 12h14"/>,
    minus:<path d="M5 12h14"/>,
    home:<><path d="m4 11 8-7 8 7"/><path d="M6 10v10h12V10"/></>,
    shop:<><path d="M4 9h16l-1 11H5L4 9Z"/><path d="M8 9a4 4 0 0 1 8 0"/></>,
    chevron:<path d="m8 10 4 4 4-4"/>,
    check:<path d="m5 12 4 4L19 6"/>,
    pin:<><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5"/></>,
    truck:<><rect x="1" y="4" width="14" height="11" rx="1"/><polygon points="15 8 19 8 22 11 22 15 15 15 15 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    cash:<><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9h.01M18 15h.01"/></>,
    spark:<path d="m12 3 2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z"/>,
    star:<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    clock:<><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></>,
    tag:<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    leaf:<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2.5.5 4.5-.5 10a7 7 0 0 1-7.5 8zM2 22l7-7"/>
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};
