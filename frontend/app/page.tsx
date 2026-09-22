import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Plan from "@/components/Plan";
import WeatherExplorer from "@/components/WeatherExplorer";


export default function Home() {
  return (
    <div>
      <Hero />
      <WeatherExplorer />
      <Plan />
      <FAQSection />
      <Footer />
    </div>
  );
}
