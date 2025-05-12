import { AbstractControl, ValidationErrors } from "@angular/forms";



export class NoSpaceBarValidator{
    static noSpaceBar(control: AbstractControl): ValidationErrors | null{
        let userNameVal: string = control.value;
        if(!userNameVal){
            return null
        }
        if(userNameVal.includes(' ')){
            return {
                noSpaceBar: `Space is not allowed.`
            }
        }else{
            return null
        }
    }
}