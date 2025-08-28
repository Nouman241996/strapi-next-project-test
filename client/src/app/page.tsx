import { HeroSection } from "@/components/blocks/hero-section";
import { getHomePage } from "@/data/loader";
import { notFound } from "next/navigation";
import { InfoBlock } from "@/components/blocks/info-block";
import { BlockRenderer } from "@/components/blogRenderer";
import "../sass/main.scss";

async function Loader() {
  const data = await getHomePage();
  if (!data) {
    notFound();
  }
  console.log(data);
  return {...data.data};
}

export default async function HomeRoute() {
  const data = await Loader();
  const blocks = data?.blocks || [];
  console.log(data);
  return <BlockRenderer blocks={blocks} />;
}
