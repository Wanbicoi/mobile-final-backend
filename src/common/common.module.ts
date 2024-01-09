import { Module } from '@nestjs/common';

import * as Providers from './providers';
import * as Modules from './modules';

const services = Object.values(Providers);
const modules = Object.values(Modules);

@Module({
  imports: modules,
  providers: services,
  exports: services,
})
export class CommonModule {}
