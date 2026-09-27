type ImageOptions = {
  w?: number
  h?: number
  q?: number
  fm?: string
}

function imagePath(file: string) {
  if (file.startsWith('http://') || file.startsWith('https://')) {
    return file
  }

  if (file.startsWith('/')) {
    return file
  }

  return `/img/${file}`
}

export function img(file: string, _options: ImageOptions = {}) {
  return imagePath(file)
}

export function srcSet(
  file: string,
  widths: number[],
  _proportion?: number,
) {
  const url = imagePath(file)

  return widths.map((width) => `${url} ${width}w`).join(', ')
}