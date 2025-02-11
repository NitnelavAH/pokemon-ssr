import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  @Component({
    selector: 'app-navbar',
    standalone: true,
    template: `<h1>Mocked Navbar</h1>`
  })
  class NavBarComponentMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).overrideComponent(AppComponent, {
      add: {
        imports: [NavBarComponentMock],
      },
      remove: {
        imports: [NavbarComponent]
      }
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
   
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet`, () => {
   
    expect(compiled.querySelector('app-navbar')).not.toBeNull();
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  }); */
});
