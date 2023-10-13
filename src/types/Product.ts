export interface ProductAttributes {
  title: string;
  price: number;
  description: string;
  slug: string;
  kcal: string;
  prots: string;
  fats: string;
  carbs: string;
  locale: string
  image: {
    data: [
      {
        id: number,
        attributes: {
          name: string;
          url: string;
        }
      }

    ]
  }
  menu: ProductMenu[];
}

export interface ProductMenu {
  id: number;
  title: string;
  kcal: string;
  prots: string;
  fats: string;
  carbs: string;
  dish: [
    {
      id: number;
      title: string;
      image: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string;
            url: string;
            formats: {
              thumbnail: {
                url: string;
              }
            }
          }
        }
      }
    }
  ]
}

export interface Product {
id: number;
attributes: ProductAttributes;
}
