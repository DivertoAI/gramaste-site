const STEPS = [
  { n: '01', title: 'Pick by the gram', body: 'Choose chicken, fish, paneer, soya or eggs and the exact raw weight you want. Price per 50 g and protein per 100 g are on every card.' },
  { n: '02', title: 'Weighed before it is cooked', body: 'The kitchen weighs your raw food and attaches a weigh ticket to your order. Cooking only starts once every item is weighed.' },
  { n: '03', title: 'Cooked to order', body: 'Nothing sits in a warmer. Your food is cooked after you order, the way you chose: plain, tandoori or masala, with your oil and veggies.' },
  { n: '04', title: 'At your door in 15', body: 'The nearest free delivery partner picks it up. Watch them on the map, chat, or call. Late? One tap tells support.' },
];

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap">
        <p className="eyebrow">How it works</p>
        <h2>Four steps, no guessing</h2>
        <div className="grid three" style={{ marginTop: 40 }}>
          {STEPS.map((s) => (
            <article className="card" key={s.n}>
              <span className="step-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
