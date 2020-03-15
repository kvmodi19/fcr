import { NgModule } from '@angular/core';

import {
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSortModule,
	MatTableModule,
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
	declarations: [],
	imports: [
		DragDropModule,
		ScrollingModule,
		MatInputModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatRadioModule,
	],
	exports: [
		DragDropModule,
		ScrollingModule,
		MatInputModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatRadioModule,
	],
})
export class MaterialModule {
}
