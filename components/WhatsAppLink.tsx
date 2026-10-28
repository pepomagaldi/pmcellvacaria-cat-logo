import { MessageCircle, ArrowUpRight } from "lucide-react";
import { contactUrl } from "@/lib/catalog";
export default function WhatsAppLink({
  href = contactUrl,
  children = "Falar no WhatsApp",
  className = "button primary",
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <MessageCircle size={18} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
