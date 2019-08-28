import { Component, OnInit } from '@angular/core';
import { Recipe } from '../_recipes-service/recipes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../_recipes-service/recipes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesSvc: RecipesService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('recipeId')) { return; }
        this.loadedRecipe = this.recipesSvc.getRecipe(paramMap.get('recipeId'));
      }
    )
  }

  deleteRecipe() {
    this.recipesSvc.deleteRecipe(this.loadedRecipe.id);
    this.router.navigate(['/recipes']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Delete Recipe',
      subHeader: '',
      message: 'Are You Sure  Want To Delete This Recipe?',
      buttons: [
        {
          text: 'YES',
          handler: () => this.deleteRecipe()
        },
        {
          text: 'CANCEL',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

}
