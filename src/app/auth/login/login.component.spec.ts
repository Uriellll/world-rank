import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let snackBar: MatSnackBar;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    snackBar = TestBed.inject(MatSnackBar);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have user and password fields in the form', () => {
    const loginForm: FormGroup = component.loginForm;
    expect(loginForm.contains('user')).toBeTruthy(); // Verifica que el campo user exista en el formulario
    expect(loginForm.contains('password')).toBeTruthy(); // Verifica que el campo password exista en el formulario
  });
  it('should open a snackbar with the provided text', () => {
    const text = 'Test message';
    const openFromComponentSpy = spyOn(snackBar, 'openFromComponent');
    component.openSnackBar(text);
    expect(openFromComponentSpy).toHaveBeenCalledWith(jasmine.any(Function), {
      duration: 5000,
      data: { text: text },
    });
  });
  it('should return the user control from the form', () => {
    const expectedControl = component.loginForm.get('user');
    const actualControl = component.userControl;
    expect(actualControl).toBe(expectedControl); // Verifica que el control devuelto sea el esperado
  });
  it('should return the password control from the form', () => {
    const expectedControl = component.loginForm.get('password');
    const actualControl = component.passwordControl;
    expect(actualControl).toBe(expectedControl); // Verifica que el control devuelto sea el esperado
  });
  it('should login successfully and navigate to dashboard', () => {
    const loginReq = { user: 'test@example.com', password: 'password' };
    const loginCall = { email: 'test@example.com', password: 'password' };
    const text = 'Bienvenido a World Ranks';
    component.loginForm.patchValue(loginReq);
    const fakeToken = 'fake-token';
    const login = spyOn(authService, 'login').and.returnValue(
      of({ token: fakeToken })
    );
    const openFromComponentSpy = spyOn(snackBar, 'openFromComponent');
    const navigateSpy = spyOn(router, 'navigate');
    component.login();
    expect(login).toHaveBeenCalledWith(loginCall);
    expect(openFromComponentSpy).toHaveBeenCalledWith(jasmine.any(Function), {
      duration: 5000,
      data: { text: text },
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });
  it('should handle login error', () => {
    const loginReq = { user: '', password: '' };
    const loginCall = { email: '', password: '' };
    const errorMessage = 'Invalid credentials';
    component.loginForm.patchValue(loginReq);
    const login = spyOn(authService, 'login').and.returnValue(
      throwError({ error: { error: errorMessage } })
    );
    const openFromComponentSpy = spyOn(snackBar, 'openFromComponent');
    component.login();
    expect(login).toHaveBeenCalledWith(loginCall);
    expect(openFromComponentSpy).toHaveBeenCalledWith(jasmine.any(Function), {
      duration: 5000,
      data: { text: errorMessage },
    });
  });
});
