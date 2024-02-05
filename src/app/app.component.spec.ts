import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckerService } from './shared/services/checker/checker.service';
import { AccountingComponent } from './accounting/accounting.component';
import { AppModule } from './app.module';
import { findChildComponent } from './shared/helpers/testing-helpers';
import { AccountingService } from './shared/services/accounting/accounting.service';

declare global{
  namespace jasmine {
    interface Matchers<T>{
      toBeCorrect(): void;
    }
  }
}

//mocks
export class AccountingServiceMock{
  public getFullAmount():number{
    return 150;
  }
}


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let checkerService: CheckerService;
  let accountingService: AccountingService;

  beforeAll(()=> {

  })

  beforeEach(()=> {
    TestBed.configureTestingModule({
      declarations: [
        AccountingComponent
      ],
      //mocks
      providers:[
        {
          provide:AccountingService,
          //   useClass: AccountingServiceMock
        //   useFactory:()=>{
        //   return {
        //     getFullAmount: ()=>156,
        //     getInitialAmount:()=>12
        //   }
        // }
          useValue:{
            
          }
        },
      ],
      imports:[
        AppModule,
        ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance;
  });

  beforeEach(()=>{

    //pour créer son propre matcher
    jasmine.addMatchers({
      toBeCorrect: ()=> {
        return{
          compare: (actual: number, expected: number)=>{
            let response: {pass:boolean, message:string} = {} as any;
            response.pass = (actual < 5 && actual > 2);
            response.message = "Non non non!!";
            return response;
          }
        }
      }
    });
    //pour les services
    checkerService = TestBed.inject(CheckerService);
    accountingService = TestBed.inject(AccountingService);
  });


  it('should check initial amount value from accounting', ()=>{
    console.log(accountingService);
    expect(app.getinitialFullAmount()).toEqual(156);
  })

  it('name() should be a string ',()=>{
    expect(app.name).toBeInstanceOf(String);
    expect(app.name).not.toBeInstanceOf(Number);
    expect(app.name).toBe('Zoé');
  });


  it("va vérifier si mon matcher marche", ()=>{
    expect(3).toBeCorrect();
  });

  describe('changeAge()', ()=>{
    it('should change age correctly', ()=>{
      expect(app.age).toBe(1);
      app.changeAge();
      expect(app.age).toBe(12);
    });
    it("should be defined", ()=>
    {
      expect(app.changeAge()).not.toBeDefined();
    })
  });

//composants enfant
  it('should check if app-accounting is present',()=>{

    const accounting = findChildComponent<AppComponent>(fixture,'app-accounting');
    expect(accounting).toBeTruthy();

  });

  //Input()
  it('should add data binding correctly @Input()', () => {
    const accounting = findChildComponent(fixture,'app-accounting');
    fixture.detectChanges();
    expect(accounting.context.amount).toBe(6);

  });

  //Outputs()
  it('should verify amount change @Output()', ()=>{
    expect(app.currentAmount).toBe(0);
    const accounting = findChildComponent(fixture,'app-accounting');

    //on lui fait changer de valeur depuis notre page de test
    accounting.triggerEventHandler('amountChange',10);
    expect(app.currentAmount).toBe(10);
  })


  describe('multiplier(...)',()=>{
    it('should multiply two numbers correctly', ()=>{
      let a =2;
      const result = app.multiplier(a,4);
      expect(result).toBe(8);
    });
    it('should verify that isValidNumber was called', ()=>{
      let spyIsValidNumber: jasmine.Spy;
      const spyAge: jasmine.Spy = spyOnProperty(checkerService, 'age', 'get') ;

      let a:number = 2;
      spyIsValidNumber = spyOn(checkerService, 'isValidNumber').and.returnValue(true);

      const result = app.multiplier(a,4);
      expect(result).toBe(8);

      expect(spyIsValidNumber).toHaveBeenCalled();
      expect(spyIsValidNumber).toHaveBeenCalledTimes(2);
      expect(spyAge).toHaveBeenCalled();

      expect(spyIsValidNumber).toHaveBeenCalledWith(jasmine.any(Number));
    });
  });

});
