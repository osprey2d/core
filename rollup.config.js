import typescript from 'rollup-plugin-typescript2'
// import buble from 'rollup-plugin-buble'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es'
    }
  ],
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**'
    })
    // buble(),
  ]
}
