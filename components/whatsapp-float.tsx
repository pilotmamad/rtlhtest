import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl("Hello RTLH, I would like to enquire about your live engraving services.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#128C7E] sm:inline-flex"
    >
      <MessageCircle size={17} strokeWidth={1.7} />
      WhatsApp
    </a>
  );
}
