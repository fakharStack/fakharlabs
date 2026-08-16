import { useUser, useAuth } from "@clerk/clerk-react";

export function useAdminSession() {
  const { user, isLoaded, isSignedIn } = useUser();
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
    signOut,
  };
}
