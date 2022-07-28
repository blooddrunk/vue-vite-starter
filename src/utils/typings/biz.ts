export type Product = {
  id?: string | number;
  name?: string | null;
  price?: number | null;
  inventory?: number | null;
  terms?: boolean;
  tags?: string[];
  location?: string;
  location2?: string;
};
