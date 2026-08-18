import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { MockApi } from "./MockApi";

type MutationCallbacks = {
  onSuccess?: () => void | Promise<void>;
  onError?: (error: unknown) => void;
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => "",
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/shared/lib/fetch-client", () => ({
  fetchClient: {
    post: jest.fn(),
  },
}));

describe("MockApi", () => {
  const mockPush = jest.fn();
  const mockInvalidateQueries = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it("рендерит форму и поле JSON Schema", () => {
    render(<MockApi />);

    expect(screen.getByLabelText(/JSON Schema/i)).toBeInTheDocument();
  });

  it("показывает ошибку toast, если передан невалидный JSON", () => {
    render(<MockApi />);

    const textarea = screen.getByLabelText(/JSON Schema/i);

    fireEvent.change(textarea, { target: { value: "invalid json {" } });

    const form = textarea.closest("form")!;
    fireEvent.submit(form);

    expect(toast.error).toHaveBeenCalledWith("Некорректный JSON в схеме");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("вызывает mutate с правильными данными при успешном сабмите", () => {
    render(<MockApi />);

    const textarea = screen.getByLabelText(/JSON Schema/i);
    const form = textarea.closest("form")!;

    fireEvent.submit(form);

    expect(mockMutate).toHaveBeenCalledWith({
      name: "",
      schemaJson: expect.any(Object),
      delay: 0,
      errorRate: 0,
      defaultLimit: 20,
    });
  });

  it("обрабатывает onSuccess callbacks у мутации (toast, invalidateQueries, router.push)", async () => {
    const mutationOptions: MutationCallbacks = {};
    (useMutation as jest.Mock).mockImplementation((options: MutationCallbacks) => {
      Object.assign(mutationOptions, options);
      return { mutate: mockMutate, isPending: false };
    });

    render(<MockApi />);

    await mutationOptions.onSuccess?.();

    expect(toast.success).toHaveBeenCalledWith("Проект создан");
    expect(mockInvalidateQueries).toHaveBeenCalledTimes(2);
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("обрабатывает onError callback у мутации", () => {
    const mutationOptions: MutationCallbacks = {};
    (useMutation as jest.Mock).mockImplementation((options: MutationCallbacks) => {
      Object.assign(mutationOptions, options);
      return { mutate: mockMutate, isPending: false };
    });

    render(<MockApi />);

    mutationOptions.onError?.(new Error("Сервер недоступен"));
    expect(toast.error).toHaveBeenCalledWith("Сервер недоступен");

    mutationOptions.onError?.("fail");
    expect(toast.error).toHaveBeenCalledWith("Не удалось создать проект");
  });
});
