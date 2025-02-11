import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";

describe('App Routes', () => {

  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  })

  it('should navigate to "about" reditects to "/about"', async () => {
    await router.navigate(['/about']);
    console.log(location.path());
    expect(location.path()).toBe('/about');
  });

  it('should navigate to "pokemons/page/1" reditects to "/pokemons/page/1"', async () => {
    await router.navigate(['/pokemons/page/1']);
    console.log(location.path());
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should navigate to "unknown page" reditects to "/about"', async () => {
    await router.navigate(['/hola-mundo']);
    console.log(location.path());
    expect(location.path()).toBe('/about');
  });

  it('shoult load the proper component', async () => { 
    const aboutRoute = routes.find(route => route.path === 'about')!;
    expect(aboutRoute.loadComponent).toBeDefined();

    const aboutComponent = await aboutRoute.loadComponent!() as any;

    expect(aboutComponent.default.name).toBe('AboutPageComponent');

    const pokemonRoute = routes.find(route => route.path === 'pokemons/page/:page')!;
    expect(pokemonRoute.loadComponent).toBeDefined();

    const pokemonComponent = await pokemonRoute.loadComponent!() as any;

    expect(pokemonComponent.default.name).toBe('PokemonsComponent');
   })

   
});
