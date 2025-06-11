# Appwrite

## What is Appwrite?

Appwrite is an open-source backend server that provides a set of APIs for building web and mobile applications. It offers features like authentication, databases, storage, and more, making it easier to build full-stack applications.

## Setup and Configuration

### Installation

1. Install the Appwrite SDK:

```bash
npx expo install react-native-appwrite
```

### Basic Configuration

1. **Environment Variables**
   Create a `.env` file in your project root with the following variables:

   ```
   EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   ```

2. **Client Setup**

   ```typescript
   import { Account, Client, Databases, Models } from 'react-native-appwrite';

   const client = new Client()
     .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
     .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
   ```

### Key Components

1. **Client**

   - The main entry point for interacting with Appwrite
   - Handles authentication and API requests
   - Manages project configuration

2. **Account**

   - Handles user authentication
   - Manages user sessions
   - Provides methods for user registration and login

3. **Databases**

   - Manages database operations
   - Handles CRUD operations
   - Provides query capabilities

4. **Models**
   - Type definitions for Appwrite data structures
   - Helps with TypeScript integration
   - Provides type safety for database operations

### Best Practices

1. **Environment Variables**

   - Always use environment variables for sensitive information
   - Prefix with `EXPO_PUBLIC_` for Expo to expose them to the client
   - Never commit `.env` files to version control

2. **Error Handling**

   - Implement proper error handling for API calls
   - Handle network errors gracefully
   - Provide user feedback for failed operations

3. **Type Safety**
   - Use TypeScript for better type safety
   - Define interfaces for your data models
   - Utilize Appwrite's built-in types

### Common Operations

1. **Authentication**

   ```typescript
   const account = new Account(client);

   // Create user
   await account.create('unique()', 'email@example.com', 'password');

   // Login
   await account.createEmailSession('email@example.com', 'password');
   ```

2. **Database Operations**

   ```typescript
   const databases = new Databases(client);

   // Create document
   await databases.createDocument('databaseId', 'collectionId', 'unique()', {
     field: 'value',
   });

   // List documents
   const documents = await databases.listDocuments(
     'databaseId',
     'collectionId'
   );
   ```

## Real-time Subscriptions

1. **Overview**

   - Appwrite provides real-time subscription capabilities
   - Allows listening to database changes without manual polling
   - Supports document creation, updates, and deletion events

2. **Implementation**

   ```typescript
   // Subscribe to collection changes
   const subscription = client.subscribe(
     `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
     response => {
       // Handle real-time updates
       // response.payload contains the changed document
       // response.events contains the type of change (create, update, delete)
     }
   );

   // Cleanup subscription
   subscription.unsubscribe();
   ```

3. **Event Types**

   - `create`: When a new document is created
   - `update`: When an existing document is modified
   - `delete`: When a document is removed
   - `all`: Listen to all events

4. **Best Practices**
   - Subscribe in useEffect to manage subscription lifecycle
   - Always unsubscribe when component unmounts
   - Handle different event types appropriately
   - Update local state based on subscription events
   - Implement error handling for subscription failures

## Security Considerations

1. **API Keys**

   - Use appropriate API key scopes
   - Rotate keys regularly
   - Never expose keys in client-side code

2. **Permissions**

   - Set up proper collection permissions
   - Use role-based access control
   - Implement proper validation rules

3. **Data Validation**
   - Validate data before sending to Appwrite
   - Use Appwrite's built-in validation
   - Implement custom validation when needed

## Resources

- [Official Documentation](https://appwrite.io/docs)
- [React Native SDK Documentation](https://appwrite.io/docs/sdks/react-native)
- [GitHub Repository](https://github.com/appwrite/appwrite)
