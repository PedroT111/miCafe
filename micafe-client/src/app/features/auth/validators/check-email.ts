import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map,} from "rxjs/operators";
import { AuthService } from "src/app/core/services/auth.service";

export class EmailValidator {
  static checkEmail(service: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.isEmailRegistered(control.value).pipe(
        map((res: { exists: boolean }) => {
          return res.exists ? { emailExisting: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }
}