import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const manifestPath = fileURLToPath(new URL("../data/media-manifest.json", import.meta.url));
const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : { assets: {} };
const assets = manifest.assets ?? {};

function srcSet(variants) {
  return variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");
}

function visit(node, callback, parent = undefined, index = undefined) {
  callback(node, parent, index);

  if (!Array.isArray(node.children)) {
    return;
  }

  node.children.forEach((child, childIndex) => visit(child, callback, node, childIndex));
}

function loadingProps(properties) {
  return {
    loading: properties.loading ?? "lazy",
    decoding: properties.decoding ?? "async",
  };
}

function optimizedImgNode(node, asset, src) {
  return {
    ...node,
    properties: {
      ...node.properties,
      ...loadingProps(node.properties ?? {}),
      src,
      width: node.properties?.width ?? asset.width,
      height: node.properties?.height ?? asset.height,
    },
  };
}

export default function rehypeMediaVariants() {
  return (tree) => {
    visit(tree, (node, parent, index) => {
      if (!parent || index === undefined || node.type !== "element" || node.tagName !== "img") {
        return;
      }

      const source = node.properties?.src;
      if (typeof source !== "string") {
        return;
      }

      const asset = assets[source];
      if (!asset) {
        return;
      }

      if (asset.animated) {
        parent.children[index] = optimizedImgNode(node, asset, asset.animated.webp);
        return;
      }

      const fallback = asset.formats?.webp?.at(-1)?.src ?? source;
      parent.children[index] = {
        type: "element",
        tagName: "picture",
        properties: {
          className: ["responsive-picture"],
        },
        children: [
          {
            type: "element",
            tagName: "source",
            properties: {
              type: "image/avif",
              srcSet: srcSet(asset.formats.avif),
              sizes: "(min-width: 860px) 760px, calc(100vw - 40px)",
            },
            children: [],
          },
          {
            type: "element",
            tagName: "source",
            properties: {
              type: "image/webp",
              srcSet: srcSet(asset.formats.webp),
              sizes: "(min-width: 860px) 760px, calc(100vw - 40px)",
            },
            children: [],
          },
          optimizedImgNode(node, asset, fallback),
        ],
      };
    });
  };
}
