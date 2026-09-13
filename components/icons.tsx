export const Icon = ({name,size=20}:{name:string;size?:number}) => {
  const paths:Record<string,React.ReactNode>={
    search:<><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
    basket:<><path d="M5 9h14l-1.2 10H6.2L5 9Z"/><path d="m8 9 4-5 4 5"/></>,
    heart:<path d="M12 20s-7-4.2-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.8-7 10-7 10Z"/>,
    user:<><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-4 3-6 7-6s6.4 2 7 6"/></>,
    arrow:<path d="m5 12 14 0m-5-5 5 5-5 5"/>,
    close:<path d="m6 6 12 12M18 6 6 18"/>,
    plus:<path d="M12 5v14M5 12h14"/>, minus:<path d="M5 12h14"/>,
    home:<><path d="m4 11 8-7 8 7"/><path d="M6 10v10h12V10"/></>,
    shop:<><path d="M4 9h16l-1 11H5L4 9Z"/><path d="M8 9a4 4 0 0 1 8 0"/></>,
    chevron:<path d="m8 10 4 4 4-4"/>, check:<path d="m5 12 4 4L19 6"/>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};
