import { render, screen } from "@testing-library/react";
import InfiniteImageCarousel from "./InfiniteCarousel";
import { vi } from "vitest";
import { act } from "react";

const mockedImages = [
  { id: "1", title: "Image 1", content: "image1.jpg" },
  { id: "2", title: "Image 2", content: "image2.jpg" },
  { id: "3", title: "Image 3", content: "image3.jpg" }
];

describe("InfiniteImageCarousel", () => {
  it("should render correctly", () => {
    const { container } = render(
      <InfiniteImageCarousel items={mockedImages} />
    );

    expect(container).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBe(mockedImages.length);

    mockedImages.forEach(image => {
      const img = screen.getByAltText(image.title);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", image.content);
    });
  });

  it("should cycle through images automatically", () => {
    vi.useFakeTimers();

    render(<InfiniteImageCarousel items={mockedImages} />);

    expect(screen.getByAltText("Image 1")).toHaveStyle("opacity: 1");

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByAltText("Image 2")).toHaveStyle("opacity: 1");

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByAltText("Image 3")).toHaveStyle("opacity: 1");
  });
});
