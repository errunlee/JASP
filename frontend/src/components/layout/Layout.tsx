import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { useEffect, useRef } from "react";
import { ArrowBigDownDash } from "lucide-react";

type Props = {};

const Layout = ({}: Props) => {
  const deferredPrompt = useRef<any>(null); // Holds the deferred install prompt

  const installButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Prevent the default prompt from showing
      deferredPrompt.current = e; // Save the event
      if (installButton.current) {
        installButton.current.style.display = "block"; // Show the install button
      }
    };

    // Add 'beforeinstallprompt' event listener
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      // Cleanup the event listener on unmount
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt(); // Show the install prompt

      deferredPrompt.current.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        deferredPrompt.current = null; // Reset the deferred prompt
        const installButton = document.getElementById("installButton");
        if (installButton) {
          installButton.style.display = "none"; // Hide the install button
        }
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (installButton.current) installButton.current.style.display = "none";
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <button
        ref={installButton}
        id="installButton"
        style={{ display: "none" }}
        className=" flex gap-3 fixed bottom-4 right-4 z-[1000] bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all"
        onClick={handleInstallClick}
      >
        Install App
        <ArrowBigDownDash />
      </button>

      <Navbar />
      <div className="mt-20 bg-background text-foreground min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
