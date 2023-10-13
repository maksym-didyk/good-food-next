import React from 'react';
import './ProductCard.scss';
import { Product } from '@/types/Product';
import Link from 'next/link';

interface Props {
  small?: boolean,
  product: Product,
  isClick?: () => void;
}

export const ProductCard: React.FC <Props> = ({ small = false, product, isClick }) => {
  const price = product.attributes.price.toFixed(2);
    return(
        <div className='product-card'>
          <div className='product-card__container'>
            <Link href={`/${product.attributes.slug}`} onClick={isClick}>
              <img src={product.attributes.image.data[0].attributes.url} alt={product.attributes.title} />
            </Link>
            <div className='product-card__title'>{product.attributes.title}</div>
            {small || (
              <>
                <div className='product-card__calories'>{`${product.attributes.kcal} ккал`}</div>
                <div className='product-card__content'>{product.attributes.description}</div>
                <div className='product-card__price'>{`€ ${price}`}</div>
                <div className='product-card__button'>
                  <Link href={product.attributes.slug} className='product-card__button-buy'>Заказать</Link>
                </div>
              </>
            )}
          </div>
        </div>
    );
}
