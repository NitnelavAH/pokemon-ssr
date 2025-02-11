import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon = {
  id: 'asasa',
  name: 'Pikachu'
}
describe('PokemonCardComponent', () => {

    let fixture: ComponentFixture<PokemonCardComponent>;
    let compiled: HTMLElement;
    let component: PokemonCardComponent;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonCardComponent],
            providers: [provideRouter([])]
        }).compileComponents();
        fixture = TestBed.createComponent(PokemonCardComponent);
        fixture.componentRef.setInput('pokemon', mockPokemon);

        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the app', () => {
      console.log(compiled)
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should have the SimplePokemon signal inputValue', () => {
      expect(component.pokemon()).toEqual(mockPokemon);
    });

    it('should render the pokemon name and image correctly', () => {

      const image = component.pokemonImage();
      const imgElement = compiled.querySelector('img');
      expect(imgElement?.src).toEqual(image);
      const nameElement = compiled.querySelector('h2');
      expect(nameElement?.innerText).toEqual(mockPokemon.name);
      console.log(compiled)
    });

    it('should have the proper ng-reflect-router-link', () => {
      const div = compiled.querySelector('div');
      console.log(div)
      expect(div?.hasAttribute('ng-reflect-router-link')).toBeTruthy();
      expect(div?.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(`/pokemons,${mockPokemon.name}`);
    })
});