import { describe } from 'vitest';
import { specUseMethod } from './spec/use-method-spec';
import { delayFunction, getDelayFunctionStatus, type DelayFunctionReference, type DelayFunctionResponse, getDelayFunctionError } from '../delay-function';
import { useMethod, useMethodStatus } from '../../src/functions';
import { specUseMethodStatus } from './spec/use-method-status-spec';

const dataFn = () => useMethodStatus<boolean, DelayFunctionReference, DelayFunctionResponse, [key: string], Error>(delayFunction, useMethod, {
    getResult: (resp) => resp.result,
    getStatus: getDelayFunctionStatus,
    getError: getDelayFunctionError,
});

describe('composable use-method', () => specUseMethod(dataFn));
describe('composable use-method-status', () => specUseMethodStatus(dataFn));