import { describe } from 'vitest';
import { specUseExecutionReference } from './spec/use-execution-reference-spec';
import { delayFunction, getDelayFunctionStatus, getDelayFunctionError } from '../delay-function';
import { specUseStatusReference } from './spec/use-status-reference-spec';
import { useExecutionReference, usePipelineReference } from '../../src/references';

const pipeline = usePipelineReference(useExecutionReference, delayFunction, {});
const dataFn = pipeline.status({
    getResult: (resp) => resp.result,
    getStatus: getDelayFunctionStatus,
    getError: getDelayFunctionError,
});

describe('composable use-status-reference-execution', () => specUseExecutionReference(dataFn));
describe('composable use-status-reference', () => specUseStatusReference(dataFn));