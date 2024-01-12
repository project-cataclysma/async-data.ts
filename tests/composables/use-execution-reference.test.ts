import { describe } from 'vitest';
import { specUseExecutionReference } from './spec/use-execution-reference-spec';
import { useExecutionReference } from '../../src/composables';
import { delayFunction, onDelayFunctionSuccess } from '../delay-function';

const dataFn = () => useExecutionReference(delayFunction, {
    onSuccess: onDelayFunctionSuccess,
});

describe('composable use-execution-reference', () => specUseExecutionReference(dataFn));