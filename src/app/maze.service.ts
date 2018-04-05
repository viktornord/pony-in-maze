import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MazeService {
  constructor(private http: HttpClient) {}

  createMaze(mazeSettings: maze.IMazeSettings): Observable<{maze_id: string}> {

    return this.http.post<{maze_id: string}>('/maze', mazeSettings);
  }

  getMaze(id: string): Observable<maze.IMaze> {

    return this.http.get<maze.IMaze>(`/maze/${id}`);
  }

  makeMovement(id: string, direction: string): Observable<maze.IGameState> {

    return this.http.post<maze.IGameState>(`/maze/${id}`, {direction});
  }

  getMazeScheme(id: string): Observable<string> {

    return this.http.get<string>(`/maze/${id}/print`, {responseType: 'text'} as {});
  }
}
