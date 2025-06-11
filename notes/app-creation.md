# React Native App Creation Flow

## Initial Setup

### Creating a New Project

The first step in creating a React Native app with Expo is to use the `create-expo-app` command. This sets up a new project with all necessary dependencies and configuration.

```bash
npx create-expo-app MyApp
```

This command:

- Creates a new directory called `MyApp`
- Initializes a new React Native project
- Installs all required dependencies
- Sets up the basic project structure
- Creates initial configuration files

### Project Structure

After creation, your project will have this basic structure:

```
MyApp/
├── src/                    # Source code directory
│   ├── app/               # Main application screens and navigation
│   ├── components/        # Reusable UI components
│   ├── constants/         # App-wide constants and configuration
│   ├── hooks/            # Custom React hooks
│   └── assets/           # Images, fonts, and other static files
├── app.json              # Expo configuration
├── package.json          # Project metadata and dependencies
└── tsconfig.json         # TypeScript configuration
```

### Important Files

#### Entry Points

1. **index.tsx** (in src/app/)

   - The main entry point of your application
   - Renders the root component
   - Sets up any global providers or configurations
   - Typically contains the initial app setup and navigation structure

2. **\_layout.tsx** (in src/app/)
   - Defines the layout structure for your app
   - Handles navigation configuration
   - Sets up global UI elements like headers, tab bars, or drawers
   - Can contain shared UI elements that appear across multiple screens

### Running on Your Phone

To run the app on your physical device:

1. **Install Expo Go**

   - Download "Expo Go" from:
     - [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS)
     - [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)

2. **Start the Development Server**

   ```bash
   npx expo start
   ```

3. **Connect Your Phone**

   - Make sure your phone and computer are on the same WiFi network
   - Open Expo Go on your phone
   - Scan the QR code shown in your terminal
   - The app will load on your device

4. **Troubleshooting**
   - If the QR code doesn't work, you can manually enter the URL shown in the terminal
   - If connection fails, check that both devices are on the same network
   - For iOS, you might need to sign in to your Apple ID in Expo Go

### Project Reset

If you need to reset the project to its initial state (useful when following tutorials or starting over):

```bash
npm run reset-project
```

This command will:

- Clear the project's cache
- Reset the project to a clean state

### App Building Steps

1. **Initial Code Setup**

   ```bash
   # Install required dependencies
   npm install @react-navigation/native @react-navigation/native-stack
   npm install expo-router
   ```

2. **Navigation Structure**

   - Create route groups in `src/app/`:
     ```
     src/app/
     ├── (tabs)/           # Tab navigation
     │   ├── _layout.tsx   # Tab configuration
     │   ├── index.tsx     # Home tab
     │   └── profile.tsx   # Profile tab
     └── (auth)/           # Authentication screens
         ├── _layout.tsx   # Auth layout
         └── login.tsx     # Login screen
     ```

3. **Layout Configuration**

   ```jsx
   // src/app/_layout.tsx
   import { Stack } from 'expo-router';

   export default function Layout() {
     return (
       <Stack>
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
       </Stack>
     );
   }
   ```

### Authentication and Route Guards

1. **Route Guard Concept**

   - Route guards protect routes from unauthorized access
   - They can redirect users based on authentication status
   - Implemented using Expo Router's middleware or layout components

2. **Implementation Example**

   ```jsx
   // src/app/_layout.tsx
   import { Redirect, Stack } from 'expo-router';
   import { useAuth } from '../hooks/useAuth'; // Custom auth hook

   export default function RootLayout() {
     const { isAuthenticated } = useAuth();

     // Redirect to login if not authenticated
     if (!isAuthenticated) {
       return <Redirect href="/login" />;
     }

     return (
       <Stack>
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
       </Stack>
     );
   }
   ```

3. **Group-Level Protection**

   ```jsx
   // src/app/(protected)/_layout.tsx
   import { Redirect } from 'expo-router';
   import { useAuth } from '../../hooks/useAuth';

   export default function ProtectedLayout() {
     const { isAuthenticated } = useAuth();

     if (!isAuthenticated) {
       return <Redirect href="/login" />;
     }

     return <Stack />;
   }
   ```

4. **Best Practices**
   - Implement guards at the highest necessary level
   - Use route groups to organize protected routes
   - Handle loading states during auth checks
   - Provide clear feedback for unauthorized access
   - Consider implementing role-based access control
