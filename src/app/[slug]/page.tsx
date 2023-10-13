import React from 'react';
import { ProductItem } from '@/components/ProductItem';

type Props = {
  params: {
    slug: string;
  }
}

export const ProductPage = ({params: { slug } }: Props) => {

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  // React.useEffect(() => {
  //   scrollToTop();
  // }, []);

  return (
    <ProductItem slug={slug}/>
  )
};

export default ProductPage;
