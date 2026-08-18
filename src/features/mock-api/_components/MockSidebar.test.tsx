import { fireEvent, render, screen } from "@testing-library/react";

import { MockSidebar } from "./MockSidebar";

jest.mock("@/shared/components/ui/slider", () => ({
  Slider: ({
    value,
    onValueChange,
    min,
    max,
  }: {
    value: number;
    onValueChange: (val: number[]) => void;
    min: number;
    max: number;
  }) => (
    <input
      type="range"
      data-testid="mock-slider"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onValueChange([Number(e.target.value)])}
    />
  ),
}));

describe("MockSidebar", () => {
  const defaultProps = {
    delay: 500,
    setDelay: jest.fn(),
    errorRate: 10,
    setErrorRate: jest.fn(),
    defaultLimit: 20,
    setDefaultLimit: jest.fn(),
    name: "Test API",
    isPending: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("рендерит заголовок и текущие значения настроек", () => {
    render(<MockSidebar {...defaultProps} />);

    expect(screen.getByText("Поведение ответа")).toBeInTheDocument();
    expect(screen.getByText("500 мс")).toBeInTheDocument();
    expect(screen.getByText("10%")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("кнопка заблокирована, если name пустой (или содержит только пробелы)", () => {
    const { rerender } = render(<MockSidebar {...defaultProps} name="" />);

    const button = screen.getByRole("button", { name: /создать mock api/i });
    expect(button).toBeDisabled();

    rerender(<MockSidebar {...defaultProps} name="   " />);
    expect(button).toBeDisabled();
  });

  it("кнопка заблокирована во время загрузки (isPending = true)", () => {
    render(<MockSidebar {...defaultProps} isPending={true} />);

    const button = screen.getByRole("button", { name: /создать mock api/i });
    expect(button).toBeDisabled();
  });

  it("кнопка активна, если name заполнено и isPending = false", () => {
    render(<MockSidebar {...defaultProps} name="Users API" isPending={false} />);

    const button = screen.getByRole("button", { name: /создать mock api/i });
    expect(button).not.toBeDisabled();
  });

  it("вызывает setDelay при изменении первого слайдера", () => {
    render(<MockSidebar {...defaultProps} />);

    const sliders = screen.getAllByTestId("mock-slider");
    fireEvent.change(sliders[0], { target: { value: "1000" } });

    expect(defaultProps.setDelay).toHaveBeenCalledWith(1000);
  });

  it("вызывает setErrorRate при изменении второго слайдера", () => {
    render(<MockSidebar {...defaultProps} />);

    const sliders = screen.getAllByTestId("mock-slider");
    fireEvent.change(sliders[1], { target: { value: "25" } });

    expect(defaultProps.setErrorRate).toHaveBeenCalledWith(25);
  });

  it("вызывает setDefaultLimit при изменении третьего слайдера", () => {
    render(<MockSidebar {...defaultProps} />);

    const sliders = screen.getAllByTestId("mock-slider");
    fireEvent.change(sliders[2], { target: { value: "50" } });

    expect(defaultProps.setDefaultLimit).toHaveBeenCalledWith(50);
  });
});
