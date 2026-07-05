"use client";

import { useState } from "react";

export function BeforeAfterSlider() {
  const [value, setValue] = useState(52);

  return (
    <div className="compare" style={{ "--split": `${value}%` } as React.CSSProperties}>
      <div className="compare-layer compare-clean" aria-hidden="true">
        <img src="/images/car-clean-aligned.png" alt="" />
      </div>
      <div className="compare-layer compare-dirty" aria-hidden="true">
        <img src="/images/car-dirty.png" alt="" />
      </div>
      <div className="compare-divider" aria-hidden="true">
        <span />
      </div>
      <span className="compare-badge compare-before">До</span>
      <span className="compare-badge compare-after">После</span>
      <input
        aria-label="Сравнить автомобиль до и после детейлинга"
        className="compare-range"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </div>
  );
}
