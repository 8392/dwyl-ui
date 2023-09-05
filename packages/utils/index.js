import * as utils from './utils'
import * as imgView from './imgView'
import * as importExcel from './importExcel'
import * as pdfView from './pdfView'
import deepMerge from './deepMerge'

export default {
  ...utils,
  ...imgView,
  ...importExcel,
  ...pdfView,
  deepMerge
}
