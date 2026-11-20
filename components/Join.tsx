import WaitlistForm from './WaitlistForm';

export default function Join() {
  return (
    <section id="join">
      <div className="wrap split">
        <div>
          <p className="eyebrow">Join us</p>
          <h2>Be first on the list</h2>
          <p className="lede">
            We are opening area by area. Leave your number and we will message you when we reach you. Kitchens and
            delivery partners, tell us who you are and we will call you.
          </p>
          <p className="note">We only use your number to contact you about Gramaste. No spam, no selling it on.</p>
        </div>
        <div className="card">
          {process.env.NEXT_PUBLIC_STATIC === 'true' && !process.env.NEXT_PUBLIC_WAITLIST_URL ? (
            <div role="status">
              <h3>Waitlist opens soon</h3>
              <p style={{ marginTop: 10 }}>We are getting the first kitchens ready. Sign-ups open here shortly, so check back soon.</p>
            </div>
          ) : (
            <WaitlistForm />
          )}
        </div>
      </div>
    </section>
  );
}
