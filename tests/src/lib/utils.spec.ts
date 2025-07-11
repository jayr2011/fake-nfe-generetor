import { describe, it, expect, vi } from "vitest"
import { cn } from "../../../src/lib/utils"

function mockClsx(...args: unknown[]): string {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(" ")
}

vi.mock("clsx", async () => {
  const actual = await vi.importActual<unknown>("clsx") as { clsx: (...args: unknown[]) => string }
  return {
    ...actual,
    clsx: vi.fn(mockClsx),
  }
})
vi.mock("tailwind-merge", () => ({
  twMerge: vi.fn((input) => input + " [merged]"),
}))

describe("cn", () => {
  it("should combine simple classes", () => {
    expect(cn("a", "b")).toBe("a b [merged]")
  })

  it("should ignore falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b [merged]")
  })

  it("should accept array of classes", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c [merged]")
  })
})