import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

import { useApiTester } from "./lib/use-api-tester";
import { ProjectDetails } from "./ProjectDetails";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("./lib/use-api-tester", () => ({
  useApiTester: jest.fn(),
}));

jest.mock("@/shared/ui/AnimatedBoltIcon", () => ({
  AnimatedBoltIcon: () => <div data-testid="loader" />,
}));

jest.mock("@/shared/ui/Breadcrumbs", () => ({
  Breadcrumbs: () => <div data-testid="breadcrumbs" />,
}));

describe("ProjectDetails", () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockUseApiTester = useApiTester as jest.Mock;

  const mockTester = {
    resources: ["users", "posts"],
    resource: "users",
    selectResource: jest.fn(),
    apiUrl: "https://api.example.com/users",
    defaultLimit: 20,
    limitOverride: "",
    setLimitOverride: jest.fn(),
    copied: false,
    handleCopy: jest.fn(),
    isTesting: false,
    handleTest: jest.fn(),
    testResponse: null,
    responseStatus: null,
    responseExpanded: false,
    setResponseExpanded: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseApiTester.mockReturnValue(mockTester);
  });

  it("отображает лоадер в состоянии загрузки", () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<ProjectDetails id="123" />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("отображает NotFoundState, если проект не найден", () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<ProjectDetails id="123" />);

    expect(screen.getByText("Проект не найден")).toBeInTheDocument();
  });

  it("отображает данные проекта и подкомпоненты при успешной загрузке", () => {
    const mockProject = {
      id: "123",
      name: "Test API",
      delay: 50,
      errorRate: 0,
      defaultLimit: 10,
    };

    mockUseQuery.mockReturnValue({
      data: mockProject,
      isLoading: false,
    });

    render(<ProjectDetails id="123" />);

    expect(screen.getByRole("heading", { name: "Test API" })).toBeInTheDocument();

    expect(screen.getByText("/users")).toBeInTheDocument();
  });
});
