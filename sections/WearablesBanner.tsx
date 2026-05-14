"use client";

import React from "react";

const BRANDS = [
  "Apple Watch",
  "Oura",
  "Garmin",
  "Polar",
  "Ultrahuman",
  "Withings",
  "Fitbit",
  "Wahoo",
  "Zwift",
  "Cronometer",
  "MyFitnessPal",
];

function BrandList() {
  return (
    <>
      {BRANDS.map((brand) => (
        <span
          key={brand}
          className="flex-shrink-0 text-[16px] font-medium"
          style={{
            color: "#5B7A9A",
            letterSpacing: "-0.01em",
            marginRight: 64,
          }}
        >
          {brand}
        </span>
      ))}
    </>
  );
}

export function WearablesBanner() {
  return (
    <section
      className="overflow-hidden py-16"
      style={{ background: "var(--color-bg-soft-blue)" }}
    >
      <p
        className="mb-9 text-center text-[14px] font-medium"
        style={{ color: "#4A6580" }}
      >
        Works with what you already have.
      </p>

      {/* Marquee */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)",
        }}
      >
        <div
          className="flex items-center"
          style={{ animation: "marquee 50s linear infinite" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.animationPlayState = "running")
          }
        >
          {/* Duplicate for seamless loop */}
          <BrandList />
          <BrandList />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
