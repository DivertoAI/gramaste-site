import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Join from '@/components/Join';
import Menu from '@/components/Menu';
import Preeto from '@/components/Preeto';
import Proof from '@/components/Proof';
import Promise15 from '@/components/Promise';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Proof />
        <Promise15 />
        <Menu />
        <Preeto />
        <Faq />
        <Join />
      </main>
      <Footer />
    </>
  );
}
