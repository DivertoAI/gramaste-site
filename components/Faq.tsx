const ITEMS = [
  ['Where do you deliver?', 'We are starting in Koramangala, BTM, HSR, Indiranagar, Domlur and Jayanagar. A kitchen only serves addresses it can reach in 15 minutes, and the app tells you straight away if yours is outside.'],
  ['Who cooks the food?', 'Independent cloud kitchens that partner with Gramaste. We set the weigh-before-cook rule, check the weigh tickets, and own your experience, from your order to the delivery.'],
  ['How do I know the protein is right?', 'Your raw food is weighed and the weigh ticket is attached to your order. Protein is calculated from raw weight, so cooking does not change the number.'],
  ['What if my food is late?', 'The countdown shows the 15-minute promise. If it runs out, tap Help on the tracking screen and our team looks into that order.'],
  ['Can I cancel an order?', 'Yes, until the kitchen accepts it. After that we have already started on your food.'],
  ['Is Preeto a doctor?', 'No. Preeto helps you plan meals from the menu. She does not give medical advice or diagnose anything.'],
  ['I run a kitchen or ride a bike. Can I join?', 'Yes. Pick that option on the form below and we will get in touch.'],
] as const;

export default function Faq() {
  return (
    <section id="faq" style={{ background: 'var(--surface)' }}>
      <div className="wrap" style={{ maxWidth: 820 }}>
        <p className="eyebrow">Questions</p>
        <h2>Good to know</h2>
        <div style={{ marginTop: 28 }}>
          {ITEMS.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
