import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { hasExternalBooking, getBookingHref, site } from "@/content/site";
import ContactForm from "./ContactForm";
import styles from "./Contact.module.css";

const nextSteps = [
  { title: "We talk", text: "A free call to understand your goals, your tools and your budget." },
  { title: "You get a quote", text: "A clear written quote shaped around what you actually need." },
  { title: "We get to work", text: "One point of contact, from first build to ongoing support." },
];

export default function Contact() {
  return (
    <Section id="contact" tone="dark" grain labelledBy="contact-title" className={styles.contact}>
      <div className={styles.glow} aria-hidden="true" />
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <SectionHeader
            index="09"
            label="Get in touch"
            id="contact-title"
            title="Let’s build what’s next."
            intro="One team. Every function. Tell us what your business needs and we will help you build the foundation for what comes next."
          />

          <ol className={`${styles.steps} reveal`}>
            {nextSteps.map((step, i) => (
              <li key={step.title}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={`${styles.direct} reveal`}>
            {hasExternalBooking ? (
              <Button href={getBookingHref()} arrow>
                Book a free call
              </Button>
            ) : null}
            <p>
              Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>

        <div className="reveal">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
