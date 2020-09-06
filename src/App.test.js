import React from "react";
import {render, waitFor} from "@testing-library/react";
import fetchShow from "./api/fetchShow";
import App from "./App";

jest.mock("./api/fetchShow");

test("App recieves show data from api", async ()=>{
    fetchShow.mockResolvedValueOnce({
        id: 1,
        name: "Show show",
        image: {},
        summary: "blah blabh blabasd balah blah",
        _embedded: {episodes: []}
    });

    const {getByText, queryByText} = render(<App/>);

    expect(fetchShow).toHaveBeenCalledTimes(1);
    
    //fetching message shown when data is being retrieved from API
    expect(getByText("Fetching data...")).toBeInTheDocument();
    
    //show data filled out and loading message gone when API call is successful
    await waitFor(()=> {
        expect(getByText("blah blabh blabasd balah blah")).toBeInTheDocument();
        expect(queryByText("Fetching data...")).not.toBeInTheDocument();
    });
})


test("Checks that app shows loading message when show is empty", async ()=>{
    fetchShow.mockResolvedValueOnce(null);

    expect(fetchShow).toHaveBeenCalledTimes(1);

    const {getByText} = render(<App/>);
    await waitFor(()=> expect(getByText("Fetching data...")).toBeInTheDocument());
});