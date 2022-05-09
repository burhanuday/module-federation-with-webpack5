import React from "react";
import Button from "remote1/Button";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  test("should render without errors", () => {
    render(<Button />);

    const button = screen.getByRole("button", {
      name: /GO HOME/i,
    });

    expect(button).toBeInTheDocument();
  });
});
