/**
 * Custom React hook that generates an array of breadcrumb objects based on the current URL pathname.
 *
 * Each breadcrumb contains a `label` (a human-readable, capitalized version of the path segment)
 * and an `href` (the accumulated path up to that segment).
 *
 * @returns {Breadcrumb[]} An array of breadcrumb objects for navigation.
 *
 * @example
 * // Example usage in a component:
 * const breadcrumbs = useBreadcrumbs();
 * return (
 *   <nav>
 *     {breadcrumbs.map(breadcrumb => (
 *       <Link key={breadcrumb.href} href={breadcrumb.href}>
 *         {breadcrumb.label}
 *       </Link>
 *     ))}
 *   </nav>
 * );
 */

import { useMemo } from "react";
import { usePathname } from "next/navigation";

interface Breadcrumb {
  label: string;
  href: string;
}

const useBreadcrumbs = (): Breadcrumb[] => {
  const pathname = usePathname();

  return useMemo(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    let accumulatedPath = "";

    return pathSegments.map((segment) => {
      accumulatedPath += `/${segment}`;
      return {
        label: segment
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
        href: accumulatedPath,
      };
    });
  }, [pathname]);
};

export default useBreadcrumbs;
