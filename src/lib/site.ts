import type { Locale } from './types';

export const SITE_ORIGIN = 'https://charlie-wang-03.github.io';
export const BASE_URL = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export function href(pathname = ''): string {
  const clean = pathname.replace(/^\/+/, '');
  return `${BASE_URL}${clean}`;
}

export function localePath(locale: Locale, pathname = ''): string {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return clean ? `${locale}/${clean}/` : `${locale}/`;
}

export function absolute(pathname = ''): string {
  return new URL(href(pathname), SITE_ORIGIN).toString();
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'zh-CN' : 'en';
}
