import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarComponent } from './snack-bar.component';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarComponent],
      providers: [
        { provide: MatSnackBarRef, useValue: {} },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: { text: 'Mensaje de ejemplo' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should have dependecies injected correctly', () => {
    // Verifica que las dependencias se hayan inyectado correctamente
    expect(component.snackBarRef).toBeDefined(); // Verifica que snackBarRef esté definido
    expect(component.data).toEqual({ text: 'Mensaje de ejemplo' }); // Verifica que los datos se hayan inyectado correctamente
  });
});
