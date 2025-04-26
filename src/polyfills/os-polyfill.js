// OS module polyfill for browser/edge environments
const os = {
  platform: () => "browser",
  type: () => "Browser",
  release: () => "Unknown",
  homedir: () => "/",
  userInfo: () => ({ username: "user" }),
  cpus: () => [{ model: "Browser CPU" }],
  hostname: () => "browser",
  networkInterfaces: () => ({}),
  EOL: "\n",
  endianness: () => "LE",
  arch: () => "x64",
  tmpdir: () => "/tmp",
  totalmem: () => 8589934592, // 8GB
  freemem: () => 4294967296, // 4GB
};

export default os;

// Also export individual functions for ESM imports
export const platform = os.platform;
export const type = os.type;
export const release = os.release;
export const homedir = os.homedir;
export const userInfo = os.userInfo;
export const cpus = os.cpus;
export const hostname = os.hostname;
export const networkInterfaces = os.networkInterfaces;
export const EOL = os.EOL;
export const endianness = os.endianness;
export const arch = os.arch;
export const tmpdir = os.tmpdir;
export const totalmem = os.totalmem;
export const freemem = os.freemem;