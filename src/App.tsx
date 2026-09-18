/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { WorkFilmRoll } from './components/WorkFilmRoll';
import { FeaturedWebsitesSection } from './components/FeaturedWebsitesSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ScrapbookStickers } from './components/ScrapbookStickers';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFlashActive, setIsFlashActive] = useState(false);

  const triggerCameraFlash = () => {
    setIsFlashActive(true);
    setTimeout(() => {
      setIsFlashActive(false);
    }, 450);
  };

  return (
    <div className="relative min-h-screen bg-[#6b0f1a] text-[#f7f3e8] overflow-x-hidden film-grain">
      {/* Global Camera Flash burst effect */}
      {isFlashActive && (
        <div className="fixed inset-0 bg-white pointer-events-none z-50 animate-flash"></div>
      )}

      {/* Floating Scrapbook Background Elements */}
      <ScrapbookStickers />

      {/* Persistent Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <Hero onFlashTrigger={triggerCameraFlash} />

        {/* ABOUT SECTION */}
        <AboutSection />

        {/* SKILLS SECTION */}
        <SkillsSection />

        {/* WORK FILM ROLL SECTION (COMMERCIAL VIDEOS) */}
        <WorkFilmRoll onSelectProject={setSelectedProject} />

        {/* FEATURED WEBSITES SECTION (ARCHITECTURE, TEXTILE, CAFE, DENTAL) */}
        <FeaturedWebsitesSection />

        {/* ACHIEVEMENTS FLOATING CARDS SECTION */}
        <AchievementsSection />

        {/* CONTACT SECTION */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* PROJECT INSPECTION MODAL */}
      <ProjectModal 
        project={selectedProject}
        projects={PROJECTS}
        onSelectProject={setSelectedProject}
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}
