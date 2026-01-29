import Featured from "@/components/Featured";
import Offer from "@/components/Offer";
import Slider from "@/components/Slider";
import TrustBadges from "@/components/TrustBadges"; 
import Testimonials from "@/components/Testimonials"; 

export default function Home() {
  return (
    <main>
      <Slider />
      <TrustBadges />     
      <Featured />
      <Offer />
      <Testimonials />    
    </main>
  );
}