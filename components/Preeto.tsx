export default function Preeto() {
  return (
    <section id="preeto">
      <div className="wrap split">
        <div>
          <p className="eyebrow">Meet Preeto</p>
          <h2>Your AI nutrition coach</h2>
          <p className="lede">
            Never planned a diet? Tell Preeto your goal and she builds your week, day by day, from what the kitchen near
            you can cook. Add every day to your cart, or only the ones you pick, and change meals later until the 8 PM
            cut-off the night before.
          </p>
          <p className="note">Preeto gives food guidance, not medical advice. For health conditions, please see a doctor.</p>
        </div>
        <div className="card chat" role="img" aria-label="Example chat: the customer asks for a week plan and Preeto builds it and fills the cart">
          <div className="bubble me">Plan my week, 3 meals a day, I want to lose fat.<small>You</small></div>
          <div className="bubble ai">Done! 7 days, 21 meals, about 120 g protein a day. I added all of it to your cart. Want to swap Thursday&apos;s dinner?<small>Preeto</small></div>
          <div className="bubble me">Only add Monday to Wednesday.<small>You</small></div>
          <div className="bubble ai">Cart updated with 3 days. The rest stays in your plan, and you can add it any time before 8 PM the night before.<small>Preeto</small></div>
        </div>
      </div>
    </section>
  );
}
