import {
  ExecutionStatus,
  ExecutionStatusType,
  ExecuitonReference,
  Method,
  StatusReference,
} from "../dist";

export type DelayFunctionResponse = { key: string; result: boolean };

export const EmptyDelayFunctionResponse: DelayFunctionResponse = {
  key: "none",
  result: false,
};

async function _delayFunction(
  key: string,
  result: boolean = true,
): Promise<DelayFunctionResponse> {
  return { key, result };
}

export const delayFunction: Method<
  DelayFunctionResponse,
  [key: string, result?: boolean]
> = _delayFunction;

export function getDelayFunctionStatus(
  response: DelayFunctionResponse,
): ExecutionStatus {
  switch (response.key) {
    case "failed":
      return DelayFailure;
    case "errored":
    case "errored-hard":
      return DelayError;
    case "success":
    default:
      return DelaySuccess;
  }
}

export function onDelayFunctionSuccess() {
  return true;
}

export function getDelayFunctionError(
  response: DelayFunctionResponse,
): Error | null {
  if (response.key === "errored") return new Error("bad");
  else if (response.key === "errored-hard") throw Error("bad bad");
  else return null;
}

export type DelayFunctionReference = ExecuitonReference<
  DelayFunctionResponse,
  [key: string, result?: boolean]
>;
export type DelayFunctionStatusReference = StatusReference<
  boolean,
  DelayFunctionReference,
  DelayFunctionResponse,
  [key: string]
>;

export const DelayPending: ExecutionStatus = {
  type: ExecutionStatusType.Pending,
  code: 0,
  message: "",
};

export const DelayError: ExecutionStatus = {
  type: ExecutionStatusType.Errored,
  code: -8000,
  message: "error",
};

export const DelayFailure: ExecutionStatus = {
  type: ExecutionStatusType.Failed,
  code: +8000,
  message: "failure",
};

export const DelaySuccess: ExecutionStatus = {
  type: ExecutionStatusType.Successful,
  code: 0,
  message: "success",
};
