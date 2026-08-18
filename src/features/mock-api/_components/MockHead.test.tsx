import { fireEvent, render, screen } from "@testing-library/react";

import { MockHead, MockProjectName } from "./MockHead";

describe("MockHead", () => {
  it("рендерит заголовок и описание", () => {
    render(<MockHead />);

    expect(screen.getByRole("heading", { name: /новый mock api/i })).toBeInTheDocument();

    expect(screen.getByText(/опишите ресурсы в json schema/i)).toBeInTheDocument();
  });
});

describe("MockProjectName", () => {
  const mockSetName = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("рендерит лейбл и поле ввода с placeholder", () => {
    render(<MockProjectName name="" setName={mockSetName} />);

    expect(screen.getByText(/название api/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Users");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("передает корректное значение name в Input", () => {
    render(<MockProjectName name="My Cool API" setName={mockSetName} />);

    const input = screen.getByPlaceholderText("Users");
    expect(input).toHaveValue("My Cool API");
  });

  it("вызывает setName при изменении значения в поле ввода", () => {
    render(<MockProjectName name="" setName={mockSetName} />);

    const input = screen.getByPlaceholderText("Users");
    fireEvent.change(input, { target: { value: "Products" } });

    expect(mockSetName).toHaveBeenCalledTimes(1);
    expect(mockSetName).toHaveBeenCalledWith("Products");
  });
});
