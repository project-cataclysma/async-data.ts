import { describe } from 'vitest';
import { specUseExecutionReference } from './spec/use-execution-reference-spec';
import { delayFunction, getDelayFunctionStatus, type DelayFunctionResponse, getDelayFunctionError } from '../delay-function';
import { useStatusReferenceExecution } from '../../src/composables';
import { specUseStatusReference } from './spec/use-status-reference-spec';

const dataFn = () => useStatusReferenceExecution<boolean, DelayFunctionResponse, [key: string], Error>(delayFunction, {
    getResult: (resp) => resp.result,
    getStatus: getDelayFunctionStatus,
    getError: getDelayFunctionError,
});

describe('composable use-status-reference-execution', () => specUseExecutionReference(dataFn));
describe('composable use-status-reference', () => specUseStatusReference(dataFn));