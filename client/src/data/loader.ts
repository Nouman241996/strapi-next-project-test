import { fetchAPI } from "@/utils/fetch-api";
import { get } from "http";
import { getStrapiURL } from "@/utils/get-strapi-urls";
import qs from "qs";

const homePageQuery = qs.stringify(
    {
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            logo: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
            cta: true,
          },
        },
        "blocks.info-block": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            cta: true,
          },
        },
      },
    },
  },
},
);

export async function getHomePage() {
  const path = "/api/home-page?populate=*";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  url.search = homePageQuery;

  return await fetchAPI(url.href, { method: "GET" });
  
}   
const pageBySlugQuery = (slug: string) => qs.stringify(
  {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              logo: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
              cta: true,
            },
          },
          "blocks.info-block": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
        },
      },
    },
  },
);



export async function getPageBySlug(slug: string) {
  const path = "/api/pages";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  url.search = pageBySlugQuery(slug);
  return await fetchAPI(url.href, { method: "GET" });
}
const globalSettingQuery = qs.stringify(
  {
    populate: {
      Header: {
        populate: {
          logo: {
            // fields directly on `logo`
            fields: ["logoText"],
            // if `logo.image` exists, include only what you need
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          navigation: {
            fields: ["text", "href", "isExternal"],
          },
          cta: {
            fields: ["text", "href", "isExternal"],
          },
        },
      },
    },
    // optionally include top-level fields from Global
    // fields: ["title", "description"],
  },
  { encodeValuesOnly: true }
);
export async function getGlobalSettings() {
  const path = "/api/global";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  url.search = globalSettingQuery;
  return fetchAPI(url.href, { method: "GET" });
}

