export type SessionData = {
  startedAt: string;
  pagesVisited: string[];
  filesOpened: string[];
  sectionVisits: number;
};

const STORAGE_KEY = "archive_session";

function getSession(): SessionData {
  if (typeof window === "undefined") {
    return {
      startedAt: new Date().toISOString(),
      pagesVisited: [],
      filesOpened: [],
      sectionVisits: 0,
    };
  }

  const existing = localStorage.getItem(STORAGE_KEY);

  if (existing) {
    return JSON.parse(existing);
  }

  const session: SessionData = {
    startedAt: new Date().toISOString(),
    pagesVisited: [],
    filesOpened: [],
    sectionVisits: 0,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

  return session;
}

function saveSession(session: SessionData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function trackSection(section: string) {
  if (typeof window === "undefined") return;

  const session = getSession();

  if (!session.pagesVisited.includes(section)) {
    session.pagesVisited.push(section);
  }

  session.sectionVisits += 1;

  saveSession(session);
}

export function trackFile(file: string) {
  if (typeof window === "undefined") return;

  const session = getSession();

  if (!session.filesOpened.includes(file)) {
    session.filesOpened.push(file);
  }

  saveSession(session);
}

export function getSessionData(): SessionData {
  return getSession();
}