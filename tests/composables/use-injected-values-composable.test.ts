import { describe, expect, it } from 'vitest';
import { delayFunction } from '../delay-function';
import { useExecutionReference, useValuesReference } from '../../src';


describe('injected values', () => {
    it('returns test code', async () => {
        const { execute } = useValuesReference(useExecutionReference, delayFunction, 'test code');
        const data = await execute();
        expect(data.key).toEqual('test code')
    })
})