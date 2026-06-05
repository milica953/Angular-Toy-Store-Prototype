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
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  search = ''
  ageGroup = ''
  targetGroup: '' | 'girl' | 'boy' | 'all' = '';
  priceFrom = null as number | null
  priceTo = null as number | null

  toys = signal<ToyModel[]>([])
  filteredToys = signal<ToyModel[]>([])
  types = signal<ToyModel[]>([])
  ageGroups = signal<ToyModel[]>([])
  constructor(public utils: Utils) {}

  ngOnInit() {
    this.loadToys()
  }

  async loadToys() {
    const rsp = await ToyService.getToys()
    const data = rsp.data
    this.toys.set(data)
    this.filteredToys.set(data) 
  }

  loadAgeGroups(){
    // za uraditi
  }

  filter() {
    const filtered = this.toys()
      .filter(t => {
        if (this.search == '') return true
        const q = this.search.toLowerCase()
        return (
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
        )
        
      })


     

    this.filteredToys.set(filtered)
  }
}
  