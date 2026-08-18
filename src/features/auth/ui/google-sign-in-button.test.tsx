import { fireEvent, render, screen } from "@testing-library/react";

import { GoogleSignInButton } from "./google-sign-in-button";

jest.mock("@react-oauth/google", () => ({
  GoogleLogin: ({
    onSuccess,
    onError,
  }: {
    onSuccess: (res: { credential: string }) => void;
    onError?: () => void;
  }) => (
    <div data-testid="google-login-mock">
      <button onClick={() => onSuccess({ credential: "fake_jwt_token" })}>Trigger Success</button>
      <button onClick={() => onError?.()}>Trigger Error</button>
    </div>
  ),
}));

describe("GoogleSignInButton", () => {
  const defaultProps = {
    onSuccess: jest.fn(),
    onError: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("рендерит визуальную кнопку и контейнер GoogleLogin", () => {
    render(<GoogleSignInButton {...defaultProps} />);

    expect(screen.getByText("Войти через Google")).toBeInTheDocument();

    expect(screen.getByTestId("google-login-mock")).toBeInTheDocument();
  });

  it("вызывает onSuccess с ответом при успешной авторизации Google", () => {
    render(<GoogleSignInButton {...defaultProps} />);

    const triggerSuccessBtn = screen.getByText("Trigger Success");
    fireEvent.click(triggerSuccessBtn);

    expect(defaultProps.onSuccess).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSuccess).toHaveBeenCalledWith({ credential: "fake_jwt_token" });
  });

  it("вызывает onError при ошибке авторизации Google", () => {
    render(<GoogleSignInButton {...defaultProps} />);

    const triggerErrorBtn = screen.getByText("Trigger Error");
    fireEvent.click(triggerErrorBtn);

    expect(defaultProps.onError).toHaveBeenCalledTimes(1);
  });
});
