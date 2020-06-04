import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import episodeFixture from "./fixtures/episodeFixture";

jest.mock("./api/fetchShow");
// console.log(mockFetchShow);

test("App renders and then can pick season from default show", async () => {
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
test("able to change shows and then select a season", async () => {
  mockFetchShow.mockResolvedValue(episodeFixture);

  const { findByText, queryAllByTestId } = render(<App />);
  const showDropdown = await findByText(/select a show/i);
  const seasonDropdown = await findByText(/select a season/i);

  // console.log("show", showDropdown);

  userEvent.click(showDropdown);
  userEvent.click(await findByText(/stranger things/i));
  await waitFor(() => expect(queryAllByTestId(/episodes-test/i)).toHaveLength(0));

  userEvent.click(seasonDropdown);
  userEvent.click(await findByText(/season 1/i));
  await waitFor(() => expect(queryAllByTestId(/episodes-test/i)).toHaveLength(1));
});
