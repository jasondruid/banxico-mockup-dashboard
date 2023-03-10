import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BasicModal from "./AddGraphModal";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from "../redux/store";
import IsAuthHook from "../hooks/isAuth";
import ModifyVisualizationModal from "./modalItems/ModifyVisualizationModal";
import DashboardLayout from "../layout/DashboardLayout";
import { BrowserRouter } from "react-router-dom";
import Routes from "../routes";
import Home from "../pages/Home";

const MockUpLoginTest = () => {
  const auth = IsAuthHook();
  console.log(auth);
  if(!auth) return <div role="containers"></div>;
  return <div></div>
};

describe("Logic Test", () => {
  test("Should crash because Redux is handling state", () => {
    render(
      <Provider store={store}>
        <MockUpLoginTest />
      </Provider>
    );
    expect(screen.getByRole("containers")).toBeDefined();
  });
});
