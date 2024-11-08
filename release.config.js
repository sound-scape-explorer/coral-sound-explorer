module.exports = {
  plugins: [
    ["@semantic-release/commit-analyzer"],
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "pnpm release:prepare:front ${nextRelease.version} && pnpm release:prepare:processing ${nextRelease.version}",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      "@qiwi/semantic-release-gh-pages-plugin",
      {
        src: "front/dist",
        msg: "Front: Published <%= nextRelease.gitTag %>",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: [
          "CHANGELOG.md",
          "package.json",
          "processing/setup.py",
          "front/src/version.ts",
        ],
        // eslint-disable-next-line no-template-curly-in-string
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
