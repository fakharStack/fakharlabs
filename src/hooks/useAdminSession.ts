import { useUser, useAuth } from "@clerk/clerk-react";
import { isClerkConfigured } from "../lib/clerk-key";

function useClerkSession() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();

  const loading = !isLoaded;

  return {
    user: user
      ? {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          user_metadata: {
            full_name: user.fullName || user.firstName || null,
          } as Record<string, unknown>,
        }
      : null,
    name: user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress || "Admin",
    loading,
    isDemo: false,
    signOut,
  };
}

export const demoSession = {
  user: {
    id: "demo-admin",
    email: "admin@fakharlabs.com",
    user_metadata: {
      full_name: "Demo Admin",
    },
  },
  name: "Demo Admin",
  loading: false,
  isDemo: true,
  signOut: async () => {},
};

export const useAdminSession = isClerkConfigured
  ? function useAdminSessionWithClerk() {
      return useClerkSession();
    }
  : function useAdminSessionDemo() {
      return demoSession;
    };
