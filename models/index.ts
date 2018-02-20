export interface HeroPreview {
  id: number;
  name: string;
  thumbnail: string;
}

export interface HeroDetails extends HeroPreview {
  description: string;
  comics: string[];
}
