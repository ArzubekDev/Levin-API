"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getPublicApiBase } from "@/shared/config/env";

import type { Project } from "../model/types";

const COPIED_RESET_MS = 2000;
const FALLBACK_RESOURCE = "users";
const FALLBACK_LIMIT = 20;

export function useApiTester(project: Project | undefined) {
  const [copied, setCopied] = useState(false);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseExpanded, setResponseExpanded] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const [limitOverride, setLimitOverride] = useState("");
  const [trackedProjectId, setTrackedProjectId] = useState(project?.id);
  const copiedTimeoutRef = useRef<number | undefined>(undefined);

  if (project?.id !== trackedProjectId) {
    setTrackedProjectId(project?.id);
    setActiveResource(null);
    setLimitOverride("");
    setCopied(false);
    setTestResponse(null);
    setResponseStatus(null);
    setResponseExpanded(false);
    setIsTesting(false);
  }

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current !== undefined) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const resources = useMemo(() => (project ? Object.keys(project.schemaJson) : []), [project]);

  const resource = activeResource ?? resources[0] ?? FALLBACK_RESOURCE;
  const defaultLimit = project?.defaultLimit ?? FALLBACK_LIMIT;
  const effectiveLimit = limitOverride || String(defaultLimit);
  const apiUrl = project
    ? `${getPublicApiBase()}/api/${project.endpointKey}/${resource}?limit=${effectiveLimit}`
    : "";

  const resetResponse = useCallback(() => {
    setResponseExpanded(false);
    setResponseStatus(null);
    setTestResponse(null);
  }, []);

  const selectResource = useCallback(
    (item: string) => {
      setActiveResource(item);
      resetResponse();
    },
    [resetResponse],
  );

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(apiUrl);
    setCopied(true);
    if (copiedTimeoutRef.current !== undefined) {
      window.clearTimeout(copiedTimeoutRef.current);
    }
    copiedTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, COPIED_RESET_MS);
  }, [apiUrl]);

  const handleTest = useCallback(async () => {
    setIsTesting(true);
    try {
      const started = performance.now();
      const res = await fetch(apiUrl);
      const elapsed = Math.round(performance.now() - started);
      const data = await res.json();
      setResponseExpanded(false);
      setResponseStatus(res.status);
      setTestResponse(
        JSON.stringify(
          {
            status: res.status,
            elapsedMs: elapsed,
            body: data,
          },
          null,
          2,
        ),
      );
    } catch (error: unknown) {
      setResponseExpanded(false);
      setResponseStatus(null);
      setTestResponse(error instanceof Error ? error.message : "Запрос не выполнен");
    } finally {
      setIsTesting(false);
    }
  }, [apiUrl]);

  return {
    resources,
    resource,
    selectResource,
    defaultLimit,
    limitOverride,
    setLimitOverride,
    apiUrl,
    copied,
    handleCopy,
    isTesting,
    handleTest,
    testResponse,
    responseStatus,
    responseExpanded,
    setResponseExpanded,
  };
}
