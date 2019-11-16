# slick-react
slick is a fully customizable slider for reactJs

## Demo
### [React Slick slider Demo](https://bishogasaad.github.io/slick-react/)
## For production
just use files in build
## API
### Settings
| Option  | Description |
| --- | --- |
| slides | number of components in one row  |
| step  | number of components to move by buttons |
| timing | time for slider animation |
| dots | navigation dots |
| dotsNumbered | dots to be numbered |
| buttons | prev/next buttons |
| dotsPosition | 0 - bottom of slick / 1 - right of slick (Default: 0)|
| column | direction of slider |
| rows | number of rows |
### Example 
```
const settings = {
  slides: 3,
  step: 3,
  timing: 1,
  dots: true,
  dotsNumbered: true,
  buttons: true,
  dotsPosition: 0,
  column: false,
  rows: 1
}
```
### Another Example with Responsive Option
```
const settings = {
  slides: 3,
  step: 4,
  timing: 0.6,
  dots: true,
  dotsNumbered: false,
  dotsPosition: 2,
  buttons: false,
  column: true,
  rows: 4,
  responsive: [
    {
      breakPoint: 600,
      settings: {
        slides: 2,
        step: 2,
        timing: 0.6,
        dots: false,
        dotsNumbered: false,
        dotsPosition: 1,
        buttons: true,
        column: false,
        rows: 2,
      }
    }
  ]
}
  ```
## Using the Component
```
import Slick from './components/Slick';
..
..
<Slick settings={settings} style={style}>
    { your content }
</Slick>
```
## Style 

```
const style = {
  rightButtonStyle : {
    { your style }
  },
  leftButtonStyle : {
    { your style }
  },
  dotStyle : {
    { your style }
  }
}
```

###
**For more help see index.js**
