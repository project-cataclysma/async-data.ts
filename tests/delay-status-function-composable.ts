import { StatusComposable } from "../dist";
import {
  DelayFunctionReference,
  DelayFunctionResponse,
} from "./delay-function";

export type DelayStatusFunctionComposable = StatusComposable<
  boolean,
  DelayFunctionReference,
  DelayFunctionResponse,
  [key: string, result?: boolean],
  Error
>;
