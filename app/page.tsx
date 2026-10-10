import GameProvider from "./components/game/GameProvider";
import Hud from "./components/game/Hud";
import Confetti from "./components/game/Confetti";
import CustomCursor from "./components/fx/CustomCursor";
import Preloader from "./components/fx/Preloader";
import Navbar from "./components/ui/Navbar";
import SectionViewerProvider from "./components/ui/SectionViewer";
import BackToTop from "./components/ui/BackToTop";
import Hero from "./components/sections/Hero";
import TreeExperience from "./components/sections/TreeExperience";
import About from "./components/sections/About";
import SkillTree from "./components/sections/SkillTree";
import MissionLog from "./components/sections/MissionLog";
import Heritage from "./components/sections/Heritage";
import Ventures from "./components/sections/Ventures";
import Philosophy from "./components/sections/Philosophy";
import Platformz from "./components/sections/Platformz";
import Fur4 from "./components/sections/Fur4";
import Innovation from "./components/sections/Innovation";
import BeyondTech from "./components/sections/BeyondTech";
import Projects from "./components/sections/Projects";
import Dashboard from "./components/sections/Dashboard";
import CareerStats from "./components/sections/CareerStats";
import Recommendations from "./components/sections/Recommendations";
import References from "./components/sections/References";
import Faq from "./components/sections/Faq";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <GameProvider>
      <SectionViewerProvider>
      <Preloader />
      <CustomCursor />
      <Confetti />
      <Navbar />
      <Hud />

      <main className="mx-auto w-full max-w-6xl px-6">
        <Hero />
        <TreeExperience />
        <About />
        <SkillTree />
        <MissionLog />
        <Heritage />
        <Ventures />
        <Philosophy />
        <Platformz />
        <Fur4 />
        <Innovation />
        <BeyondTech />
        <Projects />
        <Dashboard />
        <CareerStats />
        <Recommendations />
        <References />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      </SectionViewerProvider>
    </GameProvider>
  );
}
