class ConfigSchema {
    constructor() {
      this.ENV = null;
      this.LOG_LEVEL = null;
      this.PORT = null;
      this.HTTP_PROXY = null;
      this.HOSTNAME = null;
      this.AUTH_DISABLED = '';
  
      this.CONDECO_ENV = null;
    }
  
    resolvePort() {
      return process.env.PORT || this.PORT || 80;
    }
  
    resolveHttpProxy() {
      return process.env.HTTP_PROXY || this.HTTP_PROXY;
    }
  
    resolveAuthDisabled() {
      return `${process.env.MW_AUTH_DISABLED || this.AUTH_DISABLED}`;
    }
  }
  
  module.exports = {
    ConfigSchema,
  };
  