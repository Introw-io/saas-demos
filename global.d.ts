export {};

export type IntrowConversionStatus = "recorded" | "duplicate" | "ignored";

export type IntrowTrackPayload = {
  publishableKey?: string;
  email?: string;
  properties?: Record<string, unknown>;
};

declare global {
  interface Window {
    introw?: {
      affiliate?: {
        track: (
          payload: IntrowTrackPayload
        ) => Promise<{ status?: IntrowConversionStatus }>;
        getClickId: () => string | null;
      };
    };
  }
}
