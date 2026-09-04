import { describe, it, expect } from "vitest";
import {
  ASSET_URLS,
  GCS_BASE_URL,
  ASSET_BASE_URL,
  getAssetUrl,
} from "./assets";

describe("assets registry", () => {
  it("defines standard GCS CDN base URL", () => {
    expect(GCS_BASE_URL).toBe(
      "https://storage.googleapis.com/portfolio_showcase/images",
    );
    expect(ASSET_BASE_URL).toBeDefined();
  });

  it("getAssetUrl properly normalizes paths with and without leading slash", () => {
    expect(getAssetUrl("projects/carohans-hub.webp")).toBe(
      `${ASSET_BASE_URL}/projects/carohans-hub.webp`,
    );
    expect(getAssetUrl("/projects/carohans-hub.webp")).toBe(
      `${ASSET_BASE_URL}/projects/carohans-hub.webp`,
    );
  });

  it("has valid non-empty URLs across all project assets", () => {
    const projects = Object.values(ASSET_URLS.PROJECTS);
    expect(projects.length).toBe(19);
    for (const url of projects) {
      expect(url).toMatch(
        /^https:\/\/storage\.googleapis\.com\/portfolio_showcase\/images\/projects\/.*\.webp$/,
      );
    }
  });

  it("has valid non-empty URLs across all skills assets", () => {
    const skills = Object.values(ASSET_URLS.SKILLS);
    expect(skills.length).toBe(8);
    for (const url of skills) {
      expect(url).toMatch(
        /^https:\/\/storage\.googleapis\.com\/portfolio_showcase\/images\/skills\/.*\.webp$/,
      );
    }
  });

  it("has valid non-empty URLs across work experience assets", () => {
    const work = Object.values(ASSET_URLS.WORK);
    expect(work.length).toBe(3);
    for (const url of work) {
      expect(url).toMatch(
        /^https:\/\/storage\.googleapis\.com\/portfolio_showcase\/images\/work\/.*\.webp$/,
      );
    }
  });

  it("has valid non-empty URLs across education assets", () => {
    const education = Object.values(ASSET_URLS.EDUCATION);
    expect(education.length).toBe(2);
    for (const url of education) {
      expect(url).toMatch(
        /^https:\/\/storage\.googleapis\.com\/portfolio_showcase\/images\/education\/.*\.webp$/,
      );
    }
  });

  it("has valid non-empty URLs across honors assets", () => {
    const honors = Object.values(ASSET_URLS.HONORS);
    expect(honors.length).toBe(4);
    for (const url of honors) {
      expect(url).toMatch(
        /^https:\/\/storage\.googleapis\.com\/portfolio_showcase\/images\/honors\/.*\.webp$/,
      );
    }
  });

  it("has valid non-empty URLs across certifications assets", () => {
    const certifications = Object.values(ASSET_URLS.CERTIFICATIONS);
    expect(certifications.length).toBe(6);
    for (const url of certifications) {
      expect(url).toMatch(
        /^https:\/\/storage\.googleapis\.com\/portfolio_showcase\/images\/(certifications|work|honors)\/.*\.webp$/,
      );
    }
  });

  it("has valid non-empty URLs across community assets", () => {
    const community = Object.values(ASSET_URLS.COMMUNITY);
    expect(community.length).toBe(5);
    for (const url of community) {
      expect(url).toMatch(
        /^https:\/\/storage\.googleapis\.com\/portfolio_showcase\/images\/community\/.*\.webp$/,
      );
    }
  });

  it("has valid profile and brand asset URLs", () => {
    expect(ASSET_URLS.PROFILE.AVATAR_WEBP).toContain("profile/Kobs%20DP.webp");
    expect(ASSET_URLS.PROFILE.AVATAR_PNG).toContain("profile/Kobs%20DP.png");
    expect(ASSET_URLS.BRAND.HANSON_TUBE_PNG).toBe(
      `${ASSET_BASE_URL}/brand/hanson-tube.png`,
    );
    expect(ASSET_URLS.BRAND.HANSON_TUBE_WEBP).toBe(
      `${ASSET_BASE_URL}/brand/hanson-tube.webp`,
    );
  });
});
