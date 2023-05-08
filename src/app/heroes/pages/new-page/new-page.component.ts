import { Component } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {

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



  onSubmit(){
    console.log({
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value,
  });

  }

}
