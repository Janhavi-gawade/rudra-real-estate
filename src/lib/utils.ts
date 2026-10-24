import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats amount into Indian Lakhs and Crores standard
 */
export function formatPrice(amount: number, listingType?: string): string {
  if (!amount || isNaN(amount)) return 'Price on Request';

  if (listingType === 'RENT') {
    return `₹${amount.toLocaleString('en-IN')} / mo`;
  }

  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    // remove trailing zero if .00
    const cleanCr = cr.endsWith('.00') ? cr.slice(0, -3) : cr;
    return `₹${cleanCr} Cr`;
  }

  if (amount >= 100000) {
    const lac = (amount / 100000).toFixed(2);
    const cleanLac = lac.endsWith('.00') ? lac.slice(0, -3) : lac;
    return `₹${cleanLac} Lakhs`;
  }

  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatArea(sqft: number): string {
  if (!sqft) return 'N/A';
  return `${sqft.toLocaleString('en-IN')} sq.ft.`;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const countryCode = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  return `https://wa.me/${countryCode}?text=${encodeURIComponent(message)}`;
}

export function buildCallUrl(phone: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `tel:+91${cleanPhone.slice(-10)}`;
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
