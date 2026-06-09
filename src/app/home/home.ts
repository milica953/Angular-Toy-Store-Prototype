import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToyModel } from '../../models/toy.model';
import { Utils } from '../utils';
import { ToyService } from '../../services/toy.service';
import { AuthService } from '../../services/auth.services';
import { Alerts } from '../alertss';



@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  
  search = ''
  selectedAgeGroup = ''
  selectedType = ''
  targetGroup: '' | 'girl' | 'boy' | 'all' = ''
  selectedProductionDate = ''
  priceFrom: number | null = null
  priceTo: number | null = null
  types = signal<{ Typeid: number; name: string; description: string }[]>([])
  toys = signal<ToyModel[]>([])
  filteredToys = signal<ToyModel[]>([])
  ageGroups = signal<{ Ageid: number; name: string; description: string }[]>([])
  public authService = AuthService
 
  constructor(public utils: Utils) {}

  ngOnInit() {
  this.loadToys()
  this.loadAgeGroups()
  this.loadTypes()
  this.information()
}

  async loadToys() {
    const rsp = await ToyService.getToys()
    const data = rsp.data
    this.toys.set(data)
    this.filteredToys.set(data) 
  }

  loadAgeGroups(){
    ToyService.getAgeGroups().then(rsp => this.ageGroups.set(rsp.data))
   } 
   
   loadTypes() {
    ToyService.getTypes().then(rsp => this.types.set(rsp.data))
}
getProductionDates() {

  const set = new Set<string>()

  this.toys()
    .map(t => t.productionDate)
    .forEach(d => set.add(d))

  return Array.from(set)
}

 filter() {

  const filtered = this.toys()

    // SEARCH
    .filter(t => {

      if (this.search == '') return true
      const q = this.search.toLowerCase()
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      )
    })

    // AGE GROUP
    .filter(t => {
      if (this.selectedAgeGroup == '') return true
      return t.ageGroup.name === this.selectedAgeGroup
    })

    // TYPE
    .filter(t => {
      if (this.selectedType == '') return true
      return t.type.name === this.selectedType
    })

    // TARGET GROUP
    .filter(t => {
      if (this.targetGroup == '') return true
      return t.targetGroup === this.targetGroup
    })

    // DATE
 .filter(t => {

  if (this.selectedProductionDate == '') return true
  return t.productionDate === this.selectedProductionDate
})
    // PRICE FROM
    .filter(t => {
      if (this.priceFrom == null) return true
      return t.price >= this.priceFrom
    })

    // PRICE TO
    .filter(t => {
      if (this.priceTo == null) return true
      return t.price <= this.priceTo
    })

  this.filteredToys.set(filtered)
  }
  
  public information(){
    if(this.authService.getActiveUser() === null)
     Alerts.information("To be able to Shop, You need to Login, Thank you.");
  }
  
}
  