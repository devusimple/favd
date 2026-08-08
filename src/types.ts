export interface FormatsResponse {
  success: boolean;
  data: FormatsResponseData;
}

export interface FormatsResponseData {
  title: string;
  description: string;
  duration: number;
  duration_formatted: string;
  uploader: string;
  thumbnail: string;
  view_count: number;
  like_count: number;
  extractor: string;
  video_formats: VideoFormat[];
  audio_formats: AudioFormat[];
}

export interface VideoFormat {
  format_id: string;
  ext: string;
  filesize: number | null;
  filesize_mb: number | null;
  url: string;
  type: string;
  resolution: string;
  height: number;
  width: number;
  fps: number | null;
  vcodec: string;
  acodec: string;
  has_video: boolean;
  has_audio: boolean;
}

export interface AudioFormat {
  format_id: string;
  ext: string;
  filesize: number | null;
  filesize_mb: number | null;
  url: string;
  type: string;
  abr: number | null;
  acodec: string;
}

export type MediaFormat = VideoFormat | AudioFormat;
