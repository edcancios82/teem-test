import { render, screen } from "@testing-library/react";
import { OnboardingPage } from "./OnboardingPage";
import { describe, test, expect, vi } from "vitest";

vi.mock("../../services", () => ({
  getSections: vi.fn(),
}));

import { getSections } from "../../services";

describe("OnboardingPage", () => {
  test("renders sections returned from API", async () => {
    (getSections as any).mockResolvedValue([
      { id: 1, title: "Section 1" },
      { id: 2, title: "Section 2" },
    ]);

    render(<OnboardingPage />);

    expect(await screen.findByText("Section 1")).toBeInTheDocument();
    expect(await screen.findByText("Section 2")).toBeInTheDocument();
  });
});
