import { describe, expect, it } from "vitest";
import { usePipe } from '../../../src/pipe/use-pipe'
import { statusReferenceTransformer } from "../../../src/references/status-reference-transformer";
import { computed } from "vue";

describe('piped execution', () => {
    async function asyncMethod(a: number, b: number, c: string) {
        return Promise.resolve(a > b ? c : 'other');
    }

    const pipeline = usePipe(asyncMethod).reference();

    it('allows reference creation', async () => {
        const reference = pipeline.build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute(5, 2, '3');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('3')
        // expect(reference.executed.value).toBeTruthy();
    })

    it('allows reference encapsulation', async () => {
        const reference = pipeline.then((r) => {
            return {
                ...r,
                result: computed(() => r.output.value)
            };
        }
        ).build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute(10, 4, '19');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.result.value).toBe('19')
        // expect(reference.executed.value).toBeTruthy();
    })
})