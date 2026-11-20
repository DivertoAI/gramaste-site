import { Reveal } from './motion';

const ITEMS = [
  ['Are the grams raw or cooked?', 'Raw. Meat, fish and paneer are weighed on a kitchen scale before they hit the pan, and your macros are worked out from that weight. Your order carries a weigh ticket as proof.'],
  ['Where do the nutrition numbers come from?', 'Standard food-composition data, matched per ingredient and scaled to your grams. Treat them as a close, honest estimate: cooking lowers some vitamins.'],
  ['I have never planned a diet. Can Preeto do it?', 'Yes. Answer a few questions and it proposes every meal, date by date. You review each day, add all or some to your basket, and edit later. It offers suggestions, not medical advice.'],
  ['How do I cancel a plan?', 'One tap in the Plans tab. Meals already locked are delivered; 70% of the unused amount is refunded in 5 to 7 working days.'],
  ['Where do you deliver?', 'Koramangala, Bengaluru first. Each kitchen only serves the streets it can reach quickly, so your food is cooked after you order and arrives fast. The app tells you before you order if your address is out of range.'],
] as const;

export default function Faq() {
  return (
    <div id="faq" className="faq-band">
      <div className="faq">
        <h2>Questions</h2>
        {ITEMS.map(([q, a], i) => (
          <Reveal key={q} delay={i * 0.06}>
            <details>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
