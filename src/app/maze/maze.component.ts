import {Component, OnInit} from '@angular/core';
import {SolutionService} from '../solution.service';
import {MazeService} from '../maze.service';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'maze-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {
  mazeScheme: string;
  mazeId: string;
  steps: string[];

  constructor(private solutionService: SolutionService,
              private mazeService: MazeService,
              private toasterService: ToasterService,
              private router: Router) {
    this.mazeId = this.solutionService.getMazeId();
    !this.mazeId && router.navigate(['/maze-setup']);
  }

  ngOnInit() {
    this.updateScheme().subscribe(() => console.log('scheme printed'));
    this.solutionService.onMazeUpdated().subscribe(() => {
      this.steps = this.solutionService.solve();
    });
  }

  nextStep() {
    const direction = this.steps.shift();
    this.mazeService.makeMovement(this.mazeId, direction)
      .switchMap(state => {
        this.solutionService.updateState(state);

        return this.updateScheme();
      })
      .subscribe(
        () => {
          console.log(`moved to ${direction}`);
          this.isFinished() && this.toasterService.pop('info', 'Game over', this.solutionService.getState()['state-result']);
        },
        error => {
          this.toasterService.pop('error', `Unable to perform movement to ${direction}`, error.error);
          this.steps.unshift(direction);
        }
      );

  }

  updateScheme() {

    return this.mazeService.getMazeScheme(this.mazeId).do(scheme => this.mazeScheme = scheme);
  }

  newGame() {
    this.router.navigate(['/maze-setup'])
  }

  isFinished() {

    return this.solutionService.isFinished();
  }
}
