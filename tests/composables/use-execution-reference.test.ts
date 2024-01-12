import { describe } from 'vitest';
import { delayFunction, onDelayFunctionSuccess } from '../delay-function';
import { useExecutionComposable } from '../../src/types/composables/use-execution-composable';
import { specUseExecutionReference } from './spec/use-execution-reference-spec'

const dataFn = useExecutionComposable(delayFunction, {
    onSuccess: onDelayFunctionSuccess,
});

describe('composable use-execution-reference', () => specUseExecutionReference(dataFn));