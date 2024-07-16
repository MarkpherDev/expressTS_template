export type Product = {
	name: string;
	available: boolean;
	price: number;
	description: string;
	image: Express.Multer.File;
};
