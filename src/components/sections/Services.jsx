"use client";

import { useRef, useState } from "react";
import { useInterest } from "@/components/providers/InterestProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { services } from "@/content/services";
import styles from "./Services.module.css";

export default function Services() {
  const [activeId, setActiveId] = useState(services[0].id);
  const { setInterest } = useInterest();
  const tabRefs = useRef([]);

  const activeIndex = services.findIndex((s) => s.id === activeId);
  const active = services[activeIndex];

  /** WAI-ARIA tabs pattern: arrow keys move between tabs, Home/End jump. */
  const onKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (event.key in keys) next = (activeIndex + keys[event.key] + services.length) % services.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = services.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveId(services[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="services" tone="light" labelledBy="services-title">
      <Container>
        <SectionHeader
          index="03"
          label="Our services"
          id="services-title"
          title="Services that cover the whole business."
          intro="Take one service on its own or combine several. Most clients start with one area and add others as the relationship grows."
        />

        <div className={`${styles.explorer} reveal`}>
          <div className={styles.tabs} role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {services.map((service, i) => {
              const selected = service.id === activeId;
              return (
                <button
                  key={service.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${service.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${service.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                  onClick={() => setActiveId(service.id)}
                >
                  <span className={styles.tabNum}>{service.number}</span>
                  <span className={styles.tabTitle}>{service.title}</span>
                </button>
              );
            })}
          </div>

          <div
            key={active.id}
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            tabIndex={0}
            className={styles.panel}
          >
            <span className={styles.ghost} aria-hidden="true">
              {active.number}
            </span>
            <h3 className={styles.panelTitle}>{active.title}</h3>
            <p className={styles.panelTagline}>{active.tagline}</p>
            <ul className={styles.items}>
              {active.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Button href="/#contact" arrow onClick={() => setInterest(active.id)}>
              Talk to us about this
            </Button>
          </div>
        </div>

        <p className={`${styles.more} reveal`}>
          <strong>And more.</strong> These are the areas people ask for most, not the limit of what we do. If your
          business needs it, there is a good chance we can handle it or build the right team around it.
        </p>
      </Container>
    </Section>
  );
}
