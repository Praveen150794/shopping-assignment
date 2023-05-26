import './setupTests';
import 'react-native';

jest.mock('react-native-vector-icons', () => 'Icon'); // Mock any external libraries used in your components

jest.useFakeTimers(); // Use fake timers to simulate setTimeout and setInterval

// Other setup configurations, if needed
