// lib/appwrite.ts
import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // This is the default Appwrite cloud endpoint
    .setProject('670e8cb8002e1d52acbe'); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;