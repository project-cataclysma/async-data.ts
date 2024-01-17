import { describe, expect, it } from 'vitest';
import { delayFunction } from '../delay-function';
import { useExecutionReference, useValueReference } from '../../src';
import { ref } from 'vue';


describe('injected value', () => {
    it('returns test code and updated test code', async () => {
        const form = ref('test code')
        const { execute } = useValueReference(useExecutionReference, delayFunction, form);
        const data = await execute();
        expect(data.key).toEqual('test code')
        form.value = 'updated test code';
        const data2 = await execute();
        expect(data2.key).toEqual('updated test code')
    })
})