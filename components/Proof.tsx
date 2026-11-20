export default function Proof() {
  return (
    <section id="proof" style={{ background: 'var(--surface)' }}>
      <div className="wrap split">
        <div>
          <p className="eyebrow">The problem we fix</p>
          <h2>“200 g chicken” should mean 200 g</h2>
          <p className="lede">
            Most gym-food apps give you a macro number and ask you to trust it. Portions shrink, cooking water changes
            the weight, and your tracker is off by the end of the week. We weigh the raw food first, show you the
            ticket, and price by the gram, so what you log is what you ate.
          </p>
          <p className="note">Protein figures come from raw weight and standard nutrition data. Cooked weight is never used.</p>
        </div>
        <div className="ticket" role="img" aria-label="Example weigh ticket: chicken breast, 200 grams raw, 45 grams protein">
          <div className="row"><span>WEIGH TICKET</span><span>#1042</span></div>
          <div className="row"><span>Item</span><span>Chicken breast</span></div>
          <div className="row"><span>Ordered</span><span>200 g raw</span></div>
          <div className="row"><span>Weighed</span><span><b>201.4 g</b> ✓</span></div>
          <div className="row"><span>Protein</span><span><b>45 g</b></span></div>
          <div className="row"><span>Photo</span><span>attached</span></div>
        </div>
      </div>
    </section>
  );
}
