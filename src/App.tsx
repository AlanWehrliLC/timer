import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"

import { GolbalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"
import { CycleContextProvider } from "./contexts/CyclesContext"

export function App() {

  return (
    <BrowserRouter>

      <ThemeProvider theme={defaultTheme}>
        <GolbalStyle />
        
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </ThemeProvider>

    </BrowserRouter>
  )
}