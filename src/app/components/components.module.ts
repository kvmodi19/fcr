import { NgModule } from '@angular/core';

import { LogoComponent } from 'src/app/components/logo/logo.component';

const components = [ LogoComponent ];

@NgModule({
	declarations: components,
	exports: components
})
export class ComponentsModule {
}
