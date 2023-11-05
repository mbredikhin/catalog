import { store } from "@/store";
import { fetchCatalog } from "@/store/catalog";
import { ICategory } from "@/types";
import { findCategoryByPath } from "@/utils";
import { Metadata } from "next";
import styles from "./catalog.module.scss";
import Link from "next/link";

type Route = {
  slug: ICategory["slug"][];
};
type Props = {
  params: Route;
};

function composeRoutes(node: ICategory, routes: Route[]): Route[] {
  const slug = [
    ...routes.map((route) => route.slug).flat(),
    node.slug,
  ] as Route["slug"];
  const route: Route = {
    slug,
  };
  if (node.children === null) {
    return [route];
  }
  return [
    route,
    ...node.children.map((child) => composeRoutes(child, [route])).flat(),
  ];
}

export async function getStaticPaths() {
  await store.dispatch(fetchCatalog());
  const { catalog } = store.getState();
  return {
    paths: composeRoutes(catalog.categories[0], []).map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  await store.dispatch(fetchCatalog());
  const { catalog } = store.getState();
  const { index, name } = findCategoryByPath(
    props.params.slug.slice(1),
    catalog.categories[0]
  );
  return {
    title: name,
    robots: { index },
  };
}

export default async function CatalogItem({ params }: Props) {
  await store.dispatch(fetchCatalog());
  const { catalog } = store.getState();
  const { name, children } = findCategoryByPath(
    params.slug.slice(1),
    catalog.categories[0]
  );
  const links = [...(children || [])]
    .sort((a, b) => +a.name - +b.name)
    .map((link) => ({
      ...link,
      href: `/catalog/${params.slug.join("/")}/${link.slug}`,
    }));

  return (
    <div className={styles["catalog"]}>
      <h1 className={styles["catalog__title"]}>{name}</h1>
      <div className={styles["links"]}>
        {params.slug.length > 1 ? (
          <Link
            href={`/catalog/${params.slug.slice(0, -1).join("/")}`}
            className={styles["links__link"]}
          >
            <span>← Назад</span>
          </Link>
        ) : null}
        {links.map(({ name, href }) => (
          <Link key={href} href={href} className={styles["links__link"]}>
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
