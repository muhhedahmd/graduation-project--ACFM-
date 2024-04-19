import { forwardRef } from "react";

export const ComponentToPrint = forwardRef((props, ref) => (
  <div ref={ref}>
    {/* Your content to be printed */}
    <h1>Hello, World!</h1>
  </div>
));