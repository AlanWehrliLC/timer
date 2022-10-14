import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"

import { GolbalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"

export function App() {

  return (
    <BrowserRouter>

      <ThemeProvider theme={defaultTheme}>
        <GolbalStyle />
        
        <Router />
      </ThemeProvider>

    </BrowserRouter>
  )
}