export interface StorySection {
  id: string;
  text: string;
  subText?: string;
  image: string;
  type: 'gray' | 'transition' | 'color';
}

export interface GeminiResponseState {
  loading: boolean;
  content: string | null;
  error: string | null;
}