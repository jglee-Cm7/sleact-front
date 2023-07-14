import path from "path";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isDevelopment = process.env.NODE_ENV !== "production";

const config: Configuration = {
  name: "sleact",
  mode: isDevelopment ? "development" : "production",
  devtool: !isDevelopment ? "hidden-source-map" : "eval",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
  entry: {
    app: "./index",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["IE 10"] },
                debug: isDevelopment,
              },
            ],
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          env: {
            development: {
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
        },
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"], // CSS -> js 로 바꿔줌
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? "development" : "production" }), // node가 아닌 환경에서 env 를 쓸 수 있게 한다.
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist/",
  },
  devServer: {
    historyApiFallback: true, // react router
    port: 3090,
    devMiddleware: { publicPath: "/dist/" },
    static: { directory: path.resolve(__dirname) },
    proxy: {
      "/api/": {
        target: "http://localhost:3095",
        changeOrigin: true,
      },
    },
  },
};

// 개발 환경에 쓸 플러그인
if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: "server", openAnalyzer: true }));
}

// 프로덕션에서 쓸 플러그인
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: "static" }));
}

export default config;
