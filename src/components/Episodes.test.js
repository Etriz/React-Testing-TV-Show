import React from "react";
import { render } from "@testing-library/react";

import Episodes from "./Episodes";
import episodeFixture from "../fixtures/episodeFixture";

test("episodes component renders", () => {
  render(<Episodes episodes={[]} />);
});

test("episodes component renders with fake props", () => {
  const { queryAllByTestId, rerender } = render(<Episodes episodes={[]} />);
  expect(queryAllByTestId(/episodes-test/i)).toHaveLength(0);

  rerender(<Episodes episodes={[episodeFixture]} />);
  expect(queryAllByTestId(/episodes-test/i)).toHaveLength(1);
});
