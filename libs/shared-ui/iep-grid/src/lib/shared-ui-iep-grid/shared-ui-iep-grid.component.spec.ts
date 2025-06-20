import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiIepGridComponent } from './shared-ui-iep-grid.component';

describe('SharedUiIepGridComponent', () => {
  let component: SharedUiIepGridComponent;
  let fixture: ComponentFixture<SharedUiIepGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiIepGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiIepGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
