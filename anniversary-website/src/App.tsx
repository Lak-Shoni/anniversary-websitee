import { useAppStore } from "@/store/appStore";

import AuthGate from "@/components/AuthGate";
import { LoveLetter } from "@/components/LoveLetter";
import { Timeline } from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import { Countdown } from "@/components/Countdown";
import MusicPlayer from "@/components/MusicPlayer";
import { useState } from "react";
import OpeningScreen from "@/components/OpeningScreen";
import ThankYou from "./components/ThankYou";

function App() {
  const [started, setStarted] = useState(false);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (!started) {
    return <OpeningScreen onStart={() => setStarted(true)} />;
  }

  if (!isAuthenticated) {
    return <AuthGate />;
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white">
        <LoveLetter />
        <Timeline />
        <Gallery />
        <ThankYou/>
      </main>

      <MusicPlayer />
    </>
  );
}

export default App;