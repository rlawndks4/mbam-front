import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useNetwork = (onChange) => {
  const router = useRouter();
  const { pathname } = router;
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    onChange(navigator.onLine);
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, [pathname]);
  return status;
};

export default useNetwork;