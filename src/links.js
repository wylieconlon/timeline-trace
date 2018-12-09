import Exercise from './Exercise';
import ExerciseIntroduction from './exercises/ExerciseIntroduction';
import ExerciseLanguageBasics from './exercises/ExerciseLanguageBasics';
import ExerciseBrowserBasics from './exercises/ExerciseBrowserBasics';
import ExerciseVariables from './exercises/ExerciseVariables';
import ExerciseVariableCounter from './exercises/ExerciseVariableCounter';
import ExerciseClickHandling from './exercises/ExerciseClickHandling';
import ExerciseTyping from './exercises/ExerciseTyping';
import ExerciseFib from './exercises/ExerciseFib';
import ExerciseFizzbuzz from './exercises/ExerciseFizzbuzz';

export default [
  {
    url: "/exercise/introduction/3",
    component: ExerciseBrowserBasics,
    title: 'Displaying Information in a Web Page',
  },
  {
    url: "/exercise/introduction/2",
    component: ExerciseLanguageBasics,
    title: 'Javascript Basics',
  },
  {
    url: "/exercise/introduction",
    component: ExerciseIntroduction,
    title: 'What can you do with Javascript?',
  },
  {
    url: "/exercise/variables",
    component: ExerciseVariables,
    title: 'Variables',
  },
  {
    url: "/exercise/variablecounter",
    component: ExerciseVariableCounter,
    title: 'Variables as Counter',
  },
  {
    url: "/exercise/clickhandling",
    component: ExerciseClickHandling,
    title: 'Click Handling',
  },
  {
    url: "/exercise/typing",
    component: ExerciseTyping,
    title: 'Typing',
  },
  {
    url: "/exercise/fib",
    component: ExerciseFib,
    title: 'Fibonacci',
  },
  {
    url: "/exercise/fizzbuzz",
    component: ExerciseFizzbuzz,
    title: 'FizzBuzz',
  },
  {
    url: "/exercise/playground",
    component: Exercise,
    title: 'Playground',
  },
];
