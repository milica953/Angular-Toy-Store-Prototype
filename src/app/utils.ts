import { Injectable } from "@angular/core"
import { OrderModel } from "../models/oreder.model"
import { ToyModel } from "../models/toy.model"

const BASE_URL = 'https://toy.pequla.com';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

getImageUrl(toy: ToyModel) {
  return `${BASE_URL}${toy.imageUrl}`;
}

  calculateTotal(order: OrderModel) {
    // nije implementirano.
  }
}