import type { Route } from "./+types/home";
import { Login } from "../page/login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
    {
      tagName: "link",
      rel: "icon",
      href: "/adminLig.ico",
      type: "image/x-icon",
    },
  ];
}

export default function Home() {
  return <Login />;
}
