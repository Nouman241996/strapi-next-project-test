import type { Block } from "@/types";

import { HeroSection } from "@/components/blocks/hero-section";
import { InfoBlock } from "@/components/blocks/info-block";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={index} />;
    case "blocks.info-block":
      return <div key={index}></div>;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}