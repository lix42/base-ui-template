import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
// Registers jest-dom matchers (toBeInTheDocument, etc.) on Vitest's expect.
import "@testing-library/jest-dom/vitest";

// globals: false, so RTL can't auto-register cleanup — do it explicitly.
afterEach(() => {
  cleanup();
});
