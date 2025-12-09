"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentHeader, DocumentHeaderSkeleton } from "@/components/Document";
import { DPP } from "@/components/DPP";
import { DocumentLayout, DocumentProviders } from "@/layouts/Document";
import { ErrorLayout } from "@/layouts/Error";
import { Document, ErrorData } from "@/types";

type Props = {
  initialDocument: Document | null;
  initialError: ErrorData | null;
};

export function DPPDocumentView({ initialDocument, initialError }: Props) {
  const { id, error: queryError } = useParams<{ id: string; error: string }>();
  const [error, setError] = useState<ErrorData | null>(initialError);

  // If error object in params, retrieve it
  useEffect(() => {
    if (queryError) {
      setError(JSON.parse(decodeURIComponent(queryError as string)));
    }
  }, [queryError]);

  if (error) {
    return <ErrorLayout error={error} />;
  }

  if (!initialDocument) {
    return <DocumentLayout header={<DocumentHeaderSkeleton />} />;
  }

  return (
    <DocumentProviders roomId={id} initialDocument={initialDocument}>
      <DocumentLayout
        header={<DocumentHeader documentId={initialDocument.id} />}
      >
        <DPP marketingCanEdit={true} dppCanEdit={true} />
      </DocumentLayout>
    </DocumentProviders>
  );
}
