import BuilderReceipt from '@/components/BuilderReceipt';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import Planner from '@/components/Planner';
import Plans from '@/components/Plans';
import Proof from '@/components/Proof';
import { Top } from '@/components/Top';
import Waitlist from '@/components/Waitlist';

export default function Home() {
  return (
    <div className="site">
      <Top />
      <main>
        <Proof />
        <BuilderReceipt />
        <Menu />
        <Planner />
        <Plans />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
