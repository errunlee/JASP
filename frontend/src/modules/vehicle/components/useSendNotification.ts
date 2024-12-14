import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/instance";

export const useSendNotification = () => {
  return useMutation({
    mutationFn: async (values: any) => {
      return await api.post("/api/notification/sendGarbageTruckNotification", {
        checkpointId: values,
      });
    },
  });
};
