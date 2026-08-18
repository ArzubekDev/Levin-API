import { fireEvent, render, screen } from "@testing-library/react";

import { ResourceTabs } from "./ResourseTabs";

const defaultProps = {
  resources: ["users", "posts", "comments"],
  activeResource: "users",
  onSelect: jest.fn(),
};

describe("ResourceTabs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("рендерит все ресурсы с префиксом '/'", () => {
    render(<ResourceTabs {...defaultProps} />);

    expect(screen.getByRole("button", { name: "/users" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "/posts" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "/comments" })).toBeInTheDocument();
  });

  it("вызывает onSelect с именем ресурса при клике", () => {
    render(<ResourceTabs {...defaultProps} />);

    const button = screen.getByRole("button", { name: "/posts" });
    fireEvent.click(button);

    expect(defaultProps.onSelect).toHaveBeenCalledWith("posts");
    expect(defaultProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it("применяет стили активного элемента к activeResource", () => {
    render(<ResourceTabs {...defaultProps} activeResource="users" />);

    const activeButton = screen.getByRole("button", { name: "/users" });
    const inactiveButton = screen.getByRole("button", { name: "/posts" });

    // Активная кнопка имеет синюю подсветку
    expect(activeButton).toHaveClass("border-blue-500/40");
    // Неактивная кнопка имеет базовые стили slate
    expect(inactiveButton).toHaveClass("border-slate-800");
  });
});
