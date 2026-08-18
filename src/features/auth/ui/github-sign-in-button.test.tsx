import { fireEvent, render, screen } from "@testing-library/react";
import { toast } from "sonner";

import { assignLocation } from "@/features/auth/lib/assign-location";
import { buildGitHubAuthorizeUrl } from "@/features/auth/lib/github-oauth";

import { GitHubSignInButton } from "./github-sign-in-button";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("@/features/auth/lib/assign-location", () => ({
  assignLocation: jest.fn(),
}));

jest.mock("@/features/auth/lib/github-oauth", () => ({
  buildGitHubAuthorizeUrl: jest.fn(),
}));

describe("GitHubSignInButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (buildGitHubAuthorizeUrl as jest.Mock).mockReturnValue(
      "https://github.com/login/oauth/authorize",
    );
  });

  it("рендерит кнопку корректно", () => {
    render(<GitHubSignInButton />);

    const button = screen.getByRole("button", { name: /войти через github/i });
    expect(button).toBeInTheDocument();
  });

  it("вызывает assignLocation при успешном клике", () => {
    render(<GitHubSignInButton />);

    const button = screen.getByRole("button", { name: /войти через github/i });
    fireEvent.click(button);

    expect(buildGitHubAuthorizeUrl).toHaveBeenCalledTimes(1);
    expect(assignLocation).toHaveBeenCalledWith("https://github.com/login/oauth/authorize");
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("показывает toast.error, если buildGitHubAuthorizeUrl выбрасывает ошибку", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    (buildGitHubAuthorizeUrl as jest.Mock).mockImplementation(() => {
      throw new Error("Config missing");
    });

    render(<GitHubSignInButton />);

    const button = screen.getByRole("button", { name: /войти через github/i });
    fireEvent.click(button);

    expect(assignLocation).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Вход через GitHub не настроен");
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
