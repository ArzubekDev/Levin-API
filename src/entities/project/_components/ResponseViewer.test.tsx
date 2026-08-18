import { fireEvent, render, screen } from "@testing-library/react";

import { ResponseViewer } from "./ResponseViewer";

const defaultProps = {
  response: '{"message": "Success"}',
  status: 200,
  isExpanded: false,
  onExpandedChange: jest.fn(),
};

describe("ResponseViewer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("рендерит контент корректно", () => {
    render(<ResponseViewer {...defaultProps} />);

    expect(screen.getByText('{"message": "Success"}')).toBeInTheDocument();
  });

  it("вызывает onExpandedChange(true) при клике, когда status=200", () => {
    render(<ResponseViewer {...defaultProps} />);

    const block = screen.getByText('{"message": "Success"}');
    fireEvent.click(block);

    expect(defaultProps.onExpandedChange).toHaveBeenCalledWith(true);
  });

  it("НЕ вызывает onExpandedChange при клике, когда status=404", () => {
    render(<ResponseViewer {...defaultProps} status={404} />);

    const block = screen.getByText('{"message": "Success"}');
    fireEvent.click(block);

    expect(defaultProps.onExpandedChange).not.toHaveBeenCalled();
  });

  it("не вызывает onExpandedChange при клике, когда status=null", () => {
    render(<ResponseViewer {...defaultProps} status={null} />);

    const block = screen.getByText('{"message": "Success"}');
    fireEvent.click(block);

    expect(defaultProps.onExpandedChange).not.toHaveBeenCalled();
  });

  it("вызывает onExpandedChange(true) при нажатии Enter, когда status=200", () => {
    render(<ResponseViewer {...defaultProps} />);

    const block = screen.getByText('{"message": "Success"}');
    fireEvent.keyDown(block, { key: "Enter" });

    expect(defaultProps.onExpandedChange).toHaveBeenCalledWith(true);
  });

  it("вызывает onExpandedChange(true) при нажатии Space, когда status=200", () => {
    render(
      <div>
        <span data-testid="outside">внешний элемент</span>
        <ResponseViewer {...defaultProps} isExpanded={true} />
      </div>,
    );

    const outsideElement = screen.getByTestId("outside");
    fireEvent.pointerDown(outsideElement);

    expect(defaultProps.onExpandedChange).toHaveBeenCalledWith(false);
  });
});
