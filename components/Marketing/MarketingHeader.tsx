import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";
import { GitHubIcon } from "@/icons";
import { LinkButton } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import { Logo } from "../Logo";
import styles from "./MarketingHeader.module.css";

export function MarketingHeader({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header className={clsx(className, styles.header)} {...props}>
      <Container className={styles.container}>
        <Link href="/">
          <Logo />
        </Link>
        <LinkButton
          href="https://github.com/flybylow/tabulas"
          icon={<GitHubIcon />}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          View on GitHub
        </LinkButton>
      </Container>
    </header>
  );
}
