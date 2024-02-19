import { TestBed } from '@angular/core/testing';
import { CheckerService } from './checker.service';
import { AppModule } from 'src/app/app.module';

describe('CheckerService', () => {
  let service: CheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule],
      providers:[CheckerService]
    });
    service = TestBed.inject(CheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

