import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";

import Section from "./Section";

describe("Section Component", () => {
  it("should render the component with default props", () => {
    const title = "Página de Teste";

    render(<Section title={title} />, { wrapper: MemoryRouter });

    const headingElement = screen.getByRole("heading", {
      name: title,
      level: 1
    });
    expect(headingElement).toBeInTheDocument();

    const backButton = screen.getByRole("link", { name: /Back to Home/i });
    expect(backButton).toBeInTheDocument();

    expect(backButton).toHaveAttribute("href", "/");
  });

  it("should render the component with custom props", () => {
    const title = "User Page";
    const backToText = "Dashboard";
    const backPath = "/dashboard";

    render(<Section title={title} backTo={backToText} backPath={backPath} />, {
      wrapper: MemoryRouter
    });

    const headingElement = screen.getByRole("heading", {
      name: title,
      level: 1
    });
    expect(headingElement).toBeInTheDocument();

    const backButton = screen.getByRole("link", {
      name: `Back to ${backToText}`
    });
    expect(backButton).toBeInTheDocument();

    expect(backButton).toHaveAttribute("href", backPath);
  });

  it("should not render the back button when mustShowBackButton is false", () => {
    const title = "Page Without Back Button";

    render(<Section title={title} mustShowBackButton={false} />, {
      wrapper: MemoryRouter
    });

    const headingElement = screen.getByRole("heading", {
      name: title,
      level: 1
    });
    expect(headingElement).toBeInTheDocument();

    const backButton = screen.queryByRole("link", { name: /Back to/i });
    expect(backButton).not.toBeInTheDocument();
  });

  it("should render the children correctly", () => {
    const title = "Page with Content";
    const childText = "This is the child content of the component.";

    render(
      <Section title={title}>
        <p>{childText}</p>
        <span>Another child element.</span>
      </Section>,
      { wrapper: MemoryRouter }
    );

    expect(
      screen.getByRole("heading", { name: title, level: 1 })
    ).toBeInTheDocument();

    const childParagraph = screen.getByText(childText);
    expect(childParagraph).toBeInTheDocument();

    const childSpan = screen.getByText("Another child element.");
    expect(childSpan).toBeInTheDocument();
  });

  it("should back to the correct path when back button is clicked", async () => {
    const user = userEvent.setup();
    const title = "Navigation Test";
    const backPath = "/previous-page";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<Section title={title} backPath={backPath} />}
          />
          <Route path={backPath} element={<div>Previous Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByRole("link", { name: /Back to Home/i });
    expect(backButton).toHaveAttribute("href", backPath);
    expect(backButton).toBeInTheDocument();

    expect(screen.queryByText("Previous Page")).not.toBeInTheDocument();

    await user.click(backButton);

    expect(screen.queryByText("Previous Page")).toBeInTheDocument();
  });

  it("should render the section description when provided", () => {
    const title = "Section with Description";
    const description = "This is a description for the section.";

    render(<Section title={title} description={description} />, {
      wrapper: MemoryRouter
    });

    const headingElement = screen.getByRole("heading", {
      name: title,
      level: 1
    });
    expect(headingElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });
});
