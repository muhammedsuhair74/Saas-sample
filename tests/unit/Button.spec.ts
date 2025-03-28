import { test, expect } from "@playwright/test";
import { render } from "@testing-library/react";
import { type } from "os";
import Button from "../../src/components/Button";

test("Button component tests", async ({ page }) => {
  // Test button renders with correct label
  test("renders with correct label", async () => {
    const { getByText } = render(<Button label="Click me" />);
    expect(getByText("Click me")).toBeTruthy();
  });

  // Test button click handler
  test("handles click events", async () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    const { getByText } = render(
      <Button label="Click me" onClick={handleClick} />
    );

    await page.click("text=Click me");
    expect(clicked).toBe(true);
  });

  // Test disabled state
  test("respects disabled prop", async () => {
    const { getByRole } = render(<Button label="Click me" disabled={true} />);
    const button = getByRole("button");
    expect(button).toHaveAttribute("disabled");
  });

  // Test custom className
  test("applies custom className", async () => {
    const { getByRole } = render(
      <Button label="Click me" className="custom-class" />
    );
    const button = getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  // Test button type
  test("sets correct button type", async () => {
    const { getByRole } = render(<Button label="Submit" type="submit" />);
    const button = getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
