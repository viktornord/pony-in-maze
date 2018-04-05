import {Component, OnInit} from '@angular/core';
import IMazeSettings = maze.IMazeSettings;
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MazeService} from '../maze.service';
import {SolutionService} from '../solution.service';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map'

@Component({
  selector: 'maze-maze-setup',
  templateUrl: './maze-setup.component.html',
  styleUrls: ['./maze-setup.component.scss']
})
export class MazeSetupComponent implements OnInit {
  mazeSettings: IMazeSettings = {} as IMazeSettings;
  form: FormGroup;

  constructor(private mazeService: MazeService,
              private solutionService: SolutionService,
              private toasterService: ToasterService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'maze-width': new FormControl(15, [Validators.min(15), Validators.max(25)]),
      'maze-height': new FormControl(15, [Validators.min(15), Validators.max(25)]),
      'maze-player-name': new FormControl('', Validators.required),
      difficulty: new FormControl(10, [Validators.min(0), Validators.max(10)]),
    });
  }

  submit() {
    this.mazeService.createMaze(this.form.getRawValue())
      .switchMap(({maze_id}) => this.mazeService.getMaze(maze_id))
      .map(maze => this.solutionService.init(maze))
      .subscribe(
        () => this.router.navigate(['/maze']),
        error => this.toasterService.pop('error', 'Failed to create a maze', error.error)
      );
  }

}


