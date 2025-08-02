const PUPPETEER_SERVICE_URL = process.env.PUPPETEER_SERVICE_URL || 'http://localhost:3001';

export class PuppeteerClient {
  private sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'DELETE' = 'POST', body?: any) {
    const url = `${PUPPETEER_SERVICE_URL}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async launchBrowser(url: string) {
    return this.makeRequest('/launch-browser', 'POST', {
      sessionId: this.sessionId,
      url
    });
  }

  async navigate(url: string) {
    return this.makeRequest('/navigate', 'POST', {
      sessionId: this.sessionId,
      url
    });
  }

  async getPageHtml() {
    return this.makeRequest(`/page-html/${this.sessionId}`, 'GET');
  }

  async clickElement(selector: string) {
    return this.makeRequest('/click-element', 'POST', {
      sessionId: this.sessionId,
      selector
    });
  }

  async fillInput(selector: string, value: string) {
    return this.makeRequest('/fill-input', 'POST', {
      sessionId: this.sessionId,
      selector,
      value
    });
  }

  async waitForElement(selector: string, timeout?: number) {
    return this.makeRequest('/wait-for-element', 'POST', {
      sessionId: this.sessionId,
      selector,
      timeout
    });
  }

  async scrollToElement(selector: string) {
    return this.makeRequest('/scroll-to-element', 'POST', {
      sessionId: this.sessionId,
      selector
    });
  }

  async extractText(selector: string) {
    return this.makeRequest('/extract-text', 'POST', {
      sessionId: this.sessionId,
      selector
    });
  }

  async closeSession() {
    return this.makeRequest(`/close-session/${this.sessionId}`, 'DELETE');
  }
} 