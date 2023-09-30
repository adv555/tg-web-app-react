import { Telegram } from '@twa-dev/types';

export {};

declare global {
  interface Window {
    Telegram: Telegram;
  }
}
