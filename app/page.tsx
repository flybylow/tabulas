import { MarketingLayout } from "@/layouts/Marketing";
import { LinkButton } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

const demos = [
  {
    name: "CIRPASS 14-stakeholder demo",
    url: "https://humanmachinebe.vercel.app",
  },
  {
    name: "GS1 barcode scanner",
    url: "https://gs1scan.vercel.app",
  },
  {
    name: "Construction DPP (Building Explorer)",
    url: "https://tababulasmap.vercel.app",
  },
];

export default async function Index() {
  const session = await auth();

  return (
    <MarketingLayout>
      <Container className={styles.header}>
        <h1 className={styles.headerTitle}>Tabulas</h1>
        <p className={styles.headerTagline}>
          Digital Product Passport infrastructure that transforms EU compliance
          into brand experiences.
        </p>
      </Container>

      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>The problem</h2>
        <p className={styles.sectionText}>
          250,000+ EU manufacturers need DPPs by 2027-2030. Most solutions are
          compliance checklists. We build brand experiences.
        </p>
      </Container>

      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Our approach</h2>
        <ul className={styles.approachList}>
          <li>14 stakeholder dashboards (farm → recycler)</li>
          <li>CIRPASS-2 research alignment</li>
          <li>GS1 integration ready</li>
          <li>W3C DIDs + verifiable credentials</li>
        </ul>
      </Container>

      <Container className={styles.demos}>
        <h2 className={styles.demosTitle}>Live demos</h2>
        <div className={styles.demosList}>
          {demos.map((demo) => (
            <LinkButton
              key={demo.url}
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className={styles.demoLink}
            >
              {demo.name}
            </LinkButton>
          ))}
        </div>
      </Container>
    </MarketingLayout>
  );
}
