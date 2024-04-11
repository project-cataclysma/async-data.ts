# Executions

This library is designed to track a `method` to `execute`, and it's latest execution.

The `method` has a set of inputs, producing a single output.

These `input` parameters may be injected during the API's definition, or via the composable. (To handle as a composable, the `compose` method should be called on the `ExecutionBuilder`)

An `ExecutionBuilder` handles the injection of inputs, as well as modifications of the return type. Once the method signature is modified as desired, the `reference` method may be called, moving the pipeline into the `reference` phase.