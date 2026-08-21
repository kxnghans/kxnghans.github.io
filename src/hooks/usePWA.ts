import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";

export const usePWA = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        // Service worker registered
      }
    },
    onRegisterError(error) {
      console.error("SW registration error:", error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      toast.info("A new version of Hanson-Tube is ready.", {
        action: {
          label: "Update",
          onClick: () => {
            updateServiceWorker(true);
            setNeedRefresh(false);
          },
        },
        duration: 10000,
      });
    }
  }, [needRefresh, updateServiceWorker, setNeedRefresh]);

  useEffect(() => {
    const handleOffline = () => {
      toast.warning("You are currently offline. Cached content is active.", {
        duration: 4000,
      });
    };
    const handleOnline = () => {
      toast.success("Connection restored.", { duration: 3000 });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
};
