import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedServiceDataServiceComponent } from './shared-service-data-service.component';

describe('SharedServiceDataServiceComponent', () => {
  let component: SharedServiceDataServiceComponent;
  let fixture: ComponentFixture<SharedServiceDataServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedServiceDataServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedServiceDataServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
