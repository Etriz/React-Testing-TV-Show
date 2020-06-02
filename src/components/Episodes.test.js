import React from "react";
import { render } from "@testing-library/react";
import Episodes from "./Episodes";

test("episodes component renders", () => {
  const testEpisodes = ["01", "02", "03"];
  const { queryAllByTestId, rerender } = render(<Episodes episodes={[]} />);
  expect(queryAllByTestId(/episodes-test/i)).toHaveLength(0);

  rerender(<Episodes episodes={testEpisodes} />);
  expect(queryAllByTestId(/episodes-test/i)).toHaveLength(3);
});
