import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import ExperienceProject from "../components/ExperienceProject";
import Categories from "../components/Categories";
import Feedback from "../components/Feedback";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <ExperienceProject/>
      <Categories />
      <Feedback />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;