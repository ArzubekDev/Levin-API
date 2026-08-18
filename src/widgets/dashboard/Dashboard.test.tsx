import { useQuery } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { Project } from "@/entities/project";
import { useSession } from "@/features/auth";

import { Dashboard } from "./Dashboard";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

jest.mock("@/features/auth", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/shared/lib/fetch-client", () => ({
  fetchClient: { get: jest.fn() },
}));

jest.mock("./DashboardContent", () => ({
  __esModule: true,
  default: ({ projects }: { projects: Project[] }) => (
    <div data-testid="dashboard-content">Projects: {projects.length}</div>
  ),
}));

jest.mock("./DashboardEmpty", () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard-empty">Empty</div>,
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("Dashboard", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("shows skeleton when user is not authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      user: null,
      status: "unauthenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(<Dashboard />);

    const { container } = render(<Dashboard />);
    expect(container.querySelector('[data-slot="skeleton"]')).toBeInTheDocument();
  });

  it("renders header with project count", () => {
    (useSession as jest.Mock).mockReturnValue({
      user: { projectsCount: 1, maxProjects: 2 },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: [{ id: "1", name: "Test" }],
      isLoading: false,
    });

    render(<Dashboard />);

    expect(screen.getByText("Mock API-проекты")).toBeInTheDocument();
    expect(screen.getByText("1 / 2 проектов")).toBeInTheDocument();
  });

  it("shows empty state when no projects", () => {
    (useSession as jest.Mock).mockReturnValue({
      user: { projectsCount: 0, maxProjects: 2 },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false });

    render(<Dashboard />);

    expect(screen.getByTestId("dashboard-empty")).toBeInTheDocument();
  });

  it("shows content when projects exist", () => {
    (useSession as jest.Mock).mockReturnValue({
      user: { projectsCount: 1, maxProjects: 2 },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: [{ id: "1", name: "Test" }],
      isLoading: false,
    });

    render(<Dashboard />);

    expect(screen.getByTestId("dashboard-content")).toBeInTheDocument();
  });

  it("redirects to create page when button clicked and limit not reached", () => {
    (useSession as jest.Mock).mockReturnValue({
      user: { projectsCount: 0, maxProjects: 2 },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false });

    render(<Dashboard />);
    fireEvent.click(screen.getByText("Новый проект"));

    expect(mockPush).toHaveBeenCalledWith("/mock-api");
  });

  it("shows alert when limit reached and button clicked", () => {
    toast.error = jest.fn();
    (useSession as jest.Mock).mockReturnValue({
      user: { projectsCount: 2, maxProjects: 2 },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false });

    render(<Dashboard />);
    fireEvent.click(screen.getByText("Новый проект"));

    expect(toast.error).toHaveBeenCalledWith("Чтобы создавать больше проектов, нужна подписка.");
    expect(mockPush).not.toHaveBeenCalled();
  });
});
