export interface RssFormat {
  userName: string;
  movie: Movie[];
}

export interface Movie {
  title: string;
  link: string;
  date: string;
}
