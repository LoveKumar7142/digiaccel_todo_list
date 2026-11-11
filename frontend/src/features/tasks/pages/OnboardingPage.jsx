import "./OnboardingPage.css";

export default function OnboardingPage({ onStart }) {
  return (
    <main className="onboarding">
      <div className="onboarding-art" aria-hidden="true">
        <span className="onboarding-wave wave-top" />
        <span className="onboarding-wave wave-bottom" />
      </div>
      <section className="onboarding-copy">
        <h1>Manage What To Do</h1>
        <p>The best way to manage what you have to do, don't forget your plans</p>
        <button className="primary" onClick={onStart}>Get Started</button>
      </section>
    </main>
  );
}
