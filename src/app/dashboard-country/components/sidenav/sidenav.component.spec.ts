import { SearcherComponent } from './../searcher/searcher.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortComponent } from '../sort/sort.component';
import { RegionComponent } from '../region/region.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StatusComponent } from '../status/status.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../table/table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidenavComponent,
        SortComponent,
        RegionComponent,
        StatusComponent,
        SearcherComponent,
        TableComponent,
      ],
      imports: [
        MatSidenavModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
