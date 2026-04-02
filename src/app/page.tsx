import { redirect } from "next/navigation";

/**
 * Root route (/) -> Төслийн жагсаалт (/projects) руу redirect хийх.
 * Middleware-ээр дамжихын тулд эхлээд энд хандана.
 */
export default function Home() {
  redirect("/projects");
}
