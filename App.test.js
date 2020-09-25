import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import App, { Screen1, AppStack } from "./App";

describe("Screen 1", () => {
  it("navigates on button press", () => {
    const push = jest.fn();
    const { getByText } = render(<Screen1 navigation={{ push }} />);
    fireEvent.press(getByText("Go to Screen 2"));
    expect(push).toHaveBeenCalledWith("Screen2");
  });
});

describe("AppStack", () => {
  it("renders the correct screen", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
    await waitFor(() => getByText("Screen 1"));
  });
});

describe("App", () => {
  it("renders app stack", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => getByText("Screen 1"));
  });

  it("renders auth stack", async () => {
    const { getByText } = render(<App isLoggedIn={false} />);
    await waitFor(() => getByText("Sign In"));
  });
});
