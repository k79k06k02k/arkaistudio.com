import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

type MediaVariant = {
  src: string;
  width: number;
  height: number;
  bytes: number;
};

type StaticMediaAsset = {
  src: string;
  width: number;
  height: number;
  bytes: number;
  thumbnail: {
    webp: string;
    avif: string;
    width: number;
    height: number;
  };
  formats: {
    webp: MediaVariant[];
    avif: MediaVariant[];
  };
};

type AnimatedMediaAsset = {
  src: string;
  width: number;
  height: number;
  bytes: number;
  thumbnail: {
    webp: string;
    avif: string;
    width: number;
    height: number;
  };
  animated: {
    webp: string;
    width: number;
    height: number;
    bytes: number;
  };
};

export type MediaAsset = StaticMediaAsset | AnimatedMediaAsset;

const manifestPath = join(process.cwd(), "src/data/media-manifest.json");
const manifest = existsSync(manifestPath)
  ? (JSON.parse(readFileSync(manifestPath, "utf8")) as { assets?: Record<string, MediaAsset> })
  : { assets: {} };
const assets = manifest.assets ?? {};

export function getMediaAsset(src: string | undefined): MediaAsset | undefined {
  if (!src) return undefined;
  return assets[src];
}

export function isAnimatedMediaAsset(asset: MediaAsset | undefined): asset is AnimatedMediaAsset {
  return Boolean(asset && "animated" in asset);
}

export function getMediaThumbnailSrc(src: string | undefined, format: "avif" | "webp" = "webp") {
  const asset = getMediaAsset(src);
  return asset?.thumbnail?.[format] ?? src;
}

export function getMediaDisplaySrc(src: string) {
  const asset = getMediaAsset(src);
  if (!asset) return src;

  if (isAnimatedMediaAsset(asset)) {
    return asset.animated.webp;
  }

  return asset.formats.webp.at(-1)?.src ?? src;
}

export function getMediaSrcSet(src: string, format: "avif" | "webp") {
  const asset = getMediaAsset(src);
  if (!asset || isAnimatedMediaAsset(asset)) return undefined;

  return asset.formats[format]
    .map((variant) => `${variant.src} ${variant.width}w`)
    .join(", ");
}
