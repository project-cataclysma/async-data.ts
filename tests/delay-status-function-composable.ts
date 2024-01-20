import { StatusComposable } from "../src";
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
