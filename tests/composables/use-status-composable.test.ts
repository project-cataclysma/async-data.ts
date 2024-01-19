import { describe } from 'vitest';
import { specUseExecutionReference } from './spec/use-execution-reference-spec';
import { delayFunction, getDelayFunctionStatus, getDelayFunctionError } from '../delay-function';
import { specUseStatusReference } from './spec/use-status-reference-spec';
import { usePipeline } from '../../src';
import { useExecutionReference } from '../../src/references';

async function ping() {
    Promise.resolve(true);
}
const pipeline2 = usePipeline(useExecutionReference, ping, {});
const pipeline = usePipeline(useExecutionReference, delayFunction, {});
const dataFn = pipeline.status({
    getResult: (resp) => resp.result,
    getStatus: getDelayFunctionStatus,
    getError: getDelayFunctionError,
});

describe('composable use-status-reference-execution', () => specUseExecutionReference(dataFn));
describe('composable use-status-reference', () => specUseStatusReference(dataFn));