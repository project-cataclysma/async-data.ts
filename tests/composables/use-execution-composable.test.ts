import { describe } from 'vitest';
import { delayFunction, onDelayFunctionSuccess } from '../delay-function';
import { specUseExecutionReference } from './spec/use-execution-reference-spec'
import { usePipelineExecution } from '../../src';

const dataFn = usePipelineExecution(delayFunction, {
    onSuccess: onDelayFunctionSuccess,
}).execute();

describe('composable use-execution-reference', () => specUseExecutionReference(dataFn));