import { useQuery, useMutation, useQueryClient, UseQueryOptions, MutateOptions } from '@tanstack/react-query';
import { privateApi } from '@/lib/api-client';
import { useCallback, useMemo } from 'react';

/**
 * ============================================================================
 * 🚀 UNIVERSAL API HOOK
 * ============================================================================
 * 
 * One hook to rule them all.
 */

export const useApi = <T = any>(
  resourcePath?: string,
  queryKey?: any[],
  options?: Omit<UseQueryOptions<T, Error, T, any[]>, 'queryKey' | 'queryFn'>
) => {
  const queryClient = useQueryClient();

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
  const invalidate = useCallback(() => {
    if (queryKey) queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  // ==========================================================================
  // 2. MUTATIONS (CREATE, UPDATE, DELETE)
  // ==========================================================================

  const postMutation = useMutation({
    mutationFn: async ({ url, data }: { url?: string; data: any }) => {
      const targetUrl = url || resourcePath;
      if (!targetUrl) throw new Error("URL is required for POST");
      const res = await api.post(targetUrl, data);
      return res.data;
    },
    onSuccess: invalidate,
  });

  const putMutation = useMutation({
    mutationFn: async ({ url, data }: { url?: string; data: any }) => {
      const targetUrl = url || resourcePath;
      if (!targetUrl) throw new Error("URL is required for PUT");
      const res = await api.put(targetUrl, data);
      return res.data;
    },
    onSuccess: invalidate,
  });

  const patchMutation = useMutation({
    mutationFn: async ({ url, data }: { url?: string; data: any }) => {
      const targetUrl = url || resourcePath;
      if (!targetUrl) throw new Error("URL is required for PATCH");
      const res = await api.patch(targetUrl, data);
      return res.data;
    },
    onSuccess: invalidate,
  });

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
  // 3. STABILIZED ACTIONS
  // ==========================================================================

  const create = useCallback((data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) =>
    postMutation.mutateAsync({ data }, options), [postMutation]);

  const update = useCallback((id: string | number, data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) =>
    putMutation.mutateAsync({ url: `${resourcePath}/${id}`, data }, options), [putMutation, resourcePath]);

  const remove = useCallback((id: string | number, options?: MutateOptions<any, Error, string | undefined, unknown>) =>
    deleteMutation.mutateAsync(`${resourcePath}/${id}`, options), [deleteMutation, resourcePath]);

  const post = useCallback((url: string, data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) =>
    postMutation.mutateAsync({ url, data }, options), [postMutation]);

  const put = useCallback((url: string, data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) =>
    putMutation.mutateAsync({ url, data }, options), [putMutation]);

  const patch = useCallback((url: string, data: any, options?: MutateOptions<any, Error, { url?: string; data: any }, unknown>) =>
    patchMutation.mutateAsync({ url, data }, options), [patchMutation]);

  const del = useCallback((url: string, options?: MutateOptions<any, Error, string | undefined, unknown>) =>
    deleteMutation.mutateAsync(url, options), [deleteMutation]);

  // ==========================================================================
  // 4. MEMOIZED RETURN VALUE
  // ==========================================================================
  return useMemo(() => ({
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    create,
    update,
    remove,
    post,
    put,
    patch,
    del,
    isCreating: postMutation.isPending,
    isUpdating: putMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }), [
    query.data, query.isLoading, query.isError, query.error, query.refetch,
    create, update, remove, post, put, patch, del,
    postMutation.isPending, putMutation.isPending, deleteMutation.isPending
  ]);
};

// For backward compatibility or clarity, you can alias it
export const usePrivateApi = useApi;
export const usePublicApi = useApi; // They are now the same
