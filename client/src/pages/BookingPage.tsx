import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}