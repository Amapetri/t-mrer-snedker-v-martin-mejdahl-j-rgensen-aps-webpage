// ─────────────────────────────────────────────
// Loading skeleton — /[locale]/loading.tsx
// Shown while Suspense boundaries resolve.
//
// C5: bone background
// S4: no rounded spinners — architectural loading
//     indicator uses a hairline element
// M1: uses CSS animation on a hairline only
//     prefers-reduced-motion degrades to static
// ─────────────────────────────────────────────

export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes loading-sweep {
          0%   { transform: scaleX(0); transform-origin: left; }
          50%  { transform: scaleX(1); transform-origin: left; }
          51%  { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        .loading-bar {
          animation: loading-sweep 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .loading-bar {
            animation: none;
            transform: scaleX(0.4);
            transform-origin: left;
          }
        }
      `}</style>

      {/* Fixed top hairline loading indicator — no spinner, no overlay */}
      <div
        role="status"
        aria-label="Indlæser…"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "2px",
          background: "var(--color-border)",
          overflow: "hidden",
        }}
      >
        <div
          className="loading-bar"
          aria-hidden="true"
          style={{
            height: "100%",
            background: "var(--color-stone)",
            width: "100%",
          }}
        />
      </div>

      {/* Page area placeholder — bone background, no content */}
      <div
        style={{
          minHeight: "60vh",
          background: "var(--color-surface-base)",
        }}
        aria-hidden="true"
      />

      {/* SR-only text */}
      <span className="sr-only">Indlæser side…</span>
    </>
  );
}
