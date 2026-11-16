"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * next/link that also handles a link to the page you are already on.
 * Next.js does nothing in that case, which feels broken mid-page, so we
 * scroll back to the top instead. Links with a #hash are left alone.
 */
export default function NavLink({ href, onClick, ...rest }) {
  const pathname = usePathname();

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || typeof href !== "string") return;
    const [path, hash] = href.split("#");
    if (!hash && path === pathname) {
      event.preventDefault();
      window.scrollTo({ top: 0 }); // smooth via CSS, instant with reduced motion
    }
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
