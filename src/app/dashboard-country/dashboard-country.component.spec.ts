import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCountryComponent } from './dashboard-country.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

describe('DashboardCountryComponent', () => {
  let component: DashboardCountryComponent;
  let fixture: ComponentFixture<DashboardCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCountryComponent, HeaderComponent],
      imports: [HttpClientModule, RouterModule, MatIconModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
