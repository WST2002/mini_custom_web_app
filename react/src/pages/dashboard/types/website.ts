export type WebsiteStatus = 'live' | 'draft' | 'archived';

export interface Website {
  id: string;
  businessName: string;
  status: WebsiteStatus;
  createdAt: string;
  params: string;
  template: string;
  views: number;
}