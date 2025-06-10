# React Native Components

## Views

### Views vs Divs

In React Native, the `View` component is the most fundamental building block for creating UI. It's similar to a `<div>` in web development, but with some key differences:

- `View` is a container component that supports layout with flexbox
- Unlike `div`, `View` maps to native components on iOS and Android
- `View` can contain other components and views
- It's the basic building block for creating layouts in React Native

### Basic Example

```jsx
import { View } from 'react-native';

function MyComponent() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Other components go here */}
    </View>
  );
}
```

### Key Points
- Views are the foundation of React Native UI
- They support flexbox layout by default
- They can be styled using the StyleSheet API
- Views can be nested to create complex layouts

## Text

### Overview
The `Text` component is used to display text in React Native. Unlike web development where text can be placed directly in divs, React Native requires text to be wrapped in a `Text` component.

### Basic Example

```jsx
import { Text } from 'react-native';

function MyComponent() {
  return (
    <Text style={{ fontSize: 16, color: 'black' }}>
      Hello, React Native!
    </Text>
  );
}
```

### Key Points
- All text must be wrapped in a `Text` component
- Text components can be nested
- Supports styling for font size, color, weight, etc.
- Can be styled using the StyleSheet API

## TextInput

### Overview
The `TextInput` component is React Native's equivalent to the HTML `<input>` element. It's used to collect user input through the keyboard.

### Basic Example

```jsx
import { TextInput } from 'react-native';

function MyComponent() {
  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      placeholder="Enter your text here"
      onChangeText={(text) => console.log(text)}
    />
  );
}
```

### Key Points
- Used for collecting user input
- Can be controlled or uncontrolled
- Common props include:
  - `placeholder`
  - `onChangeText`
  - `value`
  - `secureTextEntry` (for passwords)
  - `keyboardType`

## ScrollView

### Overview
The `ScrollView` component is a scrollable container that can host multiple components and views. It's useful when you need to scroll through content that doesn't fit on the screen.

### Basic Example

```jsx
import { ScrollView, Text } from 'react-native';

function MyComponent() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>First item</Text>
      <Text>Second item</Text>
      <Text>Third item</Text>
      {/* More items... */}
    </ScrollView>
  );
}
```

### Key Points
- Provides scrolling functionality for content that exceeds screen size
- Can scroll both vertically and horizontally
- Supports pull-to-refresh functionality
- Common props include:
  - `horizontal` (for horizontal scrolling)
  - `showsVerticalScrollIndicator`
  - `onScroll`
  - `refreshControl` (for pull-to-refresh)

## StyleSheet

### Overview
The `StyleSheet` API is React Native's way of creating and managing styles. It's similar to CSS but optimized for mobile performance.

### Basic Example

```jsx
import { StyleSheet, View, Text } from 'react-native';

function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Styled Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
```

### Key Points
- Better performance than inline styles
- Type checking and validation
- Style inheritance and composition
- Common style properties:
  - Layout: `flex`, `padding`, `margin`
  - Position: `position`, `top`, `left`
  - Appearance: `backgroundColor`, `borderRadius`
  - Text: `fontSize`, `color`, `fontWeight`
- Style composition using arrays: `style={[styles.base, styles.override]}` 