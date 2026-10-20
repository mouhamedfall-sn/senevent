
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Forcer UNE SEULE copie de React (celle de apps/mobile, version 19.1.0)
// pour eviter l'erreur "Invalid hook call" dans le monorepo
const reactPath = path.resolve(projectRoot, "node_modules/react");

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react" || moduleName.startsWith("react/")) {
    const sousChemin = moduleName.slice("react".length);
    return context.resolveRequest(
      context,
      path.join(reactPath, sousChemin),
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;