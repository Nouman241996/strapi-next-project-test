import type { Block } from "@/types";

import { HeroSection } from "@/components/blocks/hero-section";
import { InfoBlock } from "@/components/blocks/info-block";
import { FeaturedArticle } from "@/components/blocks/featuredArticle";
import { Subscribe } from "@/components/blocks/subscribe";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={index} />;
    case "blocks.info-block":
      return <div key={index}></div>;
    case "blocks.featured-article":
      return <FeaturedArticle {...block} key={index}/>;
    case "blocks.subscribe":
      return <Subscribe {...block}  key={index}/>;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}