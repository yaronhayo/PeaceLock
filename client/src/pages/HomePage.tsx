import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceAreas from "@/components/ServiceAreas";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import Contact from "@/components/Contact";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <ServiceAreas />
        <Reviews />
        <About />
        <FAQ />
        <BookingForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}