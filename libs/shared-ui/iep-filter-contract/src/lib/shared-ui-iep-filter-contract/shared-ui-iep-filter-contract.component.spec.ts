import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiIepFilterContractComponent } from './shared-ui-iep-filter-contract.component';

describe('SharedUiIepFilterContractComponent', () => {
  let component: SharedUiIepFilterContractComponent;
  let fixture: ComponentFixture<SharedUiIepFilterContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiIepFilterContractComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiIepFilterContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
