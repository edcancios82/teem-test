import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { OnboardingPage } from "./OnboardingPage";

vi.mock("../../services", () => ({
  getSections: vi.fn(),
}));

import { UserProvider } from "../../context/UserContext";
import { getSections } from "../../services";

describe("OnboardingPage", () => {
  test("renders sections returned from API", async () => {
    (getSections as any).mockResolvedValue([
      {
        id: "1",
        title: "Section 1",
        owners: [],
        formData: {},
      },
      {
        id: "2",
        title: "Section 2",
        owners: [],
        formData: {},
      },
    ]);

    render(
      <UserProvider>
        <OnboardingPage />
      </UserProvider>
    );

    expect(await screen.findByText("Section 1 (No access)")).toBeInTheDocument();
    expect(await screen.findByText("Section 2 (No access)")).toBeInTheDocument();
  });
});
