import {ThemeProvider, createGlobalStyle} from 'styled-components'

// import './vConsole.js'

import theme from './theme'

import Web3Provider from './web3'

import Index from './pages'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Web3Provider>
        <Index />
      </Web3Provider>
      
    </ThemeProvider>
  );
}

export default App;
