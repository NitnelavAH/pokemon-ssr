import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PokemonsService } from '../../pokemons/services/pokemons.service';

import { toSignal } from '@angular/core/rxjs-interop';
import { delay, map, tap } from 'rxjs';


@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [
    CommonModule,
    PokemonListComponent,
    PokemonListSkeletonComponent,
    RouterLink
  ],
  templateUrl: './pokemons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent  {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChanges = effect(() => {
    console.log('pagina cambio', this.currentPage());
    this.loadPokemons(this.currentPage());
  }, {allowSignalWrites: true});


/*   ngOnInit(): void {
    // this.route.queryParamMap.subscribe(console.log);
    console.log(this.currentPage());

    this.loadPokemons();
    // title
    // Meta-tags
    // Stable
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  } */

  public loadPokemons(page = 0) {
    /* const pageToLoad = this.currentPage()! + page; */

    // console.log({ pageToLoad, currentPage: this.currentPage() });

    this.pokemonsService
      .loadPage(page)
      .pipe(
       /*  tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ), */
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${page}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }


}
