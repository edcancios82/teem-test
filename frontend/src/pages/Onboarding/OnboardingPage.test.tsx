import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { OnboardingPage } from "./OnboardingPage";

vi.mock("../../services", () => ({
  getSections: vi.fn(),
  updateSection: vi.fn(),
  updateSectionOwners: vi.fn(),
  clearSectionOwners: vi.fn(),
}));

import { UserProvider } from "../../context/UserContext";
import { SectionsProvider } from "../../context/SectionsContext";
import { getSections } from "../../services";

describe("OnboardingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const mockUser = { id: 1, name: "Test User", email: "test@example.com" };
    localStorage.setItem("user", JSON.stringify(mockUser));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders sections returned from API without access", async () => {
    (getSections as any).mockResolvedValue([
      {
        id: "1",
        title: "Section 1",
        owners: [],
        description: "Test description 1",
        formData: {
          field1Description: "Field 1",
          field2Description: "Field 2",
          field1: "",
          field2: "",
        },
      },
      {
        id: "2",
        title: "Section 2",
        owners: [],
        description: "Test description 2",
        formData: {
          field1Description: "Field 1",
          field2Description: "Field 2",
          field1: "",
          field2: "",
        },
      },
    ]);

    render(
      <UserProvider>
        <SectionsProvider>
          <OnboardingPage />
        </SectionsProvider>
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Section 1.*\(No access\)/)).toBeInTheDocument();
      expect(screen.getByText(/Section 2.*\(No access\)/)).toBeInTheDocument();
    });
  });

  test("renders sections with owner access", async () => {
    (getSections as any).mockResolvedValue([
      {
        id: "1",
        title: "Section 1",
        owners: ["1"], // Use string "1" to match user.id (string type)
        description: "Test description 1",
        formData: {
          field1Description: "Field 1",
          field2Description: "Field 2",
          field1: "",
          field2: "",
        },
      },
    ]);

    render(
      <UserProvider>
        <SectionsProvider>
          <OnboardingPage />
        </SectionsProvider>
      </UserProvider>
    );

    await waitFor(() => {
      // Use heading role to find the h2 element containing "Section 1"
      expect(screen.getByRole('heading', { name: /Section 1/i })).toBeInTheDocument();
      expect(screen.queryByText(/\(No access\)/)).not.toBeInTheDocument();
    });
  });

  test("renders page header and buttons", async () => {
    (getSections as any).mockResolvedValue([]);

    render(
      <UserProvider>
        <SectionsProvider>
          <OnboardingPage />
        </SectionsProvider>
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Getting Started")).toBeInTheDocument();
      expect(screen.getByText("Clear Data")).toBeInTheDocument();
      expect(screen.getByText("Change user")).toBeInTheDocument();
    });
  });
});