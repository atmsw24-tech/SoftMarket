"use client";

import { ExternalLink } from "lucide-react";

type BuilderFrameProps = {
  src: string;
};

export default function BuilderFrame({ src }: BuilderFrameProps) {
  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="font-black text-xl">bolt.diy workspace</h2>
          <p className="text-sm muted">The builder is running as a connected service inside SoftMarket.</p>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light"
        >
          Open in new tab <ExternalLink size={15} />
        </a>
      </div>
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
        <iframe
          title="SoftMarket AI Builder powered by bolt.diy"
          src={src}
          className="block w-full min-h-[720px] bg-white"
          allow="clipboard-read; clipboard-write; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="text-xs muted mt-3 leading-5">
        If the workspace is blank or reports a browser security error, use “Open in new tab”.
        Some bolt.diy/WebContainer deployments block iframe embedding or require additional
        cross-origin isolation configuration.
      </p>
    </section>
  );
}
