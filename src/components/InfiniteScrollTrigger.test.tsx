import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";

describe("InfiniteScrollTrigger", () => {
  it("should render loading state when loading is true", () => {
    render(<InfiniteScrollTrigger loading={true} hasMore={true} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("Loading more products...")).toBeInTheDocument();
  });

  it("should render 'no more products' message when hasMore is false", () => {
    render(<InfiniteScrollTrigger loading={false} hasMore={false} />);

    expect(screen.getByText("No more products to load")).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("should render invisible trigger when not loading and hasMore is true", () => {
    const { container } = render(
      <InfiniteScrollTrigger loading={false} hasMore={true} />
    );

    const triggerElement = container.querySelector('div[style*="height: 1"]');
    expect(triggerElement).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Loading more products...")
    ).not.toBeInTheDocument();
  });

  it("should forward ref correctly", () => {
    const ref = vi.fn();

    render(<InfiniteScrollTrigger ref={ref} loading={false} hasMore={true} />);

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("should have correct accessibility for loading state", () => {
    render(<InfiniteScrollTrigger loading={true} hasMore={true} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(screen.getByText("Loading more products...")).toBeInTheDocument();
  });
});
