import {ThemeProvider} from "styled-components"
import { GolbalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GolbalStyle />
    </ThemeProvider>
  )
}