"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import emblaStyle from "@/components/styles/embla.module.css";
import Image from "next/image";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(`.card`) as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const focusChange = useCallback((emblaApi: EmblaCarouselType) => {
    if(currentPage != emblaApi.slidesInView()[3]){
        
        if(emblaApi.slidesInView().length > 4) emblaApi.slideNodes()[emblaApi.slidesInView()[4]].style.zIndex = "0";
        emblaApi.slideNodes()[emblaApi.slidesInView()[3]].style.zIndex = "99";
        emblaApi.slideNodes()[emblaApi.slidesInView()[2]].style.zIndex = "0";
        setCurrentPage(emblaApi.slidesInView()[3])
    }
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, .2, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("scroll", focusChange)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <section className={emblaStyle.embla}>
      <div className={emblaStyle.embla__viewport} ref={emblaRef}>
        <div className={emblaStyle.embla__container}>
          {slides.map((index) => (
            <div className="w-full h-16 grid place-items-center flex-shrink-0" key={index}>
                <div className="w-[400px] bg-zinc-900 h-56 rounded-3xl overflow-hidden card">
                    {/* <div className="relative h-3/4">
                        <Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXOpM0y4zFy2bKKQ6eTV2tKr04qalNY7Cfw&s"} fill alt=""/>
                    </div> */}
                    <div className={emblaStyle.embla__slide__number}>{index + 1}</div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
