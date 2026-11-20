export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span><strong style={{ color: 'var(--text)' }}>Gramaste</strong> · Eat to the gram · Bengaluru</span>
        <span>Nutrition information is approximate and is not medical advice.</span>
        <span style={{ flexBasis: '100%', fontSize: '0.8rem' }}>
          Placeholder food photos from Wikimedia Commons: Miansari66 (CC0), Andy Li (CC0), Jamie from Toronto (CC BY 2.0),
          Balaji Sakthivel (CC BY-SA 4.0), Sar8b (CC BY-SA 4.0). To be replaced with our own photography.
        </span>
      </div>
    </footer>
  );
}
