"use client";

import ClickSpark from "./ClickSpark";

export default function SparkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark
      sparkColor="#F5C842"
      sparkSize={12}
      sparkRadius={35}
      sparkCount={8}
      duration={500}
      easing="ease-out"
      extraScale={1.2}
    >
      {children}
    </ClickSpark>
  );
}
