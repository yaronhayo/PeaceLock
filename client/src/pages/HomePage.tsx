import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChoose />
        <About />
        <FAQ />
        <Reviews />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}