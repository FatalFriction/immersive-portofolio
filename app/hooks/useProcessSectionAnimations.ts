import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseProcessSectionAnimationsOptions {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export default function useProcessSectionAnimations({
  sectionRef,
}: UseProcessSectionAnimationsOptions) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ctxRef.current = gsap.context(() => {
      // Background parallax on scroll
      const bgPrimary = section.querySelector("[data-bg-primary]");
      const bgSecondary = section.querySelector("[data-bg-secondary]");

      if (bgPrimary) {
        gsap.to(bgPrimary, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (bgSecondary) {
        gsap.to(bgSecondary, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Newspaper panel entrance animation
      const newspaperPanel = section.querySelector("[data-newspaper-panel]");
      if (newspaperPanel) {
        gsap.from(newspaperPanel, {
          scrollTrigger: {
            trigger: newspaperPanel,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      // Masthead reveal
      const masthead = section.querySelector("[data-masthead]");
      if (masthead) {
        gsap.from(masthead, {
          scrollTrigger: {
            trigger: masthead,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          scaleY: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          transformOrigin: "top center",
        });
      }

      // Headline typewriter-style reveal
      const headline = section.querySelector("[data-headline]");
      if (headline) {
        gsap.from(headline, {
          scrollTrigger: {
            trigger: headline,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Subheadline reveal
      const subheadline = section.querySelector("[data-subheadline]");
      if (subheadline) {
        gsap.from(subheadline, {
          scrollTrigger: {
            trigger: subheadline,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
        });
      }

      // Rule line draw animation
      const ruleLines = section.querySelectorAll("[data-rule-line]");
      ruleLines.forEach((line) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          scaleX: 0,
          duration: 0.8,
          ease: "power2.inOut",
          transformOrigin: "left center",
        });
      });

      // Lead article fade and slide
      const leadArticle = section.querySelector("[data-lead-article]");
      if (leadArticle) {
        gsap.from(leadArticle, {
          scrollTrigger: {
            trigger: leadArticle,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // Process steps stagger reveal
      const processSteps = section.querySelectorAll("[data-process-step]");
      processSteps.forEach((step, index) => {
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: index * 0.12,
        });

        // Number counter animation
        const number = step.querySelector("[data-step-number]");
        if (number) {
          gsap.from(number, {
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: index * 0.12,
          });
        }
      });

      // Timeline box reveal
      const timelineBox = section.querySelector("[data-timeline-box]");
      if (timelineBox) {
        gsap.from(timelineBox, {
          scrollTrigger: {
            trigger: timelineBox,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        });

        // Timeline items stagger
        const timelineItems = timelineBox.querySelectorAll("[data-timeline-item]");
        timelineItems.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            x: -30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1,
          });
        });
      }

      // Footer metadata reveal
      const footerMeta = section.querySelector("[data-footer-meta]");
      if (footerMeta) {
        gsap.from(footerMeta, {
          scrollTrigger: {
            trigger: footerMeta,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Visual cards stagger reveal (right side)
      const visualCards = section.querySelectorAll("[data-visual-card]");
      visualCards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: index % 2 === 0 ? 60 : -60,
          opacity: 0,
          rotateY: index % 2 === 0 ? -8 : 8,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.15,
          transformPerspective: 1000,
        });

        // Image scale on hover
        const image = card.querySelector("[data-visual-image]");
        if (image) {
          card.addEventListener("mouseenter", () => {
            gsap.to(image, {
              scale: 1.08,
              duration: 0.6,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(image, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          });
        }
      });

      // Subtle floating animation for ambient glow
      const ambientGlows = section.querySelectorAll("[data-ambient-glow]");
      ambientGlows.forEach((glow) => {
        gsap.to(glow, {
          y: -15,
          x: 8,
          duration: 4 + Math.random() * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, section);

    return () => {
      ctxRef.current?.revert();
    };
  }, [sectionRef]);
}
