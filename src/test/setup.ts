import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock scrollIntoView as it's not implemented in JSDOM
Element.prototype.scrollIntoView = vi.fn();

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock SpeechRecognition
const MockSpeechRecognition = vi.fn().mockImplementation(() => ({
  start: vi.fn(),
  stop: vi.fn(),
  onstart: null,
  onresult: null,
  onerror: null,
  onend: null,
  continuous: false,
  interimResults: false,
  lang: "en-US",
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = window as any;
win.SpeechRecognition = MockSpeechRecognition;
win.webkitSpeechRecognition = MockSpeechRecognition;

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
