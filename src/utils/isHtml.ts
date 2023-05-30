export function isHtml(file: string) {
  return file.includes('.html')
}

export function getHtmlFileProperties(file: string) {
  const [fileName, fileExtention] = file.split('.')

  return {
    fileName,
    fileExtention,
  }
}
