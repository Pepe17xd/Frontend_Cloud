export type WatchRoomStatus = "WAITING" | "PLAYING" | "PAUSED" | "FINISHED";
export type ParticipantRole = "HOST" | "VIEWER";
export type PlaybackStatus = "PLAYING" | "PAUSED";

export interface Participant {
  userId: number;
  nickname: string;
  role: ParticipantRole;
}

export interface PlaybackState {
  id: string;
  watchRoomId: string;
  positionSeconds: number;
  state: PlaybackStatus;
  updated_at: string;
}

export interface WatchRoom {
  id: string;
  code: string;
  movieId: string;
  status: WatchRoomStatus;
  participants: Participant[];
}

export interface WatchRoomCreated {
  id: string;
  code: string;
  movieId: string;
  status: WatchRoomStatus;
}

export interface CreateWatchRoomInput { movieId: string; clubId: number | null; hostUserId: string; }
export interface JoinWatchRoomInput { userId: number; nickname: string; }
export interface JoinWatchRoomResult { roomId: string; joined: boolean; }
export interface PlaybackUpdate { state: PlaybackStatus; positionSeconds: number; }
