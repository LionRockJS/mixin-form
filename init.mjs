import { Central } from '@lionrockjs/central';
import config from './config/form.mjs';

await Central.initConfig(new Map([
  ['form', config],
]));
