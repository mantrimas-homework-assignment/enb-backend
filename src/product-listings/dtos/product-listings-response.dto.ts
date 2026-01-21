export class HardwareDto {
    name: string;
}

export class RegionDto {
    name: string;
}

export class PlatformDto {
    name: string;
    iconUrl: string;
}

export class GameDto {
    name: string;
}

export class ProductPresetDto {
    hardware: HardwareDto;
    region: RegionDto;
    platform: PlatformDto;
    game: GameDto;
    imageUrl: string;
}

export class ProductListingDto {
    uuid: string;
    productPreset: ProductPresetDto;
    price: number;
    cashback: number;
    discountedPrice: number;
    likeCount: number;
}

export class ProductListingResponseDto {
    productListings: ProductListingDto[];
    productListingCount: number;
}

