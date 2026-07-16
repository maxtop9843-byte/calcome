import { permanentRedirect } from "next/navigation";
export default function LoanRedirectPage() {
  return permanentRedirect("/ko/finance/loan");
}
