// FormPrompt.js
import { useEffect } from "react";
import { useCustomDispatch, useCustomSelector } from "./redux";
import { SortVisualizations } from "../redux/slices/visualizations";
export const FormPrompt = ({
  hasUnsavedChanges,
}: {
  hasUnsavedChanges: any;
}) => {
  const { initialVisualizations } = useCustomSelector(
    (state) => state.visualizations
  );
  const dispatch = useCustomDispatch();
  useEffect(() => {
    if (hasUnsavedChanges) {
      window.onbeforeunload = function (e: any) {
        e.preventDefault();
        return "are you sure?";
      };
      window.onunload = function (e: any) {
        dispatch(SortVisualizations(initialVisualizations));
      };
    }

    return () => {
      window.onbeforeunload = null;
      window.onunload = null;
    };
  }, [hasUnsavedChanges]);
};
