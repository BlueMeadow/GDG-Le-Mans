import { Component, OnInit } from '@angular/core';
import {Stats} from '../models/stats';
import {StatsService} from '../services/stats.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  statsService: StatsService;
  stats: Stats;

  constructor(statService: StatsService) {
    this.statsService = statService;
  }

  getStats(): void {
    this.statsService.getStats().subscribe(stats => this.stats = stats);
  }

  ngOnInit() {
    this.getStats();
  }

}
