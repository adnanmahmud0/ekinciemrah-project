/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient, UseQueryOptions, MutateOptions } from '@tanstack/react-query';
import { privateApi } from '@/lib/api-client';

/**
 * ============================================================================
 * 🚀 UNIVERSAL API HOOK
 * ============================================================================
 * 
 * One hook to rule them all.
 * 
 * Logic:
 * 1. Uses the Authenticated Client (`privateApi`) by default.
 * 2. If you have a token, it attaches it.
 * 3. If you don't have a token, it sends the request without one.
 * 4. If the server says "Unauthorized" (401), it automatically logs you out and redirects to login.
 * 
 * Usage:
 * const { data, create, update, remove } = useApi('/orders', ['orders']);
 * ============================================================================
 */

/**
 * Universal Hook for API Operations
 * 
 * @param resourcePath - (Optional) The base URL for the resource (e.g., "/orders").
 * @param queryKey - (Optional) The unique key for caching (e.g., ["orders"]).
 * @param options - (Optional) React Query options.
 */
export const useApi = <T = any>(
  resourcePath?: string,
  queryKey?: any[],
  options?: Omit<UseQueryOptions<T, Error, T, any[]>, 'queryKey' | 'queryFn'>
) => {
  const queryClient = useQueryClient();
  
  // We always use privateApi because it handles tokens AND auto-logout on error.
  const api = privateApi;

  // ==========================================================================
  // 1. DATA FETCHING (GET)
  // ==========================================================================
  const query = useQuery({
    queryKey: queryKey || [],
    queryFn: async () => {
      if (!resourcePath) throw new Error("Resource path is required");
      const res = await api.get<T>(resourcePath);
      return res.data;
    },
    enabled: !!resourcePath && !!queryKey && (options?.enabled !== false),
    ...options,
  });

  // Helper: Invalidate cache
  const invalidate = () => {
    if (queryKey) queryClient.invalidateQueries({ queryKey });
  };

  // ==========================================================================
  // 2. MUTATIONS (CREATE, UPDATE, DELETE)
  // ==========================================================================

  // --- POST (Create / Custom) ---
  const postMutation = useMutation({
    mutationFn: async ({ url, data }: { url?: string; data: any }) => {
      const targetUrl = url || resourcePath;
      if (!targetUrl) throw new Error("URL is required for POST");
      const res = await api.post(targetUrl, data);
      return res.data;
    },
    onSuccess: invalidate,
  });

  // --- PUT (Update / Custom) ---
  const putMutation = useMutation({
    mutationFn: async ({ url, data }: { url?: string; data: any }) => {
      const targetUrl = url || resourcePath;
      if (!targetUrl) throw new Error("URL is required for PUT");
      const res = await api.put(targetUrl, data);
      return res.data;
    },
    onSuccess: invalidate,
  });

  // --- PATCH (Partial Update) ---
  const patchMutation = useMutation({
    mutationFn: async ({ url, data }: { url?: string; data: any }) => {
      const targetUrl = url || resourcePath;
      if (!targetUrl) throw new Error("URL is required for PATCH");
      const res = await api.patch(targetUrl, data);
      return res.data;
    },
    onSuccess: invalidate,
  });

  // --- DELETE (Remove) ---
  const deleteMutation = useMutation({
    mutationFn: async (url?: string) => {
      const targetUrl = url || resourcePath;
      if (!targetUrl) throw new Error("URL is required for DELETE");
      const res = await api.delete(targetUrl);
      return res.data;
    },
    onSuccess: invalidate,
  });

  // ==========================================================================
  // 3. RETURN VALUES
  // ==========================================================================
  return {
    // State
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,

    // Resource Actions
    create: (data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) => postMutation.mutateAsync({ data }, options),
    update: (id: string | number, data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) => putMutation.mutateAsync({ url: `${resourcePath}/${id}`, data }, options),
    remove: (id: string | number, options?: MutateOptions<any, Error, string | undefined, unknown>) => deleteMutation.mutateAsync(`${resourcePath}/${id}`, options),

    // Custom Actions (Any URL)
    post: (url: string, data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) => postMutation.mutateAsync({ url, data }, options),
    put: (url: string, data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) => putMutation.mutateAsync({ url, data }, options),
    patch: (url: string, data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) => patchMutation.mutateAsync({ url, data }, options),
    del: (url: string, options?: MutateOptions<any, Error, string | undefined, unknown>) => deleteMutation.mutateAsync(url, options),
    
    // Loading States
    isCreating: postMutation.isPending,
    isUpdating: putMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

// For backward compatibility or clarity, you can alias it
export const usePrivateApi = useApi;
export const usePublicApi = useApi; // They are now the same
