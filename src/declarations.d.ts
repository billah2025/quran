declare module "*.json" {
  const value: { [key: string]: string }; // Example type: JSON file with key-value pairs of strings
  export default value;
}
