# async-data.ts
A library for tracking asynchronous information in an application. This is still in development.


## Rationale
This library isn't intended to manage the implementation of communication between the server and client, rather, it is intended to store metadata on the client about such communications.

This is to improve the developer experience of converting asynchronous method calls to state machines which can be rendered on a web component.

While this project is currently based on Vue, the end goal is to have a framework agnostic solution.


## Development
This library is currently in development, and is still unstable. It is likely that the naming convention used for methods and types will be changing in the near future.

# Installation

No Published packages (yet).

# Getting Started

Let's consider the following method for all getting started steps.
```typescript
type Response<T> = {
    data?: T,
    error?: Error,
}
type User = {
    id: string;
    email: string;
    imageUrl: string;
}
async function downloadUser(id: string): Promise<Response<User>> {
    return Promise.resolve({
        data: {
            id,
            email: 'email@example.com',
            imageUrl: 'url-to-profile-picture',
        }
    });
}
```
The End goal is to have an API that allows the developer to do the following:
```diff
-const user = await downloadUser(userId).then(response => response.data);
+const { result: user } = useDataApi().downloadUser(userId);
```

This would simplify the upating of a large codebase to a simple RegEx replacement.
```regex
^const (\W) = downloadUser\((.*)\)$
const { result: $1 } = useDataApi().downloadUser($2)
```

## Base Methods
### Use Method (Track Response and Execution)
This is the original method for this library. The idea is just to wrap the execution with some metadata. It can be used as such:
```ts
// Let's create a reference to the execution information.
const userDownload = useMethod(downloadUser);
// Let's define userData as the respone from the execution.
const { response: userData } = userDownload;
userDownload.execute('123');
```
Now, for the fun part, `userDownload` has some extra information that the UI can use for properly rendering a user. The `userDownload` datastructure is as follows:
```ts
type MethodReference<TResponse, TArgs extends any[]> = {
    /**
     * The time the last execution completed at
     */
    lastExecuted: ComputedRef<Date>;
    /** 
     * A method to trigger the execution
     */
    execute: Method<TResponse, TArgs>;
    /** 
     * Is the method currently executing?
     */
    executing: ComputedRef<boolean>;
    /** 
     * Has this method already completed an execution?
     */
    executed: ComputedRef<boolean>;
    /**
     * The result from the completed execution. Null if not yet executed
     */
    response: ComputedRef<TResponse|null>;
    /**
     * Combines the execution and executed variables into an enum.
     */
    stage: ComputedRef<MethodStage>;
}
```
### Use Method Status
Our method `downloadUser` returns a response object containing a user. The response object in this example could also contain an error. Use Method Status is designed to help seperate results from errors and status information. It is used as follows:
```ts
const userDownload = useMethodStatus(downloadUser, useMethod, {
    /** 
     * NOTE, this parameter is optional for the method to compile.
     * However, the result cannot be determined without it.
     * (Without getResult, The result will remain null)
     */
    getResult: (response) => response.data
});
const { result: user } = userDownload;
userDownload.execute('123');
```
This will expose some additional information that can be consumed by the UI. Below is the data type for `userDownload`
```ts
export type MethodReferenceStatus<TResult, TReference extends MethodReference<TResponse, TArgs>, TResponse, TArgs extends any[], TError extends Error = Error> = TReference & {
    /**
     * Contains an Error if an Error has occurred.
     * Null otherwise.
     */
    error: Ref<TError | null>;
    /**
     * Contains the result, if successful.
     * Null otherwise.
     */
    result: Ref<TResult | null>;
    /**
     * Contains status information about the execution.
     */
    status: Ref<ExecutionStatus | null>;
}
```
NOTE: This type extends the Reference type, this is in preperation for the pipeline classes, which will be defined later.
