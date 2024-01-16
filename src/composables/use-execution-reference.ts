import { Method } from "../types/method";
import { Ref, computed, ref } from 'vue'
import { ExecutionConfig } from "../types/configs";
import { MethodStage } from "../types/method-stage";
import { ExecuitonReference } from "../types/references/execution-reference";

export function useExecutionReference<TResponse, TArgs extends any[]>(
    method: Method<TResponse, TArgs>,
    configuration?: ExecutionConfig<TResponse, TArgs>
): ExecuitonReference<TResponse, TArgs> {
    configuration ??= {}
    const executing = ref(false);
    const executed = ref(false);
    const lastExecuted = ref<Date|null>(null);
    const response = ref<TResponse|null>(null) as Ref<TResponse|null>;

    async function execute(...args: TArgs) {
        if (configuration.beforeExecute)
            await Promise.resolve(configuration.beforeExecute(...args));

        executing.value = true;

        if (configuration.onExecute)
            await Promise.resolve(configuration.onExecute(...args));

        return Promise.resolve(method(...args))
            .then(async (resp) => {
                if(configuration.onSuccess)
                    await Promise.resolve(configuration.onSuccess(resp, ...args));
                response.value = resp;
                return resp;
            })
            .catch(async (error) =>{
                if(configuration.onError)
                    await Promise.resolve(configuration.onError(error, ...args));
                throw error;
            })
            .finally(async () => {
                if (configuration.onFinally)
                    await Promise.resolve(configuration.onFinally(...args));

                executing.value = false;
                executed.value = true;
                lastExecuted.value = new Date();

                if (configuration.afterExecute)
                    await Promise.resolve(configuration.afterExecute(...args));
            });
    }

    const stage = computed(() => {
        if(executing.value) {
            if(executed.value) {
                return MethodStage.Reexecuting;
            } else {
                return MethodStage.Executing;
            }
        } else {
            if (executed.value) {
                return MethodStage.Remote;
            } else {
                return MethodStage.Local;
            }
        }
    });
    
    return {
        lastExecuted: computed(() => lastExecuted.value),
        execute,
        executing: computed(() => executing.value),
        executed: computed(() => executed.value),
        response: computed(() => response.value),
        stage,
    }
}