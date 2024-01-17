import { describe } from 'vitest';
import { delayFunction, onDelayFunctionSuccess } from '../delay-function';
import { specUseExecutionReference } from './spec/use-execution-reference-spec'
import { useExecutionReference, usePipeline } from '../../src';

const pipeline = usePipeline(useExecutionReference, delayFunction, {
    onSuccess: onDelayFunctionSuccess,
});
const dataFn = pipeline.execute();

describe('composable use-execution-reference', () => specUseExecutionReference(dataFn));