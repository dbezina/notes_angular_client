import { Comment } from './comment';
export interface Note{
  id?: number;
  title : string;
  memo : string;
  image? : File;
  comments? : Comment[];
  username: string;
}
