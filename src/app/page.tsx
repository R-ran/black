import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import LuxuryEditorial from "@/components/LuxuryEditorial";
import ImageSlider from "@/components/ImageSlider";
import MultiRow from "@/components/MultiRow";
import TestimonialsSection from "@/components/TestimonialsSection";
import StickyProductBar from "@/components/StickyProductBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="MainContent" className="content-for-layout" role="main">
      {/* Announcement Bar */}
      <AnnouncementBar />
      
      {/* Header */}
      <Header />

      {/* Main Product Section */}
      <section className="section-main-padding">
        <div className="page-width">
          <div className="product product--medium product--left product--thumbnail_slider product--mobile-show grid grid--1-col grid--2-col-tablet">
            <ProductGallery />
            <ProductInfo />
          </div>
        </div>
      </section>

      {/* Luxury Editorial Section */}
      <section className="section-luxury-editorial color-background-1 gradient content-for-grouping">
        <div className="page-width">
          <LuxuryEditorial />
        </div>
      </section>

      {/* Image Slider Section */}
      <ImageSlider />

      {/* Multi Row Section */}
      <MultiRow />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />

      {/* Sticky Product Bar - Fixed at bottom */}
      <StickyProductBar />
    </main>
  );
}
