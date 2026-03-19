import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getMessages } from "@/data/messages";

export default function TurkishNotFound() {
  const dictionary = getMessages("tr");

  return (
    <main className="py-24">
      <Container className="max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text)]">
          {dictionary.common.notFoundTitle}
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">
          {dictionary.common.notFoundDescription}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[var(--color-accent-bg)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-text)]"
        >
          {dictionary.common.backToHome}
        </Link>
      </Container>
    </main>
  );
}
