const DELIVERY_WHATSAPP_NUMBER = "6282252550984";

const ORDER_MESSAGE_TEMPLATE = `Halo Rassa Coffee! Saya ingin pesan antar:

Menu:
1.
2.

Nama:
Alamat:
No. HP:

Terima kasih 🙏`;

const B2B_MESSAGE_TEMPLATE =
  "Halo Rassa Coffee, saya ingin bertanya mengenai kerja sama pasokan kopi (B2B) untuk bisnis saya.";

const GREETING_MESSAGE = "Halo Rassa Coffee!";

function buildWaLink(message?: string) {
  const base = `https://wa.me/${DELIVERY_WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsapp = {
  number: DELIVERY_WHATSAPP_NUMBER,
  orderLink: buildWaLink(ORDER_MESSAGE_TEMPLATE),
  b2bLink: buildWaLink(B2B_MESSAGE_TEMPLATE),
  greetingLink: buildWaLink(GREETING_MESSAGE),
};
