import { permanentRedirect } from "next/navigation";

export default function SavingsRedirectPage() {
  return permanentRedirect("/ko/finance/savings");
}
