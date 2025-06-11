# Expo

## What is Expo?

Expo is a framework and platform built around React Native that simplifies the development of cross-platform mobile applications. It provides a set of tools and services that make it easier to build, test, and deploy React Native apps.

## What Problems Does Expo Solve?

1. **Development Environment Setup**

   - Eliminates the need to install and configure Android Studio and Xcode
   - Removes the complexity of managing native build tools
   - Provides a unified development environment

2. **Cross-Platform Development**

   - Write once, run anywhere (iOS and Android)
   - Consistent behavior across platforms
   - Unified API for accessing device features

3. **Build and Deployment**
   - Simplifies the app building process
   - Handles app signing and certificates
   - Provides over-the-air updates

## What Expo Offers

### Development Tools

- Expo CLI for project management
- Expo Go app for instant testing
- Live reload and hot reloading
- Built-in debugging tools

### Expo CLI Commands

- `npx expo install` - A specialized package installer that ensures compatibility with your Expo SDK version
  - Automatically resolves and installs the correct version of packages that work with your Expo SDK
  - Prevents version conflicts between native modules and Expo SDK
  - Preferred over `npm install` or `yarn add` for Expo projects
  - Example: `npx expo install @react-navigation/native`

### APIs and Services

- Camera access
- Location services
- Push notifications
- File system access
- Social authentication
- Analytics

### Build Services

- Cloud build service
- App store deployment
- Over-the-air updates
- Build configuration management

### File-Based Navigation

Expo provides a powerful file-based routing system that simplifies navigation setup:

1. **Directory Structure**

   ```
   app/
   ├── _layout.tsx      # Root layout configuration
   ├── index.tsx        # Home screen (/)
   ├── profile.tsx      # Profile screen (/profile)
   └── settings/
       ├── _layout.tsx  # Settings layout
       └── index.tsx    # Settings screen (/settings)
   ```

2. **Key Features**

   - Automatic route generation based on file structure
   - Nested navigation through folder structure
   - Layout files (`_layout.tsx`) for shared UI elements
   - Dynamic routes with `[param]` syntax
   - Type-safe navigation with TypeScript

3. **Benefits**
   - No manual route configuration needed
   - Intuitive file organization
   - Easy to maintain and scale
   - Built-in type safety
   - Automatic code splitting

### Navigation in Expo

#### Route Groups

Route groups are a powerful feature in Expo Router that help organize related screens without affecting the URL structure:

1. **Syntax**

   - Folders wrapped in parentheses `()` are route groups
   - Example: `(tabs)`, `(auth)`, `(modals)`
   - The group name is not included in the URL

2. **Example Structure**

   ```
   app/
   ├── (tabs)/           # Group for tab navigation
   │   ├── index.tsx    # URL: /
   │   └── profile.tsx  # URL: /profile
   └── (auth)/          # Group for auth screens
       └── login.tsx    # URL: /login
   ```

3. **Benefits**

   - Clean URLs (no group names in the path)
   - Better organization of related screens
   - Shared layouts for grouped screens
   - Multiple index files in different groups
   - Logical grouping of features

4. **Common Use Cases**
   - `(tabs)` - For tab-based navigation
   - `(auth)` - For authentication-related screens
   - `(modals)` - For modal screens
   - `(drawer)` - For drawer navigation screens

### Route Guards

Route guards in Expo Router provide a way to protect routes and control access to different parts of your application:

1. **Implementation Methods**

   - Using layout components
   - Using middleware
   - Using custom hooks

2. **Common Use Cases**

   - Authentication protection
   - Role-based access control
   - Feature flags
   - Subscription checks

3. **Example Structure**

   ```
   app/
   ├── (public)/          # Public routes
   │   └── login.tsx
   ├── (protected)/       # Protected routes
   │   ├── _layout.tsx   # Contains guard logic
   │   └── dashboard.tsx
   └── _layout.tsx       # Root layout with global guards
   ```

4. **Best Practices**
   - Keep guard logic in layout files
   - Use route groups for organization
   - Implement guards at appropriate levels
   - Handle loading and error states
   - Provide clear user feedback

### Vector Icons

Expo provides a comprehensive icon library through `@expo/vector-icons`, which includes popular icon sets:

1. **Available Icon Sets**

   - MaterialIcons
   - FontAwesome
   - Ionicons
   - Feather
   - AntDesign
   - And many more

2. **Usage Example**

   ```jsx
   import { MaterialIcons } from '@expo/vector-icons';

   function MyComponent() {
     return <MaterialIcons name="home" size={24} color="black" />;
   }
   ```

3. **Features**

   - High-quality vector icons
   - Consistent rendering across platforms
   - Easy to style and customize
   - Extensive icon collection
   - TypeScript support

4. **Icon Explorer**
   - Browse all available icons at [icons.expo.fyi](https://icons.expo.fyi/Index)
   - Search by name or category
   - Preview icons in different sizes and colors
   - Copy import statements directly by choosing the icon.

## Key Benefits

- Faster development cycle
- Easier onboarding for new developers
- Reduced maintenance overhead
- Access to pre-built components
- Simplified deployment process
- Active community and support
