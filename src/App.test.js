import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/* import App from "./App"; */
import TopBar from "../src/components/TopBar/TopBar";
import Dashboard from "../src/components/Dashboard/dashboard";

Enzyme.configure({
  adapter: new Adapter(),
});
const app = shallow(<TopBar />);
const dashboard = shallow(<Dashboard />);

it("renders correctly", () => {
  expect(app).toMatchSnapshot();
});

it("initializes the `state` with false value", () => {
  expect(dashboard.state().collapsed).toEqual(false);
});
