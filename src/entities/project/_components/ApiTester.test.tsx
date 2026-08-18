import { fireEvent, render, screen } from "@testing-library/react";

import { ApiTester } from "./ApiTester";

const defaultProps = {
  apiUrl: "https://api.example.com/users",
  defaultLimit: 20,
  limitOverride: "10",
  onLimitChange: jest.fn(),
  copied: false,
  onCopy: jest.fn(),
  isTesting: false,
  onTest: jest.fn(),
  testResponse: null,
  responseStatus: null,
  responseExpanded: false,
  onResponseExpandedChange: jest.fn(),
};

jest.mock("./ResponseViewer", () => ({
  ResponseViewer: ({ response }: { response: string }) => (
    <div data-testid="response-viewer">{response}</div>
  ),
}));

jest.mock("@/shared/ui/AnimatedBoltIcon", () => ({
  AnimatedBoltIcon: () => <div data-testid="animated-bolt-icon" />,
}));

describe("ApiTester", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders apiUrl and limit input correctly", () => {
    render(<ApiTester {...defaultProps} />);

    expect(screen.getByText("https://api.example.com/users")).toBeInTheDocument();

    const input = screen.getByLabelText("Лимит") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("10");
    expect(input.placeholder).toBe("20");
  });

  it("calls onCopy when copy button is clicked", () => {
    render(<ApiTester {...defaultProps} />);

    const copyBtn = screen.getByRole("button", { name: "Скопировать URL эндпоинта" });
    fireEvent.click(copyBtn);

    expect(defaultProps.onCopy).toHaveBeenCalledTimes(1);
  });

  it("calls onLimitChange when limit input value changes", () => {
    render(<ApiTester {...defaultProps} />);

    const input = screen.getByLabelText("Лимит");
    fireEvent.change(input, { target: { value: "50" } });

    expect(defaultProps.onLimitChange).toHaveBeenCalledWith("50");
  });

  it("calls onTest when test button is clicked and isTesting is false", () => {
    render(<ApiTester {...defaultProps} isTesting={false} />);

    const button = screen.getByRole("button", { name: "Тестовый запрос" });
    fireEvent.click(button);

    expect(defaultProps.onTest).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("animated-bolt-icon")).not.toBeInTheDocument();
  });

  it("disables button and shows loader icon when isTesting is true", () => {
    render(<ApiTester {...defaultProps} isTesting={true} />);

    const button = screen.getByRole("button", { name: "Тестовый запрос" });

    expect(button).toBeDisabled();
    expect(screen.getByTestId("animated-bolt-icon")).toBeInTheDocument();

    fireEvent.click(button);
    expect(defaultProps.onTest).not.toHaveBeenCalled();
  });

  it("does not render ResponseViewer when testResponse is null", () => {
    render(<ApiTester {...defaultProps} testResponse={null} />);

    expect(screen.queryByTestId("response-viewer")).not.toBeInTheDocument();
  });

  it("renders ResponseViewer when testResponse is provided", () => {
    const mockResponse = JSON.stringify({ success: true });
    render(<ApiTester {...defaultProps} testResponse={mockResponse} />);

    const viewer = screen.getByTestId("response-viewer");
    expect(viewer).toBeInTheDocument();
    expect(viewer).toHaveTextContent(mockResponse);
  });
});
