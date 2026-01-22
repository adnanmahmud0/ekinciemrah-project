export interface BannerImage {
  image: string;
  _id?: string;
}

export interface BannerData {
  _id: string;
  webBanners: BannerImage[];
  mobileBanners: BannerImage[];
  createdAt: string;
  updatedAt: string;
}

export interface BannerResponse {
  success: boolean;
  message: string;
  data: BannerData;
}
