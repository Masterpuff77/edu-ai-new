// Tavus SDK type definitions
declare global {
  interface Window {
    Tavus: {
      Conversation: new (config: TavusConversationConfig) => TavusConversation;
    };
  }
}

interface TavusConversationConfig {
  apiKey: string;
  personaId: string;
  replicaId: string;
  videoElement: HTMLVideoElement | null;
  onConversationStarted?: () => void;
  onConversationEnded?: () => void;
  onError?: (error: any) => void;
}

interface TavusConversation {
  start(): Promise<void>;
  endConversation(): void;
  mute(): void;
  unmute(): void;
  pauseVideo(): void;
  resumeVideo(): void;
}

export {};