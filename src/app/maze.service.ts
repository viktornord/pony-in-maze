import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MazeService {
  constructor(private http: HttpClient) {}

  createMaze(mazeSettings: maze.IMazeSettings): Observable<maze.IMaze> {

    return this.http.post<maze.IMaze>('/maze', mazeSettings);
  }

  getMaze(id: string): Observable<maze.IMaze> {

    return this.http.get<maze.IMaze>(`/maze/${id}`);
  }
}
