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

2. **_layout.tsx** (in src/app/)
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
