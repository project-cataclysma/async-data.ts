import { describe } from 'vitest';
import { specUseMethod } from './spec/use-method-spec';
import { useMethod } from '../../src/functions';
import { delayFunction } from '../delay-function';

const dataFn = () => useMethod(delayFunction);

describe('composable use-method', () => specUseMethod(dataFn));