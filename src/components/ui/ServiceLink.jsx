"use client";

import { useInterest } from "@/components/providers/InterestProvider";
import { routes } from "@/content/site";
import Link from "./NavLink";

/** Link to /services that opens the explorer on one specific service. */
export default function ServiceLink({ serviceId, onClick, ...rest }) {
  const { showService } = useInterest();
  return (
    <Link
      href={routes.services}
      onClick={(event) => {
        onClick?.(event);
        showService(serviceId);
      }}
      {...rest}
    />
  );
}
