require('@babel/register')({
  ignore: [
    /node_modules/
  ]
})

const gulp = require('gulp')

const {
  default: postCommit
} = require('@modernpoacher/hooks/lib/post-commit')

gulp
  .task('post-commit', postCommit)

gulp
  .task('default', gulp.series('post-commit'))
