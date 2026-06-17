import mermaid from 'mermaid'

let initialized = false

export function initMermaid() {
  if (initialized) return
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    fontFamily: "'Nanum Gothic', sans-serif",
    theme: 'base',
    themeVariables: {
      background: '#0C0D11',
      primaryColor: '#181A20',
      primaryBorderColor: '#2A3550',
      primaryTextColor: '#D7DCE3',
      lineColor: '#4A93FF',
      secondaryColor: '#181A20',
      tertiaryColor: '#0C0D11',
      mainBkg: '#181A20',
      nodeBorder: '#2A3550',
      clusterBkg: '#0C0D11',
      titleColor: '#EDEFF2',
      edgeLabelBackground: '#0C0D11',
      noteBkgColor: '#1B2233',
      noteTextColor: '#A9C7F2',
      noteBorderColor: '#2A3550',
    },
    flowchart: { curve: 'basis', padding: 12, useMaxWidth: true },
  })
  initialized = true
}

export { mermaid }
