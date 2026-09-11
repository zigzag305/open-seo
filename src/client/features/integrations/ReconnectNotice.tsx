import { AlertTriangle } from "lucide-react";
import { GoogleGlyph } from "@/client/features/gsc/GoogleGlyph";

/**
 * Shown when the stored connection still says "connected" but the report call
 * came back `connected: false` — the Google grant is dead.
 *
 * Without this, the card falls back to its own connected state: a green
 * "Connected" pill, the property name and the email that linked it. All three
 * are read from our record, none of them from Google, so the card keeps
 * claiming everything is fine while no data is arriving. The only visible clue
 * is that the *stats* card never replaces it, which nobody can be expected to
 * notice.
 *
 * Shared by Search Console and Analytics on purpose: both cards reach this
 * state the same way, and two copies of this copy would drift.
 */
export function ReconnectNotice({
  integrationName,
  onReconnect,
}: {
  integrationName: string;
  onReconnect: () => void;
}) {
  return (
    <div className="alert alert-warning items-start text-sm">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-2">
        <p className="font-medium">This connection has expired</p>
        <p className="text-base-content/70">
          {integrationName} is still linked here, but Google is refusing the
          request, so no data is coming through. It usually means the permission
          was revoked or simply timed out. Reconnecting fixes it and keeps the
          property you already chose.
        </p>
        <button
          type="button"
          onClick={onReconnect}
          className="inline-flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-1.5 text-sm font-semibold text-base-content shadow-sm transition hover:bg-base-200"
        >
          <GoogleGlyph className="size-4" />
          Reconnect with Google
        </button>
      </div>
    </div>
  );
}
