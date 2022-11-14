import { installGlobals } from "@remix-run/node";
import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

expect.extend(matchers);

installGlobals();
