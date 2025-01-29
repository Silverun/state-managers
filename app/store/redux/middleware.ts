import { Middleware } from "@reduxjs/toolkit";
import { Dispatch, Action } from "redux";

// Define the type for async actions (functions)
type AsyncAction = (
  dispatch: Dispatch,
  getState: () => any
) => Promise<any> | void;

// Custom middleware type
export const asyncTimeLogger: Middleware = (store) => (next) => (action) => {
  // Handle async actions (functions)
  if (typeof action === "function") {
    console.log("Async action triggered");
    const startTime = Date.now(); // Start timing

    // Execute the async action
    const result = (action as AsyncAction)(store.dispatch, store.getState);

    // If the result is a Promise, wait for it to resolve
    if (result instanceof Promise) {
      return result
        .then((resolvedValue) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          console.log(`Async action resolved in: ${duration}ms`);
          return resolvedValue; // Return the resolved value for further processing
        })
        .catch((error) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          console.log(`Async action rejected in: ${duration}ms`);
          throw error; // Re-throw the error for further handling
        });
    } else {
      // If the result is not a Promise, log the time immediately
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log(`Async action completed in: ${duration}ms`);
      return result;
    }
  }

  // Log the action name for regular actions
  console.log(`Action dispatched: ${action.type}`);

  // Pass regular actions to the next middleware or reducer
  return next(action);
};

// const myMiddleware = (store) => (next) => (action) => {
//   // Do something before the action reaches the reducer
//   console.log("Middleware triggered:", action);

//   // Pass the action to the next middleware or the reducer
//   const result = next(action);

//   // Do something after the action has been processed by the reducer
//   console.log("State after action:", store.getState());

//   // Return the result (usually the action)
//   return result;
// };
