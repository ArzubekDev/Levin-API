import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { HeaderMobileNav } from "./HeaderMobileNav";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("HeaderMobileNav", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/docs");
  });

  it("opens a sheet with header links on burger click", () => {
    render(<HeaderMobileNav />);

    fireEvent.click(screen.getByRole("button", { name: "Открыть меню" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard");
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("link", { name: "Real API" })).toHaveAttribute("href", "/real-api");
    expect(screen.getByRole("link", { name: "Mock API" })).toHaveAttribute("href", "/mock-api");
  });

  it("closes the sheet after a nav link is clicked", () => {
    render(<HeaderMobileNav />);

    fireEvent.click(screen.getByRole("button", { name: "Открыть меню" }));
    fireEvent.click(screen.getByRole("link", { name: "Dashboard" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
