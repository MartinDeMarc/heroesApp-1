import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap,  } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
  superhero: new FormControl<string>('', {nonNullable: true}),
  publisher: new FormControl<Publisher>(Publisher.DCComics),
  alter_ego: new FormControl(''),
  first_appearance: new FormControl(''),
  characters: new FormControl(''),
  alt_img: new FormControl(''),

  })  // adentro definimos todas las propiedas que queremos que nuestro formulario maneje


  public publishers = [
   {  id: "Dc Comics", desc: "DC - Comics"},
    {id: "Marvel Comics", desc: "Marvel - Comics"},
  ];

  constructor( private herosService: HeroesService,
               private activadedRoute: ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar,
               private dialog: MatDialog, ) {}

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activadedRoute.params
    .pipe(switchMap( ({id}) => this.herosService.getHeroById(id)), ).subscribe(hero => { if (!hero) return this.router.navigateByUrl('/');
     this.heroForm.reset(hero) ;
     return;
    });


  }


  onSubmit():void{
    if (this.heroForm.invalid) return;

    if(this.currentHero.id) {
      this.herosService.updateHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackbar(`${hero.superhero} updated!`);
      })
      return;
    }

    this.herosService.addHero(this.currentHero)
    .subscribe( hero => {
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${hero.superhero} created!`);
    });

  }

   onDeleteHero(){
    if (this.currentHero.id) throw Error ('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.herosService.deleteHeroById(this.currentHero.id)
      .subscribe( wasDelected => {
        if(wasDelected) {
          this.router.navigate(['/heroes'])

        }
      })
    })

   }



  showSnackbar(message:string):void {
    this.snackbar.open(message, 'done', {duration: 2500,})
  }

}
