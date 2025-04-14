import slugify from "slugify";

export default function cleanupSlug(title: string): string {
  return slugify(title, {lower: true, strict: true})
}