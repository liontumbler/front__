import type { Route } from "./+types/home";
import { Licencias } from "../page/licencias/licencias";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Licencias" },
    { name: "description", content: "es una vista donde se pueden crear licencias" },
  ];
}

export default function TablePage() {
  return (
    <Licencias />
  );
}
