import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatUsd,
} from "./number";

describe("number utils", () => {
  it("should format numbers for swaps", () => {
    expect(formatNumber(0.123456789)).toBe("0.123456");
    expect(formatNumber(12)).toBe("12");
    expect(formatNumber(12.123456789)).toBe("12.1234");
    expect(formatNumber(100.1235)).toBe("100.123");
    expect(formatNumber(1_000)).toBe("1,000");
    expect(formatNumber(1_000.119)).toBe("1,000.11");
    expect(formatNumber(100_000.12345)).toBe("100,000");
    expect(formatNumber(1_000_000.12345)).toBe("1,000,000");
  });

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
