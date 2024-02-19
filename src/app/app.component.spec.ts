import { ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
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
    return 10;
  }
}


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;


  beforeEach(()=> {
    TestBed.configureTestingModule({
      declarations: [
        AccountingComponent
      ],
      //mocks
      providers:[
        {
          provide:AccountingService,
          useClass: AccountingServiceMock
        //   useFactory:()=>{
        //   return {
          //     getFullAmount: ()=>10
          //   }
          // }
          // useValue:{
            //   provide: AccountingService,
            //   useValue:{
              // getFullAmount: ()=>10
                //   }
                // }
              },
            ],
            imports:[AppModule]
            });
            fixture = TestBed.createComponent(AppComponent)
            app = fixture.componentInstance;
          });

  let checkerService: CheckerService;
  let accountingService: AccountingService;
  //pour les services
  beforeEach(()=>{
    checkerService = TestBed.inject(CheckerService);
    accountingService = TestBed.inject(AccountingService);
  })

  //pour créer son propre matcher
  beforeEach(()=>{
    jasmine.addMatchers({
      toBeCorrect: ()=> {
        return{
          compare: (actual: number)=>{
            let response: {pass:boolean, message:string} = {} as any;
            response.pass = (actual < 5 && actual > 2);
            response.message = "Non!! Devrait être entre 2 et 5";
            return response;
          }
        }
      }
    });
  });

  //tests de base
  describe('Tests de base',()=>{
    it('should test that Appcomponent has been created', ()=>{
      expect(app).toBeTruthy();
    })

    it('name() should be a string ',()=>{
      expect(app.name).toBeInstanceOf(String);
      expect(app.name).not.toBeInstanceOf(Number);
      expect(app.name).toBe('Zoé');
    });
  })


//matchers de Jasmine
  it("va vérifier si mon matcher marche", ()=>{
    expect(3).toBeCorrect();
  });

// l'appel de fonction
  describe('changeAge()', ()=>{
    it('should change age correctly', ()=>{
      expect(app.age).toBe(1);
      app.changeAge();
      expect(app.age).toBe(12);
    });
    it("should not return any value", ()=>{
      expect(app.changeAge()).not.toBeDefined();
    })
  });

 //les services:

 describe('multiplier',()=>{
   it('should multiply two numbers correctly', ()=>{
     let result = app.multiplier(2,4);
     expect(result).toBe(8);
    });

    it('should verify that isValidNumber was called', ()=>{
      let spyIsValidNumber: jasmine.Spy;

      spyIsValidNumber = spyOn(checkerService, 'isValidNumber').and.returnValue(true);
      //pour surveiller le comportement de la fonction isValidNumber et simuler son retour à true

      app.multiplier(2,4);
      expect(spyIsValidNumber).toHaveBeenCalledTimes(2);
      expect(spyIsValidNumber).toHaveBeenCalledWith(jasmine.any(Number));

    });
  });

  //fonction get
  it('should have called age',()=>{
    let spyAge: jasmine.Spy = spyOnProperty(checkerService, 'age', 'get');
      checkerService.age;
      expect(spyAge).toHaveBeenCalled();
  })

  //les mocks
  it('should check full amount value from accounting', ()=>{
    expect(app.getFullAmount()).toEqual(10);
  })


//composants enfant
  describe('AccountingComponent', ()=>{
    it('should check if app-accounting is present',()=>{
      let accounting = findChildComponent<AppComponent>(fixture,'app-accounting');
      expect(accounting).toBeTruthy();

    });

    //Input()
    it('input should work', () => {
      let accounting = findChildComponent(fixture,'app-accounting');
      fixture.detectChanges();
      expect(accounting.context.amount).toBe(6);

    });

    //Outputs()
    it('should verify amount change @Output()', ()=>{
      expect(app.currentAmount).toBe(0);
      let accounting = findChildComponent(fixture,'app-accounting');

      //on lui fait changer de valeur depuis notre page de test
      accounting.triggerEventHandler('amountChange',10);
      expect(app.currentAmount).toBe(10);
    })

  })

//SyOn console log
  it('should check console.log has been called',()=>{
    let spyLog = spyOn(window.console,'log');
    app.ecrisUntruc();
    expect(spyLog).toHaveBeenCalled();
  })


  xit('should test an HttpRequest',()=>{
    checkerService.getCheckerData();

  })
});

