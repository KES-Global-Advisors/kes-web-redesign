import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import motivation from '../assets/Motivation to Performance.jpg';
import digitalTransform from '../assets/digital transformation 5.jpg';
import intentional from '../assets/Intentioanl 2.png';
import multiDigital from '../assets/What If - Technology3.jpg';

const posts = [
  {
    id: 1,
    imgSrc: motivation,
    title: 'Translating Motivation into Performance',
    href: 'https://drive.google.com/file/d/1lmDPXpryrGHLXoKMjKVANFYxqcAILOkh/view?usp=sharing',
    description:
      'When looking at leveraging the value of an organization’s workforce, you are effectively considering the value of changing on-the-job behaviors of the employees to drive positive changes in business performance.',
  },
  {
    id: 2,
    imgSrc: digitalTransform,
    title: 'The Value of Digital Transformation',
    href: 'https://drive.google.com/file/d/1RRkdevcorIbaYL-BShZXp_dIccbmTIvx/view?usp=sharing',
    description:
      'The key to getting the most out of the technology available today is to ensure that the technology being utilized fits into an overall plan for an organization that not just aligns and enables the various core work processes or enables completely new work processes or practices but ensures that the organizational capabilities are developed to fully support the utilization of that technology.',
  },
  {
    id: 3,
    imgSrc: intentional,
    title: 'Intentional Leadership',
    href: 'https://drive.google.com/file/d/11kzMmPZ1Dqh9OKiBeineoNMPAbY9dQxh/view?usp=sharing',
    description:
      'General thinking is that leaders are always intentional and purposeful.  However, many, if not most, leaders are reactionary and opportunistic, and while there is nothing wrong with those leadership styles and at times these are good tools for the kit, real and lasting change requires intentional leadership.',
  },
  {
    id: 4,
    imgSrc: multiDigital,
    title: 'Multi-Dimensional Digital Transformation',
    href: 'https://drive.google.com/file/d/1rQIpEHRuO_hkXOwHlQH1NbjdIDRcT_nJ/view?usp=sharing',
    description:
      'The current industry focus on digital transformation is driving some great innovations in industry, and in some cases, enabling complete transformation in how we work and what we can do.',
  },
  {
    id: 5,
    imgSrc: 'https://i.postimg.cc/MKPJfxTW/Digital-No-Value-2.avif',
    title: 'Does Technology Have Value? ',
    href: 'https://drive.google.com/file/d/1bh7LeTN73oBiFt8uNs7PZbyJnheY8DpT/view?usp=sharing',
    description:
      'Technology has no value.  This simple truth, although unpopular with some and seemingly at odds with conventional thinking, should be the basis behind every digitalization strategy.',
  },
  {
    id: 6,
    imgSrc: 'https://i.postimg.cc/sD2tr8Jb/Digital-Operational-Excellence.avif',
    title: 'Digital Operational Excellence',
    href: 'https://drive.google.com/file/d/1GuKYniRyEX7gwBse-dTj63HMsU4ZFtah/view?usp=sharing',
    description:
      'For operating companies in the energy and chemicals sectors, there should be a clear integration between their digitalization strategies and their operational excellence programs/practices.',
  },
];

interface InsightProps {
  id: string;
}

const Insights: React.FC<InsightProps> = ({ id }) => {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow(); // Set initial slides to show
    window.addEventListener('resize', updateSlidesToShow); // Update on window resize

    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    swipe: true, // Enable swiping
    swipetoSlide: true, // Enable swiping to slide
    touchMove: true, // Enable touch gestures
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <div className="slick-next slick-arrow" />,
    prevArrow: <div className="slick-prev slick-arrow" />,
  };

  return (
    <div id={id} className="lg:bg-[rgb(55,134,181)] py-24 sm:py-32 bg-[#f5f2f7]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-2xl font-bold leading-7 text-indigo-600 lg:text-white">Insights</h2>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 lg:text-white sm:text-4xl">Our Perspective</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 lg:text-white">
            We know how important it is to see other perspectives, and for that reason we freely share ours here.
          </p>
        </div>
        <Slider {...settings} className="mt-10">
          {posts.map((post) => (
            <div key={post.id} className="px-3">
              <article className="flex flex-col items-start justify-between">
                <img className="w-[522px] h-[220px] rounded-xl" src={post.imgSrc} alt="White Papers by KES Global Advisors" />
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 lg:text-white">
                    <span className="absolute inset-0" />
                    {post.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 lg:text-white">{post.description}</p>
                </div>
                <div className="lg:relative mt-8 flex items-center gap-x-4">
                  <a href={post.href} target="_blank" className="text-sm font-semibold leading-6 text-indigo-700 lg:text-white lg:hover:text-gray-600">
                    Read <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Insights;
