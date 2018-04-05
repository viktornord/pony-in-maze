import { Component, OnInit } from '@angular/core';
import {SolutionService} from '../solution.service';

@Component({
  selector: 'maze-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {

  constructor(private solutionService: SolutionService) { }

  ngOnInit() {
  }

}
