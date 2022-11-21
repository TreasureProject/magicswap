import { describe, expect, it } from "vitest";
import { formatCurrency, formatPercent, formatUsd } from "./number";

describe("number utils", () => {
  it("should format currencies for analytics", () => {
    expect(formatCurrency(1000.1)).toBe("1,000.1");
    expect(formatCurrency(1000.12345)).toBe("1,000.12");
  });

  it("should format usd prices", () => {
    expect(formatUsd(1000.1)).toBe("$1,000.10");
    expect(formatUsd(1000.12345)).toBe("$1,000.12");
  });

  it("should format percentages", () => {
    expect(formatPercent(0.1)).toBe("10%");
    expect(formatPercent(0.123456)).toBe("12.35%");
  });
});
