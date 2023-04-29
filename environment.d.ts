declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      DEFAULT_PREFIX: string;
      CLIENT_ID: string;
      DEV_GUILD_ID: string;
      OWNER_ID: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
