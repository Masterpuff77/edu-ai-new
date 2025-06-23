// Tavus SDK type definitions based on official documentation
declare global {
  interface Window {
    TavusSDK: {
      init: (config: TavusInitConfig) => Promise<void>;
      createConversation: (config: TavusConversationConfig) => Promise<TavusConversation>;
    };
  }
}

interface TavusInitConfig {
  apiKey: string;
}

interface TavusConversationConfig {
  personaId: string;
  replicaId: string;
  videoElement: HTMLVideoElement | null;
  onConversationStarted?: () => void;
  onConversationEnded?: () => void;
  onError?: (error: any) => void;
}

interface TavusConversation {
  connect(): Promise<void>;
  disconnect(): void;
  mute(): void;
  unmute(): void;
  pauseVideo(): void;
  resumeVideo(): void;
}

export {};