import Image from "next/image";
import { MarketingLayout } from "@/layouts/Marketing";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

const demos = [
  {
    name: "CIRPASS 14-stakeholder demo",
    url: "https://humanmachinebe.vercel.app",
    image: "/farm.png",
    description: "Farm to recycler journey",
  },
  {
    name: "GS1 barcode scanner",
    url: "https://gs1scan.vercel.app",
    image: "/GS1.png",
    description: "Scan and trace products",
  },
  {
    name: "Construction DPP (Building Explorer)",
    url: "https://tababulasmap.vercel.app",
    image: "/glasshaus.png",
    description: "Explore building materials",
  },
];

export default async function Index() {
  return (
    <MarketingLayout>
      <Container className={styles.header}>
        <h1 className={styles.headerTitle}>Tabulas</h1>
        <p className={styles.headerTagline}>
          Digital Product Passport infrastructure that transforms EU compliance
          into brand experiences.
        </p>
        {/* Example: Hero image - replace with your actual image */}
        {/* <div className={styles.heroImage}>
          <Image
            src="/hero-image.jpg"
            alt="Tabulas Digital Product Passport"
            width={1200}
            height={600}
            priority
            className={styles.image}
          />
        </div> */}
      </Container>

      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>The problem</h2>
        <p className={styles.sectionText}>
          250,000+ EU manufacturers need DPPs by 2027-2030. Most solutions are
          compliance checklists. We build brand experiences.
        </p>
        {/* Example: Section image - replace with your actual image */}
        {/* <div className={styles.sectionImage}>
          <Image
            src="/problem-image.jpg"
            alt="EU compliance challenge"
            width={800}
            height={400}
            className={styles.image}
          />
        </div> */}
      </Container>

      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Our approach</h2>
        <div className={styles.approachContent}>
          <ul className={styles.approachList}>
            <li>14 stakeholder dashboards (farm → recycler)</li>
            <li>CIRPASS-2 research alignment</li>
            <li>GS1 integration ready</li>
            <li>W3C DIDs + verifiable credentials</li>
          </ul>
          {/* Example: Side-by-side image and content - replace with your actual image */}
          {/* <div className={styles.approachImage}>
            <Image
              src="/approach-image.jpg"
              alt="Our approach"
              width={600}
              height={400}
              className={styles.image}
            />
          </div> */}
        </div>
      </Container>

      <Container className={styles.demos}>
        <h2 className={styles.demosTitle}>Live demos</h2>
        <div className={styles.demosList}>
          {demos.map((demo) => (
            <a
              key={demo.url}
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoCard}
            >
              <div className={styles.demoCardImage}>
                <Image
                  src={demo.image}
                  alt={demo.name}
                  fill
                  className={styles.demoImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
                <div className={styles.demoCardOverlay} />
              </div>
              <div className={styles.demoCardContent}>
                <h3 className={styles.demoCardTitle}>{demo.name}</h3>
                <p className={styles.demoCardDescription}>{demo.description}</p>
                <span className={styles.demoCardCta}>View demo →</span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </MarketingLayout>
  );
}
