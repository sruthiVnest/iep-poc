import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiIepDovsbuyComponent } from './shared-ui-iep-dovsbuy.component';

describe('SharedUiIepDovsbuyComponent', () => {
  let component: SharedUiIepDovsbuyComponent;
  let fixture: ComponentFixture<SharedUiIepDovsbuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiIepDovsbuyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiIepDovsbuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
