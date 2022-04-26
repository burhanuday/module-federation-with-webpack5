// Use dynamic import here to allow webpack to interface with module federation code
window.remote1Url = "http://localhost:3001";
window.hostUrl = "http://localhost:3000";

import("./bootstrap");

export {};
