import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

const BASE_URL = SITE_URL;
const LOCALES = ["da"] as const;

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRoutes: StaticRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "/ydelser", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ydelser/tagrenovering", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ydelser/total-renovering", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ydelser/vinduer-doere", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ydelser/isolering-lofter", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ydelser/tilbygninger", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ydelser/garager-carporte", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ydelser/skure", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ydelser/fugtskade-sanering", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projekter", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projekter/parcelhus-holstebro", priority: 0.7, changeFrequency: "yearly" },
  { path: "/projekter/tilbygning-halgaard", priority: 0.7, changeFrequency: "yearly" },
  { path: "/projekter/fugtskade-koebenhavn", priority: 0.7, changeFrequency: "yearly" },
  { path: "/om-os", priority: 0.7, changeFrequency: "monthly" },
  { path: "/kontakt", priority: 0.9, changeFrequency: "yearly" },
  { path: "/privatlivspolitik", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

function makeAlternates(path: string) {
  return {
    languages: Object.fromEntries([
      ...LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      ["x-default", `${BASE_URL}/${LOCALES[0]}${path}`],
    ]),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: makeAlternates(route.path),
    }))
  );
}
