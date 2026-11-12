"use client";

import { useState } from "react";
import { useInterest } from "@/components/providers/InterestProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { getService, services } from "@/content/services";
import styles from "./Quiz.module.css";

const stages = [
  {
    id: "start",
    label: "We are starting from scratch",
    outcome: "We will scope it and build it from the ground up, using the tools you already have wherever we can.",
  },
  {
    id: "fix",
    label: "We have something, but it is not working",
    outcome: "We will look at what you have, fix what is holding it back and connect it to the rest of your tools.",
  },
  {
    id: "run",
    label: "It works, but nobody has time to run it",
    outcome: "We will take it over, run it day to day and keep improving it, so you can get back to the business.",
  },
];

export default function Quiz() {
  const [serviceId, setServiceId] = useState(null);
  const [stageId, setStageId] = useState(null);
  const { setInterest } = useInterest();

  const step = !serviceId ? 1 : !stageId ? 2 : 3;
  const service = serviceId ? getService(serviceId) : null;
  const stage = stages.find((s) => s.id === stageId);

  const reset = () => {
    setServiceId(null);
    setStageId(null);
  };

  const back = () => (step === 3 ? setStageId(null) : setServiceId(null));

  return (
    <Section tone="indigo" grain labelledBy="quiz-title">
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <SectionHeader
            index="04"
            label="Find your fit"
            id="quiz-title"
            title="Not sure where to start? Two quick questions."
            intro="Tell us what matters most right now and we will point you to the right starting place. It takes ten seconds and nothing is saved."
          />
        </div>

        <div className={`${styles.card} reveal`}>
          <div className={styles.meta}>
            <p className={styles.step}>{step < 3 ? `Question ${step} of 2` : "Your starting point"}</p>
            {step > 1 ? (
              <button type="button" className={styles.back} onClick={back}>
                Back
              </button>
            ) : null}
          </div>

          <div className={styles.progress} aria-hidden="true">
            <span style={{ width: `${(step / 3) * 100}%` }} />
          </div>

          <div aria-live="polite">
            {step === 1 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.question}>What does your business need most right now?</legend>
                <div className={styles.options}>
                  {services.map((s) => (
                    <button key={s.id} type="button" className={styles.option} onClick={() => setServiceId(s.id)}>
                      {s.need}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.question}>Where are you with it today?</legend>
                <div className={styles.options}>
                  {stages.map((s) => (
                    <button key={s.id} type="button" className={styles.option} onClick={() => setStageId(s.id)}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 3 && service && stage && (
              <div className={styles.result}>
                <p className={styles.resultLabel}>We would start with</p>
                <h3 className={styles.resultTitle}>{service.title}</h3>
                <p className={styles.resultBody}>
                  {service.tagline} {stage.outcome}
                </p>
                <div className={styles.resultActions}>
                  <Button href="/#contact" arrow onClick={() => setInterest(service.id)}>
                    Talk to us about it
                  </Button>
                  <button type="button" className={styles.back} onClick={reset}>
                    Start over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
