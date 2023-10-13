'use client';
import React from 'react';
import './page.scss';
import '@/assets/styles/scss/loader.scss';
import { Header } from '@/components/Header';
import { Accordion, Carousel, Tab, Tabs } from 'react-bootstrap';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/Product';
import { HomePageAttributes } from '@/types/HomePage';
import { MutatingDots } from 'react-loader-spinner';
import { client } from '@/utils/fetchClient';

export const HomePage = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [homeData, setHomeData] = React.useState<HomePageAttributes>();
  const [isLoading, seIsLoading] = React.useState(true);

  const loadData = async () => {
    const homeDataApi = await client.get<any>('/home-page?populate[0]=faq_tabs.questions&populate[1]=about_string&populate[2]=howitwork.image&populate[3]=howitwork_image&populate[4]=feedback_paragraph.image&populate[5]=comment.icon');
    const productsDataApi = await client.get<any>('/products?sort=price&populate=image');

    setHomeData(homeDataApi.data.attributes);
    setProducts(productsDataApi.data);

    seIsLoading(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <MutatingDots
          height="100"
          width="100"
          color="#c21807"
          secondaryColor='#c21807'
          radius='12.5'
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    )
  };

  return (
    <div className="homepage">
      <section className='homepage__hero' id='hero'>

        <Header />

        <div className='homepage__hero-section'>
          <div className='homepage__hero--title'>
            {homeData?.hero_title}
          </div>

          <div className='homepage__hero--text'>
          {homeData?.hero_content}
          </div>

          <a href='#menu' className='header__button'>Заказать</a>
        </div>

      </section>

      <section className='homepage__menu' id='menu'>
        
        <h2 className='homepage__menu--title'>{homeData?.menu_title}</h2>

        <div className='homepage__products'>

          {products &&
            products.map((item) => {
              return <ProductCard key={item.id} product={item}/>;
            })}

        </div>
      </section>

      <div className='homepage__aboutus' id='about-us'>
        <div className='homepage__aboutus--content'>
          <div className='homepage__aboutus--left'>
            <div className='homepage__aboutus--title'>
              {homeData?.about_title}
            </div>

            <div className='homepage__aboutus--text'>
              {homeData?.about_content}
            </div>

            <ul className='homepage__aboutus--list'>
              {homeData?.about_string.map(item => {
                return (
                  <li key={item.id} className='homepage__aboutus--li'>
                    {item.string}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className='homepage__aboutus--right'>
            <img src={homeData?.howitwork_image.data.attributes.formats.large.url} alt={homeData?.howitwork_image.data.attributes.alternativeText} className='homepage__aboutus--image'/>
          </div>
        </div>
      </div>

      <section className='homepage__menu' id='howitwork'>
  
        <h2 className='homepage__menu--title'>{homeData?.howitwork_title}</h2>

        <div className='homepage__products'>

        {homeData?.howitwork.map(item => {
          return (
            <div key={item.id} className='homepage__whywecard'>
              <img className='homepage__whywecard--image' src={item.image.data.attributes.url} alt={item.image.data.attributes.alternativeText} />

              <div className='homepage__whywecard--title'>
                {item.title}
              </div>

              <div className='homepage__whywecard--content'>
                {item.content}
              </div>
          </div>
          )
        })}

        </div>
      </section>

      <section className='homepage__comments'>
        <h2 className='homepage__menu--title'>{homeData?.comments_title}</h2>
          <div>
            <Carousel variant='dark'>
            {homeData?.comment.map(comment => {
              return (
                <Carousel.Item key={comment.id}>
                  <div className='homepage__commentwrapper'>
                    <div className='homepage__comment'>
                      <div className='homepage__comment-content'>
                        <p>
                          {comment.comment}
                        </p>
                        <p>
                          {comment.icon.data && (
                            <img src={comment.icon.data.attributes.url} alt='Source comment icon' className='homepage__comment-icon'/>
                          )}
                          <b>
                            {comment.url
                              ? (
                                  <a href={comment.url} className='homepage__comment-link'>{comment.author}</a>
                                )
                              
                              : (comment.author)
                            }
                          </b>
                        </p>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
                )
            })}


            </Carousel>
          </div>
      </section>

      <section className='homepage__delivery'>
        <h2 className='homepage__menu--title homepage__delivery--title'>{homeData?.delivery_title}</h2>

        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" stroke="#C21807" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M29.334 21.3333V34.6667H42.6673" stroke="#C21807" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <div className='homepage__maptext'>
        {homeData?.delivery_content}
          <br />
          <span className='homepage__maptext--red'>{homeData?.delivery_time}</span>
        </div>

        <iframe title="GoogleMap" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d51316.70461027648!2d-4.880515161089349!3d36.498755678465145!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72d809904dabdf%3A0xe6c9db907b5ecab!2z0JzQsNGA0LHQtdC70YzRjywg0JzQsNC70LDQs9CwLCDQhtGB0L_QsNC90ZbRjw!5e0!3m2!1suk!2sua!4v1695757805681!5m2!1suk!2sua" width="100%" height="490" loading="lazy" />
      </section>

      <section className='homepage__menu' id='faq'>
          <h2 className='homepage__menu--title'>{homeData?.faq_title}</h2>

          <Tabs
            defaultActiveKey="1"
            id="justify-tab"
            className="mb-3"
            fill
          >
            {homeData?.faq_tabs.map(tab => {
              return (
                <Tab key={tab.id} eventKey={tab.id} title={tab.title}>
                  <div className='homepage__accordion'>
                  {tab.questions && tab.questions.map(question => {
                    return (
                      <Accordion key={question.id} flush>
                        <Accordion.Item eventKey={String(question.id)}>
                          <Accordion.Header><b>{question.question}</b></Accordion.Header>
                          <Accordion.Body style={{ width: '95%' }}>
                            {question.answer}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    )
                  })}
                  </div>
                </Tab>
              )
            })}

          </Tabs>
      </section>

      <section className='homepage__formsection'>
          <img src={homeData?.feedback_paragraph.image.data.attributes.url} alt='Kamysheva Viktoriia' className='homepage__formsection-image' />

          <div className='homepage__formsection-content'>
            <div className='homepage__formsection-title'>
              {homeData?.feedback_title}
            </div>
            <div>
              {homeData?.feedback_paragraph.paragraph_1}
            </div>
            <div>
              {homeData?.feedback_paragraph.paragraph_2}
            </div>
            <div className='red'>
              {homeData?.feedback_paragraph.paragraph_red}
            </div>
            <div>
              <button className='product-card__button-buy sp_popup_28095c1b-d2f3-45d9-8d5f-8c2149e1b539'>Оставить заявку</button>
            </div>
            <div className='homepage__formsection-policy'>
              Нажимая на кнопку, вы соглашаетесь с Политикой конфиденциальности
            </div>
          </div>


        <div className='homepage__form'></div>

      </section>

      {/* <Footer /> */}
    </div>    
  );
};

export default HomePage;