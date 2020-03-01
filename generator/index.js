module.exports = (api, options, rootOptions) => {
  const dependencies = require("./dependencies.json");
  const devDependencies = require("./devDependencies.json")
  const scripts = require("./scripts.json")

  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: dependencies,
    devDependencies: devDependencies,
    scripts: scripts
  })

  if (options.router) {
    api.extendPackage({
      dependencies: {
        "vue-router": "^3.0.3"
      }
    });

    api.render({
      "./src/router.js": "../template/route/router.js"
    });
  }

  if (options.vuex) {
    api.extendPackage({
      dependencies: {
        vuex: "^3.0.1"
      }
    });

    api.render({
      "./src/store/index.js": "../template/store/index.js"
    });
  }

  // 复制并用 ejs 渲染 `./template/default` 内所有的文件
  api.render("../template/default")

  // env文件
  api.render({
    "./.env": "../template/env/.env",
    "./.env.test": "../template/env/.env.test",
    "./.env.preview": "../template/env/.env.preview",
    "./.env.production": "../template/env/.env.production",
  });

  // 配置文件
  api.render({
    "./.eslintrc.js"     : "../template/.config/.eslintrc.js",
    "./.eslintignore"     : "../template/.config/.eslintignore",
    "./.gitignore"     : "../template/.config/.gitignore",
    "./.editorconfig"    : "../template/.config/.editorconfig"
  });

  api.onCreateComplete(() => {
    console.log('i am onCreateComplete')
  })
}