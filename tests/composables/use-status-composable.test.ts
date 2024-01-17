import { describe } from 'vitest';
import { specUseExecutionReference } from './spec/use-execution-reference-spec';
import { delayFunction, getDelayFunctionStatus, type DelayFunctionResponse, getDelayFunctionError, DelayFunctionReference } from '../delay-function';
import { specUseStatusReference } from './spec/use-status-reference-spec';
import { useStatusComposable } from '../../src/composables';
import { useExecutionReference } from '../../src/references';

const dataFn = useStatusComposable<boolean, DelayFunctionReference, DelayFunctionResponse, [key: string], Error>(useExecutionReference, delayFunction, {
    getResult: (resp) => resp.result,
    getStatus: getDelayFunctionStatus,
    getError: getDelayFunctionError,
});

describe('composable use-status-reference-execution', () => specUseExecutionReference(dataFn));
describe('composable use-status-reference', () => specUseStatusReference(dataFn));