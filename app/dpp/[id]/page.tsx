import { getDocument } from "@/lib/actions";
import { DPPDocumentView } from "./DPPDocumentView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DPPage({ params }: Props) {
  const { id } = await params;
  const { data: document, error } = await getDocument({ documentId: id });

  return <DPPDocumentView initialDocument={document ?? null} initialError={error ?? null} />;
}

