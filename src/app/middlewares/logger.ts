export const logger = (store: any) => (next: any) => (action: any) => {
    // console.log("before: %O", store.getState());
    next(action);
    // console.log("after: %O", store.getState());
  };