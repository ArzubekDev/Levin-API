import { useQueryClient } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { Project } from "@/entities/project";
import { fetchClient } from "@/shared/lib/fetch-client";

import DashboardContent from "./DashboardContent";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(),
}));

jest.mock("@/features/auth", () => ({
  authKeys: { all: ["auth"] },
}));

jest.mock("@/shared/lib/fetch-client", () => ({
  fetchClient: { delete: jest.fn() },
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const makeProject = (overrides: Partial<Project> = {}): Project => ({
  id: "1",
  name: "Users API",
  endpointKey: "users",
  schemaJson: {},
  delay: 200,
  errorRate: 5,
  defaultLimit: 10,
  createdAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

describe("DashboardContent", () => {
  const mockInvalidateQueries = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (fetchClient.delete as jest.Mock).mockResolvedValue(undefined);
  });

  const openProjectMenu = (name = "Users API") => {
    fireEvent.contextMenu(screen.getByText(name));
  };

  it("renders project cards with name, endpoint, delay and error rate", () => {
    render(
      <DashboardContent
        projects={[
          makeProject(),
          makeProject({
            id: "2",
            name: "Orders API",
            endpointKey: "orders",
            delay: 0,
            errorRate: 10,
          }),
        ]}
      />,
    );

    expect(screen.getByText("Users API")).toBeInTheDocument();
    expect(screen.getByText("/api/users")).toBeInTheDocument();
    expect(screen.getByText("Задержка: 200 мс")).toBeInTheDocument();
    expect(screen.getByText("Ошибки: 5%")).toBeInTheDocument();

    expect(screen.getByText("Orders API")).toBeInTheDocument();
    expect(screen.getByText("/api/orders")).toBeInTheDocument();
    expect(screen.getByText("Задержка: 0 мс")).toBeInTheDocument();
    expect(screen.getByText("Ошибки: 10%")).toBeInTheDocument();
  });

  it("links each project to its mock-api page", () => {
    render(<DashboardContent projects={[makeProject({ id: "abc" })]} />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/mock-api/abc");
  });

  it("deletes a project and invalidates auth and project queries", async () => {
    render(
      <DashboardContent
        projects={[makeProject({ id: "p1" }), makeProject({ id: "p2", name: "Second" })]}
      />,
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);

    await waitFor(() => {
      expect(fetchClient.delete).toHaveBeenCalledWith("/projects/p1");
    });
    expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ["auth"] });
    expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ["projects"] });
  });

  it("alerts the error message when delete fails with an Error", async () => {
    (fetchClient.delete as jest.Mock).mockRejectedValue(new Error("Нет доступа"));

    render(<DashboardContent projects={[makeProject()]} />);
    fireEvent.click(screen.getAllByRole("button")[1]);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Нет доступа");
    });
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it("alerts a fallback message when delete fails with a non-Error", async () => {
    (fetchClient.delete as jest.Mock).mockRejectedValue("network");

    render(<DashboardContent projects={[makeProject()]} />);
    fireEvent.click(screen.getAllByRole("button")[1]);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Не удалось удалить проект");
    });
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it("opens a context menu with actions and decorative disabled items", () => {
    render(<DashboardContent projects={[makeProject()]} />);
    openProjectMenu();

    expect(screen.getByRole("menuitem", { name: "Открыть" })).not.toHaveAttribute("aria-disabled");
    expect(screen.getByRole("menuitem", { name: "Удалить" })).not.toHaveAttribute("aria-disabled");
    expect(screen.getByRole("menuitem", { name: "Переименовать" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("menuitem", { name: "Дублировать" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("menuitem", { name: "Отправить" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("menuitem", { name: "Свойства" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("opens the project from the context menu", () => {
    render(<DashboardContent projects={[makeProject({ id: "abc" })]} />);
    openProjectMenu();
    fireEvent.click(screen.getByRole("menuitem", { name: "Открыть" }));

    expect(mockPush).toHaveBeenCalledWith("/mock-api/abc");
  });

  it("deletes a project from the context menu", async () => {
    render(<DashboardContent projects={[makeProject({ id: "p1" })]} />);
    openProjectMenu();
    fireEvent.click(screen.getByRole("menuitem", { name: "Удалить" }));

    await waitFor(() => {
      expect(fetchClient.delete).toHaveBeenCalledWith("/projects/p1");
    });
  });
});
