function n(name, children = undefined, root = false) {
  return { name, children, depth: 0, root }
}

function injectDepth(node) {
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      child.depth = injectDepth(child)
    })
    const depths = node.children.map(child => child.depth)
    node.depth = Math.max(0, ...depths) + 1
    return node.depth
  } else {
    return node.depth
  }
}

const web = n('web', [
  n('front', [
    n('mvvm', [n('react'), n('vue')]),
    n('state', [n('redux'), n('flux')]),
    n('ssr', [n('nuxt')]),
  ]),
  n('server', [
    n('nodejs', [n('express'), n('fastify'), n('koa')]),
    n('php', [n('cakephp'), n('symfony')]),
  ]),
  n('database', [n('redis'), n('mongo'), n('mysql'), n('bigtable')]),
  n('infrastructure', [n('aws'), n('gcp'), n('heroku')]),
  n('dev ops', [
    n('docker'),
    n('travisci'),
    n('circleci'),
    n('webpack'),
    n('agile'),
    n('git'),
  ]),
])

const language = n('language', [
  n('Java'),
  n('Processing'),
  n('Python'),
  n('Javascript'),
  n('Typescript'),
  n('Coffeescript'),
  n('HTML, CSS'),
  n('C#'),
  n('Rust'),
  n('Go'),
  n('TeX'),
  n('Shell'),
  n('Php'),
])

const tech = n('tech', [web, language])

const machineLearning = n('machine learning', [
  n('deep net', [
    n('gan', [n('patch gan'), n('cycle gan'), n('deep prior')]),
    n('convolutional nn', [n('res net'), n('dense net')]),
    n('auto encoder', [n('unet'), n('stacked ae'), n('denoising ae')]),
    n('library', [n('tensorflow'), n('pytorch')]),
  ]),
  n('reinforcement learning'),
  n('genetic algorithm'),
  n('clustering'),
  n('support vector machine'),
  n('image processing', [
    n('super resolution'),
    n('image inpainting'),
    n('image denoising'),
    n('segmentation'),
    n('image generation'),
    n('image translation'),
  ]),
])

const sns = n('sns', [
  n('github'),
  n('twitter'),
  n('facebook'),
  n('instagram'),
  n('line'),
])

const editor = n('editor', [
  n('atom'),
  n('vscode'),
  n('theme', [n('one dark')]),
])

const tvSeries = n('tv series', [
  n('silicon valley'),
  n('bosh'),
  n('game of thrones'),
  n('prison break'),
  n('daredevil'),
  n('star trek'),
  n('walking dead'),
  n('glee'),
])

const musical = n('musical', [
  n('the phantom of the opera'),
  n('les miserable'),
  n('disney movie'),
])

const musician = n('musician', [
  n('bruno mars'),
  n('charlie pooth'),
  n('lukas graham'),
  n('michael jackson'),
  n('shawn mendes'),
])

const instrument = n('instrument', [n('clarinet')])

const tree = n(
  'me',
  [tech, machineLearning, sns, musical, editor, tvSeries, musician, instrument],
  true
)

injectDepth(tree)

export default tree
