import { task, series, parallel, clone, merge, shell } from 'webtasker';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { TsConfigPathsPlugin, CheckerPlugin } from 'awesome-typescript-loader';

const CONFIG = {
  entry: {
    'index': './src/app/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryExport: 'main',
    libraryTarget: 'var',
    library: 'beyond'
  },

  resolve: {
    extensions: ['.ts', '.json', '.js']
  },
  target: 'web',
  node: false,
  module: {
    strictThisContextOnImports: true,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'tsconfig.webpack.json',
          useCache: false
        }
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new TsConfigPathsPlugin({
      tsconfig: path.join(__dirname, 'tsconfig.json')
    }),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, 'src'), // location of your src
      {}
    ),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html',
      chunksSortMode: 'dependency',
      inject: 'body'
    }),
  ],
};

const compiler = (<any>webpack)(CONFIG);

export function build(cb) {
  clean();

  compiler.run(function(err, stats) {
    if (err) {
      console.log('Error', err);
    }
    console.log('[webpack]', stats.toString({
      chunks: false,
      colors: true
    }));
    cb();
  });

}

watch['description'] = 'Watching build files';
export function watch() {
  clean();

  compiler.watch({ stdin: true }, function(err, stats) {
    if (err) {
      console.log('Error', err);
    }
    console.log('[webpack]', stats.toString({
      chunks: false,
      colors: true
    }));

    console.log('[webpack]', 'Gonna sit around and watch for file changes. CTRL^C to kill me');
  });
};

export function devServer() {
  clean();

  const webpackServer = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: {
      colors: true
    },
    historyApiFallback: {
      rewrites: [
        // { from: /^\/$/, to: '/views/landing.html' },
      ]
    },
    overlay: {
      warnings: true,
      errors: true
    },
    setup: function(app) {

    }
  });
  webpackServer.listen(3000);

}

export function clean() {
  shell.rm('-rf', 'dist');
}

export function polyfills() {

}

export default series(
  clean,
  polyfills,
  build
);
