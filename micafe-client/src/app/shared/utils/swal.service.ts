import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
  })
export class SwalService{
    showConfirmation(msg: string){
        return Swal.fire({
            title: 'Are you sure?',
            text: msg,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
        })
    }
    showSuccessAlert(message: string) {
        return Swal.fire({
          title: 'Éxito',
          text: message,
          icon: 'success'
        });
      }
    
      showErrorAlert(message: string) {
        return Swal.fire({
          title: 'Error',
          text: message,
          icon: 'error'
        });
      }
}