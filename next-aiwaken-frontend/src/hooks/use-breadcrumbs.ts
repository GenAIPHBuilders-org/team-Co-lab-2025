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
