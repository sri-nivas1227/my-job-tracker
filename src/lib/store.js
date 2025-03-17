import { configureStore } from "@reduxjs/toolkit";
import trackerReducer from "@/lib/features/apptracker/trackerSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("trackerState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Failed to load state:", error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("trackerState", serializedState);
  } catch (error) {
    console.error("Failed to save state:", error);
  }
};

const preloadedState = loadState();
const store = configureStore({
  reducer: {
    tracker: trackerReducer,
  },
  preloadedState: preloadedState
    ? { tracker: { jobs: preloadedState.tracker.jobs } }
    : undefined,
});

// Subscribe to store changes and save state
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
