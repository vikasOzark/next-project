"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Dashboard() {
  const params = useSearchParams();
  const route = useRouter();
  route.push("/dashboard/-");
  return null;
}
