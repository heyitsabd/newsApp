import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppProvider } from "@/context/AppContext";
import Home from "@/app/page";

// Mock useRouter() to prevent errors
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Home Component", () => {
  it("renders without crashing", () => {
    render(
      <ThemeProvider>
        <AppProvider>
          <Home />
        </AppProvider>
      </ThemeProvider>
    );

    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });
});
