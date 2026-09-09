import axios from "axios";

import { toApiError } from "../../../core/api/apiError";
import { getAccessToken } from "../../auth/services/authApi";
import type { CreateWatchRoomInput, JoinWatchRoomInput, JoinWatchRoomResult, PlaybackState, PlaybackUpdate, WatchRoom, WatchRoomCreated } from "../types/WatchRoom";

const communityClient = axios.create({
  baseURL: import.meta.env.VITE_COMMUNITY_API_URL,
  headers: { "Content-Type": "application/json" },
});

communityClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function unwrapResponse<T>(value: T | { data?: T; result?: T }): T {
  const response = value as { data?: T; result?: T };
  return response.data ?? response.result ?? value as T;
}

export const communityApi = {
  async createWatchRoom(input: CreateWatchRoomInput): Promise<WatchRoomCreated> {
    try { const response = await communityClient.post<WatchRoomCreated>("/api/v1/watch-rooms", input); return unwrapResponse(response.data); }
    catch (error) { throw toApiError(error, "Community Service"); }
  },
  async getWatchRoom(code: string): Promise<WatchRoom> {
    try { const response = await communityClient.get<WatchRoom>(`/api/v1/watch-rooms/${encodeURIComponent(code)}`); return unwrapResponse(response.data); }
    catch (error) { throw toApiError(error, "Community Service"); }
  },
  async joinWatchRoom(code: string, input: JoinWatchRoomInput): Promise<JoinWatchRoomResult> {
    try { const response = await communityClient.post<JoinWatchRoomResult>(`/api/v1/watch-rooms/${encodeURIComponent(code)}/join`, input); return unwrapResponse(response.data); }
    catch (error) { throw toApiError(error, "Community Service"); }
  },
  async removeParticipant(code: string, userId: number): Promise<void> {
    try { await communityClient.delete(`/api/v1/watch-rooms/${encodeURIComponent(code)}/participants/${userId}`); }
    catch (error) { throw toApiError(error, "Community Service"); }
  },
  async updatePlayback(roomId: string, input: PlaybackUpdate): Promise<PlaybackState> {
    try { const response = await communityClient.patch<PlaybackState>(`/api/v1/watch-rooms/${encodeURIComponent(roomId)}/playback`, input); return unwrapResponse(response.data); }
    catch (error) { throw toApiError(error, "Community Service"); }
  },
};
