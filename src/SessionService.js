export const SESSION_TIMEOUT_MS = 1000 * 60 * 60 ; // 60 min.
export const IDLE_TIMEOUT_MS = 1000 * 60 * 30 ; // 30 min.

class SessionService {
  constructor() {
    this.sessionTimer = null;
    this.idleTimer = null;
    this.sessionExpired = false;
    this.idleExpired = false;
    this.sessionToastDisplayed = false;
    this.idleToastDisplayed = false;
  }

  startTimers = (handleSessionTimeout, handleIdleTimeout) => {
    this.sessionTimer = setTimeout(handleSessionTimeout, SESSION_TIMEOUT_MS);
    this.idleTimer = setTimeout(handleIdleTimeout, IDLE_TIMEOUT_MS);
  };

  clearTimers = () => {
    clearTimeout(this.sessionTimer);
    clearTimeout(this.idleTimer);
  };

  setSessionExpired = (value) => {
    this.sessionExpired = value;
  };

  setIdleExpired = (value) => {
    this.idleExpired = value;
  };

  setSessionToastDisplayed = (value) => {
    this.sessionToastDisplayed = value;
  };

  setIdleToastDisplayed = (value) => {
    this.idleToastDisplayed = value;
  };
}

export default new SessionService();
