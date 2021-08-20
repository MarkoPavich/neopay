import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormHelperService{

  markAllInFormArrayAsDirty(formArray: FormArray): void{
    for(let i=0; i< formArray.length; i++){
      if(formArray.at(i) instanceof FormGroup){
        this.markAllAsDirty(formArray.at(i) as FormGroup);
      }
      else if(formArray.at(i) instanceof FormArray){
        this.markAllInFormArrayAsDirty(formArray.at(i) as FormArray)
      }
    }
  }

  markAllAsDirty(formGroup: FormGroup): void{
    Object.keys(formGroup.controls).forEach(key => {

      if(formGroup.controls[key] instanceof FormGroup){
        this.markAllAsDirty(formGroup.controls[key] as FormGroup);
      }

      else if(formGroup.controls[key] instanceof FormArray){
        const formArray = formGroup.controls[key] as FormArray;
        for(let i=0; i< formArray.length; i++){
          const formGroup = formArray.at(i) as FormGroup;
          Object.keys(formGroup.controls).forEach(key => {
            formGroup.controls[key].markAsDirty();
          })
        }
      }

      else{
        formGroup.controls[key].markAsDirty();
      }
    })
  }

}