import clsx from "clsx";
import Link from "next/link";
import { ComponentProps, useMemo } from "react";
import { Container } from "@/primitives/Container";
import styles from "./MarketingFooter.module.css";

export function MarketingFooter({
  className,
  ...props
}: ComponentProps<"footer">) {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={clsx(className, styles.footer)} {...props}>
      <Container className={styles.container}>
        <span className={styles.copyright}>© {year} Tabulas</span>
        <div className={styles.links}>
          <Link href="/signin" className={styles.link}>
            Get Started
          </Link>
          <Link href="/dashboard" className={styles.link}>
            Dashboard
          </Link>
        </div>
      </Container>
    </footer>
  );
}
