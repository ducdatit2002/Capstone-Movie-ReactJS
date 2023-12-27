import { useEffect, useState } from "react";


const useScrollY = () => {
    const [scrollY,setScroll] = useState(0);
   
    const handScrollY = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setScroll(scrollY);
    }
   
    useEffect(() => {
      handScrollY()
      window.addEventListener("scroll", handScrollY);
   
      return () => {
        window.removeEventListener("scroll",handScrollY);
      }
    },[])

    return { scrollY };
}

export default useScrollY;