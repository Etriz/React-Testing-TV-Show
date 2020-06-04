import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import episodeFixture from "./fixtures/episodeFixture";

jest.mock("./api/fetchShow");
// console.log(mockFetchShow);

test("App renders", async () => {
  mockFetchShow.mockResolvedValueOnce(episodeFixture);

  const { findByText, queryAllByTestId } = render(<App />);
  const seasonDropdown = await findByText(/select a season/i);

  // console.log("season", seasonDropdown);

  //? fireEvent.change(select, { target: { value: 'Selected Value' } }) <-- way its supposed to be called?
  // fireEvent.change(seasonDropdown, { target: { option: /Season 1/i } }); <-mostly working

  userEvent.click(seasonDropdown);
  userEvent.click(await findByText(/season 1/i));

  await waitFor(() => expect(queryAllByTestId(/episodes-test/i)).toHaveLength(1));
});
