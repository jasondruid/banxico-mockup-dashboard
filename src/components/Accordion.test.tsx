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


describe("Accordion", () => {
  test("Modal should fetch and be rendered, Redux store must be", () => {
    render(
      <Provider store={store}>
        <BasicModal
          isOpen={true}
          closeFunction={() => {}}
          resetFunction={() => {}}
        />
      </Provider>
    );
    expect(screen.getByText("Seleccione una Serie")).toBeDefined();
  });

  test("The modify modal should load and Redux should be setted", () => {
    render(
      <Provider store={store}>
        <ModifyVisualizationModal
          id={2212}
          serie={"AS34232"}
          english={false}
          texto={"texto"}
          text={"text"}
          date_start={new Date()}
          date_end={new Date()}
          type="graph"
          option1={0}
          option2={0}
          title="texto del usuario"
        />
      </Provider>
    );
    const inputValue = screen.getByRole("textbox") as HTMLInputElement
    expect(inputValue.value).toBe("");
  });

  test("Dashboard accepts all arguments and render", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DashboardLayout />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByRole("containers")).toBeDefined();
  });
});

