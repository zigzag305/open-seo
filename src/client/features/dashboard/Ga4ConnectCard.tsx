import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoogleAnalyticsConnectionCard } from "@/client/features/ga4/GoogleAnalyticsConnectionCard";
import { captureClientEvent } from "@/client/lib/posthog";
import { dismissDashboardGa4Card } from "@/serverFunctions/dashboard";

export function Ga4ConnectCard({
  projectId,
  connected,
  reconnectRequired = false,
}: {
  projectId: string;
  connected: boolean;
  reconnectRequired?: boolean;
}) {
  const queryClient = useQueryClient();
  const dismissMutation = useMutation({
    mutationFn: () => dismissDashboardGa4Card({ data: { projectId } }),
    onSuccess: () =>
      void queryClient.invalidateQueries({
        queryKey: ["dashboardActivation", projectId],
      }),
  });

  return (
    <GoogleAnalyticsConnectionCard
      projectId={projectId}
      reconnectRequired={reconnectRequired}
      onDismiss={
        connected
          ? undefined
          : () => {
              captureClientEvent("dashboard:ga4_dismiss");
              dismissMutation.mutate();
            }
      }
      dismissing={dismissMutation.isPending}
    />
  );
}
