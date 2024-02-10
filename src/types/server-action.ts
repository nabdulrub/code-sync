export type ServerActionSuccess<T> = { success: true; data?: T };
export type ServerActionFailure = { success: false; error: any };

export type ServerActionReturn<T> =
  | ServerActionSuccess<T>
  | ServerActionFailure;
