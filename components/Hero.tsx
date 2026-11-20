import CountdownDemo from './CountdownDemo';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div>
          <p className="eyebrow">Bengaluru · gym food</p>
          <h1>
            Eat to the <em>gram.</em>
          </h1>
          <p className="lede">
            Your raw chicken, fish or paneer is weighed before it is cooked, you get the weigh ticket as proof, and it
            reaches you within 15 minutes. Protein you can verify, not a number on a menu.
          </p>
          <div className="cta-row">
            <a className="btn" href="#join">Join the waitlist</a>
            <a className="btn ghost" href="#how">See how it works</a>
          </div>
          <div className="proofline">
            <span>Weighed raw, on camera</span>
            <span>15-minute promise</span>
            <span>Real nutrient numbers</span>
          </div>
        </div>
        <div className="phone" role="img" aria-label="Preview of the live order tracking screen with a 15 minute countdown, map and delivery partner">
          <div className="timer"><CountdownDemo /></div>
          <p style={{ textAlign: 'center', marginTop: 10, fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: '1.5rem' }}>
            On the way to you
          </p>
          <div className="steps" aria-hidden="true">
            <div className="on"><i />Kitchen</div>
            <div className="on"><i />Pickup</div>
            <div className="on"><i />On the way</div>
            <div><i />Delivered</div>
          </div>
          <div className="fakemap" aria-hidden="true">
            <div className="route" />
            <div className="dot k">🍳</div>
            <div className="dot p">🛵</div>
            <div className="dot h">🏠</div>
          </div>
          <div className="partner" aria-hidden="true">
            <div className="avatar">A</div>
            <div>
              <strong>Arjun</strong>
              <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Your delivery partner · Bike</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
