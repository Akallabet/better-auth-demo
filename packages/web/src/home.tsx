import { useLoaderData } from "react-router";

export function HomePage() {
  const { records } = useLoaderData();
  console.log("Loaded records:", records);
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main entry point of our application.</p>
    </div>
  );
}
