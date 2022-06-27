const canonicalUrl = "";

const defaultTitle = "NextJS Thee.js Starter";

// Edit the SEO parameters
export const SEO = {
  defaultTitle: defaultTitle,
  titleTemplate: `%s • ${defaultTitle}`,
  canonical: canonicalUrl,
  additionalMetaTags: [
    {
      name: "msapplication-TileColor",
      // Edit the tile color (windows)
      content: "#111111",
    },
    {
      name: "theme-color",
      // Edit the full background color (android)
      content: "#111111",
    },
  ],
};

export default SEO;
