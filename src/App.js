import { Grommet } from 'grommet';
import theme from './theme';
import HomePage from './containers/home';

function App() {
  return (
    <Grommet theme={theme} full background="black">
      <HomePage />
    </Grommet>
  );
}

export default App;
