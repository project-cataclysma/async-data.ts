# async-data.ts

A library for tracking asynchronous information in an application. This is still in development.

## Rationale

This library isn't intended to manage the implementation of communication between the server and client, rather, it is intended to store metadata on the client about such communications.

This is to improve the developer experience of converting asynchronous method calls to state machines which can be rendered on a web component.

While this project is currently based on Vue, the end goal is to have a framework agnostic solution.

## Development

This library is currently in development, and is still unstable. It is likely that the naming convention used for methods and types will be changing in the near future.

# Installation

```bash
npm i @project-cataclysma/execution-reference
```

# Getting Started

Let's consider the following method for all getting started steps.

```typescript
type Response<T> = {
  data?: T;
  error?: Error;
};
type User = {
  id: string;
  email: string;
  imageUrl: string;
};
async function downloadUserAsync(id: string): Promise<Response<User>> {
  return Promise.resolve({
    data: {
      id,
      email: "email@example.com",
      imageUrl: "url-to-profile-picture",
    },
  });
}
```

The End goal is to have an API that allows the developer to do the following:

```diff
-const user = await downloadUserAsync(userId).then(response => response.data);
+const { output: user } = useDataApi().downloadUser(userId);
```

This would simplify the upating of a large codebase to a simple RegEx replacement.

```regex
^const (\W) = downloadUserAsync\((.*)\)$
const { output: $1 } = useDataApi().downloadUser($2)
```

## The Pipeline

To convert a method into a composable such as the example above, create a composable such as `use-data-api.ts`:
```ts
import { downloadUserAsync } from './functions/user';
import { usePipe } from '@project-cataclysma/execution-reference';

function useDataApi() {
  return {
    downloadUser: usePipe(downloadUserAsync).composableAll().build();
  }
}
```

# Usage

The intended use of this library is by a functional syntax.
This Syntax has 2 phases: `execution` and `reference`.

NOTE: The `execution` phase may represent the method itself, or as a `composable`.

## Execution Phase

This phase of the pipeline can be started either by creating an `ExecutionBuilder` class, or by using the `usePipe` method.

The purpose for this phase is for modifying the functions signature. Specifically for parameter injection and post processing.
*NOTE: Post processing is not supported yet.*

Execution Builders can also be transformed into a `ComposableBuilder`, which allows for parameter injection during setup time.

## Reference Phase

This phase of the pipeline can be started by calling the `reference` function on an `ExecutionBuilder`. (Create a `ReferenceBuilder` Class)

The purpose of this phase is to perform any modifications to the structure of the reference, such as status messages and `watchEffect`

## Parameter Injection

This library was built with Parameter Injection as a key feature. Consider the following code:
```ts
function getUser(serverUrl, userId) {...}
function getChat(serverUrl, chatId) {...}
function getMessage(serverUrl, messageId) {...}
```
Ideally, we can create a new signature for these methods that removes the need to provide `serverUrl` on each `getUser` api call. This would be handled in this library via `with` clauses, such as the following:

```ts
const getUserApi = usePipe(getUser).with(
  (execution) => (
    (userId) => (execution(serverUrl, userId))
  )
).reference().api().async()
```

This library breaks parameter injection into 3 categories `api-time`, `composable-time` and `execution-time`

- **API Time Parameter Injection**:
This is done via `with` clauses, which take a value and apply it during the API's definition. Th
- **Composable Time Parameter Injection**:
This is done via a `composable` clause, which takes type parameters to determine the new composable and execution signatures.
- **Execution Time Parameter Injection**: This isn't really parameter injection, rather, it is the requirement that all other parameters MUST be provided during the execution of the referenced method.

## Reference Transformations
There are 4 planned reference transformations:
1. Status Information Transform, to handle pass/fail/error data from method execution.
2. Watched Transform, to automatically execute the method during composition time
<br />**NOTE:** This requires all parameters to be provided during `api-time` and `composable-time`. The execute method **MUST** be parameterless.
3. Cach Transform, to handle support for cached results to prevent repeating server-client communication.
4. Form Transforms, to handle transforming one or more parameters into references.
