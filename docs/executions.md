# Executions

This library is designed to track a `method` to `execute`, and it's latest execution.

The `method` has a set of inputs, producing a single output.

These `input` parameters may be injected during the API's definition, or via the composable. (To handle as a composable, the `compose` method should be called on the `ExecutionBuilder`)

An `ExecutionBuilder` handles the injection of inputs, as well as modifications of the return type. Once the method signature is modified as desired, the `reference` method may be called, moving the pipeline into the `reference` phase.

# With Clauses

The With Clause allows for parameter injection. The method provides the current version of the method, and expects a new signature to be provided as a result.

```ts
pipeline.with(execution => (
    (userId) => execution('users', userId)
))
```

# Composable Clause and ComposableAll Clause

The Composable Clause allows for an execution to become a composable. This is particularly useful for defining an API that can be easily distributed within an application. This clause is similar to a with clause, expecting the composable and execution parameters to be provided. Further note, that from here on out a `ComposableBuilder` will be used. Composable Builders are similar to ExecutionBuilders, but do not have a composable clause.

The ComposableAll Clause will execute the Compoable Clause, indicating that all parameters should move to the composable, and that the execution should be parameterless.

```ts
const composable = pipeline.composable<[type: string], [id: number]>(execution => (
    (type, id) => execution(type, id)
)).build();

// In the view

const reference = composable('users');
reference.execute(3);
```

# Reference and Build Clauses

The Reference Clause moves the pipeline into the `reference` phase, creating a `ReferenceBuilder` instance.
The Build Clause calls a reference clause, then builds the resulting `ReferenceBuilder` to create a reference.