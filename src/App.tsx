import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useActiveSection } from './hooks/useActiveSection';
import './App.css';

function App() {
  const { activeSection, setActiveSection } = useActiveSection();

  return (
    <div className="App">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
