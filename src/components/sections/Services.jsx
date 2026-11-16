"use client";

import Link from "@/components/ui/NavLink";
import { useRef, useState } from "react";
import { useInterest } from "@/components/providers/InterestProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { services } from "@/content/services";
import { routes } from "@/content/site";
import { UNSURE } from "@/lib/contact";
import styles from "./Services.module.css";

export default function Services() {
  const { interest, setInterest } = useInterest();
  // Opens on the service the visitor picked on the homepage overview, if any.
  const [activeId, setActiveId] = useState(() => (services.some((s) => s.id === interest) ? interest : services[0].id));
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
    <Section id="services" tone="light" first labelledBy="services-title">
      <Container>
        <SectionHeader
          level={1}
          index="01"
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
                  onClick={(event) => {
                    setActiveId(service.id);
                    // On phones the tabs are a sideways strip that snaps by each tab's start, so slide the
                    // chosen tab to the start: it is then fully visible and lines up with the title below.
                    event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
                  }}
                >
                  <span className={styles.tabNum}>{service.number}</span>
                  <span className={styles.tabTitle}>{service.title}</span>
                </button>
              );
            })}
          </div>

          {/*
            Every panel is rendered in the same grid cell and only the active one is
            visible, so the box is always as tall as the tallest panel and never jumps.
            Inactive panels use visibility:hidden, which also hides them from screen
            readers and the tab order.
          */}
          <div className={styles.panels}>
            {services.map((service) => (
              <div
                key={service.id}
                role="tabpanel"
                id={`panel-${service.id}`}
                aria-labelledby={`tab-${service.id}`}
                tabIndex={0}
                className={`${styles.panel} ${service.id === active.id ? styles.panelActive : ""}`}
              >
                <span className={styles.ghost} aria-hidden="true">
                  {service.number}
                </span>
                <h3 className={styles.panelTitle}>{service.title}</h3>
                <p className={styles.panelTagline}>{service.tagline}</p>
                <ul className={styles.items}>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Button href={routes.contact} arrow onClick={() => setInterest(service.id)}>
                  Talk to us about this
                </Button>
              </div>
            ))}
          </div>
        </div>

        <p className={`${styles.more} reveal`}>
          <strong>And more.</strong> These are the areas people ask for most, not the limit of what we do. Don’t see
          yours?{" "}
          <Link href={routes.contact} onClick={() => setInterest(UNSURE)}>
            Tell us what you need
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
