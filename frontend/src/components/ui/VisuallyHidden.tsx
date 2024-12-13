import { ReactNode } from "react";

interface VisuallyHiddenProps {
  children: ReactNode;
}

export default function VisuallyHidden({
  children,
  ...delegated
}: VisuallyHiddenProps) {
  return (
    <span
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0 0 0 0)" /* Legacy property for Internet Explorer */,
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
      }}
      {...delegated}
    >
      {children}
    </span>
  );
}
