import { render, screen } from "@testing-library/react";

import { ProjectHeader } from "./ProjectHeader";

const defaultProps = {
  name: "Test Project",
  delay: 100,
  errorRate: 10,
  defaultLimit: 100,
};

describe("ProjectHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("рендерит заголовок корректно", () => {
    render(<ProjectHeader {...defaultProps} />);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  it("рендерит заддержку корректно", () => {
    render(<ProjectHeader {...defaultProps} />);

    expect(screen.getByText(`Задержка: ${defaultProps.delay} мс`)).toBeInTheDocument();
  });

  it("рендерит ошибки корректно", () => {
    render(<ProjectHeader {...defaultProps} />);

    expect(screen.getByText(`Ошибки: ${defaultProps.errorRate}%`)).toBeInTheDocument();
  });

  it("рендерит лимит корректно", () => {
    render(<ProjectHeader {...defaultProps} />);

    expect(
      screen.getByText(`По умолчанию: ${defaultProps.defaultLimit} записей`),
    ).toBeInTheDocument();
  });
});
