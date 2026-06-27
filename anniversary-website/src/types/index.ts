export interface Milestone {
  date: string;
  title: string;
  description: string;
  photo: string;
  photoFit?: "cover" | "contain";
}

export type PhotoLayout = "portrait" | "landscape" | "square";

export interface Photo {
  src: string;
  layout: PhotoLayout;
}

export interface Song {
  title: string;
  src: string;
}

export interface AppConfig {
  secretCode: string;
  loveLetter: string;
  milestones: Milestone[];
  photos: Photo[];
  playlist: Song[];
  anniversaryDate: string;

}
