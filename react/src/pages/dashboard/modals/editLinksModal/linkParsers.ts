import { SocialLinks, CustomLink } from '../../types/links';

export const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  facebook: '',
  linkedin: '',
  instagram: '',
  twitter: ''
};

export const parseSocialLinks = (socialLinksStr: string | null): SocialLinks => {
  if (!socialLinksStr) return DEFAULT_SOCIAL_LINKS;
  
  try {
    const parsed = JSON.parse(socialLinksStr);
    return {
      facebook: parsed.facebook || '',
      linkedin: parsed.linkedin || '',
      instagram: parsed.instagram || '',
      twitter: parsed.twitter || ''
    };
  } catch (e) {
    console.error('Error parsing social links:', e);
    return DEFAULT_SOCIAL_LINKS;
  }
};

export const parseCustomLinks = (customLinksStr: string | null): CustomLink[] => {
  if (!customLinksStr) return [];
  
  try {
    const parsed = JSON.parse(customLinksStr);
    return Array.isArray(parsed) ? parsed.filter(link => 
      link && typeof link === 'object' && 'title' in link && 'url' in link
    ) : [];
  } catch (e) {
    console.error('Error parsing custom links:', e);
    return [];
  }
};