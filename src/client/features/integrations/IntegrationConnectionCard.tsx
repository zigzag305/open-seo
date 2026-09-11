import type { ReactNode } from "react";

type IntegrationConnectionStatus =
  | "connected"
  | "disconnected"
  | "setup_required"
  /**
   * Linked on our side, but Google is refusing the calls. Distinct from
   * "connected" because that pill was the whole problem: it read from our
   * record, not from Google, so a dead grant still showed green.
   */
  | "reconnect_required";

/** Shared shell for first-party connection cards such as GSC and GA4. */
export function IntegrationConnectionCard({
  title,
  icon,
  status,
  children,
}: {
  title: string;
  icon?: ReactNode;
  status?: IntegrationConnectionStatus;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm">
      <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
        <div className="flex min-w-0 items-center gap-2.5">
          {icon ? (
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-base-300 bg-base-100 shadow-sm">
              {icon}
            </span>
          ) : null}
          <h2 className="truncate text-base font-semibold leading-tight">
            {title}
          </h2>
        </div>
        {status ? <ConnectionStatusPill status={status} /> : null}
      </div>
      <div className="border-t border-base-300 p-5 sm:p-6">{children}</div>
    </div>
  );
}

function ConnectionStatusPill({
  status,
}: {
  status: IntegrationConnectionStatus;
}) {
  const connected = status === "connected";
  // Both of these are "we cannot reach Google yet", so they share the warning
  // colour; only the wording differs.
  const needsAttention =
    status === "setup_required" || status === "reconnect_required";
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        connected
          ? "border-success/30 bg-success/10 text-success"
          : needsAttention
            ? "border-warning/30 bg-warning/10 text-warning"
            : "border-base-300 bg-base-200 text-base-content/60",
      ].join(" ")}
    >
      <span
        className={[
          "size-1.5 rounded-full",
          connected
            ? "bg-success"
            : needsAttention
              ? "bg-warning"
              : "bg-base-content/40",
        ].join(" ")}
      />
      {connected
        ? "Connected"
        : status === "setup_required"
          ? "Setup required"
          : status === "reconnect_required"
            ? "Reconnect needed"
            : "Not connected"}
    </span>
  );
}
