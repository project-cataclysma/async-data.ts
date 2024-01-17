import { describe } from 'vitest';
import { delayFunction, onDelayFunctionSuccess } from '../delay-function';
import { useExecutionComposable } from '../../src/composables/use-execution-composable';
import { specUseExecutionReference } from './spec/use-execution-reference-spec'
import { useExecutionReference, usePipelineReference } from '../../src';

const pipeline = usePipelineReference(useExecutionReference, delayFunction, {
    onSuccess: onDelayFunctionSuccess,
});
const dataFn = pipeline.execute();

describe('composable use-execution-reference', () => specUseExecutionReference(dataFn));