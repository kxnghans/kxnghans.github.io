import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock scrollIntoView as it's not implemented in JSDOM
Element.prototype.scrollIntoView = vi.fn();

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock SpeechRecognition
const MockSpeechRecognition = vi.fn().mockImplementation(function () {
  return {
    start: vi.fn(),
    stop: vi.fn(),
    onstart: null,
    onresult: null,
    onerror: null,
    onend: null,
    continuous: false,
    interimResults: false,
    lang: "en-US",
  };
});

Object.defineProperty(window, "SpeechRecognition", {
  value: MockSpeechRecognition,
  writable: true,
  configurable: true,
});
Object.defineProperty(window, "webkitSpeechRecognition", {
  value: MockSpeechRecognition,
  writable: true,
  configurable: true,
});

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(function () {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});
