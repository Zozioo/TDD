import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AppComponent } from "src/app/app.component";

export function findChildComponent<T>(fixture:ComponentFixture<T>, selector:string): DebugElement{
  return fixture.debugElement.query(By.css(selector));
}
