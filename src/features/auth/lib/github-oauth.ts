const GITHUB_OAUTH_STATE_KEY = "github_oauth_state";

function getGitHubClientId() {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  if (!clientId) {
    throw new Error("NEXT_PUBLIC_GITHUB_CLIENT_ID is not configured");
  }
  return clientId;
}

export function getGitHubRedirectUri() {
  if (typeof window === "undefined") {
    return "";
  }
  return `${window.location.origin}/login/github/callback`;
}

function createOAuthState() {
  const state = crypto.randomUUID();
  sessionStorage.setItem(GITHUB_OAUTH_STATE_KEY, state);
  return state;
}

export function validateGitHubOAuthState(state: string | null) {
  if (!state) return false;
  const savedState = sessionStorage.getItem(GITHUB_OAUTH_STATE_KEY);
  sessionStorage.removeItem(GITHUB_OAUTH_STATE_KEY);
  return savedState === state;
}

export function buildGitHubAuthorizeUrl() {
  const params = new URLSearchParams({
    client_id: getGitHubClientId(),
    redirect_uri: getGitHubRedirectUri(),
    scope: "read:user user:email",
    state: createOAuthState(),
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}
