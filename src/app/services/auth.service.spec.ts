import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should validate token string incorrectly', ()=>{
    const tokenTest = 'jkdjZd94';
    const validateToken = service.validateTokenString(tokenTest);
    expect(validateToken).toBeFalsy();
  })
  it('should validate token string Correctly', ()=>{
    const tokenTest = 'jM45t7omtePHmpzM';
    const validateToken = service.validateTokenString(tokenTest);
    expect(validateToken).toBeTruthy();
  })
  it('should logOut Correctly', ()=>{
    localStorage.setItem('token', 'testToken');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  })
  it('should return token on login', () =>{
    const mockLogin = { email: 'test@example.com', password: 'password' };
    const mockResponse = { token: 'test_token' };
    service.login(mockLogin).subscribe(response => {
      expect(response).toBeDefined(); // Assuming the response should be defined
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('https://reqres.in/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLogin);
    req.flush({ token: 'test_token' });
    httpMock.verify();
  })
  it('should return false with empty localStorage - isAuthenticated', ()=>{
    const checkAuth = service.isAuthenticated();
    expect(checkAuth).toBeFalsy();
  })
  it('should return true with token saved on localStorage - isAuthenticated', ()=>{
    localStorage.setItem('token', 'jM45t7omtePHmpzM')
    const checkAuth = service.isAuthenticated();
    expect(checkAuth).toBe(true);
  })
});
